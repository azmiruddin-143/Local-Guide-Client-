"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  CreditCard,
  FileText,
  AlertCircle,
  CheckCircle,
  XCircle,
  ArrowLeft,
  Phone,
  Mail,
  Ban,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cancelBooking, retryPayment } from "@/services/tourist/booking.service";
import { toast } from "sonner";
import { BookingStatus, PaymentStatus } from "@/types/bookings.interface";
import { CancelBookingDialog } from "./CancelBookingDialog";
import ReviewSection from "./ReviewSection";
import Link from "next/link";

interface BookingDetailsContentProps {
  booking: any;
}

export function BookingDetailsContent({ booking }: BookingDetailsContentProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);

  const getStatusBadge = (status: BookingStatus) => {
    const variants: Record<BookingStatus, { variant: any; icon: any }> = {
      [BookingStatus.PENDING]: { variant: "secondary", icon: Clock },
      [BookingStatus.CONFIRMED]: { variant: "default", icon: CheckCircle },
      [BookingStatus.DECLINED]: { variant: "destructive", icon: XCircle },
      [BookingStatus.CANCELLED]: { variant: "destructive", icon: Ban },
      [BookingStatus.COMPLETED]: { variant: "default", icon: CheckCircle },
    };

    const { variant, icon: Icon } = variants[status];
    return (
      <Badge variant={variant} className="gap-1">
        <Icon className="h-3 w-3" />
        {status}
      </Badge>
    );
  };

  const getPaymentStatusBadge = (status: PaymentStatus) => {
    const variants: Record<PaymentStatus, { variant: any; className?: string }> = {
      [PaymentStatus.PENDING]: { variant: "secondary" },
      [PaymentStatus.INITIATED]: { variant: "secondary" },
      [PaymentStatus.SUCCEEDED]: { variant: "default", className: "bg-green-600" },
      [PaymentStatus.FAILED]: { variant: "destructive" },
      [PaymentStatus.REFUNDED]: { variant: "outline", className: "bg-blue-600 text-white" },
      [PaymentStatus.REFUND_PENDING]: { variant: "secondary", className: "bg-yellow-600 text-white" },
    };

    const { variant, className } = variants[status];
    return (
      <Badge variant={variant} className={className}>
        {status.replace('_', ' ')}
      </Badge>
    );
  };

  const handleRetryPayment = async () => {
    setIsLoading(true);
    try {
      const result = await retryPayment(booking._id);
      if (result.success && result.data?.paymentUrl?.GatewayPageURL) {
        toast.success("Redirecting to payment gateway...");
        window.location.href = result.data.paymentUrl.GatewayPageURL;
      } else {
        toast.error(result.message || "Failed to initiate payment");
      }
    } catch (error) {
      toast.error("An error occurred while retrying payment");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelBooking = async (reason: string) => {
    setIsLoading(true);
    try {
      const result = await cancelBooking(booking._id, reason);
      if (result.success) {
        toast.success("Booking cancelled successfully");
        router.push("/dashboard/bookings");
        router.refresh();
      } else {
        toast.error(result.message || "Failed to cancel booking");
      }
    } catch (error) {
      toast.error("An error occurred while cancelling booking");
    } finally {
      setIsLoading(false);
      setIsCancelDialogOpen(false);
    }
  };

  const canCancel = booking.status === BookingStatus.PENDING;
  const canRetryPayment = 
    booking.status === BookingStatus.PENDING && 
    booking.paymentStatus === PaymentStatus.FAILED;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Link href={'/dashboard/bookings'}>
          <Button
            variant="ghost"
            size="sm"
            className="mb-2 -ml-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Bookings
          </Button>
          </Link>
          <h1 className="text-3xl font-bold">Booking Details</h1>
          <p className="text-muted-foreground">Booking ID: {booking._id}</p>
        </div>
        <div className="flex gap-2">
          {getStatusBadge(booking.status)}
          {getPaymentStatusBadge(booking.paymentStatus)}
        </div>
      </div>

      {/* Failed Payment Alert */}
      {booking.paymentStatus === PaymentStatus.FAILED && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>Payment failed. Please retry to complete your booking.</span>
            <Button
              size="sm"
              variant="outline"
              onClick={handleRetryPayment}
              disabled={isLoading}
              className="ml-4"
            >
              Retry Payment
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Pending Payment Alert */}
      {booking.paymentStatus === PaymentStatus.PENDING && booking.status === BookingStatus.PENDING && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Your booking is pending payment. Please complete the payment to confirm your booking.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Content - 2 columns */}
        <div className="md:col-span-2 space-y-6">
          {/* Tour Information */}
          <Card>
            <CardHeader>
              <CardTitle>Tour Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold">{booking.tourId?.title}</h3>
                <p className="text-muted-foreground mt-1">
                  {booking.tourId?.description}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">
                      {booking.tourId?.city}, {booking.tourId?.country}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Duration</p>
                    <p className="text-sm text-muted-foreground">
                      {booking.tourId?.durationMins} minutes
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Booking Date</p>
                    <p className="text-sm text-muted-foreground">
                      {booking.extras?.bookingDate
                        ? format(new Date(booking.extras.bookingDate), "PPP")
                        : format(new Date(booking.startAt), "PPP")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Start Time</p>
                    <p className="text-sm text-muted-foreground">
                      {booking.extras?.startTime || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Number of Guests</p>
                    <p className="text-sm text-muted-foreground">
                      {booking.numGuests} {booking.numGuests === 1 ? "guest" : "guests"}
                    </p>
                  </div>
                </div>
              </div>

              {booking.specialRequests && (
                <>
                  <Separator />
                  <div className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Special Requests</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {booking.specialRequests}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Guide Information */}
          <Card>
            <CardHeader>
              <CardTitle>Your Guide</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={booking.guideId?.avatarUrl} />
                  <AvatarFallback>
                    {booking.guideId?.name?.charAt(0) || "G"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{booking.guideId?.name}</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      {booking.guideId?.email}
                    </div>
                    {booking.guideId?.phoneNumber && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        {booking.guideId.phoneNumber}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cancellation Info */}
          {booking.status === BookingStatus.CANCELLED && booking.cancellationReason && (
            <Card className="border-destructive">
              <CardHeader>
                <CardTitle className="text-destructive">Cancellation Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <p className="text-sm font-medium">Reason</p>
                  <p className="text-sm text-muted-foreground">
                    {booking.cancellationReason}
                  </p>
                </div>
                {booking.cancelledAt && (
                  <div>
                    <p className="text-sm font-medium">Cancelled At</p>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(booking.cancelledAt), "PPP 'at' p")}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar - 1 column */}
        <div className="space-y-6">
          {/* Payment Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Price per person</span>
                  <span>
                    {booking.currency} {(booking.amountTotal / booking.numGuests).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Number of guests</span>
                  <span>× {booking.numGuests}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>
                    {booking.currency} {booking.amountTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {booking.paymentId && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CreditCard className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Transaction ID</span>
                    </div>
                    <p className="text-xs text-muted-foreground font-mono break-all">
                      {booking.paymentId?.transactionId || "N/A"}
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {canRetryPayment && (
                <Button
                  className="w-full"
                  onClick={handleRetryPayment}
                  disabled={isLoading}
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Retry Payment
                </Button>
              )}

              {canCancel && (
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={() => setIsCancelDialogOpen(true)}
                  disabled={isLoading}
                >
                  <Ban className="h-4 w-4 mr-2" />
                  Cancel Booking
                </Button>
              )}

              {!canCancel && !canRetryPayment && (
                <p className="text-sm text-muted-foreground text-center py-2">
                  No actions available
                </p>
              )}
            </CardContent>
          </Card>

          {/* Booking Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <div className="h-full w-px bg-border" />
                </div>
                <div className="pb-3">
                  <p className="text-sm font-medium">Booking Created</p>
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(booking.createdAt), "PPP 'at' p")}
                  </p>
                </div>
              </div>

              {booking.confirmedAt && (
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="h-2 w-2 rounded-full bg-green-600" />
                    <div className="h-full w-px bg-border" />
                  </div>
                  <div className="pb-3">
                    <p className="text-sm font-medium">Confirmed</p>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(booking.confirmedAt), "PPP 'at' p")}
                    </p>
                  </div>
                </div>
              )}

              {booking.completedAt && (
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="h-2 w-2 rounded-full bg-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Completed</p>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(booking.completedAt), "PPP 'at' p")}
                    </p>
                  </div>
                </div>
              )}

              {booking.cancelledAt && (
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="h-2 w-2 rounded-full bg-destructive" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Cancelled</p>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(booking.cancelledAt), "PPP 'at' p")}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Review Section - Only show for completed bookings */}
      {booking.status === BookingStatus.COMPLETED && (
        <ReviewSection
          bookingId={booking._id}
          bookingStatus={booking.status}
          tourTitle={booking.tourId?.title || "Tour"}
          guideName={booking.guideId?.name || "Guide"}
        />
      )}

      <CancelBookingDialog
        isOpen={isCancelDialogOpen}
        onClose={() => setIsCancelDialogOpen(false)}
        onConfirm={handleCancelBooking}
        isLoading={isLoading}
      />
    </div>
  );
}
