"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XCircle, ArrowLeft, RefreshCw } from "lucide-react";
import Link from "next/link";

function FailedContent() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const notifyFailure = async () => {
      try {
        const queryObj: Record<string, string> = {};
        searchParams.forEach((value, key) => {
          queryObj[key] = value;
        });

        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment/fail`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(queryObj),
        });
      } catch (error) {
        console.error("Payment failure notification error:", error);
      }
    };

    notifyFailure();
  }, [searchParams]);

  const transactionId = searchParams.get("transactionId");

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex items-center justify-center py-12">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6 text-center space-y-6">
          <div className="w-20 h-20 mx-auto bg-red-100 rounded-full flex items-center justify-center">
            <XCircle className="w-12 h-12 text-red-600" />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-red-900">Payment Failed</h1>
            <p className="text-muted-foreground">
              Your payment could not be processed
            </p>
          </div>

          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-left space-y-2">
            <p className="font-medium text-red-900">Common reasons:</p>
            <ul className="space-y-1 text-red-800 list-disc list-inside">
              <li>Insufficient funds in your account</li>
              <li>Incorrect card details</li>
              <li>Payment gateway timeout</li>
              <li>Bank declined the transaction</li>
            </ul>
          </div>

          <div className="space-y-3 pt-4">
            <Button asChild className="w-full h-12 text-base font-semibold">
              <Link href={`/dashboard/bookings?searchTerm=${transactionId}`}>
                <RefreshCw className="w-5 h-5 mr-2" />
                Try Again
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="w-full h-12 text-base"
              size="lg"
            >
              <Link href="/explore">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Tours
              </Link>
            </Button>

            <Button
              asChild
              variant="ghost"
              className="w-full h-12 text-base"
              size="lg"
            >
              <Link href="/contact">Contact Support</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center p-10">Loading...</div>}>
      <FailedContent />
    </Suspense>
  );
}
