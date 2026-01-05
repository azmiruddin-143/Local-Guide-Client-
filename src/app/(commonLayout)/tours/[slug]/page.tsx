import { getTourBySlug } from "@/services/tour/tour.service";
import { getGuideAvailability } from "@/services/public/availability.service";
import { notFound } from "next/navigation";

import { getUserInfo } from "@/services/auth/getUserInfo";
import TourDetailsContent from "@/components/modules/Public/TourDetails/TourDetailsContent";


interface TourDetailsPageProps {
  params: {
    slug: string;
  };
}

export default async function TourDetailsPage({ params }: TourDetailsPageProps) {
  const { slug } = await params;

  // Fetch tour first
  const tourResponse = await getTourBySlug(slug);
  const user = await getUserInfo()
  if (!tourResponse.success || !tourResponse.data) {
    notFound();
  }

  const tour = tourResponse.data;

  // Fetch availability if guide ID exists
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let availability: any[] = [];
  if (tour.guideId?._id) {
    const availabilityResponse = await getGuideAvailability(tour.guideId._id);
    availability = availabilityResponse.success ? availabilityResponse.data : [];
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <TourDetailsContent tour={tour} availability={availability} user={user} />
    </div>
  );
}
