import { Shield, Users, Globe, Heart, Award, Clock } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Verified Guides",
    description: "All guides are thoroughly vetted and verified for your safety",
  },
  {
    icon: Users,
    title: "Local Experts",
    description: "Connect with passionate locals who know their cities inside out",
  },
  {
    icon: Globe,
    title: "50+ Destinations",
    description: "Explore authentic experiences in cities around the world",
  },
  {
    icon: Heart,
    title: "Personalized Tours",
    description: "Customized experiences tailored to your interests and pace",
  },
  {
    icon: Award,
    title: "Best Price Guarantee",
    description: "Competitive rates with no hidden fees or booking charges",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock customer service for peace of mind",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose LocalGuide
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We connect you with authentic local experiences you won't find anywhere else
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 hover:shadow-lg transition"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 mb-4">
                <feature.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
