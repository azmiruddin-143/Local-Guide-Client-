"use server";

import { serverFetch } from "@/lib/server-fetch";
import { PaymentFilters } from "@/types/payment.interface";

export async function getAllPayments(queryString?: string) {
  try {
    const response = await serverFetch.get(
      `/payments/admin/all-payments${queryString ? `?${queryString}` : ""}`
    );
    const result = await response.json();

    if (!response.ok || !result.success) {
      return {
        success: false,
        message: result.message || "Failed to fetch payments",
        data: [],
        meta: {
          page: 1,
          limit: 10,
          total: 0,
          totalPages: 1,
          stats: {},
        },
      };
    }

    return result;
  } catch (error: any) {
    console.error("Get all payments error:", error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong. Please try again.",
      data: [],
      meta: {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 1,
        stats: {},
      },
    };
  }
}

export async function refundPayment(
  paymentId: string,
  refundData: {
    refundReason: string;
    refundAmount: number;
    adminNotes?: string;
  }
) {
  try {
    const response = await serverFetch.post(`/payments/${paymentId}/refund`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(refundData),
    });
    const result = await response.json();

    if (!response.ok || !result.success) {
      return {
        success: false,
        message: result.message || "Failed to refund payment",
      };
    }

    return {
      success: true,
      message: result.message,
      data: result.data,
    };
  } catch (error: any) {
    console.error("Refund payment error:", error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong. Please try again.",
    };
  }
}
