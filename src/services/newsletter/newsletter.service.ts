/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";

export interface SubscribeResponse {
  success: boolean;
  message: string;
  data?: any;
  meta?: any
}

export const subscribeToNewsletter = async (email: string): Promise<SubscribeResponse> => {
  try {
    const response = await serverFetch.post('/newsletter/subscribe', {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    console.log(email, response);
    

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        message: errorData.message || 'Failed to subscribe. Please try again.',
      };
    }

    const result = await response.json();
    return {
      success: true,
      message: result.message || 'Successfully subscribed to newsletter!',
      data: result.data,
    };
  } catch (error: any) {
    console.error('Newsletter subscription error:', error);
    return {
      success: false,
      message: error.message || 'An error occurred. Please try again later.',
    };
  }
};

export const unsubscribeFromNewsletter = async (email: string): Promise<SubscribeResponse> => {
  try {
    const response = await serverFetch.post('/newsletter/unsubscribe', {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        message: errorData.message || 'Failed to unsubscribe. Please try again.',
      };
    }

    const result = await response.json();
    return {
      success: true,
      message: result.message || 'Successfully unsubscribed from newsletter',
      data: result.data,
    };
  } catch (error: any) {
    console.error('Newsletter unsubscribe error:', error);
    return {
      success: false,
      message: error.message || 'An error occurred. Please try again later.',
    };
  }
};

export interface Subscriber {
  _id: string;
  email: string;
  isActive: boolean;
  subscribedAt: string;
  unsubscribedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SubscriberStats {
  totalSubscribers: number;
  totalUnsubscribed: number;
  recentSubscribers: Subscriber[];
}

// Admin functions
export const getAllSubscribers = async (queryString: string = ''): Promise<SubscribeResponse> => {
  try {
    const response = await serverFetch.get(`/newsletter/all${queryString ? `?${queryString}` : ""}`);

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        message: errorData.message || 'Failed to fetch subscribers',
      };
    }

    const result = await response.json();
    return result
  } catch (error: any) {
    console.error('Fetch subscribers error:', error);
    return {
      success: false,
      message: error.message || 'An error occurred',
    };
  }
};

export const getSubscriberStats = async (): Promise<SubscribeResponse> => {
  try {
    const response = await serverFetch.get('/newsletter/stats');

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        message: errorData.message || 'Failed to fetch stats',
      };
    }

    const result = await response.json();
    return {
      success: true,
      message: 'Stats fetched successfully',
      data: result.data,
    };
  } catch (error: any) {
    console.error('Fetch stats error:', error);
    return {
      success: false,
      message: error.message || 'An error occurred',
    };
  }
};
