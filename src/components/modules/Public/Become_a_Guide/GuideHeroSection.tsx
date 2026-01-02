import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function GuideHeroSection() {
  return (
    <section className="relative bg-gradient-to-br min-h-screen from-primary/10 via-purple-50 to-blue-50 py-6 md:py-10 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm mb-6">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-gray-700">Join 500+ Local Guides</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-2xl sm:text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Share Your City.
            <span className="text-primary block mt-2">Earn as a Local Guide.</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Help travelers explore your city & earn doing what you love. Turn your local knowledge into income with flexible hours.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="#apply"
              className="bg-primary text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary/90 transition shadow-lg hover:shadow-xl flex items-center gap-2 group"
            >
              Start Your Journey
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition" />
            </Link>
            <Link
              href="#how-it-works"
              className="bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition shadow-md border border-gray-200"
            >
              Learn More
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>No upfront fees</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>Flexible schedule</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>Weekly payouts</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
