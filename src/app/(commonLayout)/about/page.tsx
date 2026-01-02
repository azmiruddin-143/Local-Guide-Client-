import { Metadata } from "next";
import {
  HeroSection,
  MissionSection,
  StorySection,
  WhyChooseSection,
} from "@/components/modules/Public/About";

export const metadata: Metadata = {
  title: "About Us | LocalGuide - Authentic Local Experiences",
  description:
    "Learn about LocalGuide's mission to connect travelers with passionate local guides for authentic, memorable experiences around the world.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <MissionSection />
      <StorySection />
      <WhyChooseSection />
    </main>
  );
}
