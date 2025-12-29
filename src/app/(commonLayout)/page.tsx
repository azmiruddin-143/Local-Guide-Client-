import HomePage from "@/components/modules/Public/Home";
import { Metadata } from "next";
import { getTopRatedTours } from "@/services/tour/tour.service";
import { getTopRatedGuides } from "@/services/auth/allGuides";

export const metadata: Metadata = {
  title: "LocalGuide - Discover Authentic Local Experiences",
  description:
    "Connect with passionate local guides and explore hidden gems in destinations around the world. Book unique tours and authentic experiences.",
};

// ISR: Revalidate every 1 hour (3600 seconds)
export const revalidate = 3600;

export default async function Home() {
  // Fetch top-rated tours and guides in parallel
  const [toursResult, guidesResult] = await Promise.all([
    getTopRatedTours(4),
    getTopRatedGuides(4),
  ]);

  const topRatedTours = toursResult.data || [];
  const topRatedGuides = guidesResult.data || [];

  return <HomePage topRatedTours={topRatedTours} topRatedGuides={topRatedGuides} />;
}