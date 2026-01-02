import { serverFetch } from "@/lib/server-fetch";

export interface Tour {
  _id: string;
  guideId: {
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
  title: string;
  slug: string;
  description: string;
  itinerary?: string | null;
  price: number;
  durationMins: number; // duration in minutes
  city: string;
  country: string;
  meetingPoint: string;
  maxGroupSize: number;
  category: string;
  languages: string[];
  includedItems?: string[];
  excludedItems?: string[];
  reviewCount?: number;
  averageRating?: number;
  isActive: boolean;
  media?: Array<{
    _id: string;
    url: string;
    type: string;
  }>;
  mediaUrls?: string[]; // Array of media URLs
  createdAt: string;
  updatedAt: string;
}

export interface ToursResponse {
  success: boolean;
  message: string;
  data: Tour[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}

export async function getAllTours(searchParams: Record<string, string>): Promise<ToursResponse> {
  try {
    const queryString = new URLSearchParams(searchParams).toString();
    const url = queryString ? `/tours?${queryString}` : '/tours';
    const response = await serverFetch.get(url);

    if (!response.ok) {
      throw new Error("Failed to fetch tours");
    }

    return await response.json();
  } catch (error: any) {
    console.error("Error fetching tours:", error);
    return {
      success: false,
      message: error.message || "Failed to fetch tours",
      data: [],
      meta: {
        page: 1,
        limit: 12,
        total: 0,
        totalPage: 0,
      },
    };
  }
}

export async function getTourById(id: string): Promise<{ success: boolean; data: Tour | null; message: string }> {
  try {
    const response = await serverFetch.get(`/tours/${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch tour");
    }

    return await response.json();
  } catch (error: any) {
    console.error("Error fetching tour:", error);
    return {
      success: false,
      data: null,
      message: error.message || "Failed to fetch tour",
    };
  }
}

export async function getTourBySlug(slug: string): Promise<{ success: boolean; data: Tour | null; message: string }> {
  try {
    const response = await serverFetch.get(`/tours/slug/${slug}`);

    if (!response.ok) {
      throw new Error("Failed to fetch tour");
    }

    return await response.json();
  } catch (error: any) {
    console.error("Error fetching tour:", error);
    return {
      success: false,
      data: null,
      message: error.message || "Failed to fetch tour",
    };
  }
}

export async function getTopRatedTours(limit: number = 4): Promise<{ success: boolean; data: Tour[]; message: string }> {
  try {
    const response = await serverFetch.get(`/tours/top-rated?limit=${limit}`);

    if (!response.ok) {
      throw new Error("Failed to fetch top rated tours");
    }

    return await response.json();
  } catch (error: any) {
    console.error("Error fetching top rated tours:", error);
    return {
      success: false,
      data: [],
      message: error.message || "Failed to fetch top rated tours",
    };
  }
}
