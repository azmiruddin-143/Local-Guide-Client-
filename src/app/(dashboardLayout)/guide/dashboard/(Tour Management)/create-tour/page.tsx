import { Metadata } from "next";
import CreateTourForm from "@/components/modules/Guide/Tour_Management/CreateTourForm";
import { AlertCircle, Compass } from "lucide-react";
import { getUserInfo } from "@/services/auth/getUserInfo";

export const metadata: Metadata = {
  title: "Create Tour - LocalGuide",
  description: "Create a new tour experience for travelers",
};

export default async function CreateTourPage() {
  const user = await getUserInfo()
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-2 md:px-4">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Compass className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Create New Tour</h1>
              <p className="text-gray-600">
                Share your local expertise with travelers
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <CreateTourForm user={user} />

        {!user?.isVerified && (
          <div className="mt-6 flex items-start gap-3 p-4 border border-yellow-300 bg-yellow-50 rounded-lg">
            <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div>
              <p className="text-yellow-800 font-semibold text-sm">
                আপনার গাইড অ্যাকাউন্টটি এখনো ভেরিফাই করা হয়নি।
              </p>
              <p className="text-yellow-700 text-xs mt-1">
                ট্যুর পোস্ট করার আগে দয়া করে আপনার প্রোফাইলের সব তথ্য সম্পূর্ণ করুন।
                প্রোফাইল যাচাই সম্পন্ন হলে আপনি ট্যুর তৈরি করার অনুমতি পাবেন।
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

      </div>
    </div>
  );
}
