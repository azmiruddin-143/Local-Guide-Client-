import GuideHeroSection from "./GuideHeroSection";
import WhyBecomeGuide from "./WhyBecomeGuide";
import Requirements from "./Requirements";
import HowItWorks from "./HowItWorks";
import IncomePossibility from "./IncomePossibility";
import GuideTestimonials from "./GuideTestimonials";
import GuideCTA from "./GuideCTA";
import GuideFAQ from "./GuideFAQ";

export default function BecomeGuideContent() {
  return (
    <div className="min-h-screen">
      <GuideHeroSection />
      <WhyBecomeGuide />
      <Requirements />
      <HowItWorks />
      <IncomePossibility />
      <GuideTestimonials />
      <GuideCTA />
      <GuideFAQ />
    </div>
  );
}
