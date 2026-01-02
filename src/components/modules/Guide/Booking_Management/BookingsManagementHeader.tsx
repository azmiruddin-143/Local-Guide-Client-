"use client";

import ManagementPageHeader from "@/components/shared/ManagementPageHeader";

interface BookingsManagementHeaderProps {
  totalBookings: number;
  status: any;
}

const BookingsManagementHeader = ({
  totalBookings,
  status,
}: BookingsManagementHeaderProps) => {
  return (
    <div className="space-y-4">
      <ManagementPageHeader
        title="Bookings Management"
        description="Manage your tour bookings and reservations"
      />
      
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3  lg:grid-cols-6 gap-4">
        <div className="bg-card border rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Total Bookings</p>
          <p className="text-2xl font-bold">{totalBookings}</p>
        </div>

        {status?.map((s: any, inx: number) => {
          const statusColors: Record<string, { bg: string; text: string; border: string }> = {
            PENDING: {
              bg: "bg-yellow-50 dark:bg-yellow-900/20",
              text: "text-yellow-800 dark:text-yellow-300",
              border: "border-yellow-200 dark:border-yellow-800"
            },
            CONFIRMED: {
              bg: "bg-green-50 dark:bg-green-900/20",
              text: "text-green-800 dark:text-green-300",
              border: "border-green-200 dark:border-green-800"
            },
            DECLINED: {
              bg: "bg-red-50 dark:bg-red-900/20",
              text: "text-red-800 dark:text-red-300",
              border: "border-red-200 dark:border-red-800"
            },
            CANCELLED: {
              bg: "bg-gray-50 dark:bg-gray-900/20",
              text: "text-gray-800 dark:text-gray-300",
              border: "border-gray-200 dark:border-gray-800"
            },
            COMPLETED: {
              bg: "bg-blue-50 dark:bg-blue-900/20",
              text: "text-blue-800 dark:text-blue-300",
              border: "border-blue-200 dark:border-blue-800"
            }
          };

          const colors = statusColors[s.status] || statusColors.PENDING;

          return (
            <div key={inx} className={`${colors.bg} border ${colors.border} rounded-lg p-4`}>
              <p className={`text-sm ${colors.text} font-medium`}>{s.status}</p>
              <p className={`text-2xl font-bold ${colors.text}`}>{s.count}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BookingsManagementHeader;
