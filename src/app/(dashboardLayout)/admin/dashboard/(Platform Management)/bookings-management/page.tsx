import BookingFilters from "@/components/modules/Admin/BookingManagement/BookingFilters";
import BookingsTable from "@/components/modules/Admin/BookingManagement/BookingsTable";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getAllBookingsAdmin } from "@/services/admin/bookingManagement";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import BookingsManagementHeader from "@/components/modules/Admin/BookingManagement/BookingsManagementHeader";
export const dynamic = "force-dynamic";
const AdminBookingsManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const user = await getUserInfo();
  
  if (!user || user.role !== "ADMIN") {
    redirect("/login");
  }

  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const bookingsResult = await getAllBookingsAdmin(queryString);

  console.log(bookingsResult);
  
  const totalPages = Math.ceil(
    (bookingsResult?.meta?.total || 1) / (bookingsResult?.meta?.limit || 1)
  );

  // Calculate stats
  const bookings = bookingsResult.data || [];

  console.log(bookingsResult);
  

  return (
    <div className="space-y-6">
      <BookingsManagementHeader totalBookings={bookingsResult.meta.total} status={bookingsResult.meta.status} />
      <BookingFilters />
      <Suspense fallback={<TableSkeleton columns={11} rows={10} />}>
        <BookingsTable bookings={bookings} />
        <TablePagination
          currentPage={bookingsResult?.meta?.page || 1}
          totalPages={totalPages || 1}
        />
      </Suspense>
    </div>
  );
};

export default AdminBookingsManagementPage;
