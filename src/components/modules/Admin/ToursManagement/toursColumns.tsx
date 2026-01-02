"use client";

import { Column } from "@/components/shared/ManagementTable";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export type TourColumn = {
  _id: string;
  title: string;
  slug: string;
  city: string;
  country: string;
  category: string;
  languages: string[];
  isActive: boolean;
  guideId: {
    _id: string;
    name: string;
    email: string;
    avatarUrl?: string;
  };
  mediaUrls: string[];
  createdAt: string;
};

export const toursColumns: Column<TourColumn>[] = [
  {
    header: "Tour Info",
    accessor: (tour) => (
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12 rounded-md">
          <AvatarImage
            src={tour.mediaUrls?.[0] || "/placeholder-tour.jpg"}
            alt={tour.title}
            className="object-cover"
          />
          <AvatarFallback className="rounded-md">
            {tour.title.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium">{tour.title}</span>
          <span className="text-xs text-muted-foreground">
            {tour.city}, {tour.country}
          </span>
        </div>
      </div>
    ),
    sortKey: "title",
  },
  {
    header: "Guide",
    accessor: (tour) => {
      const guide = tour.guideId;
      return (
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={guide?.avatarUrl} alt={guide?.name} />
            <AvatarFallback>
              {guide?.name?.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{guide?.name}</span>
            <span className="text-xs text-muted-foreground">{guide?.email}</span>
          </div>
        </div>
      );
    },
  },
  {
    header: "Category",
    accessor: (tour) => (
      <Badge variant="outline" className="capitalize">
        {tour.category.toLowerCase()}
      </Badge>
    ),
  },
  {
    header: "Languages",
    accessor: (tour) => (
      <div className="flex flex-wrap gap-1">
        {tour.languages?.slice(0, 2).map((lang, index) => (
          <Badge key={index} variant="secondary" className="text-xs">
            {lang}
          </Badge>
        ))}
        {tour.languages?.length > 2 && (
          <Badge variant="secondary" className="text-xs">
            +{tour.languages.length - 2}
          </Badge>
        )}
      </div>
    ),
  },
  {
    header: "Status",
    accessor: (tour) => (
      <Badge variant={tour.isActive ? "default" : "secondary"}>
        {tour.isActive ? "Active" : "Inactive"}
      </Badge>
    ),
    sortKey: "isActive",
  },
  {
    header: "Created",
    accessor: (tour) => {
      const date = new Date(tour.createdAt);
      return (
        <span className="text-sm text-muted-foreground">
          {date.toLocaleDateString()}
        </span>
      );
    },
    sortKey: "createdAt",
  },
];
