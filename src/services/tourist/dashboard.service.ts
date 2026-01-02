'use server';

import { serverFetch } from '@/lib/server-fetch';

export interface TouristDashboardStats {
  bookings: {
    total: number;
    byStatus: Array<{
      _id: string;
      count: number;
      totalAmount: number;
    }>;
    byPaymentStatus: Array<{
      _id: string;
      count: number;
      totalAmount: number;
    }>;
    upcoming: Array<any>;
    completed: Array<any>;
    recent: Array<any>;
    monthly: Array<{
      _id: {
        year: number;
        month: number;
      };
      count: number;
      totalAmount: number;
    }>;
    byCategory: Array<{
      _id: string;
      count: number;
      totalSpent: number;
    }>;
  };
  spending: {
    total: number;
    totalTransactions: number;
    avgTransaction: number;
    monthly: Array<{
      _id: {
        year: number;
        month: number;
      };
      spent: number;
      count: number;
    }>;
    recentPayments: Array<any>;
  };
  reviews: {
    total: number;
    byTarget: Array<{
      _id: string;
      count: number;
      avgRating: number;
    }>;
    byRating: Array<{
      _id: number;
      count: number;
    }>;
    recent: Array<any>;
  };

}

export async function getTouristDashboardStats(): Promise<TouristDashboardStats> {
  try {
    const response = await serverFetch.get('/stats/tourist');

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch tourist dashboard stats');
    }

    const result = await response.json();
    return result.data;
  } catch (error: any) {
    console.error('Error fetching tourist dashboard stats:', error);
    throw new Error(error.message || 'Failed to fetch tourist dashboard stats');
  }
}
