/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import { UserInfo } from "@/types/user.interface";

export interface GuidesResponse {
  success: boolean;
  message: string;
  data: UserInfo[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}

export async function getAllGuides(searchParams: Record<string, string>): Promise<GuidesResponse> {
  try {
    const queryString = new URLSearchParams(searchParams).toString();
    const url = queryString ? `/user/all-guides?${queryString}` : '/user/all-guides';
    const response = await serverFetch.get(url);

    if (!response.ok) {
      throw new Error("Failed to fetch guides");
    }

    return await response.json();
  } catch (error: any) {
    console.error("Error fetching guides:", error);
    return {
      success: false,
      message: error.message || "Failed to fetch guides",
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

export interface GuideFilterOptions {
  languages: string[];
  expertise: string[];
}

export async function getGuideFilterOptions(): Promise<{ success: boolean; data: GuideFilterOptions }> {
  try {
    const response = await serverFetch.get('/user/guide-filter-options');

    if (!response.ok) {
      throw new Error("Failed to fetch filter options");
    }

    return await response.json();
  } catch (error: any) {
    console.error("Error fetching filter options:", error);
    return {
      success: false,
      data: {
        languages: [],
        expertise: [],
      },
    };
  }
}

export async function getTopRatedGuides(limit: number = 4): Promise<GuidesResponse> {
  try {
    const response = await serverFetch.get(`/user/top-rated-guides?limit=${limit}`);

    if (!response.ok) {
      throw new Error("Failed to fetch top rated guides");
    }

    return await response.json();
  } catch (error: any) {
    console.error("Error fetching top rated guides:", error);
    return {
      success: false,
      message: error.message || "Failed to fetch top rated guides",
      data: [],
      meta: {
        page: 1,
        limit: 4,
        total: 0,
        totalPage: 0,
      },
    };
  }
}