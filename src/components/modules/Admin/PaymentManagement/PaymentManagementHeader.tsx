"use client";

import {
  Receipt,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  AlertCircle,
  Ban,
} from "lucide-react";
import { PaymentStats } from "@/types/payment.interface";

interface PaymentManagementHeaderProps {
  stats: PaymentStats;
  totalPayments: number;
}

export default function PaymentManagementHeader({
  stats,
  totalPayments,
}: PaymentManagementHeaderProps) {
  const paidStats = stats.PAID || { totalAmount: 0, count: 0 };
  const failedStats = stats.FAILED || { totalAmount: 0, count: 0 };
  const refundPendingStats = stats.REFUND_PENDING || {
    totalAmount: 0,
    count: 0,
  };
  const refundedStats = stats.REFUNDED || { totalAmount: 0, count: 0 };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Payment Management
        </h1>
        <p className="text-gray-600 mt-2">
          Manage all platform payments and process refunds
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Payments */}
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Payments
              </p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {totalPayments}
              </p>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Receipt className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Successful Payments */}
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Successful</p>
              <p className="text-2xl font-bold text-green-600 mt-2">
                {paidStats.count}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                ৳{paidStats.totalAmount.toLocaleString()}
              </p>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        {/* Refund Pending */}
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Refund Pending
              </p>
              <p className="text-2xl font-bold text-orange-600 mt-2">
                {refundPendingStats.count}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                ৳{refundPendingStats.totalAmount.toLocaleString()}
              </p>
            </div>
            <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Refunded */}
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Refunded</p>
              <p className="text-2xl font-bold text-purple-600 mt-2">
                {refundedStats.count}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                ৳{refundedStats.totalAmount.toLocaleString()}
              </p>
            </div>
            <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
