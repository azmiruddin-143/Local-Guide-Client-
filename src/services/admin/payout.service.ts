/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { revalidatePath } from "next/cache";

/**
 * Get all payout requests (Admin only)
 */
export async function getAllPayouts(
  queryString?: string
): Promise<{
  success: boolean;
  message: string;
  data?: any[];
  meta?: any;
}> {
  try {
    const url = queryString 
      ? `/payouts/admin/all?${queryString}`
      : `/payouts/admin/all`;
    
    const response = await serverFetch.get(url);
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong",
    };
  }
}

/**
 * Process payout (Admin only)
 * Marks payout as SENT and guide receives the net amount
 */
export async function processPayout(
  payoutId: string,
  providerPayoutId?: string
): Promise<{ success: boolean; message: string; data?: any }> {
  try {
    const response = await serverFetch.patch(`/payouts/${payoutId}/process`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ providerPayoutId }),
    });
    const result = await response.json();
    revalidatePath("/admin/dashboard/payouts-management");
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong",
    };
  }
}

/**
 * Fail payout (Admin only)
 * Marks payout as FAILED and returns amount to guide's balance
 */
export async function failPayout(
  payoutId: string,
  failureReason: string
): Promise<{ success: boolean; message: string; data?: any }> {
  try {
    const response = await serverFetch.patch(`/payouts/${payoutId}/fail`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ failureReason }),
    });
    const result = await response.json();
    revalidatePath("/admin/dashboard/payouts-management");
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong",
    };
  }
}
