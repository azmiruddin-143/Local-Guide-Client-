/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DateCell } from "@/components/shared/cell/DateCell";
import { UserInfoCell } from "@/components/shared/cell/UserInfoCell";
import { Column } from "@/components/shared/ManagementTable";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, MapPin } from "lucide-react";
import { format } from "date-fns";

export interface IBooking {
  _id: string;
  tourId: any;
  touristId: any;
  guideId: any;
  availabilityId: any;
  startAt: string;
  endAt?: string;
  numGuests: number;
  amountTotal: number;
  currency: string;
  status: string;
  paymentStatus: string;
  specialRequests?: string | null;
  cancellationReason?: string | null;
  cancelledBy?: any;
  cancelledAt?: string | null;
  confirmedAt?: string | null;
  completedAt?: string | null;
  extras?: any;
  createdAt: string;
  updatedAt: string;
}

export const bookingColumns: Column<IBooking>[] = [
  {
    header: "Booking ID",
    accessor: (booking) => (
      <span className="font-mono text-xs text-muted-foreground">
        {booking._id.slice(-8).toUpperCase()}
      </span>
    ),
  },
  {
    header: "Tour",
    accessor: (booking) => (
      <div className="flex flex-col gap-1">
        <span className="font-medium text-sm">{booking.tourId?.title.slice(0,20) || "N/A"}</span>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3" />
          <span>{booking.tourId?.city || ""}</span>
        </div>
      </div>
    ),
  },
  {
    header: "Tourist",
    accessor: (booking) => (
      <UserInfoCell
        name={booking.touristId?.name || "N/A"}
        email={booking.touristId?.email || ""}
        photo={booking.touristId?.avatarUrl}
      />
    ),
  },
  {
    header: "Guide",
    accessor: (booking) => (
      <UserInfoCell
        name={booking.guideId?.name || "N/A"}
        email={booking.guideId?.email || ""}
        photo={booking.guideId?.avatarUrl}
      />
    ),
  },
  {
    header: "Date & Time",
    accessor: (booking) => (
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1 text-sm">
          <Calendar className="h-3 w-3 text-muted-foreground" />
          <span>{format(new Date(booking.startAt), "MMM dd, yyyy")}</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>{format(new Date(booking.startAt), "hh:mm a")}</span>
        </div>
      </div>
    ),
  },
  {
    header: "Guests",
    accessor: (booking) => (
      <div className="flex items-center gap-1">
        <Users className="h-4 w-4 text-muted-foreground" />
        <span className="font-medium">{booking.numGuests}</span>
      </div>
    ),
  },
  {
    header: "Amount",
    accessor: (booking) => (
      <div className="flex flex-col">
        <span className="font-semibold text-green-600">
          {booking.currency} {booking.amountTotal}
        </span>
        <span className="text-xs text-muted-foreground">
          {booking.currency} {(booking.amountTotal / booking.numGuests).toFixed(2)}/guest
        </span>
      </div>
    ),
  },
  {
    header: "Status",
    accessor: (booking) => {
      const statusColors: Record<string, string> = {
        PENDING: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
        CONFIRMED: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
        DECLINED: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
        CANCELLED: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
        COMPLETED: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      };
      
      return (
        <Badge className={statusColors[booking.status] || ""}>
          {booking.status}
        </Badge>
      );
    },

  },
  {
    header: "Payment",
    accessor: (booking) => {
      const paymentColors: Record<string, string> = {
        PENDING: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
        INITIATED: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
        SUCCEEDED: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
        FAILED: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
        REFUNDED: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      };
      
      return (
        <Badge className={paymentColors[booking.paymentStatus] || ""}>
          {booking.paymentStatus}
        </Badge>
      );
    },
  },
  {
    header: "Booked On",
    accessor: (booking) => <DateCell date={booking.createdAt} />,
 
  },
];