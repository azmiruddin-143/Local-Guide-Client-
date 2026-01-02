import { z } from "zod";

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

export const createTourValidationSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title must not exceed 100 characters"),
  
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(2000, "Description must not exceed 2000 characters"),
  
  itinerary: z
    .string()
    .max(5000, "Itinerary must not exceed 5000 characters")
    .optional()
    .or(z.literal("")),
  city: z
    .string()
    .min(1, "City is required")
    .max(100, "City must not exceed 100 characters"),
  
  country: z
    .string()
    .min(1, "Country is required")
    .max(100, "Country must not exceed 100 characters"),
  
  meetingPoint: z
    .string()
    .min(1, "Meeting point is required")
    .max(200, "Meeting point must not exceed 200 characters"),
  
  category: z.nativeEnum(TourCategory, {
    message: "Please select a valid category",
  }),
  
  languages: z
    .string()
    .min(1, "At least one language is required")
    .refine((val) => val.split(",").filter(Boolean).length > 0, {
      message: "At least one language is required",
    }),
  
  includedItems: z.string().optional().or(z.literal("")),
  
  excludedItems: z.string().optional().or(z.literal("")),
});

export type CreateTourFormData = z.infer<typeof createTourValidationSchema>;
