import HowItWorks from "./HowItWorks";
import FeaturedGuides from "./FeaturedGuides";
import TourCategories from "./TourCategories";
import Testimonials from "./Testimonials";
import WhyChooseUs from "./WhyChooseUs";
import BecomeGuide from "./BecomeGuide";
import Newsletter from "./Newsletter";
import ExploreHero from "../Explore/ExploreHero";
import PopularTours from "./PopularTours";
import { Tour } from "@/services/tour/tour.service";
import { UserInfo } from "@/types/user.interface";

interface HomePageProps {
  topRatedTours: Tour[];
  topRatedGuides: UserInfo[];
}

export default function HomePage({ topRatedTours, topRatedGuides }: HomePageProps) {
  return (
    <div className="min-h-screen">
      <ExploreHero />
      <PopularTours tours={topRatedTours} />
      <HowItWorks />
      <FeaturedGuides guides={topRatedGuides} />
      <TourCategories />
      <Testimonials />
      <WhyChooseUs />
      <BecomeGuide />
      <Newsletter />
    </div>
  );
}
