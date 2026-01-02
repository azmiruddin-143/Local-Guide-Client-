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
} from "lucide-react";
import Link from "next/link";
import { formatDateTime } from "@/lib/formatters";

interface AdminPaymentDetailsDialogProps {
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

export default function AdminPaymentDetailsDialog({
  payment,
  open,
  onClose,
}: AdminPaymentDetailsDialogProps) {
  const canRefund = payment.status === PaymentStatus.REFUND_PENDING;
  const isRefunded = payment.status === PaymentStatus.REFUNDED;
  const refundMetadata = payment.metadata;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Payment Details - Admin View
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Payment Status & Transaction Info */}
          <div className="grid grid-cols-2 gap-4">
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

          {canRefund && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-medium text-orange-900">
                  Refund Pending
                </h4>
                <p className="text-sm text-orange-700 mt-1">
                  This payment is pending refund approval. Use the refund action
                  in the table to process the refund.
                </p>
              </div>
            </div>
          )}

          {/* Refund Information (Admin View) */}
          {isRefunded && refundMetadata && (
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h4 className="font-medium text-purple-900">
                    Refund Processed
                  </h4>
                  <div className="mt-3 space-y-2 text-sm">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <span className="text-purple-700 font-medium">
                          Refund Amount:
                        </span>
                        <p className="text-purple-900 font-semibold mt-1">
                          {payment.currency}{" "}
                          {refundMetadata.refundAmount?.toLocaleString() ||
                            payment.amount.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <span className="text-purple-700 font-medium">
                          Refunded On:
                        </span>
                        <p className="text-purple-900 mt-1">
                          {refundMetadata.refundedAt
                            ? formatDateTime(refundMetadata.refundedAt)
                            : "N/A"}
                        </p>
                      </div>
                    </div>
                    {refundMetadata.refundReason && (
                      <div>
                        <span className="text-purple-700 font-medium">
                          Refund Reason:
                        </span>
                        <p className="text-purple-900 mt-1 bg-white/50 p-2 rounded">
                          {refundMetadata.refundReason}
                        </p>
                      </div>
                    )}
                    {refundMetadata.adminNotes && (
                      <div>
                        <span className="text-purple-700 font-medium">
                          Admin Notes:
                        </span>
                        <p className="text-purple-900 mt-1 bg-white/50 p-2 rounded italic">
                          {refundMetadata.adminNotes}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          <Separator />

          {/* Tourist Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <User className="h-4 w-4" />
              Tourist Information
            </h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-3">
                {payment.bookingId.touristId?.avatarUrl ? (
                  <img
                    src={payment.bookingId.touristId.avatarUrl}
                    alt={payment.bookingId.touristId.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-lg font-medium text-blue-600">
                      {payment.bookingId.touristId?.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <p className="font-medium text-gray-900">
                    {payment.bookingId.touristId?.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {payment.bookingId.touristId?.email}
                  </p>
                </div>
              </div>
            </div>
          </div>

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
                <p className="text-sm text-gray-600">Booking ID</p>
                <p className="font-mono text-sm font-medium text-gray-900 mt-1">
                  {payment.bookingId._id}
                </p>
              </div>
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
              {payment.updatedAt !== payment.createdAt && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Updated</span>
                  <span className="font-medium text-gray-900">
                    {formatDateTime(payment.updatedAt)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Payment Gateway Data */}
          {payment.paymentGatewayData && (
            <>
              <Separator />
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Receipt className="h-4 w-4" />
                  Gateway Information
                </h3>
                
                {/* Key Information Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Transaction Status */}
                  <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-4">
                    <p className="text-xs text-green-700 font-medium mb-1">
                      Transaction Status
                    </p>
                    <p className="text-lg font-bold text-green-900">
                      {payment.paymentGatewayData.status || "N/A"}
                    </p>
                  </div>

                  {/* Risk Level */}
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-4">
                    <p className="text-xs text-blue-700 font-medium mb-1">
                      Risk Level
                    </p>
                    <p className="text-lg font-bold text-blue-900">
                      {payment.paymentGatewayData.risk_title || "N/A"}
                    </p>
                  </div>

                  {/* Bank Transaction ID */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <p className="text-xs text-gray-600 font-medium mb-1">
                      Bank Transaction ID
                    </p>
                    <p className="text-sm font-mono text-gray-900 truncate">
                      {payment.paymentGatewayData.bank_tran_id || "N/A"}
                    </p>
                  </div>

                  {/* Validation ID */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <p className="text-xs text-gray-600 font-medium mb-1">
                      Validation ID
                    </p>
                    <p className="text-sm font-mono text-gray-900 truncate">
                      {payment.paymentGatewayData.val_id || "N/A"}
                    </p>
                  </div>
                </div>

                {/* Payment Method Details */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3">
                  <h4 className="font-medium text-gray-900 text-sm">
                    Payment Method Details
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-gray-600">Card Type:</span>
                      <p className="font-medium text-gray-900">
                        {payment.paymentGatewayData.card_type || "N/A"}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-600">Card Brand:</span>
                      <p className="font-medium text-gray-900">
                        {payment.paymentGatewayData.card_brand || "N/A"}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-600">Card Issuer:</span>
                      <p className="font-medium text-gray-900">
                        {payment.paymentGatewayData.card_issuer || "N/A"}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-600">Card Category:</span>
                      <p className="font-medium text-gray-900">
                        {payment.paymentGatewayData.card_category || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Transaction Amounts */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3">
                  <h4 className="font-medium text-gray-900 text-sm">
                    Transaction Amounts
                  </h4>
                  <div className="grid grid-cols-3 gap-3 text-sm">
                    <div>
                      <span className="text-gray-600">Total Amount:</span>
                      <p className="font-semibold text-gray-900">
                        {payment.paymentGatewayData.currency}{" "}
                        {parseFloat(
                          payment.paymentGatewayData.amount || 0
                        ).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-600">Store Amount:</span>
                      <p className="font-semibold text-gray-900">
                        {payment.paymentGatewayData.currency}{" "}
                        {parseFloat(
                          payment.paymentGatewayData.store_amount || 0
                        ).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-600">Gateway Fee:</span>
                      <p className="font-semibold text-red-600">
                        {payment.paymentGatewayData.currency}{" "}
                        {(
                          parseFloat(payment.paymentGatewayData.amount || 0) -
                          parseFloat(
                            payment.paymentGatewayData.store_amount || 0
                          )
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Transaction Dates */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Transaction Date:</span>
                    <span className="font-medium text-gray-900">
                      {payment.paymentGatewayData.tran_date || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Validated On:</span>
                    <span className="font-medium text-gray-900">
                      {payment.paymentGatewayData.validated_on || "N/A"}
                    </span>
                  </div>
                </div>

                {/* Raw Data (Collapsible) */}
                <details className="bg-gray-50 border border-gray-200 rounded-lg">
                  <summary className="p-4 cursor-pointer font-medium text-gray-900 text-sm hover:bg-gray-100 rounded-lg">
                    View Raw Gateway Data
                  </summary>
                  <div className="p-4 pt-0">
                    <pre className="text-xs overflow-auto max-h-60 bg-gray-900 text-green-400 p-3 rounded">
                      {JSON.stringify(payment.paymentGatewayData, null, 2)}
                    </pre>
                  </div>
                </details>
              </div>
            </>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              <X className="h-4 w-4 mr-2" />
              Close
            </Button>

            <Link
              href={`/admin/dashboard/bookings/${payment.bookingId._id}`}
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
