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

export const paymentColumns: Column<IPayment>[] = [
  {
    header: "Transaction ID",
    accessor: (payment) => (
      <div className="font-mono text-sm">{payment.transactionId}</div>
    ),
    sortKey: "transactionId",
  },
  {
    header: "Tour",
    accessor: (payment) => (
      <div className="max-w-[200px]">
        <div className="font-medium truncate">
          {payment.bookingId.tourId.title}
        </div>
        <div className="text-xs text-gray-500">
          {payment.bookingId.tourId.city}, {payment.bookingId.tourId.country}
        </div>
      </div>
    ),
  },
  {
    header: "Guide",
    accessor: (payment) => (
      <div className="flex items-center gap-2">
        {payment.bookingId.guideId.avatarUrl ? (
          <img
            src={payment.bookingId.guideId.avatarUrl}
            alt={payment.bookingId.guideId.name}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-sm font-medium text-primary">
              {payment.bookingId.guideId.name.charAt(0)}
            </span>
          </div>
        )}
        <span className="font-medium">{payment.bookingId.guideId.name}</span>
      </div>
    ),
  },
  {
    header: "Amount",
    accessor: (payment) => (
      <div className="font-semibold">
        {payment.currency} {payment.amount.toLocaleString()}
      </div>
    ),
    sortKey: "amount",
  },
  {
    header: "Status",
    accessor: (payment) => (
      <Badge variant="outline" className={getStatusColor(payment.status)}>
        {payment.status}
      </Badge>
    ),
    sortKey: "status",
  },
  {
    header: "Provider",
    accessor: (payment) => (
      <div className="text-sm capitalize">{payment.provider}</div>
    ),
  },
  {
    header: "Payment Date",
    accessor: (payment) => (
      <div className="text-sm">{formatDateTime(payment.createdAt)}</div>
    ),
    sortKey: "createdAt",
  },
];
