import ToursManagementHeader from "@/components/modules/Admin/ToursManagement/ToursManagementHeader";
import TourFilters from "@/components/modules/Admin/ToursManagement/TourFilters";
import ToursTable from "@/components/modules/Admin/ToursManagement/ToursTable";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getAllToursAdmin } from "@/services/admin/tourManagement";
import { Suspense } from "react";
export const dynamic = "force-dynamic";
const AdminToursManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const toursResult = await getAllToursAdmin(queryString);
  

  return (
    <div className="space-y-6">
      <ToursManagementHeader />
      <TourFilters />
      <Suspense fallback={<TableSkeleton columns={6} rows={10} />}>
        <ToursTable tours={toursResult.data || []} />
        <TablePagination
          currentPage={toursResult?.meta?.page || 1}
          totalPages={toursResult?.meta?.totalPage || 1}
        />
      </Suspense>
    </div>
  );
};

export default AdminToursManagementPage;
