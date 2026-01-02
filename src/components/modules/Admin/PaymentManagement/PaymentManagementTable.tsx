"use client";

import { useState } from "react";
import { IPayment, PaymentStatus } from "@/types/payment.interface";
import ManagementTable from "@/components/shared/ManagementTable";
import { paymentManagementColumns } from "./paymentManagementColumns";
import AdminPaymentDetailsDialog from "./AdminPaymentDetailsDialog";
import RefundDialog from "./RefundDialog";

interface PaymentManagementTableProps {
  payments: IPayment[];
}

export default function PaymentManagementTable({
  payments,
}: PaymentManagementTableProps) {
  const [selectedPayment, setSelectedPayment] = useState<IPayment | null>(
    null
  );
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isRefundDialogOpen, setIsRefundDialogOpen] = useState(false);

  const handleViewDetails = (item: IPayment) => {
    setSelectedPayment(item);
    setIsDetailsDialogOpen(true);
  };

  const handleRefund = (item: IPayment) => {
    // Only allow refund for REFUND_PENDING status
    if (item.status !== PaymentStatus.REFUND_PENDING) {
      return;
    }
    setSelectedPayment(item);
    setIsRefundDialogOpen(true);
  };

  // Filter payments to show refund action only for REFUND_PENDING
  const getOnRefund = (payment: IPayment) => {
    return payment.status === PaymentStatus.REFUND_PENDING
      ? handleRefund
      : undefined;
  };

  return (
    <>
      <ManagementTable
        columns={paymentManagementColumns}
        data={payments}
        onView={handleViewDetails}
        onRefund={
          payments.some((p) => p.status === PaymentStatus.REFUND_PENDING)
            ? handleRefund
            : undefined
        }
        getRowKey={(payment) => payment._id}
        emptyMessage="No payments found"
      />

      {/* Details Dialog */}
      {selectedPayment && (
        <AdminPaymentDetailsDialog
          payment={selectedPayment}
          open={isDetailsDialogOpen}
          onClose={() => {
            setIsDetailsDialogOpen(false);
            setSelectedPayment(null);
          }}
        />
      )}

      {/* Refund Dialog */}
      {selectedPayment && (
        <RefundDialog
          payment={selectedPayment}
          open={isRefundDialogOpen}
          onClose={() => {
            setIsRefundDialogOpen(false);
            setSelectedPayment(null);
          }}
        />
      )}
    </>
  );
}
