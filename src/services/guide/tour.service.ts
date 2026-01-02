"use server";

import { serverFetch } from "@/lib/server-fetch";
import { ITour } from "@/types/tour.interface";

interface GetMyToursResponse {
  success: boolean;
  message: string;
  data: ITour[];
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}

export async function getMyTours(
  queryParams?: Record<string, string>
): Promise<GetMyToursResponse> {
  try {
    const queryString = queryParams
      ? `?${new URLSearchParams(queryParams).toString()}`
      : "";

    const response = await serverFetch.get(`/tours/my-tours${queryString}`);

    if (!response.ok) {
      throw new Error("Failed to fetch tours");
    }

    return await response.json();
  } catch (error: any) {
    console.error("Error fetching my tours:", error);
    return {
      success: false,
      message: error?.message || "Failed to fetch tours",
      data: [],
    };
  }
}

export async function toggleTourStatus(tourId: string) {
  try {
    const response = await serverFetch.patch(`/tours/${tourId}/toggle-status`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to toggle tour status");
    }

    return await response.json();
  } catch (error: any) {
    throw new Error(error?.message || "Failed to toggle tour status");
  }
}

export async function deleteTour(tourId: string) {
  try {
    const response = await serverFetch.delete(`/tours/${tourId}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete tour");
    }

    return await response.json();
  } catch (error: any) {
    throw new Error(error?.message || "Failed to delete tour");
  }
}
