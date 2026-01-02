"use client";

import { Star, Quote } from "lucide-react";
import { useState } from "react";

interface TestimonialCardProps {
  testimonial: {
    id: string | number;
    name: string;
    location: string;
    rating: number;
    text: string;
    tour: string;
    date: string;
  };
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 100;
  const shouldTruncate = testimonial.text.length > maxLength;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 relative">
      <Quote className="absolute top-6 right-6 h-12 w-12 text-primary/20" />
      
      <div className="flex items-center gap-1 mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star
            key={i}
            className="h-5 w-5 fill-yellow-400 text-yellow-400"
          />
        ))}
      </div>

      <div className="text-gray-700 mb-6 leading-relaxed">
        <p className="inline">
          "{isExpanded || !shouldTruncate 
            ? testimonial.text 
            : `${testimonial.text.slice(0, maxLength)}...`}"
        </p>
        {shouldTruncate && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="ml-2 text-primary hover:text-primary/80 font-medium text-sm transition-colors"
          >
            {isExpanded ? "see less" : "see more"}
          </button>
        )}
      </div>

      <div className="pt-6 border-t border-gray-200">
        <div className="font-semibold text-gray-900 mb-1">
          {testimonial.name}
        </div>
        <div className="text-sm text-gray-600 mb-2">
          {testimonial.location}
        </div>
        <div className="text-xs text-gray-500">
          {testimonial.tour} • {testimonial.date}
        </div>
      </div>
    </div>
  );
}
