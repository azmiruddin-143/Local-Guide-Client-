"use client";

import { Tour } from "@/services/tour/tour.service";
import { Clock, Users, MapPin, Globe, CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TourInfoProps {
  tour: Tour;
}

export default function TourInfo({ tour }: TourInfoProps) {
  const formatDuration = (mins: number) => {
    if (mins < 60) return `${mins} minutes`;
    const hours = Math.floor(mins / 60);
    const minutes = mins % 60;
    return minutes > 0 ? `${hours}h ${minutes}m` : `${hours} hours`;
  };

  return (
    <div className="space-y-6">
      {/* Quick Info Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <MapPin className="w-8 h-8 text-primary mb-2" />
              <p className="text-sm text-muted-foreground">Meeting Point</p>
              <p className="font-semibold text-xs">{tour.meetingPoint.substring(0, 20)}...</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <Globe className="w-8 h-8 text-primary mb-2" />
              <p className="text-sm text-muted-foreground">Languages</p>
              <p className="font-semibold">{tour.languages.length} available</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Description */}
      <Card>
        <CardHeader>
          <CardTitle>About This Tour</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
            {tour.description}
          </p>
        </CardContent>
      </Card>

      {/* Itinerary */}
      {tour.itinerary && (
        <Card>
          <CardHeader>
            <CardTitle>Itinerary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {tour.itinerary}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Languages */}
      <Card>
        <CardHeader>
          <CardTitle>Available Languages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {tour.languages.map((lang) => (
              <Badge key={lang} variant="secondary" className="px-3 py-1">
                {lang}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* What's Included/Excluded */}
      <div className="grid md:grid-cols-2 gap-6">
        {tour.includedItems && tour.includedItems.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                What's Included
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {tour.includedItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {tour.excludedItems && tour.excludedItems.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <XCircle className="w-5 h-5 text-red-600" />
                What's Not Included
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {tour.excludedItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Meeting Point Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Meeting Point
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{tour.meetingPoint}</p>
          <p className="text-sm text-muted-foreground mt-2">
            {tour.city}, {tour.country}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
