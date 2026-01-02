"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

function SuccessContent() {
  const searchParams = useSearchParams();
  const [isVerifying, setIsVerifying] = useState(true);
  const [bookingId, setBookingId] = useState<string | null>(null);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        // Get bookingId from query params (passed from backend redirect)
        const bookingIdParam = searchParams.get("bookingId");
        
        if (bookingIdParam) {
          setBookingId(bookingIdParam);
        }
      } catch (error) {
        console.error("Payment verification error:", error);
      } finally {
        setIsVerifying(false);
      }
    };

    verifyPayment();
  }, [searchParams]);

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6 text-center space-y-4">
            <Loader2 className="w-16 h-16 mx-auto text-blue-600 animate-spin" />
            <h2 className="text-2xl font-bold">Verifying Payment...</h2>
            <p className="text-muted-foreground">
              Please wait while we confirm your payment
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center py-12">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6 text-center space-y-6">
          <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-green-900">
              Payment Successful!
            </h1>
            <p className="text-muted-foreground">
              Your booking has been confirmed
            </p>
          </div>

          <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-sm text-left space-y-2">
            <p className="font-medium text-green-900">What's next?</p>
            <ul className="space-y-1 text-green-800 list-disc list-inside">
              <li>Confirmation email sent to your inbox</li>
              <li>Guide will contact you 24 hours before</li>
              <li>View booking details in your dashboard</li>
            </ul>
          </div>

          <div className="space-y-3 pt-4">
            {bookingId && (
              <Button
                asChild
                className="w-full h-12 text-base font-semibold"
                size="lg"
              >
                <Link href={`/dashboard/bookings/${bookingId}`}>
                  View Booking Details
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            )}

            <Button
              asChild
              variant="outline"
              className="w-full h-12 text-base"
              size="lg"
            >
              <Link href="/dashboard/bookings">Go to My Bookings</Link>
            </Button>

            <Button
              asChild
              variant="ghost"
              className="w-full h-12 text-base"
              size="lg"
            >
              <Link href="/explore">Explore More Tours</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6 text-center space-y-4">
            <Loader2 className="w-16 h-16 mx-auto text-blue-600 animate-spin" />
            <h2 className="text-2xl font-bold">Loading...</h2>
          </CardContent>
        </Card>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
