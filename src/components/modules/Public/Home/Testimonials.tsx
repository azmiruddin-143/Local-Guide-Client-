import { Star, Quote } from "lucide-react";
import { getBestRandomReviews } from "@/services/review/review.service";
import TestimonialCard from "./TestimonialCard";



export default async function Testimonials() {
 
  const response = await getBestRandomReviews();
 
  
 
  // Transform database reviews to match component format
  const testimonials = response.success && response.data?.length > 0
    ? response.data.map((review: any) => ({
        id: review._id,
        name: review.author?.name || "Anonymous Traveler",
        location: review.author?.location || "Verified Tourist",
        rating: review.rating,
        text: review.content || "Amazing experience with our local guide!",
        tour: review.tour?.title || "Local Tour",
        date: new Date(review.createdAt).toLocaleDateString('en-US', { 
          month: 'long', 
          year: 'numeric' 
        }),
      }))
    : [];
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Travelers Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Real experiences from real travelers around the world
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial:any) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
