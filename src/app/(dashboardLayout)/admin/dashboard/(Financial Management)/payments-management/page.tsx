import PaymentManagementHeader from "@/components/modules/Admin/PaymentManagement/PaymentManagementHeader";
import PaymentManagementTable from "@/components/modules/Admin/PaymentManagement/PaymentManagementTable";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { getAllPayments } from "@/services/admin/paymentManagement";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { queryStringFormatter } from "@/lib/formatters";
import PaymentFilters from "@/components/modules/Tourist/Payment_History/PaymentFilters";
export const dynamic = "force-dynamic";
interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const PaymentsManagementPage = async ({ searchParams }: PageProps) => {
  const user = await getUserInfo();

  if (!user || user.role !== "ADMIN") {
    redirect("/login");
  }

  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);

  const paymentResult = await getAllPayments(queryString);

  const payments = paymentResult.data || [];
  const meta = paymentResult.meta || {
    page: 1,
    limit: 10,
    total: 0,
    totalPage: 1,
    stats: {},
  };

  return (
    <div className="space-y-6">
      <PaymentManagementHeader stats={meta.stats} totalPayments={meta.total} />
        <PaymentFilters />
      <Suspense fallback={<TableSkeleton columns={8} rows={10} />}>
        <PaymentManagementTable payments={payments} />
        {meta.totalPage > 1 && (
          <TablePagination currentPage={meta.page} totalPages={meta.totalPage} />
        )}
      </Suspense>
    </div>
  );
};

export default PaymentsManagementPage;
