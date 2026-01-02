"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IPayment, PaymentStatus } from "@/types/payment.interface";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Receipt,
  Calendar,
  DollarSign,
  MapPin,
  User,
  X,
  CheckCircle,
  AlertCircle,
  Info,
} from "lucide-react";
import Link from "next/link";
import { formatDateTime } from "@/lib/formatters";

interface PaymentDetailsDialogProps {
  payment: IPayment;
  open: boolean;
  onClose: () => void;
}

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

export default function PaymentDetailsDialog({
  payment,
  open,
  onClose,
}: PaymentDetailsDialogProps) {
  const isRefunded = payment.status === PaymentStatus.REFUNDED;
  const isRefundPending = payment.status === PaymentStatus.REFUND_PENDING;
  const refundMetadata = payment.metadata;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Payment Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Payment Status */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Payment Status</p>
              <Badge
                variant="outline"
                className={`mt-1 ${getStatusColor(payment.status)}`}
              >
                {payment.status}
              </Badge>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Transaction ID</p>
              <p className="font-mono text-sm font-medium mt-1">
                {payment.transactionId}
              </p>
            </div>
          </div>

          {/* Refund Pending Alert */}
          {isRefundPending && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="font-medium text-orange-900">
                  Refund In Progress
                </h4>
                <p className="text-sm text-orange-700 mt-1">
                  Your refund request is being processed. You will receive the
                  refund amount shortly.
                </p>
              </div>
            </div>
          )}

          {/* Refund Information */}
          {isRefunded && refundMetadata && (
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 space-y-3">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h4 className="font-medium text-purple-900">
                    Payment Refunded
                  </h4>
                  <div className="mt-3 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-purple-700">Refund Amount:</span>
                      <span className="font-semibold text-purple-900">
                        {payment.currency}{" "}
                        {refundMetadata.refundAmount?.toLocaleString() ||
                          payment.amount.toLocaleString()}
                      </span>
                    </div>
                    {refundMetadata.refundReason && (
                      <div>
                        <span className="text-purple-700">Reason:</span>
                        <p className="text-purple-900 mt-1">
                          {refundMetadata.refundReason}
                        </p>
                      </div>
                    )}
                    {refundMetadata.refundedAt && (
                      <div className="flex justify-between">
                        <span className="text-purple-700">Refunded On:</span>
                        <span className="text-purple-900">
                          {formatDateTime(refundMetadata.refundedAt)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          <Separator />

          {/* Tour Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Tour Information
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex items-start gap-3">
                {payment.bookingId.tourId.mediaUrls?.[0] && (
                  <img
                    src={payment.bookingId.tourId.mediaUrls[0]}
                    alt={payment.bookingId.tourId.title}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                )}
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">
                    {payment.bookingId.tourId.title}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {payment.bookingId.tourId.city},{" "}
                    {payment.bookingId.tourId.country}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Guide Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <User className="h-4 w-4" />
              Guide Information
            </h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-3">
                {payment.bookingId.guideId.avatarUrl ? (
                  <img
                    src={payment.bookingId.guideId.avatarUrl}
                    alt={payment.bookingId.guideId.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-lg font-medium text-primary">
                      {payment.bookingId.guideId.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <p className="font-medium text-gray-900">
                    {payment.bookingId.guideId.name}
                  </p>
                  <p className="text-sm text-gray-600">Tour Guide</p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Booking Details */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Booking Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Number of Guests</p>
                <p className="font-medium text-gray-900 mt-1">
                  {payment.bookingId.numGuests} Guest
                  {payment.bookingId.numGuests > 1 ? "s" : ""}
                </p>
              </div>
              {payment.bookingId.extras?.bookingDate && (
                <div>
                  <p className="text-sm text-gray-600">Tour Date</p>
                  <p className="font-medium text-gray-900 mt-1">
                    {formatDateTime(payment.bookingId.extras.bookingDate)}
                  </p>
                </div>
              )}
              {payment.bookingId.extras?.startTime && (
                <div>
                  <p className="text-sm text-gray-600">Start Time</p>
                  <p className="font-medium text-gray-900 mt-1">
                    {payment.bookingId.extras.startTime}
                  </p>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Payment Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Payment Information
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Amount</span>
                <span className="font-semibold text-gray-900">
                  {payment.currency} {payment.amount.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Provider</span>
                <span className="font-medium text-gray-900 capitalize">
                  {payment.provider}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Date</span>
                <span className="font-medium text-gray-900">
                  {formatDateTime(payment.createdAt)}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              <X className="h-4 w-4 mr-2" />
              Close
            </Button>
            <Link
              href={`/dashboard/bookings/${payment.bookingId._id}`}
              className="flex-1"
            >
              <Button className="w-full">
                <CheckCircle className="h-4 w-4 mr-2" />
                View Booking
              </Button>
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
