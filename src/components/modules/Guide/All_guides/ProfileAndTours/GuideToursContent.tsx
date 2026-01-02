"use client";

import { UserInfo } from "@/types/user.interface";
import { Tour } from "@/services/tour/tour.service";
import Image from "next/image";
import Link from "next/link";
import { 
  MapPin, 
  Star, 
  Clock,
  Users,
  DollarSign,
  ArrowLeft,
  Languages,
  Calendar
} from "lucide-react";

interface GuideToursContentProps {
  guide: UserInfo;
  tours: Tour[];
}

export default function GuideToursContent({ guide, tours }: GuideToursContentProps) {
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button & Header */}
        <div className="mb-8">
          <Link
            href={`/all-guides/${guide._id}`}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4 font-medium"
          >
            <ArrowLeft size={20} />
            Back to Profile
          </Link>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-4">
              {guide.avatarUrl ? (
                <Image
                  src={guide.avatarUrl}
                  alt={guide.name}
                  width={80}
                  height={80}
                  className="rounded-full object-cover"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">
                    {guide.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-1">
                  Tours by {guide.name}
                </h1>
                {guide.location && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin size={16} />
                    <span>{guide.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tours Grid */}
        {tours.length > 0 ? (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {tours.length} Tour{tours.length !== 1 ? 's' : ''} Available
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tours.map((tour) => (
                <div
                  key={tour._id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                >
                  {/* Tour Image */}
                  <div className="relative h-56 bg-gradient-to-br from-blue-100 to-purple-100 overflow-hidden">
                    {tour.mediaUrls && tour.mediaUrls.length > 0 ? (
                      <Image
                        src={tour.mediaUrls[0]}
                        alt={tour.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Calendar size={64} className="text-gray-300" />
                      </div>
                    )}
                    
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700">
                      {tour.category}
                    </div>

                    {/* Active Badge */}
                    {tour.isActive && (
                      <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Active
                      </div>
                    )}
                  </div>

                  {/* Tour Content */}
                  <div className="p-5 space-y-4">
                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 line-clamp-2 min-h-[3.5rem]">
                      {tour.title}
                    </h3>

                    {/* Location */}
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin size={16} className="text-blue-600 flex-shrink-0" />
                      <span className="text-sm truncate">{tour.city}, {tour.country}</span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {tour.description}
                    </p>

                   

                    {/* Languages */}
                    {tour.languages && tour.languages.length > 0 && (
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <Languages size={16} className="text-gray-400" />
                          <div className="flex flex-wrap gap-1">
                            {tour.languages.slice(0, 3).map((lang) => (
                              <span
                                key={lang}
                                className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded"
                              >
                                {lang}
                              </span>
                            ))}
                            {tour.languages.length > 3 && (
                              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                                +{tour.languages.length - 3}
                              </span>
                            )}
                          </div>
                       </div>
                        <Link
                          href={`/tours/${tour.slug}`}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                        >
                          View Details
                        </Link>
                      </div>
                    )}

                   

                    {/* Rating */}
                    {tour.reviewCount !== undefined && tour.reviewCount > 0 && (
                      <div className="flex items-center gap-2 pt-2">
                        <div className="flex items-center gap-1">
                          <Star size={16} className="text-yellow-500 fill-yellow-500" />
                          <span className="font-semibold text-gray-900 text-sm">
                            {tour.averageRating?.toFixed(1) || '0.0'}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">
                          ({tour.reviewCount} review{tour.reviewCount !== 1 ? 's' : ''})
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <Calendar size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              No Tours Available
            </h3>
            <p className="text-gray-600 mb-6">
              This guide hasn't created any tours yet. Check back later!
            </p>
            <Link
              href={`/all-guides/${guide._id}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <ArrowLeft size={20} />
              Back to Profile
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
