"use client";

import { Tour } from "@/services/tour/tour.service";
import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface TourHeroProps {
  tour: Tour;
}

export default function TourHero({ tour }: TourHeroProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showGallery, setShowGallery] = useState(false);

  const images = tour.mediaUrls || [];
  const hasMultipleImages = images.length > 1;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      FOOD: "bg-orange-100 text-orange-700",
      HISTORY: "bg-amber-100 text-amber-700",
      ADVENTURE: "bg-green-100 text-green-700",
      ART: "bg-purple-100 text-purple-700",
      NIGHTLIFE: "bg-pink-100 text-pink-700",
      SHOPPING: "bg-blue-100 text-blue-700",
      PHOTOGRAPHY: "bg-indigo-100 text-indigo-700",
      NATURE: "bg-emerald-100 text-emerald-700",
      CULTURE: "bg-rose-100 text-rose-700",
      OTHER: "bg-gray-100 text-gray-700",
    };
    return colors[category] || colors.OTHER;
  };

  if (images.length === 0) {
    return (
      <div className="w-full h-96 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center">
        <p className="text-gray-500 text-lg">No images available</p>
      </div>
    );
  }

  return (
    <>
      <div className="relative w-full h-96 md:h-[500px] rounded-2xl overflow-hidden group">
        {/* Main Image */}
        <Image
          src={images[currentImageIndex]}
          alt={`${tour.title} - Image ${currentImageIndex + 1}`}
          fill
          className="object-cover"
          priority
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Category Badge */}
        <div className="absolute top-4 left-4 z-10">
          <Badge className={`${getCategoryColor(tour.category)} text-sm px-3 py-1`}>
            {tour.category}
          </Badge>
        </div>

        {/* Image Counter */}
        {hasMultipleImages && (
          <div className="absolute top-4 right-4 z-10 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
            {currentImageIndex + 1} / {images.length}
          </div>
        )}

        {/* Navigation Arrows */}
        {hasMultipleImages && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 text-gray-800" />
            </button>
          </>
        )}

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {tour.title}
          </h1>
          <p className="text-white/90 text-lg">
            {tour.city}, {tour.country}
          </p>
        </div>

        {/* View All Photos Button */}
        {hasMultipleImages && (
          <button
            onClick={() => setShowGallery(true)}
            className="absolute bottom-6 right-6 z-10 bg-white hover:bg-gray-100 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            View all photos
          </button>
        )}

        {/* Image Dots */}
        {hasMultipleImages && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentImageIndex
                    ? "bg-white w-8"
                    : "bg-white/50 hover:bg-white/75"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Full Gallery Modal */}
      {showGallery && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <button
            onClick={() => setShowGallery(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 p-2"
          >
            <X className="w-8 h-8" />
          </button>
          
          <div className="relative w-full max-w-6xl h-full flex items-center justify-center">
            <Image
              src={images[currentImageIndex]}
              alt={`${tour.title} - Image ${currentImageIndex + 1}`}
              fill
              className="object-contain"
            />
            
            {hasMultipleImages && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
