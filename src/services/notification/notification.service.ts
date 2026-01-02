"use server";

import { serverFetch } from "@/lib/server-fetch";
import { INotification, NotificationResponse, UnreadCountResponse } from "@/types/notification.interface";
import { revalidatePath } from "next/cache";

/**
 * Get all notifications for the current user
 */
export const getUserNotifications = async (): Promise<INotification[]> => {
  try {
    const response = await serverFetch.get("/notifications", {
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Failed to fetch notifications:", response.status);
      return [];
    }

    const result = await response.json();

    if (result.success && Array.isArray(result.data)) {
      return result.data;
    }

    return [];
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return [];
  }
};

/**
 * Get unread notification count
 */
export const getUnreadCount = async (): Promise<number> => {
  try {
    const response = await serverFetch.get("/notifications/unread-count", {
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Failed to fetch unread count:", response.status);
      return 0;
    }

    const result = await response.json();

    if (result.success && result.data && typeof result.data.unreadCount === 'number') {
      return result.data.unreadCount;
    }

    return 0;
  } catch (error) {
    console.error("Error fetching unread count:", error);
    return 0;
  }
};

/**
 * Mark a notification as read
 */
export const markNotificationAsRead = async (notificationId: string): Promise<boolean> => {
  try {
    const response = await serverFetch.patch(`/notifications/${notificationId}/read`);

    if (!response.ok) {
      console.error("Failed to mark notification as read:", response.status);
      return false;
    }

    const result = await response.json();

    if (result.success) {
      revalidatePath("/notifications");
      revalidatePath("/", "layout");
      return true;
    }

    return false;
  } catch (error) {
    console.error("Error marking notification as read:", error);
    return false;
  }
};

/**
 * Mark all notifications as read
 */
export const markAllNotificationsAsRead = async (): Promise<boolean> => {
  try {
    const response = await serverFetch.patch("/notifications/read-all");

    if (!response.ok) {
      console.error("Failed to mark all notifications as read:", response.status);
      return false;
    }

    const result = await response.json();

    if (result.success) {
      revalidatePath("/notifications");
      revalidatePath("/", "layout");
      return true;
    }

    return false;
  } catch (error) {
    console.error("Error marking all notifications as read:", error);
    return false;
  }
};

/**
 * Delete a notification
 */
export const deleteNotification = async (notificationId: string): Promise<boolean> => {
  try {
    const response = await serverFetch.delete(`/notifications/${notificationId}`);

    if (!response.ok) {
      console.error("Failed to delete notification:", response.status);
      return false;
    }

    const result = await response.json();

    if (result.success) {
      revalidatePath("/notifications");
      revalidatePath("/", "layout");
      return true;
    }

    return false;
  } catch (error) {
    console.error("Error deleting notification:", error);
    return false;
  }
};
