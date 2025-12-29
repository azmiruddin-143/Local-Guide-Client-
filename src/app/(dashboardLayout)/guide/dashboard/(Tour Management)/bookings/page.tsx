import BookingsManagementHeader from "@/components/modules/Guide/Booking_Management/BookingsManagementHeader";
import BookingFilters from "@/components/modules/Guide/Booking_Management/BookingFilters";
import BookingsTable from "@/components/modules/Guide/Booking_Management/BookingsTable";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getMyBookings } from "@/services/guide/booking.service";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { Suspense } from "react";
import { redirect } from "next/navigation";
export const dynamic = "force-dynamic";
const GuideBookingsManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const user = await getUserInfo();
  
  if (!user || user.role !== "GUIDE") {
    redirect("/login");
  }

  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const bookingsResult = await getMyBookings(user._id, queryString);
  
  const totalPages = Math.ceil(
    (bookingsResult?.meta?.total || 1) / (bookingsResult?.meta?.limit || 1)
  );

  // Calculate stats
  const bookings = bookingsResult.data || [];
  const totalBookings = bookingsResult?.meta?.total || 0;
  const pendingCount = bookings.filter((b: any) => b.status === "PENDING").length;
  const confirmedCount = bookings.filter((b: any) => b.status === "CONFIRMED").length;

  return (
    <div className="space-y-6">
      <BookingsManagementHeader
        totalBookings={totalBookings}
        status={bookingsResult?.meta?.status}
      />
      <BookingFilters />
      <Suspense fallback={<TableSkeleton columns={9} rows={10} />}>
        <BookingsTable bookings={bookings} />
        <TablePagination
          currentPage={bookingsResult?.meta?.page || 1}
          totalPages={totalPages || 1}
        />
      </Suspense>
    </div>
  );
};

export default GuideBookingsManagementPage;