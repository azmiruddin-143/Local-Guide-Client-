"use server";

import { revalidatePath } from "next/cache";
import {
  CreateAvailabilityPayload,
  UpdateAvailabilityPayload,
  AvailabilityResponse,
} from "@/types/availability.interface";
import { serverFetch } from "@/lib/server-fetch";

/**
 * Get all availability slots for the authenticated guide
 */
export async function getMyAvailability(): Promise<AvailabilityResponse> {
  try {
    const response = await serverFetch.get("/availability/my", {
      next: { tags: ["availability"] }
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        success: false,
        message: error.message || "Failed to fetch availability",
        data: null,
      };
    }

    return await response.json();
  } catch (error: any) {
    console.error("Error fetching availability:", error);
    return {
      success: false,
      message: error.message || "Failed to fetch availability",
      data: null,
    };
  }
}

/**
 * Create a new availability slot
 */
export async function createAvailability(
  payload: CreateAvailabilityPayload
): Promise<AvailabilityResponse> {
  try {
    const response = await serverFetch.post("/availability", {
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        success: false,
        message: error.message || "Failed to create availability",
        data: null,
      };
    }

    const result = await response.json();
    revalidatePath("/guide/dashboard/availability");
    return result;
  } catch (error: any) {
    console.error("Error creating availability:", error);
    return {
      success: false,
      message: error.message || "Failed to create availability",
      data: null,
    };
  }
}

/**
 * Update an existing availability slot
 */
export async function updateAvailability(
  id: string,
  payload: UpdateAvailabilityPayload
): Promise<AvailabilityResponse> {
  try {
    const response = await serverFetch.patch(`/availability/${id}`, {
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
      next: { tags: ["availability"] }
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        success: false,
        message: error.message || "Failed to update availability",
        data: null,
      };
    }

    const result = await response.json();
    revalidatePath("/guide/dashboard/availability");
    return result;
  } catch (error: any) {
    console.error("Error updating availability:", error);
    return {
      success: false,
      message: error.message || "Failed to update availability",
      data: null,
    };
  }
}

/**
 * Delete an availability slot
 */
export async function deleteAvailability(
  id: string
): Promise<AvailabilityResponse> {
  try {
    const response = await serverFetch.delete(`/availability/${id}`);

    if (!response.ok) {
      const error = await response.json();
      return {
        success: false,
        message: error.message || "Failed to delete availability",
        data: null,
      };
    }

    const result = await response.json();
    revalidatePath("/guide/dashboard/availability");
    return result;
  } catch (error: any) {
    console.error("Error deleting availability:", error);
    return {
      success: false,
      message: error.message || "Failed to delete availability",
      data: null,
    };
  }
}

/**
 * Toggle availability status (ON/OFF)
 */
export async function toggleAvailability(
  id: string,
  isAvailable: boolean
): Promise<AvailabilityResponse> {
  return updateAvailability(id, { isAvailable });
}
