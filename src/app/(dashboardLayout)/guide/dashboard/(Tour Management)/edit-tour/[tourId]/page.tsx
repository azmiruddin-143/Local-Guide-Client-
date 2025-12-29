import { serverFetch } from "@/lib/server-fetch";
import { ITour } from "@/types/tour.interface";
import EditTourForm from "@/components/modules/Guide/Tour_Management/EditTourForm";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: {
    tourId: string;
  };
}

async function getTourById(tourId: string): Promise<ITour | null> {
  try {
    const response = await serverFetch.get(`/tours/${tourId}`);
    const result = await response.json();

    if (!response.ok || !result.success) {
      return null;
    }

    return result.data;
  } catch (error) {
    console.error("Error fetching tour:", error);
    return null;
  }
}

export default async function EditTourPage({ params }: PageProps) {
  const { tourId } = await params;
  const tour = await getTourById(tourId);

  if (!tour) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/guide/dashboard/my-tours"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to My Tours
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Edit Tour</h1>
          <p className="text-gray-600 mt-2">
            Update your tour information and images
          </p>
        </div>

        {/* Edit Form */}
        <EditTourForm tour={tour} />
      </div>
    </div>
  );
}