/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import { revalidatePath } from "next/cache";

export interface WalletBalance {
  balance: number;
  pendingBalance: number;
  totalEarned: number;
  totalPlatformFee?: number;
  totalReceived?: number;
  payableBalance?: number;
}

export interface PayoutRequest {
  amount: number;
  paymentMethod: string;
  accountDetails: {
    accountNumber: string;
    accountName: string;
    bankName?: string;
    branchName?: string;
    mobileNumber?: string;
  };
}

export async function getWalletBalance(): Promise<{ success: boolean; message: string; data?: WalletBalance }> {
  try {
    const response = await serverFetch.get('/payouts/wallet/balance');
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    };
  }
}

export async function getMyPayouts(
  guideId: string,
  queryString?: string
): Promise<{ success: boolean; message: string; data?: any[]; meta?: any }> {
  try {
    const url = queryString 
      ? `/payouts/guide/${guideId}?${queryString}`
      : `/payouts/guide/${guideId}`;
    
    const response = await serverFetch.get(url);
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    };
  }
}

export async function requestPayout(payload: PayoutRequest): Promise<{ success: boolean; message: string; data?: any }> {
  try {
    const response = await serverFetch.post('/payouts', {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const result = await response.json();
    revalidatePath("/guide/dashboard/earnings");
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    };
  }
}

export async function cancelPayout(payoutId: string): Promise<{ success: boolean; message: string; data?: any }> {
  try {
    const response = await serverFetch.patch(`/payouts/${payoutId}/cancel`);
    const result = await response.json();
    revalidatePath("/guide/dashboard/earnings");
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    };
  }
}
