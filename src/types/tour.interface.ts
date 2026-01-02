export enum TourCategory {
  FOOD = "FOOD",
  HISTORY = "HISTORY",
  ADVENTURE = "ADVENTURE",
  ART = "ART",
  NIGHTLIFE = "NIGHTLIFE",
  SHOPPING = "SHOPPING",
  PHOTOGRAPHY = "PHOTOGRAPHY",
  NATURE = "NATURE",
  CULTURE = "CULTURE",
  OTHER = "OTHER",
}

export interface ITour {
  _id: string;
  guideId: string;
  title: string;
  description: string;
  itinerary?: string | null;
  price: number; // Base price per person
  city: string;
  country: string;
  meetingPoint: string;
  category: TourCategory;
  languages: string[];
  mediaUrls: string[];
  averageRating: number;
  reviewCount: number;
  includedItems?: string[];
  excludedItems?: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TourFilters {
  searchTerm?: string;
  category?: TourCategory;
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  languages?: string[];
  isActive?: boolean;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
}
