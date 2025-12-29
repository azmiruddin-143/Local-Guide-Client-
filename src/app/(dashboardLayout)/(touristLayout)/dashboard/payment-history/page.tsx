import PaymentHistoryHeader from "@/components/modules/Tourist/Payment_History/PaymentHistoryHeader";
import PaymentFilters from "@/components/modules/Tourist/Payment_History/PaymentFilters";
import PaymentHistoryTable from "@/components/modules/Tourist/Payment_History/PaymentHistoryTable";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { getMyPaymentHistory } from "@/services/payment/paymentHistory";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { Suspense } from "react";
import { redirect } from "next/navigation";
export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const PaymentHistoryPage = async ({ searchParams }: PageProps) => {
  const user = await getUserInfo();

  if (!user || user.role !== "TOURIST") {
    redirect("/login");
  }

  const searchParamsObj = await searchParams;

  // Build filters from search params
  const filters: any = {
    page: searchParamsObj.page ? parseInt(searchParamsObj.page as string) : 1,
    limit: searchParamsObj.limit
      ? parseInt(searchParamsObj.limit as string)
      : 10,
  };

  if (searchParamsObj.searchTerm) {
    filters.searchTerm = searchParamsObj.searchTerm as string;
  }
  if (searchParamsObj.status && searchParamsObj.status !== "all") {
    filters.status = searchParamsObj.status as string;
  }
  if (searchParamsObj.startDate) {
    filters.startDate = searchParamsObj.startDate as string;
  }
  if (searchParamsObj.endDate) {
    filters.endDate = searchParamsObj.endDate as string;
  }

  const paymentResult = await getMyPaymentHistory(filters);

  const payments = paymentResult.data || [];
  const meta = paymentResult.meta || {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
    stats: {},
  };

  const totalPages = meta.totalPages || 1;

  return (
    <div className="space-y-6">
      <PaymentHistoryHeader stats={meta.stats} totalPayments={meta.total} />
      <PaymentFilters />
      <Suspense fallback={<TableSkeleton columns={8} rows={10} />}>
        <PaymentHistoryTable payments={payments} />
        {meta.totalPages > 1 && <TablePagination currentPage={meta.page} totalPages={totalPages} />}
      </Suspense>
    </div>
  );
};

export default PaymentHistoryPage;