import { Suspense } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PayoutStats } from "@/components/modules/Admin/PayoutManagement/PayoutStats";
import { PayoutsTableNew } from "@/components/modules/Admin/PayoutManagement/PayoutsTableNew";
import { getAllPayouts } from "@/services/admin/payout.service";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import PayoutFilters from "@/components/modules/Admin/PayoutManagement/PayoutFilters";
import { queryStringFormatter } from "@/lib/formatters";
export const dynamic = "force-dynamic";
export default async function PayoutsManagementPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const result = await getAllPayouts(queryString);

  console.log(result);
  

  if (!result.success) {
    return (
      <div className="container mx-auto py-6 px-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Failed to load payouts</AlertDescription>
        </Alert>
      </div>
    );
  }

  const payouts = result.data || [];
  const metaData = result.meta || [];

  return (
    <div className="container mx-auto py-6 px-4 max-w-7xl">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Payout Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage guide payout requests and process payments
          </p>
        </div>

        {/* Stats Cards */}
        <Suspense fallback={<StatsSkeleton />}>
          <PayoutStats stats={metaData?.stats || {}} />
        </Suspense>

        {/* Payouts Table */}
        <Card>
          <CardHeader>
            <CardTitle>Payout Requests</CardTitle>
            <CardDescription>
              View and manage all payout requests from guides
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
            <CardTitle>Payout Processing Guidelines</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• Review account details carefully before processing</p>
            <p>• Verify guide identity if payout amount is large</p>
            <p>• Enter provider payout ID for tracking purposes</p>
            <p>• Failed payouts will return funds to guide's balance</p>
            <p>• Platform fee is automatically deducted from requested amount</p>
            <p>• Guide receives net amount (requested - platform fee)</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatsSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      {[1, 2, 3, 4, 5].map((i) => (
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
      {[1, 2, 3, 4, 5].map((i) => (
        <Skeleton key={i} className="h-16 w-full" />
      ))}
    </div>
  );
}
