/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { revalidatePath } from "next/cache";
import { Contact, ContactsData } from "@/types/contact.interface";

export interface ContactResponse {
  success: boolean;
  message: string;
  data?: any;
  meta?: any
}

// Admin functions
export const getAllContacts = async (queryString: string = ''): Promise<ContactResponse> => {
  try {
    const response = await serverFetch.get(`/contact${queryString ? `?${queryString}` : ""}`);

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        message: errorData.message || 'Failed to fetch contacts',
      };
    }

    const result = await response.json();
    return result
  } catch (error: any) {
    console.error('Fetch contacts error:', error);
    return {
      success: false,
      message: error.message || 'An error occurred',
    };
  }
};

export const getContactById = async (id: string): Promise<ContactResponse> => {
  try {
    const response = await serverFetch.get(`/contact/${id}`);

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        message: errorData.message || 'Failed to fetch contact',
      };
    }

    const result = await response.json();
    return {
      success: true,
      message: 'Contact fetched successfully',
      data: result.data,
    };
  } catch (error: any) {
    console.error('Fetch contact error:', error);
    return {
      success: false,
      message: error.message || 'An error occurred',
    };
  }
};

export const markContactAsRead = async (id: string): Promise<ContactResponse> => {
  try {
    const response = await serverFetch.patch(`/contact/${id}/read`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        message: errorData.message || 'Failed to mark as read',
      };
    }

    const result = await response.json();
    revalidatePath('/admin/dashboard/contact-messages');
    
    return {
      success: true,
      message: 'Marked as read successfully',
      data: result.data,
    };
  } catch (error: any) {
    console.error('Mark as read error:', error);
    return {
      success: false,
      message: error.message || 'An error occurred',
    };
  }
};

export const deleteContact = async (id: string): Promise<ContactResponse> => {
  try {
    const response = await serverFetch.delete(`/contact/${id}`);

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        message: errorData.message || 'Failed to delete contact',
      };
    }

    const result = await response.json();
    revalidatePath('/admin/dashboard/contact-messages');
    
    return {
      success: true,
      message: 'Contact deleted successfully',
      data: result.data,
    };
  } catch (error: any) {
    console.error('Delete contact error:', error);
    return {
      success: false,
      message: error.message || 'An error occurred',
    };
  }
};

export const getUnreadCount = async (): Promise<ContactResponse> => {
  try {
    const response = await serverFetch.get('/contact/unread-count');

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        message: errorData.message || 'Failed to fetch unread count',
      };
    }

    const result = await response.json();
    return {
      success: true,
      message: 'Unread count fetched successfully',
      data: result.data,
    };
  } catch (error: any) {
    console.error('Fetch unread count error:', error);
    return {
      success: false,
      message: error.message || 'An error occurred',
    };
  }
};
