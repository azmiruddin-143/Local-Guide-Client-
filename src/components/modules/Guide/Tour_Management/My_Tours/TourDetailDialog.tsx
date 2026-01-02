"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { ITour, TourCategory } from "@/types/tour.interface";
import { formatDateTime } from "@/lib/formatters";
import {
  Globe,
  MapPin,
  Image as ImageIcon,
  CheckCircle2,
  XCircle,
  Calendar,
  Star,
  MessageSquare,
  Clock,
  Map,
  FileText,
} from "lucide-react";

interface TourDetailDialogProps {
  tour: ITour;
  open: boolean;
  onClose: () => void;
}

const categoryConfig: Record<
  TourCategory,
  { color: string; icon: string; label: string }
> = {
  [TourCategory.FOOD]: {
    color: "bg-orange-100 text-orange-800 border-orange-200",
    icon: "🍔",
    label: "Food & Culinary",
  },
  [TourCategory.HISTORY]: {
    color: "bg-amber-100 text-amber-800 border-amber-200",
    icon: "🏛️",
    label: "History & Heritage",
  },
  [TourCategory.ADVENTURE]: {
    color: "bg-red-100 text-red-800 border-red-200",
    icon: "⛰️",
    label: "Adventure",
  },
  [TourCategory.ART]: {
    color: "bg-purple-100 text-purple-800 border-purple-200",
    icon: "🎨",
    label: "Art & Culture",
  },
  [TourCategory.NIGHTLIFE]: {
    color: "bg-indigo-100 text-indigo-800 border-indigo-200",
    icon: "🌃",
    label: "Nightlife",
  },
  [TourCategory.SHOPPING]: {
    color: "bg-pink-100 text-pink-800 border-pink-200",
    icon: "🛍️",
    label: "Shopping",
  },
  [TourCategory.PHOTOGRAPHY]: {
    color: "bg-cyan-100 text-cyan-800 border-cyan-200",
    icon: "📷",
    label: "Photography",
  },
  [TourCategory.NATURE]: {
    color: "bg-green-100 text-green-800 border-green-200",
    icon: "🌿",
    label: "Nature & Wildlife",
  },
  [TourCategory.CULTURE]: {
    color: "bg-blue-100 text-blue-800 border-blue-200",
    icon: "🎭",
    label: "Cultural",
  },
  [TourCategory.OTHER]: {
    color: "bg-gray-100 text-gray-800 border-gray-200",
    icon: "⭐",
    label: "Other",
  },
};

export default function TourDetailDialog({
  tour,
  open,
  onClose,
}: TourDetailDialogProps) {
  const categoryInfo = categoryConfig[tour.category];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        {/* Header with Cover Image */}
        <div className="relative h-48 bg-gradient-to-br from-primary/20 to-primary/5">
          {tour.mediaUrls && tour.mediaUrls.length > 0 ? (
            <img
              src={tour.mediaUrls[0]}
              alt={tour.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <ImageIcon className="h-16 w-16 text-gray-300" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          {/* Status Badge */}
          <div className="absolute top-4 right-4">
            <Badge
              variant={tour.isActive ? "default" : "secondary"}
              className={
                tour.isActive
                  ? "bg-green-500 text-white hover:bg-green-600 shadow-lg"
                  : "bg-gray-500 text-white hover:bg-gray-600 shadow-lg"
              }
            >
              {tour.isActive ? "● Active" : "● Inactive"}
            </Badge>
          </div>

          {/* Title Overlay */}
          <DialogHeader className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <DialogTitle className="text-3xl font-bold drop-shadow-lg">
              {tour.title}
            </DialogTitle>
          </DialogHeader>
        </div>

        <div className="p-6 space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <Star className="h-5 w-5 text-yellow-500 mx-auto mb-1" />
              <p className="text-2xl font-bold">
                {tour.averageRating?.toFixed(1) || "N/A"}
              </p>
              <p className="text-xs text-muted-foreground">Rating</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <MessageSquare className="h-5 w-5 text-blue-500 mx-auto mb-1" />
              <p className="text-2xl font-bold">{tour.reviewCount || 0}</p>
              <p className="text-xs text-muted-foreground">Reviews</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <Globe className="h-5 w-5 text-green-500 mx-auto mb-1" />
              <p className="text-2xl font-bold">{tour.languages.length}</p>
              <p className="text-xs text-muted-foreground">Languages</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <ImageIcon className="h-5 w-5 text-purple-500 mx-auto mb-1" />
              <p className="text-2xl font-bold">{tour.mediaUrls?.length || 0}</p>
              <p className="text-xs text-muted-foreground">Photos</p>
            </div>
          </div>

          {/* Category and Location */}
          <div className="flex flex-wrap items-center gap-3">
            <Badge
              className={`${categoryInfo.color} border px-3 py-1.5 text-sm font-medium`}
              variant="outline"
            >
              <span className="mr-1.5">{categoryInfo.icon}</span>
              {categoryInfo.label}
            </Badge>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span className="text-sm font-medium">
                {tour.city}, {tour.country}
              </span>
            </div>
          </div>

          <Separator />

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              About This Tour
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {tour.description}
            </p>
          </div>

          {/* Itinerary */}
          {tour.itinerary && (
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Itinerary
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {tour.itinerary}
                </p>
              </div>
            </div>
          )}

          {/* Meeting Point */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Map className="h-5 w-5 text-primary" />
              Meeting Point
            </h3>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
              <MapPin className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-blue-900 font-medium">
                {tour.meetingPoint}
              </p>
            </div>
          </div>

          {/* Languages */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              Languages Offered
            </h3>
            <div className="flex flex-wrap gap-2">
              {tour.languages.map((lang) => (
                <Badge
                  key={lang}
                  variant="secondary"
                  className="px-3 py-1.5 text-sm bg-blue-50 text-blue-700 border border-blue-200"
                >
                  {lang}
                </Badge>
              ))}
            </div>
          </div>

          {/* Included & Excluded Items */}
          {((tour.includedItems && tour.includedItems.length > 0) ||
            (tour.excludedItems && tour.excludedItems.length > 0)) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Included Items */}
                {tour.includedItems && tour.includedItems.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      What&apos;s Included
                    </h3>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <ul className="space-y-2">
                        {tour.includedItems.map((item, index) => (
                          <li
                            key={index}
                            className="text-sm text-green-900 flex items-start gap-2"
                          >
                            <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Excluded Items */}
                {tour.excludedItems && tour.excludedItems.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <XCircle className="h-5 w-5 text-red-600" />
                      What&apos;s Not Included
                    </h3>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <ul className="space-y-2">
                        {tour.excludedItems.map((item, index) => (
                          <li
                            key={index}
                            className="text-sm text-red-900 flex items-start gap-2"
                          >
                            <XCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )}

          {/* Media Gallery */}
          {tour.mediaUrls && tour.mediaUrls.length > 1 && (
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-primary" />
                Photo Gallery ({tour.mediaUrls.length})
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {tour.mediaUrls.map((url, index) => (
                  <div
                    key={index}
                    className="aspect-video bg-gray-100 rounded-lg overflow-hidden group cursor-pointer hover:ring-2 hover:ring-primary transition-all"
                  >
                    <img
                      src={url}
                      alt={`${tour.title} - Photo ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <Separator />

          {/* Metadata Footer */}
          <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-muted-foreground">Created</p>
                <p className="font-medium">{formatDateTime(tour.createdAt)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-muted-foreground">Last Updated</p>
                <p className="font-medium">{formatDateTime(tour.updatedAt)}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}