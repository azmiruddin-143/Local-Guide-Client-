'use server';

import { serverFetch } from '@/lib/server-fetch';

export interface AdminDashboardStats {
  users: {
    total: number;
    byRole: {
      ADMIN?: number;
      GUIDE?: number;
      TOURIST?: number;
    };
    verified: number;
    active: number;
    deleted: number;
    recent: Array<{
      _id: string;
      role: string;
      email: string;
      name: string;
      isVerified: boolean;
      createdAt: string;
    }>;
  };
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
      guide: {
        name: string;
      };
    }>;
  };
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
  revenue: {
    total: number;
    totalTransactions: number;
    byStatus: Array<{
      _id: string;
      count: number;
      totalAmount: number;
    }>;
    monthly: Array<{
      _id: {
        year: number;
        month: number;
      };
      revenue: number;
      count: number;
    }>;
    byCategory: Array<{
      _id: string;
      revenue: number;
      count: number;
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
    totalPlatformFees: number;
    pending: {
      count: number;
      totalAmount: number;
      totalNetAmount: number;
    };
    monthly: Array<{
      _id: {
        year: number;
        month: number;
      };
      count: number;
      totalAmount: number;
      totalPlatformFee: number;
      totalNetAmount: number;
    }>;
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
  wallets: {
    total: number;
    totalBalance: number;
    totalPendingBalance: number;
    totalEarned: number;
    totalPlatformFee: number;
    topEarners: Array<any>;
  };
  subscribers: {
    active: number;
  };
  contacts: {
    unread: number;
  };
}

export async function getAdminDashboardStats(): Promise<AdminDashboardStats> {
  try {
    const response = await serverFetch.get('/stats/admin');

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch admin dashboard stats');
    }

    const result = await response.json();
    return result.data;
  } catch (error: any) {
    console.error('Error fetching admin dashboard stats:', error);
    throw new Error(error.message || 'Failed to fetch admin dashboard stats');
  }
}
