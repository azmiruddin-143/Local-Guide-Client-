"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, MapPin, Globe, Award, CheckCircle } from "lucide-react";

interface GuideInfoProps {
  guide: {
    _id: string;
    name: string;
    avatarUrl?: string;
    bio?: string;
    languages?: string[];
    expertise?: string[];
    rating?: number;
    isVerified?: boolean;
    location?: string;
  };
}

export default function GuideInfo({ guide }: GuideInfoProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Guide</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <Avatar className="w-20 h-20">
            <AvatarImage src={guide.avatarUrl} alt={guide.name} />
            <AvatarFallback className="text-lg">{getInitials(guide.name)}</AvatarFallback>
          </Avatar>

          {/* Guide Details */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-xl font-semibold">{guide.name}</h3>
              {guide.isVerified && (
                <CheckCircle className="w-5 h-5 text-blue-600" />
              )}
            </div>

            {/* Rating */}
            {guide.rating && (
              <div className="flex items-center gap-1 mb-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{guide.rating.toFixed(1)}</span>
                <span className="text-sm text-muted-foreground">rating</span>
              </div>
            )}

            {/* Location */}
            {guide.location && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                <MapPin className="w-4 h-4" />
                <span>{guide.location}</span>
              </div>
            )}

            {/* Bio */}
            {guide.bio && (
              <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
                {guide.bio}
              </p>
            )}

            {/* Languages */}
            {guide.languages && guide.languages.length > 0 && (
              <div className="mb-3">
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Speaks:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {guide.languages.map((lang) => (
                    <Badge key={lang} variant="outline" className="text-xs">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Expertise */}
            {guide.expertise && guide.expertise.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Expertise:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {guide.expertise.map((exp) => (
                    <Badge key={exp} variant="secondary" className="text-xs">
                      {exp}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
