
import { Metadata } from "next";
import { Suspense } from "react";
import { getMyAvailability } from "@/services/guide/availability.service";
import { AvailabilityContent } from "@/components/modules/Guide/Availability/AvailabilityContent";
import { AvailabilityLoadingSkeleton } from "@/components/modules/Guide/Availability/AvailabilityLoadingSkeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { getUserInfo } from "@/services/auth/getUserInfo";

export const metadata: Metadata = {
  title: "Availability Management - LocalGuide",
  description: "Manage your availability slots for tours",
};

export default async function AvailabilityPage() {
  const result = await getMyAvailability();
  const user = await getUserInfo()

  // Handle error state
  if (!result.success) {
    return (
      <div className="container mx-auto py-6 px-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {result.message || "Failed to load availability data"}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const availabilities = Array.isArray(result.data) ? result.data : [];

  return (
    <Suspense fallback={<AvailabilityLoadingSkeleton />}>
      <AvailabilityContent initialAvailabilities={availabilities} user={user} />
      {!user?.isVerified && (
        <div className="mt-6 flex items-start gap-3 p-4 border border-yellow-300 bg-yellow-50 rounded-lg">
          <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
          <div>
                <p className="text-yellow-800 font-semibold text-sm">
                  আপনার গাইড অ্যাকাউন্টটি এখনো ভেরিফাই করা হয়নি।
                </p>
                <p className="text-yellow-700 text-xs mt-1">
                  ট্যুর পোস্ট করার আগে দয়া করে আপনার প্রোফাইলের সব তথ্য সম্পূর্ণ করুন।
                </p>
                <a
              href="/my-profile"
                  className="text-xs font-medium text-yellow-900 hover:text-yellow-700 block mt-2"
                >
                  প্রোফাইল সম্পূর্ণ করুন → অনুগ্রহ করে অনুমোদনের জন্য অপেক্ষা করুন।
                </a>
          </div>
        </div>
      )}

    </Suspense>
  );
}
