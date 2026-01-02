'use server';

import { serverFetch } from '@/lib/server-fetch';

export interface GuideDashboardStats {
  tours: {
    total: number;
    active: number;
    inactive: number;
    byCategory: Array<{
      _id: string;
      count: number;
      avgRating: number;
    }>;
    topRated: Array<{
      _id: string;
      title: string;
      slug: string;
      category: string;
      averageRating: number;
      reviewCount: number;
    }>;
  };
  bookings: {
    total: number;
    byStatus: Array<{
      _id: string;
      count: number;
      totalAmount: number;
    }>;
    upcoming: Array<any>;
    recent: Array<any>;
    monthly: Array<{
      _id: {
        year: number;
        month: number;
      };
      count: number;
      totalAmount: number;
    }>;
  };
  earnings: {
    total: number;
    totalTransactions: number;
    monthly: Array<{
      _id: {
        year: number;
        month: number;
      };
      earnings: number;
      count: number;
    }>;
    byTour: Array<{
      _id: string;
      earnings: number;
      bookings: number;
      tour: {
        title: string;
        slug: string;
      };
    }>;
  };
  payouts: {
    total: number;
    byStatus: Array<{
      _id: string;
      count: number;
      totalAmount: number;
      totalPlatformFee: number;
      totalNetAmount: number;
    }>;
    totalPaidOut: number;
    pending: {
      count: number;
      totalAmount: number;
      totalNetAmount: number;
    };
    recent: Array<any>;
  };
  reviews: {
    total: number;
    byRating: Array<{
      _id: number;
      count: number;
    }>;
    average: number;
    recent: Array<any>;
  };
  wallet: {
    balance: number;
    pendingBalance: number;
    totalEarned: number;
    totalPlatformFee: number;
  };
}

export async function getGuideDashboardStats(): Promise<GuideDashboardStats> {
  try {
    const response = await serverFetch.get('/stats/guide');

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch guide dashboard stats');
    }

    const result = await response.json();
    return result.data;
  } catch (error: any) {
    console.error('Error fetching guide dashboard stats:', error);
    throw new Error(error.message || 'Failed to fetch guide dashboard stats');
  }
}
