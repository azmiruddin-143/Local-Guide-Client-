"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Calendar, Globe, Tag, Image as ImageIcon } from "lucide-react";
import { TourColumn } from "./toursColumns";

interface TourViewDetailDialogProps {
  tour: TourColumn | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TourViewDetailDialog = ({ tour, open, onOpenChange }: TourViewDetailDialogProps) => {
  if (!tour) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Tour Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Tour Images */}
          {tour.mediaUrls && tour.mediaUrls.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                <ImageIcon className="h-4 w-4" />
                Tour Images
              </div>
              <div className="grid grid-cols-3 gap-2">
                {tour.mediaUrls.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`${tour.title} - ${index + 1}`}
                    className="h-32 w-full rounded-lg object-cover"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Tour Info */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">{tour.title}</h3>
              <p className="text-sm text-muted-foreground">Slug: {tour.slug}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="text-sm font-medium">
                    {tour.city}, {tour.country}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Category</p>
                  <Badge variant="outline" className="capitalize">
                    {tour.category.toLowerCase()}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Languages</p>
                  <div className="flex flex-wrap gap-1">
                    {tour.languages?.map((lang, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Created</p>
                  <p className="text-sm font-medium">
                    {new Date(tour.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Status</p>
              <Badge variant={tour.isActive ? "default" : "secondary"}>
                {tour.isActive ? "Active" : "Inactive"}
              </Badge>
            </div>
          </div>

          {/* Guide Info */}
          <div className="space-y-2 rounded-lg border p-4">
            <h4 className="font-medium">Guide Information</h4>
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={tour.guideId?.avatarUrl} alt={tour.guideId?.name} />
                <AvatarFallback>
                  {tour.guideId?.name?.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{tour.guideId?.name}</p>
                <p className="text-sm text-muted-foreground">{tour.guideId?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TourViewDetailDialog;
