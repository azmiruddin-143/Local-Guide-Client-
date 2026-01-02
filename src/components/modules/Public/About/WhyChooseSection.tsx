"use client";

import { Shield, Star, Clock, Headphones, CheckCircle, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Verified Guides",
    description: "All our guides are carefully vetted and verified to ensure quality and safety.",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    icon: Star,
    title: "Authentic Experiences",
    description: "Discover hidden gems and local favorites that guidebooks don't mention.",
    color: "text-yellow-600",
    bg: "bg-yellow-50",
  },
  {
    icon: Clock,
    title: "Flexible Scheduling",
    description: "Book tours that fit your schedule with easy rescheduling options.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Our customer support team is always ready to help you.",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    icon: CheckCircle,
    title: "Best Price Guarantee",
    description: "Fair pricing with no hidden fees. What you see is what you pay.",
    color: "text-primary",
    bg: "bg-primary/5",
  },
  {
    icon: TrendingUp,
    title: "Growing Community",
    description: "Join thousands of travelers and guides in our vibrant community.",
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
];

export default function WhyChooseSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose LocalGuide?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're committed to providing the best platform for authentic local experiences
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-6 rounded-xl border border-gray-200 hover:border-primary/50 hover:shadow-lg transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-lg ${feature.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
