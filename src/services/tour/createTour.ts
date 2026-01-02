"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { createTourValidationSchema } from "@/zod/tour.validation";
import { revalidatePath } from "next/cache";

export async function createTour(_prevState: any, formData: FormData) {
  try {
    // Extract data JSON from formData
    const dataString = formData.get("data") as string;

    if (!dataString) {
      return {
        success: false,
        message: "Missing tour data",
        errors: [{ field: "general", message: "Tour data is required" }],
      };
    }

    // Parse the JSON data
    const parsedData = JSON.parse(dataString);

    // Prepare data for validation (convert arrays to comma-separated strings for Zod)
    const rawData = {
      title: parsedData.title,
      description: parsedData.description,
      itinerary: parsedData.itinerary || undefined,
      city: parsedData.city,
      country: parsedData.country,
      meetingPoint: parsedData.meetingPoint,
      category: parsedData.category,
      languages: Array.isArray(parsedData.languages)
        ? parsedData.languages.join(",")
        : parsedData.languages,
      includedItems: Array.isArray(parsedData.includedItems)
        ? parsedData.includedItems.join(",")
        : parsedData.includedItems,
      excludedItems: Array.isArray(parsedData.excludedItems)
        ? parsedData.excludedItems.join(",")
        : parsedData.excludedItems,
    };

    // Validate with zodValidator
    const validation = zodValidator(rawData, createTourValidationSchema);

    if (!validation.success) {
      return validation;
    }

    const validatedData = validation.data as {
      title: string;
      description: string;
      itinerary?: string;
      city: string;
      country: string;
      meetingPoint: string;
      category: string;
      languages: string;
      includedItems?: string;
      excludedItems?: string;
    };;

    // Validate images exist
    const images = formData.getAll("images");
    if (!images || images.length === 0) {
      return {
        success: false,
        message: "Please upload at least one image",
        errors: [{ field: "images", message: "At least one image is required" }],
      };
    }

    // Validate each image is a valid File
    const validImages = images.filter(
      (image) => image instanceof File && image.size > 0
    );

    if (validImages.length === 0) {
      return {
        success: false,
        message: "Please upload valid image files",
        errors: [{ field: "images", message: "Valid image files are required" }],
      };
    }

    if (validImages.length > 10) {
      return {
        success: false,
        message: "Maximum 10 images allowed",
        errors: [{ field: "images", message: "You can upload up to 10 images only" }],
      };
    }

    // Prepare tour data object for backend (convert back to arrays)
    const tourData = {
      title: validatedData.title,
      description: validatedData.description,
      itinerary: validatedData.itinerary || undefined,
      city: validatedData.city,
      country: validatedData.country,
      meetingPoint: validatedData.meetingPoint,
      category: validatedData.category,
      languages: validatedData.languages
        .split(",")
        .map((lang: string) => lang.trim())
        .filter(Boolean),
      includedItems: validatedData.includedItems
        ? validatedData.includedItems
          .split(",")
          .map((item: string) => item.trim())
          .filter(Boolean)
        : undefined,
      excludedItems: validatedData.excludedItems
        ? validatedData.excludedItems
          .split(",")
          .map((item: string) => item.trim())
          .filter(Boolean)
        : undefined,
    };

    // Prepare multipart form data for API
    const apiFormData = new FormData();

    // Add tour data as JSON string in 'data' field
    apiFormData.append("data", JSON.stringify(tourData));

    // Add all valid images
    validImages.forEach((image) => {
      apiFormData.append("images", image);
    });

    // Call API with multipart/form-data
    const response = await serverFetch.post("/tours", {
      body: apiFormData,
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      console.error("Tour creation failed:", result);
      return {
        success: false,
        message: result.message || "Failed to create tour",
        errors: result.errors || [],
      };
    }

    // Revalidate paths
    revalidatePath("/guide/dashboard/my-tours");
    revalidatePath("/explore");
    revalidatePath("/tours");

    return {
      success: true,
      message: "Tour created successfully!",
      errors: [],
      data: result.data,
    };
  } catch (error: any) {
    console.error("Create tour error:", error);

    // Handle JSON parse errors
    if (error instanceof SyntaxError) {
      return {
        success: false,
        message: "Invalid data format",
        errors: [{ field: "general", message: "Failed to parse tour data" }],
      };
    }

    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong. Please try again.",
      errors: [],
    };
  }
}