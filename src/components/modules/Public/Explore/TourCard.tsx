import { MapPin, Globe, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";

interface TourCardProps {
  tour: {
    _id: string;
    slug: string;
    title: string;
    description: string;
    price: number;
    city: string;
    country: string;
    category: string;
    languages: string[];
    reviewCount?: number;
    averageRating?: number;
    guideId?: {
      name: string;
      avatarUrl?: string;
    };
    mediaUrls?: string[];
  };
}

export default function TourCard({ tour }: TourCardProps) {
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      FOOD: "bg-orange-100 text-orange-700",
      HISTORY: "bg-amber-100 text-amber-700",
      ADVENTURE: "bg-green-100 text-green-700",
      ART: "bg-purple-100 text-purple-700",
      NIGHTLIFE: "bg-indigo-100 text-indigo-700",
      SHOPPING: "bg-pink-100 text-pink-700",
      PHOTOGRAPHY: "bg-blue-100 text-blue-700",
      NATURE: "bg-emerald-100 text-emerald-700",
      CULTURE: "bg-rose-100 text-rose-700",
      OTHER: "bg-gray-100 text-gray-700",
    };
    return colors[category] || colors.OTHER;
  };

  const thumbnailUrl = tour.mediaUrls?.[0]|| "/placeholder-tour.jpg";

  return (
    <div className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={thumbnailUrl}
          alt={tour.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <Badge className={`absolute top-3 left-3 ${getCategoryColor(tour.category)}`}>
          {tour.category}
        </Badge>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {tour.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {tour.description}
        </p>

        {/* Meta Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4 text-primary" />
            <span>{tour.city}, {tour.country}</span>
          </div>
          {tour.languages && tour.languages.length > 0 && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Globe className="h-4 w-4 text-primary" />
              <span>{tour.languages.slice(0, 3).join(", ")}</span>
            </div>
          )}
        </div>

        {/* Rating */}
        {tour.reviewCount !== undefined && tour.reviewCount > 0 && (
          <div className="flex items-center gap-2 mb-4 pb-4 border-b">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              <span className="font-semibold text-gray-900 text-sm">
                {tour.averageRating?.toFixed(1) || '0.0'}
              </span>
            </div>
            <span className="text-sm text-gray-500">
              ({tour.reviewCount} review{tour.reviewCount !== 1 ? 's' : ''})
            </span>
          </div>
        )}

        {/* Guide Info */}
        {tour.guideId && (
          <div className="flex items-center gap-2 mb-4">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              {tour.guideId.avatarUrl ? (
                <Image
                  src={tour.guideId.avatarUrl}
                  alt={tour.guideId.name}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              ) : (
                <span className="text-sm font-semibold text-primary">
                  {tour.guideId.name.charAt(0)}
                </span>
              )}
            </div>
            <div className="flex items-center justify-between w-full">
              <div>
                <p className="text-sm font-medium text-gray-900">{tour.guideId.name}</p>
                <p className="text-xs text-gray-500">Local Guide</p>
              </div>
              <Link href={`/tours/${tour?.slug}`}>
                <Button size="sm" className="font-semibold">
                  View Details
                </Button>
              </Link>

            </div>
          </div>
        )}   
      </div>
    </div>
  );
}
