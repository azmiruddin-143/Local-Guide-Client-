import { Search, UserCheck, Calendar, Star } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Find Your Guide",
    description: "Browse local guides by destination, expertise, and reviews",
  },
  {
    icon: UserCheck,
    title: "Choose & Connect",
    description: "Select the perfect guide and communicate your preferences",
  },
  {
    icon: Calendar,
    title: "Book Your Tour",
    description: "Schedule your experience and make secure payment",
  },
  {
    icon: Star,
    title: "Enjoy & Review",
    description: "Experience authentic local culture and share your story",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Four simple steps to your perfect local experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="absolute top-8 left-1/2 w-full h-0.5 bg-primary/20 -z-10 hidden lg:block last:hidden" />
                <div className="absolute top-2 -right-4 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
