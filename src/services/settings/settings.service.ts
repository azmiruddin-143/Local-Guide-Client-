"use server";

import { serverFetch } from "@/lib/server-fetch";
import { revalidatePath } from "next/cache";


export const getPlatformSettings = async () => {
  try {
    const response = await serverFetch.get("/settings", {
      cache: "no-store",
    });

    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error("Error fetching platform settings:", error);
    return {
      success: false,
      message: error.message || "Failed to fetch platform settings",
      data: null,
    };
  }
};


export const updatePlatformSettings = async (updates: any) => {
  try {
    // Remove MongoDB fields before sending
    const { _id, __v, createdAt, updatedAt, ...cleanUpdates } = updates;
    
    console.log("Sending updates:", cleanUpdates);

    const response = await serverFetch.patch("/settings", {
      body: JSON.stringify(cleanUpdates),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    console.log("Update result:", result);

    if (result.success) {
      // Revalidate relevant paths
      revalidatePath("/admin/dashboard/general-settings");
      revalidatePath("/admin/dashboard");
      revalidatePath("/");
    }

    return result;
  } catch (error: any) {
    console.error("Error updating platform settings:", error);
    return {
      success: false,
      message: error.message || "Failed to update platform settings",
      data: null,
    };
  }
};

