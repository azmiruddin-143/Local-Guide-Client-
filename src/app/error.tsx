"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, RefreshCcw, Mail, Compass, MapPinOff } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <>
      <style jsx>{`
        @keyframes fade-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scale-in {
          from {
            transform: scale(0);
          }
          to {
            transform: scale(1);
          }
        }

        @keyframes pulse-error {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.3);
            opacity: 0.2;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes rotate-compass {
          0% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(10deg);
          }
          75% {
            transform: rotate(-10deg);
          }
          100% {
            transform: rotate(0deg);
          }
        }

        .fade-up {
          animation: fade-up 0.5s ease-out;
        }

        .scale-in {
          animation: scale-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .pulse-error {
          animation: pulse-error 2s ease-in-out infinite;
        }

        .float {
          animation: float 3s ease-in-out infinite;
        }

        .rotate-compass {
          animation: rotate-compass 4s ease-in-out infinite;
        }
      `}</style>
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 p-4 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-orange-400/10 blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-red-400/10 blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 right-1/3 w-36 h-36 rounded-full bg-pink-400/10 blur-3xl animate-pulse delay-500" />
        </div>

        <div className="w-full max-w-2xl fade-up relative z-10">
          <Card className="border-orange-200 shadow-2xl bg-white/95 backdrop-blur">
            <CardContent className="pt-8 pb-8">
              <div className="flex flex-col items-center text-center space-y-6">
                {/* Animated Error Icon */}
                <div className="relative scale-in">
                  <div className="absolute inset-0 rounded-full bg-orange-500/10 pulse-error" />
                  <div className="relative z-10 rounded-full bg-gradient-to-br from-orange-100 to-red-100 p-8 float">
                    <MapPinOff className="h-20 w-20 text-orange-600" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-red-500 rounded-full p-2 shadow-lg rotate-compass">
                    <Compass className="h-6 w-6 text-white" />
                  </div>
                </div>

                {/* Error Message */}
                <div className="space-y-3">
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                    Unexpected Detour
                  </h1>
                  <p className="text-lg text-gray-600 max-w-md">
                    We hit a bump on the road. Our guides are working to get you back on track.
                  </p>
                </div>

                {/* Error Details (Development Only) */}
                {process.env.NODE_ENV === "development" && (
                  <div className="w-full rounded-xl bg-gray-50 border border-gray-200 p-4 text-left">
                    <p className="text-xs font-semibold text-gray-700 mb-2">
                      Development Error Details:
                    </p>
                    <p className="text-sm font-mono text-gray-600 break-all">
                      {error.message}
                    </p>
                    {error.digest && (
                      <p className="text-xs font-mono text-gray-500 mt-2">
                        Error ID: {error.digest}
                      </p>
                    )}
                  </div>
                )}

                {/* Quick Help */}
                <div className="w-full bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    What you can do:
                  </h3>
                  <ul className="text-left space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Try refreshing the page</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Check your internet connection</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Return to the home page and try again</span>
                    </li>
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <Button onClick={reset} size="lg" className="gap-2">
                    <RefreshCcw className="h-4 w-4" />
                    Try Again
                  </Button>
                  <Button variant="outline" size="lg" asChild className="gap-2 bg-white">
                    <Link href="/">
                      <Home className="h-4 w-4" />
                      Back to Home
                    </Link>
                  </Button>
                </div>

                {/* Help Text */}
                <div className="pt-4 border-t border-gray-200 w-full">
                  <p className="text-sm text-gray-600 mb-2">
                    Still having trouble?
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium text-sm"
                  >
                    <Mail className="h-4 w-4" />
                    Contact Support
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}