import { Star, Quote } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Sarah Ahmed",
    role: "History Guide in Dhaka",
    image: "/placeholder-guide-1.jpg",
    rating: 5,
    quote: "I paid my tuition fees by guiding tourists! The flexibility allowed me to study and earn at the same time.",
    earnings: "$850/month",
    tours: 45,
  },
  {
    name: "Rakib Hassan",
    role: "Food Tour Guide in Chittagong",
    image: "/placeholder-guide-2.jpg",
    rating: 5,
    quote: "Best decision ever! I share my love for local cuisine and make great money. Met amazing people from 30+ countries.",
    earnings: "$1100/month",
    tours: 67,
  },
  {
    name: "Nadia Islam",
    role: "Photography Guide in Cox's Bazar",
    image: "/placeholder-guide-3.jpg",
    rating: 5,
    quote: "Turned my photography hobby into a business. Now I help travelers capture their best moments while earning.",
    earnings: "$920/month",
    tours: 52,
  },
];

export default function GuideTestimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Real Stories from Real Guides
          </h2>
          <p className="text-lg text-gray-600">
            Hear from guides who transformed their passion into income
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-primary/10">
                <Quote className="h-16 w-16" fill="currentColor" />
              </div>

              {/* Profile */}
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                  <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-gray-400">
                    {testimonial.name.charAt(0)}
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-700 leading-relaxed mb-6 italic">
                &quot;{testimonial.quote}&quot;
              </p>

              {/* Stats */}
              <div className="flex justify-between pt-6 border-t border-gray-200">
                <div>
                  <div className="text-sm text-gray-500">Earnings</div>
                  <div className="font-bold text-primary">{testimonial.earnings}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Tours</div>
                  <div className="font-bold text-gray-900">{testimonial.tours}+</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Video Testimonial CTA */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-6 py-3 rounded-full border border-red-200">
            <span className="text-2xl">🎥</span>
            <span className="font-medium">Watch video testimonials from our top guides</span>
          </div>
        </div>
      </div>
    </section>
  );
}
