"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Clock,
  Users,
  MapPin,
  CreditCard,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { UserInfo } from "@/types/user.interface";
import { initiatePayment } from "@/services/tourist/payment.service";

interface PaymentContentProps {
  booking: any;
  user: UserInfo
}

export default function PaymentContent({ booking ,user}: PaymentContentProps) {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const formatCurrency = (amount: number) => {
    return `৳${amount}`;
  };

  console.log(booking);
  

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handlePayment = async () => {
    setIsProcessing(true);

    try {

      const result = await initiatePayment(booking._id);

      console.log(result);
      

      if (!result.success) {
        throw new Error(result.message || "Failed to initiate payment");
      }

      // Redirect to SSLCommerz payment gateway
      if (result.data.paymentUrl) {
        window.location.href = result.data.paymentUrl.GatewayPageURL;
      } else {
        throw new Error("Payment URL not received");
      }
    } catch (error: any) {
      console.error("Payment error:", error);
      toast.error(error.message || "Failed to initiate payment");
      setIsProcessing(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; variant: any }> = {
      PENDING: { label: "Pending Payment", variant: "secondary" },
      INITIATED: { label: "Payment Initiated", variant: "default" },
      SUCCEEDED: { label: "Paid", variant: "default" },
      FAILED: { label: "Payment Failed", variant: "destructive" },
    };

    const config = statusConfig[status] || statusConfig.PENDING;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <div className="container max-w-4xl mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Complete Your Payment</h1>
        <p className="text-muted-foreground">
          Review your booking details and proceed to payment
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Booking Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Booking Details</CardTitle>
                {getStatusBadge(booking.paymentStatus)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Tour Info */}
              <div>
                <h3 className="font-semibold text-lg mb-3">
                  {booking.tourId.title}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(booking.startAt)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>
                      {formatTime(booking.startAt)} - {formatTime(booking.endAt)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>
                      {booking.numGuests} guest{booking.numGuests > 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{booking.tourId.city}, {booking.tourId.country}</span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Guide Info */}
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  Your Guide
                </p>
                <div className="flex items-center gap-3">
                  {booking.guideId.avatarUrl && (
                    <img
                      src={booking.guideId.avatarUrl}
                      alt={booking.guideId.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="font-semibold">{booking.guideId.name}</p>
                    {booking.guideId.isVerified && (
                      <div className="flex items-center gap-1 text-xs text-green-600">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Verified Guide</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Special Requests */}
              {booking.specialRequests && (
                <>
                  <Separator />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">
                      Special Requests
                    </p>
                    <p className="text-sm">{booking.specialRequests}</p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Important Information */}
          <Card className="border-amber-200 bg-amber-50">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="space-y-2 text-sm">
                  <p className="font-medium text-amber-900">
                    Important Information
                  </p>
                  <ul className="space-y-1 text-amber-800 list-disc list-inside">
                    <li>You will be redirected to SSLCommerz payment gateway</li>
                    <li>Payment confirmation will be sent to your email</li>
                    <li>Guide will contact you 24 hours before the tour</li>
                    <li>Free cancellation up to 48 hours before the tour</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Payment Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Price per person
                  </span>
                  <span className="font-medium">
                    {formatCurrency(booking?.availabilityId?.pricePerPerson)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Number of guests
                  </span>
                  <span className="font-medium">× {booking.numGuests}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Amount</span>
                  <span className="text-green-600">
                    {formatCurrency(booking.amountTotal)}
                  </span>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">
                  Currency: {booking.currency}
                </p>
                <p className="text-xs text-muted-foreground">
                  Booking ID: {booking._id}
                </p>
              </div>

              <Button
                onClick={handlePayment}
                disabled={isProcessing || booking.paymentStatus === "SUCCEEDED"}
                className="w-full h-12 text-base font-semibold"
                size="lg"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : booking.paymentStatus === "SUCCEEDED" ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    Already Paid
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5 mr-2" />
                    Pay with SSLCommerz
                  </>
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                Secure payment powered by SSLCommerz
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
