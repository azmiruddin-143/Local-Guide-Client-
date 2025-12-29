import { Suspense } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { EarningsStats } from "@/components/modules/Guide/Earnings/EarningsStats";
import { PayoutsTableNew } from "@/components/modules/Guide/Earnings/PayoutsTableNew";
import { getWalletBalance, getMyPayouts } from "@/services/guide/earnings.service";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { RequestPayoutButton } from "@/components/modules/Guide/Earnings/RequestPayoutButton";
import { queryStringFormatter } from "@/lib/formatters";
import { PayoutFilters } from "@/components/modules/Guide/Earnings/PayoutFilters";
export const dynamic = "force-dynamic";
const EarningsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const userResult = await getUserInfo();

  
  if (!userResult) {
    return (
      <div className="container mx-auto py-6 px-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Failed to load user information</AlertDescription>
        </Alert>
      </div>
    );
  }

  const [walletResult, payoutsResult] = await Promise.all([
    getWalletBalance(),
    getMyPayouts(userResult._id, queryString),
  ]);

  console.log(walletResult);
  

  const wallet = walletResult.data || { balance: 0, pendingBalance: 0, totalEarned: 0, totalPlatformFee: 0, totalReceived: 0, payableBalance: 0 };
  const payouts = payoutsResult.data || [];

  return (
    <div className="container mx-auto py-6 px-4 max-w-7xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Earnings</h1>
            <p className="text-muted-foreground mt-1">
              Manage your earnings and payout requests
            </p>
          </div>
          <RequestPayoutButton wallet={wallet} />
        </div>

        {/* Stats Cards */}
        <Suspense fallback={<StatsSkeleton />}>
          <EarningsStats wallet={wallet} />
        </Suspense>

        {/* Payout Requests */}
        <Card>
          <CardHeader>
            <CardTitle>Payout Requests</CardTitle>
            <CardDescription>
              View and manage your payout requests
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <PayoutFilters />
            <Suspense fallback={<TableSkeleton />}>
              <PayoutsTableNew payouts={payouts} />
            </Suspense>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card>
          <CardHeader>
            <CardTitle>Payout Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• Minimum payout amount: ৳100</p>
            <p>• Platform fee will be deducted when you request payout</p>
            <p>• Payouts are processed within 3-5 business days</p>
            <p>• You can cancel pending payout requests anytime</p>
            <p>• Failed payouts will be returned to your available balance</p>
            <p>• Ensure your account details are correct before requesting a payout</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatsSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i}>
          <CardHeader className="space-y-0 pb-2">
            <Skeleton className="h-4 w-32" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-24" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function TableSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} className="h-12 w-full" />
      ))}
    </div>
  );
}
export default EarningsPage