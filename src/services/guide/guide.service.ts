/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import { UserInfo } from "@/types/user.interface";
import { Tour } from "@/services/tour/tour.service";

export interface GuideDetailsResponse {
  success: boolean;
  message: string;
  data: UserInfo | null;
}

export interface GuideToursResponse {
  success: boolean;
  message: string;
  data: Tour[];
}

export interface GuideAvailability {
  _id: string;
  guideId: string;
  specificDate: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
  tourId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GuideAvailabilityResponse {
  success: boolean;
  message: string;
  data: GuideAvailability[];
}

export async function getGuideById(guideId: string): Promise<GuideDetailsResponse> {
  try {
    const response = await serverFetch.get(`/user/${guideId}`);

    if (!response.ok) {
      throw new Error("Failed to fetch guide details");
    }

    return await response.json();
  } catch (error: any) {
    console.error("Error fetching guide details:", error);
    return {
      success: false,
      message: error.message || "Failed to fetch guide details",
      data: null,
    };
  }
}

export async function getGuideTours(guideId: string): Promise<GuideToursResponse> {
  try {
    const response = await serverFetch.get(`/tours/guide/${guideId}`);

    if (!response.ok) {
      throw new Error("Failed to fetch guide tours");
    }

    return await response.json();
  } catch (error: any) {
    console.error("Error fetching guide tours:", error);
    return {
      success: false,
      message: error.message || "Failed to fetch guide tours",
      data: [],
    };
  }
}

export async function getGuideAvailability(guideId: string): Promise<GuideAvailabilityResponse> {
  try {
    const response = await serverFetch.get(`/availability/guide/${guideId}`);

    if (!response.ok) {
      throw new Error("Failed to fetch guide availability");
    }

    return await response.json();
  } catch (error: any) {
    console.error("Error fetching guide availability:", error);
    return {
      success: false,
      message: error.message || "Failed to fetch guide availability",
      data: [],
    };
  }
}
