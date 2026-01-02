"use server";

import { serverFetch } from "@/lib/server-fetch";
import { PaymentFilters } from "@/types/payment.interface";

export async function getMyPaymentHistory(filters?: PaymentFilters) {
  try {
    const params = new URLSearchParams();

    if (filters?.status) params.append("status", filters.status);
    if (filters?.searchTerm) params.append("searchTerm", filters.searchTerm);
    if (filters?.startDate) params.append("startDate", filters.startDate);
    if (filters?.endDate) params.append("endDate", filters.endDate);
    if (filters?.page) params.append("page", filters.page.toString());
    if (filters?.limit) params.append("limit", filters.limit.toString());

    const response = await serverFetch.get(
      `/payments/my-history?${params.toString()}`
    );
    const result = await response.json();

    if (!response.ok || !result.success) {
      return {
        success: false,
        message: result.message || "Failed to fetch payment history",
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

    return {
      success: true,
      message: result.message,
      data: result.data || [],
      meta: result.meta || {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 1,
        stats: {},
      },
    };
  } catch (error: any) {
    console.error("Get payment history error:", error);
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
