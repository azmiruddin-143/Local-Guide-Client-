"use client";

import { IPayment, PaymentStatus } from "@/types/payment.interface";
import { Badge } from "@/components/ui/badge";
import { formatDateTime } from "@/lib/formatters";
import { Column } from "@/components/shared/ManagementTable";

const getStatusColor = (status: PaymentStatus) => {
  switch (status) {
    case PaymentStatus.PAID:
      return "bg-green-100 text-green-800 border-green-200";
    case PaymentStatus.INITIATED:
      return "bg-blue-100 text-blue-800 border-blue-200";
    case PaymentStatus.UNPAID:
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case PaymentStatus.FAILED:
      return "bg-red-100 text-red-800 border-red-200";
    case PaymentStatus.REFUNDED:
      return "bg-purple-100 text-purple-800 border-purple-200";
    case PaymentStatus.REFUND_PENDING:
      return "bg-orange-100 text-orange-800 border-orange-200";
    case PaymentStatus.CANCELLED:
      return "bg-gray-100 text-gray-800 border-gray-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export const paymentManagementColumns: Column<IPayment>[] = [
  {
    header: "Transaction ID",
    accessor: (payment) => (
      <div className="font-mono text-sm">{payment.transactionId}</div>
    ),
  },
  {
    header: "Tourist",
    accessor: (payment) => {
      if (!payment.bookingId || !payment.bookingId.touristId) {
        return <span className="text-gray-400">N/A</span>;
      }
      
      const tourist = payment.bookingId.touristId;
      
      return (
        <div className="flex items-center gap-2">
          {tourist.avatarUrl ? (
            <img
              src={tourist.avatarUrl}
              alt={tourist.name}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-sm font-medium text-blue-600">
                {tourist.name?.charAt(0) || "?"}
              </span>
            </div>
          )}
          <div>
            <div className="font-medium">{tourist.name || "Unknown"}</div>
            <div className="text-xs text-gray-500">{tourist.email || "N/A"}</div>
          </div>
        </div>
      );
    },
  },
  {
    header: "Tour",
    accessor: (payment) => {
      if (!payment.bookingId || !payment.bookingId.tourId) {
        return <span className="text-gray-400">N/A</span>;
      }
      
      const tour = payment.bookingId.tourId;
      
      return (
        <div className="max-w-[200px]">
          <div className="font-medium truncate">
            {tour.title || "Unknown Tour"}
          </div>
          <div className="text-xs text-gray-500">
            {tour.city || "N/A"}, {tour.country || "N/A"}
          </div>
        </div>
      );
    },
  },
  {
    header: "Guide",
    accessor: (payment) => {
      if (!payment.bookingId || !payment.bookingId.guideId) {
        return <span className="text-gray-400">N/A</span>;
      }
      
      const guide = payment.bookingId.guideId;
      
      return (
        <div className="flex items-center gap-2">
          {guide.avatarUrl ? (
            <img
              src={guide.avatarUrl}
              alt={guide.name}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-sm font-medium text-primary">
                {guide.name?.charAt(0) || "?"}
              </span>
            </div>
          )}
          <span className="font-medium">{guide.name || "Unknown"}</span>
        </div>
      );
    },
  },
  {
    header: "Amount",
    accessor: (payment) => (
      <div className="font-semibold">
        {payment.currency} {payment.amount.toLocaleString()}
      </div>
    ),

  },
  {
    header: "Status",
    accessor: (payment) => (
      <Badge variant="outline" className={getStatusColor(payment.status)}>
        {payment.status}
      </Badge>
    ),

  },
  {
    header: "Payment Date",
    accessor: (payment) => (
      <div className="text-sm">{formatDateTime(payment.createdAt)}</div>
    ),

  },
];
