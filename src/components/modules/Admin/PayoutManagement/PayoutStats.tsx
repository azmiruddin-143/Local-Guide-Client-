"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, CheckCircle, XCircle, DollarSign, Loader } from "lucide-react";

interface PayoutStatsProps {
  stats: {
    PENDING?: { totalAmount: number; count: number };
    SENT?: { totalAmount: number; count: number };
    FAILED?: { totalAmount: number; count: number };
    PROCESSING?: { totalAmount: number; count: number };
    CANCELLED?: { totalAmount: number; count: number };
  };
}

export function PayoutStats({ stats }: PayoutStatsProps) {
  const formatCurrency = (amount: number) => {
    return `৳${amount.toLocaleString()}`;
  };

  const pendingData = stats?.PENDING || { totalAmount: 0, count: 0 };
  const sentData = stats?.SENT || { totalAmount: 0, count: 0 };
  const failedData = stats?.FAILED || { totalAmount: 0, count: 0 };
  const processingData = stats?.PROCESSING || { totalAmount: 0, count: 0 };
  const cancelledData = stats?.CANCELLED || { totalAmount: 0, count: 0 };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending</CardTitle>
          <Clock className="h-4 w-4 text-amber-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-amber-600">{pendingData.count}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {formatCurrency(pendingData.totalAmount)}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Processing</CardTitle>
          <Loader className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">{processingData.count}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {formatCurrency(processingData.totalAmount)}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Sent</CardTitle>
          <CheckCircle className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{sentData.count}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {formatCurrency(sentData.totalAmount)}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Failed</CardTitle>
          <XCircle className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">{failedData.count}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {formatCurrency(failedData.totalAmount)}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Cancelled</CardTitle>
          <XCircle className="h-4 w-4 text-gray-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-600">{cancelledData.count}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {formatCurrency(cancelledData.totalAmount)}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
