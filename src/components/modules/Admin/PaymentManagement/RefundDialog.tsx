"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { IPayment } from "@/types/payment.interface";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  AlertCircle,
  DollarSign,
  X,
  CheckCircle,
  RefreshCw,
} from "lucide-react";
import { useState, useTransition } from "react";
import { refundPayment } from "@/services/admin/paymentManagement";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface RefundDialogProps {
  payment: IPayment;
  open: boolean;
  onClose: () => void;
}

export default function RefundDialog({
  payment,
  open,
  onClose,
}: RefundDialogProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isRefunding, setIsRefunding] = useState(false);
  
  // Refund form data
  const [refundReason, setRefundReason] = useState("");
  const [refundAmount, setRefundAmount] = useState(payment.amount.toString());
  const [adminNotes, setAdminNotes] = useState("");

  const handleRefund = async () => {
    // Validation
    if (!refundReason.trim()) {
      toast.error("Please provide a refund reason");
      return;
    }

    const amount = parseFloat(refundAmount);
    if (isNaN(amount) || amount <= 0 || amount > payment.amount) {
      toast.error("Invalid refund amount");
      return;
    }

    setIsRefunding(true);

    const refundData = {
      refundReason: refundReason.trim(),
      refundAmount: amount,
      adminNotes: adminNotes.trim() || undefined,
    };

    console.log('Sending refund data:', refundData);

    const result = await refundPayment(payment._id, refundData);
    
    console.log('Refund result:', result);

    if (result.success) {
      toast.success("Payment refunded successfully");
      onClose();
      // Reset form
      setRefundReason("");
      setRefundAmount(payment.amount.toString());
      setAdminNotes("");
      
      startTransition(() => {
        router.refresh();
      });
    } else {
      toast.error(result.message || "Failed to refund payment");
    }
    setIsRefunding(false);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-orange-600" />
            Process Refund
          </DialogTitle>
          <DialogDescription>
            Review the payment details and provide refund information
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 max-h-[300px] overflow-hidden overflow-y-auto">
          {/* Warning Alert */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h4 className="font-medium text-orange-900">
                Refund Confirmation Required
              </h4>
              <p className="text-sm text-orange-700 mt-1">
                This action will refund the payment to the tourist. Please
                ensure all details are correct before proceeding.
              </p>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <h4 className="font-semibold text-gray-900">Payment Summary</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-gray-600">Transaction ID</p>
                <p className="font-mono font-medium text-gray-900">
                  {payment.transactionId}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Original Amount</p>
                <p className="font-semibold text-gray-900">
                  {payment.currency} {payment.amount.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Tourist</p>
                <p className="font-medium text-gray-900">
                  {payment.bookingId.touristId?.name}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Tour</p>
                <p className="font-medium text-gray-900 truncate">
                  {payment.bookingId.tourId.title}
                </p>
              </div>
            </div>
          </div>

          {/* Refund Form */}
          <div className="space-y-4">
            {/* Refund Amount */}
            <div className="space-y-2">
              <Label htmlFor="refundAmount" className="required">
                Refund Amount
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  {payment.currency}
                </span>
                <Input
                  id="refundAmount"
                  type="number"
                  min="0"
                  max={payment.amount}
                  step="0.01"
                  value={refundAmount}
                  onChange={(e) => setRefundAmount(e.target.value)}
                  className="pl-16"
                  placeholder="Enter refund amount"
                />
              </div>
              <p className="text-xs text-gray-500">
                Maximum: {payment.currency} {payment.amount.toLocaleString()}
              </p>
            </div>

            {/* Refund Reason */}
            <div className="space-y-2">
              <Label htmlFor="refundReason" className="required">
                Refund Reason
              </Label>
              <Textarea
                id="refundReason"
                value={refundReason}
                onChange={(e) => setRefundReason(e.target.value)}
                placeholder="Enter the reason for refund (e.g., Booking cancelled by guide, Tour not available, etc.)"
                rows={3}
                className="resize-none"
              />
              <p className="text-xs text-gray-500">
                This will be visible to the tourist
              </p>
            </div>

            {/* Admin Notes (Optional) */}
            <div className="space-y-2">
              <Label htmlFor="adminNotes">
                Admin Notes <span className="text-gray-400">(Optional)</span>
              </Label>
              <Textarea
                id="adminNotes"
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="Internal notes for admin reference (not visible to tourist)"
                rows={2}
                className="resize-none"
              />
              <p className="text-xs text-gray-500">
                For internal record keeping only
              </p>
            </div>
          </div>

        </div>
          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <Button
              variant="outline"
              className="flex-1"
              onClick={onClose}
              disabled={isRefunding || isPending}
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="flex-1"
              onClick={handleRefund}
              disabled={isRefunding || isPending || !refundReason.trim()}
            >
              {isRefunding ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Processing Refund...
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Confirm Refund
                </>
              )}
            </Button>
          </div>
      </DialogContent>
    </Dialog>
  );
}
