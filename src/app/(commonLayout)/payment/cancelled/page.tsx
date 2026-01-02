"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowLeft, RefreshCw } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

function CancelledContent() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const notifyCancellation = async () => {
      try {
        const queryObj: Record<string, string> = {};
        searchParams.forEach((value, key) => {
          queryObj[key] = value;
        });

        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment/cancel`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(queryObj),
        });
      } catch (error) {
        console.error("Payment cancellation notification error:", error);
      }
    };

    notifyCancellation();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center py-12">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6 text-center space-y-6">
          <div className="w-20 h-20 mx-auto bg-amber-100 rounded-full flex items-center justify-center">
            <AlertCircle className="w-12 h-12 text-amber-600" />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-amber-900">
              Payment Cancelled
            </h1>
            <p className="text-muted-foreground">
              You cancelled the payment process
            </p>
          </div>

          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm">
            <p className="text-amber-900">
              Your booking is still pending. You can complete the payment anytime
              from your bookings page.
            </p>
          </div>

          <div className="space-y-3 pt-4">
            <Button
              asChild
              className="w-full h-12 text-base font-semibold"
              size="lg"
            >
              <Link href="/tourist/bookings">
                <RefreshCw className="w-5 h-5 mr-2" />
                Complete Payment
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="w-full h-12 text-base"
              size="lg"
            >
              <Link href="/tours">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Tours
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function PaymentCancelledPage() {
  return (
    <Suspense fallback={<div className="text-center p-10">Loading...</div>}>
      <CancelledContent />
    </Suspense>
  );
}
