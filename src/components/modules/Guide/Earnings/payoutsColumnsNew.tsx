"use client";

import { Column } from "@/components/shared/ManagementTable";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface Payout {
  _id: string;
  amount: number;
  platformFee: number;
  netAmount: number;
  currency: string;
  status: string;
  paymentMethod: string;
  requestedAt: string;
  processedAt?: string;
}

export const payoutsColumnsNew: Column<Payout>[] = [
  {
    header: "Requested",
    accessor: (payout) => (
      <span className="font-medium">
        ৳{payout.amount.toLocaleString()}
      </span>
    ),
    sortKey: "amount",
  },
  {
    header: "Platform Fee",
    accessor: (payout) => (
      <span className="text-red-600 dark:text-red-400">
        -৳{(payout.platformFee || 0).toLocaleString()}
      </span>
    ),
  },
  {
    header: "You Receive",
    accessor: (payout) => (
      <span className="font-semibold text-green-600 dark:text-green-400">
        ৳{(payout.netAmount || payout.amount).toLocaleString()}
      </span>
    ),
  },
  {
    header: "Payment Method",
    accessor: (payout) => (
      <span className="capitalize text-sm">
        {payout.paymentMethod?.replace("_", " ") || "-"}
      </span>
    ),
  },
  {
    header: "Status",
    accessor: (payout) => {
      const statusConfig: Record<string, { className: string }> = {
        PENDING: { className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400" },
        PROCESSING: { className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" },
        SENT: { className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" },
        FAILED: { className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" },
        CANCELLED: { className: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400" },
      };

      const config = statusConfig[payout.status] || statusConfig.CANCELLED;
      
      return (
        <Badge className={config.className}>
          {payout.status}
        </Badge>
      );
    },
  },
  {
    header: "Date",
    accessor: (payout) => (
      <div className="text-sm">
        <div>{format(new Date(payout.requestedAt), "MMM dd, yyyy")}</div>
        {payout.processedAt && (
          <div className="text-xs text-muted-foreground">
            Processed: {format(new Date(payout.processedAt), "MMM dd")}
          </div>
        )}
      </div>
    ),
    sortKey: "requestedAt",
  },
];
