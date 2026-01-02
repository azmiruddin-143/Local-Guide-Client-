import { serverFetch } from "@/lib/server-fetch";
import { IAvailability } from "@/types/availability.interface";

export interface AvailabilityResponse {
  success: boolean;
  message: string;
  data: IAvailability[];
}

export async function getGuideAvailability(guideId: string): Promise<AvailabilityResponse> {
  try {
    const response = await serverFetch.get(`/availability/guide/${guideId}`);

    if (!response.ok) {
      throw new Error("Failed to fetch availability");
    }

    return await response.json();
  } catch (error: any) {
    console.error("Error fetching availability:", error);
    return {
      success: false,
      message: error.message || "Failed to fetch availability",
      data: [],
    };
  }
}
