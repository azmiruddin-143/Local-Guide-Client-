/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { zodValidator } from "@/lib/zodValidator";
import { contactValidationSchema } from "@/zod/contact.validation";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL || "https://local-guide-server-bd.vercel.app/api";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function submitContact(_prevState: any, formData: FormData) {
  try {
    // Extract form data
    const rawData = {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      phoneNumber: formData.get("phoneNumber"),
      inquiryType: formData.get("inquiryType"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    // Validate with zodValidator
    const validation = zodValidator(rawData, contactValidationSchema);

    if (!validation.success) {
      return validation;
    }

    const validatedData = validation.data as {
      fullName: string;
      email: string;
      phoneNumber?: string;
      inquiryType: string;
      subject: string;
      message: string;
    };

    // Prepare contact data for backend
    const contactData = {
      fullName: validatedData.fullName,
      email: validatedData.email,
      phoneNumber: validatedData.phoneNumber || undefined,
      inquiryType: validatedData.inquiryType,
      subject: validatedData.subject,
      message: validatedData.message,
    };

    // Call backend API
    const response = await fetch(`${BACKEND_API_URL}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactData),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      console.error("Contact submission failed:", result);
      return {
        success: false,
        message: result.message || "Failed to send message. Please try again.",
        errors: [],
      };
    }

    return {
      success: true,
      message: "Message sent successfully! We'll get back to you soon.",
      errors: [],
    };
  } catch (error: any) {
    console.error("Contact submission error:", error);

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
