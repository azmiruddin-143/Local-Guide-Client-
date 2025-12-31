"use client";

import { Button } from "@/components/ui/button";
import { Compass, MapPin, ArrowLeft, Home, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const dynamic = 'force-dynamic';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-blue-400/10 blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/3 w-36 h-36 rounded-full bg-indigo-400/10 blur-3xl animate-pulse delay-500" />
      </div>

      <div className="container flex flex-col items-center justify-center gap-8 px-4 text-center relative z-10">
        

        {/* 404 Message */}
        <div className="space-y-4">
          <h1 className="text-7xl md:text-9xl font-bold text-primary">404</h1>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Lost Your Way?
          </h2>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            Looks like you've wandered off the beaten path. This destination doesn't exist on our map.
          </p>
        </div>

        {/* Suggested Actions */}
        <div className="bg-white rounded-2xl p-6 shadow-xl max-w-md w-full">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Let's get you back on track
          </h3>
          <div className="space-y-3">
            <Link
              href="/explore"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition text-left"
            >
              <div className="bg-primary/10 rounded-lg p-2">
                <Search className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="font-medium text-gray-900">Browse Tours</div>
                <div className="text-sm text-gray-600">Discover amazing experiences</div>
              </div>
            </Link>
            <Link
              href="/guides"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition text-left"
            >
              <div className="bg-blue-100 rounded-lg p-2">
                <Compass className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900">Find Guides</div>
                <div className="text-sm text-gray-600">Connect with local experts</div>
              </div>
            </Link>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            size="lg"
            onClick={() => router.back()}
            variant="outline"
            className="gap-2 bg-white hover:bg-gray-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
          <Button size="lg" asChild className="gap-2">
            <Link href="/">
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        .delay-500 {
          animation-delay: 500ms;
        }
        .delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>
    </div>
  );
}