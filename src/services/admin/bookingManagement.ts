"use server";

import { serverFetch } from "@/lib/server-fetch";
import { revalidatePath } from "next/cache";

export async function getAllBookingsAdmin(queryString?: string) {
  try {
    const response = await serverFetch.get(
      `/bookings/admin/all-bookings${queryString ? `?${queryString}` : ""}`
    );
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong"
      }`,
    };
  }
}

export async function getBookingById(id: string) {
  try {
    const response = await serverFetch.get(`/bookings/${id}`);
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong"
      }`,
    };
  }
}

export async function confirmBooking(id: string) {
  try {
    const response = await serverFetch.patch(`/bookings/${id}/confirm`);
    const result = await response.json();
    revalidatePath("/admin/dashboard/bookings-management");
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong"
      }`,
    };
  }
}

export async function declineBooking(id: string) {
  try {
    const response = await serverFetch.patch(`/bookings/${id}/decline`);
    const result = await response.json();
    revalidatePath("/admin/dashboard/bookings-management");
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong"
      }`,
    };
  }
}

export async function cancelBooking(id: string, cancellationReason: string) {
  try {
    const response = await serverFetch.patch(`/bookings/${id}/cancel`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cancellationReason }),
    });
    const result = await response.json();
    revalidatePath("/admin/dashboard/bookings-management");
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong"
      }`,
    };
  }
}

export async function completeBooking(id: string) {
  try {
    const response = await serverFetch.patch(`/bookings/${id}/complete`);
    const result = await response.json();
    revalidatePath("/admin/dashboard/bookings-management");
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong"
      }`,
    };
  }
}
