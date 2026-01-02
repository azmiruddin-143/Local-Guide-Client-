/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import { revalidatePath } from "next/cache";







export interface CreateBookingPayload {
  tourId: string;
  availabilityId: string;
  startAt: string;
  endAt: string;
  numGuests: number;
  specialRequests?: string | null;
}

export interface BookingResponse {
  success: boolean;
  message: string;
  data: any;
}

/**
 * Create a new booking
 */
export async function createBooking(
  payload: CreateBookingPayload
): Promise<BookingResponse> {
  try {
    const response = await serverFetch.post("/bookings", {
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    console.log(result);


    if (!response.ok) {
      return {
        success: false,
        message: result.message || "Failed to create booking",
        data: null,
      };
    }

    revalidatePath("/tourist/bookings");
    return result;
  } catch (error: any) {
    console.error("Create booking error:", error);
    return {
      success: false,
      message: error.message || "An error occurred while creating booking",
      data: null,
    };
  }
}



export async function getMyBookings(touristId: string, queryString?: string) {
    try {
        const response = await serverFetch.get(`/bookings/tourist/${touristId}${queryString ? `?${queryString}` : ""}`);
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}

export async function getBookingById(id: string) {
    try {
        const response = await serverFetch.get(`/bookings/${id}`)
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}

export async function cancelBooking(id: string, cancellationReason: string) {
    try {
        const response = await serverFetch.patch(`/bookings/${id}/cancel`, {
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cancellationReason }),
        })
        const result = await response.json();
        revalidatePath("/dashboard/bookings");
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}

// Retry payment - initiates new payment and returns payment URL
export async function retryPayment(bookingId: string) {
    try {
        const response = await serverFetch.post('/payments/retry', {
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ bookingId }),
        })
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}
