"use server";

import { serverFetch } from "@/lib/server-fetch";


export async function initiatePayment(bookingId: string) {
  try {
    const response = await serverFetch.post("/payments/initiate", {
      body: JSON.stringify({ bookingId }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(response);
    

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || "Failed to initiate payment",
        data: null,
      };
    }

    return result;
  } catch (error: any) {
    console.error("Initiate payment error:", error);
    return {
      success: false,
      message: error.message || "An error occurred while initiating payment",
      data: null,
    };
  }
}

/**
 * Get payment details for a booking
 */
export async function getPaymentByBooking(bookingId: string) {
  try {
    const response = await serverFetch.get(`/payments/${bookingId}`, {
      cache: "no-store",
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || "Failed to fetch payment",
        data: null,
      };
    }

    return result;
  } catch (error: any) {
    console.error("Get payment error:", error);
    return {
      success: false,
      message: error.message || "An error occurred while fetching payment",
      data: null,
    };
  }
}

/**
 * Retry a failed payment
 */
export async function retryPayment(bookingId: string) {
  try {
    const response = await serverFetch.post("/payments/retry", {
      body: JSON.stringify({ bookingId }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || "Failed to retry payment",
        data: null,
      };
    }

    return result;
  } catch (error: any) {
    console.error("Retry payment error:", error);
    return {
      success: false,
      message: error.message || "An error occurred while retrying payment",
      data: null,
    };
  }
}
