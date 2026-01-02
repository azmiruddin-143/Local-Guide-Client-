import { MapPin, Star, Clock, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Tour } from "@/services/tour/tour.service";

interface PopularToursProps {
  tours: Tour[];
}

export default function PopularTours({ tours }: PopularToursProps) {
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) return `${mins}min`;
    if (mins === 0) return `${hours}h`;
    return `${hours}h ${mins}min`;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Top-Rated Local Tours
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore the most sought-after tours with our expert local guides
          </p>
        </div>

        {tours?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tours.map((tour) => (
              <Link
                key={tour._id}
                href={`/tours/${tour.slug}`}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="aspect-[4/5] bg-gray-200 relative">
                  {/* Tour Image */}
                  {tour.mediaUrls && tour.mediaUrls.length > 0 ? (
                    <Image
                      src={tour.mediaUrls[0]}
                      alt={tour.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                      <span className="text-6xl">🗺️</span>
                    </div>
                  )}
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 bg-white/95 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-900">
                      {tour.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white">
                    {/* Location */}
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{tour.city}, {tour.country}</span>
                      {/* Rating & Price */}
                      <div className="flex items-center justify-between">
                        {tour.reviewCount && tour.reviewCount > 0 ? (
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-semibold">
                              {tour.averageRating?.toFixed(1)}
                            </span>
                            <span className="text-sm text-white/80">
                              ({tour.reviewCount})
                            </span>
                          </div>
                        ) : (
                          <span className="text-sm text-white/80">New Tour</span>
                        )}


                      </div>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl font-bold mb-3 line-clamp-2">
                      {tour.title}
                    </h3>
                    
                   


                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No top-rated tours available yet.</p>
          </div>
        )}

        {/* View All Button */}
        {tours.length > 0 && (
          <div className="text-center mt-12">
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold shadow-lg hover:shadow-xl"
            >
              Explore All Tours
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
