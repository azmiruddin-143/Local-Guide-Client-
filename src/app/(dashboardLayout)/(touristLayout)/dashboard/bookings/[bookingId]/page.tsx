import { Suspense } from "react";
import { notFound } from "next/navigation";
import { BookingDetailsContent } from "@/components/modules/Tourist/BookingDetails/BookingDetailsContent";
import { getBookingById } from "@/services/tourist/booking.service";
import { Skeleton } from "@/components/ui/skeleton";

interface BookingDetailsPageProps {
  params: Promise<{
    bookingId: string;
  }>;
}

export default async function BookingDetailsPage({ params }: BookingDetailsPageProps) {
  const { bookingId } = await params;

  const result = await getBookingById(bookingId);
  
  if (!result.success || !result.data) {
    notFound();
  }

  return (
    <div className="container mx-auto py-6 px-4 max-w-7xl">
      <Suspense fallback={<BookingDetailsSkeleton />}>
        <BookingDetailsContent booking={result.data} />
      </Suspense>
    </div>
  );
}

function BookingDetailsSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-64" />
      <div className="grid gap-6 md:grid-cols-2">
        <Skeleton className="h-96" />
        <Skeleton className="h-96" />
      </div>
    </div>
  );
}
