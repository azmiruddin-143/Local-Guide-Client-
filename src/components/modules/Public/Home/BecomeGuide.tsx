import { ArrowRight, DollarSign, Calendar, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function BecomeGuide() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary to-blue-600 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Share Your City, Earn Money
          </h2>
          <p className="text-xl text-blue-100 mb-12">
            Turn your local knowledge into income. Join our community of passionate guides and create unforgettable experiences for travelers.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <DollarSign className="h-10 w-10 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Earn More</h3>
              <p className="text-blue-100">
                Set your own rates and keep 85% of your earnings
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <Calendar className="h-10 w-10 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Flexible Schedule</h3>
              <p className="text-blue-100">
                Work when you want and create your own tours
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <TrendingUp className="h-10 w-10 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Grow Your Business</h3>
              <p className="text-blue-100">
                Access tools and support to build your reputation
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/become-a-guide"
              className="inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition text-lg"
            >
              Become a Guide
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/become-a-guide#how-it-works"
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition text-lg"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
