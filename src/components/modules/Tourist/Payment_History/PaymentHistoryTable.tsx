"use client";

import { useState } from "react";
import { IPayment } from "@/types/payment.interface";
import ManagementTable from "@/components/shared/ManagementTable";
import { paymentColumns } from "./paymentColumns";
import PaymentDetailsDialog from "./PaymentDetailsDialog";

interface PaymentHistoryTableProps {
  payments: IPayment[];
}

export default function PaymentHistoryTable({
  payments,
}: PaymentHistoryTableProps) {
  const [selectedPayment, setSelectedPayment] = useState<IPayment | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleViewDetails = (payment: IPayment) => {
    setSelectedPayment(payment);
    setIsDialogOpen(true);
  };

  return (
    <>
      <ManagementTable
        columns={paymentColumns}
        data={payments}
        onView={handleViewDetails}
        getRowKey={(payment) => payment._id}
        emptyMessage="No payment history found"
      />

      {selectedPayment && (
        <PaymentDetailsDialog
          payment={selectedPayment}
          open={isDialogOpen}
          onClose={() => {
            setIsDialogOpen(false);
            setSelectedPayment(null);
          }}
        />
      )}
    </>
  );
}
