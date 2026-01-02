"use client";

import { useState, useTransition } from "react";
import { INotification, NotificationPriority, NotificationType } from "@/types/notification.interface";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bell,
  CheckCheck,
  Trash2,
  Clock,
  AlertCircle,
  Info,
  AlertTriangle,
  Zap,
  Calendar,
  CreditCard,
  Star,
  DollarSign,
  UserCheck,
  Lock,
  Package,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import {
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
} from "@/services/notification/notification.service";
import { useRouter } from "next/navigation";

interface NotificationsPageProps {
  initialNotifications: INotification[];
}

const NotificationsPage = ({ initialNotifications }: NotificationsPageProps) => {
  const [notifications, setNotifications] = useState<INotification[]>(initialNotifications);
  const [isPending, startTransition] = useTransition();
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  const router = useRouter();

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === "unread") return !notification.isRead;
    if (filter === "read") return notification.isRead;
    return true;
  });

  const handleMarkAsRead = async (notificationId: string) => {
    startTransition(async () => {
      const success = await markNotificationAsRead(notificationId);
      if (success) {
        setNotifications((prev) =>
          prev.map((n) => (n._id === notificationId ? { ...n, isRead: true } : n))
        );
        toast.success("Notification marked as read");
        router.refresh();
      } else {
        toast.error("Failed to mark notification as read");
      }
    });
  };

  const handleMarkAllAsRead = async () => {
    if (unreadCount === 0) return;

    startTransition(async () => {
      const success = await markAllNotificationsAsRead();
      if (success) {
        setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
        toast.success("All notifications marked as read");
        router.refresh();
      } else {
        toast.error("Failed to mark all notifications as read");
      }
    });
  };

  const handleDelete = async (notificationId: string) => {
    startTransition(async () => {
      const success = await deleteNotification(notificationId);
      if (success) {
        setNotifications((prev) => prev.filter((n) => n._id !== notificationId));
        toast.success("Notification deleted");
        router.refresh();
      } else {
        toast.error("Failed to delete notification");
      }
    });
  };

  const handleNotificationClick = (notification: INotification) => {
    if (!notification.isRead) {
      handleMarkAsRead(notification._id);
    }
    if (notification.actionUrl) {
      router.push(notification.actionUrl);
    }
  };

  const getNotificationIcon = (type: NotificationType) => {
    const iconClass = "h-5 w-5";
    switch (type) {
      case NotificationType.BOOKING_CREATED:
      case NotificationType.BOOKING_CONFIRMED:
      case NotificationType.BOOKING_DECLINED:
      case NotificationType.BOOKING_CANCELLED:
      case NotificationType.BOOKING_COMPLETED:
        return <Calendar className={iconClass} />;
      case NotificationType.PAYMENT_SUCCESS:
      case NotificationType.PAYMENT_FAILED:
      case NotificationType.PAYMENT_REFUNDED:
        return <CreditCard className={iconClass} />;
      case NotificationType.REVIEW_RECEIVED_TOUR:
      case NotificationType.REVIEW_RECEIVED_GUIDE:
        return <Star className={iconClass} />;
      case NotificationType.PAYOUT_REQUESTED:
      case NotificationType.PAYOUT_PROCESSED:
      case NotificationType.PAYOUT_FAILED:
      case NotificationType.PAYOUT_CANCELLED:
        return <DollarSign className={iconClass} />;
      case NotificationType.ACCOUNT_VERIFIED:
      case NotificationType.ACCOUNT_STATUS_CHANGED:
        return <UserCheck className={iconClass} />;
      case NotificationType.PASSWORD_RESET_SUCCESS:
        return <Lock className={iconClass} />;
      default:
        return <Bell className={iconClass} />;
    }
  };

  const getPriorityBadge = (priority?: NotificationPriority) => {
    switch (priority) {
      case NotificationPriority.URGENT:
        return (
          <Badge variant="destructive" className="gap-1">
            <Zap className="h-3 w-3" />
            Urgent
          </Badge>
        );
      case NotificationPriority.HIGH:
        return (
          <Badge variant="default" className="gap-1 bg-orange-500">
            <AlertTriangle className="h-3 w-3" />
            High
          </Badge>
        );
      case NotificationPriority.LOW:
        return (
          <Badge variant="secondary" className="gap-1">
            <Info className="h-3 w-3" />
            Low
          </Badge>
        );
      default:
        return null;
    }
  };

  const getPriorityColor = (priority?: NotificationPriority) => {
    switch (priority) {
      case NotificationPriority.URGENT:
        return "border-l-4 border-l-red-500";
      case NotificationPriority.HIGH:
        return "border-l-4 border-l-orange-500";
      case NotificationPriority.LOW:
        return "border-l-4 border-l-blue-500";
      default:
        return "border-l-4 border-l-gray-300";
    }
  };

  return (
    <div className="container max-w-5xl py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground mt-1">
            Stay updated with your latest activities
          </p>
        </div>
        {unreadCount > 0 && (
          <Button
            onClick={handleMarkAllAsRead}
            disabled={isPending}
            variant="outline"
            className="gap-2"
          >
            <CheckCheck className="h-4 w-4" />
            Mark all as read
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Bell className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{notifications.length}</p>
              <p className="text-sm text-muted-foreground">Total</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-500/10 rounded-lg">
              <AlertCircle className="h-5 w-5 text-orange-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{unreadCount}</p>
              <p className="text-sm text-muted-foreground">Unread</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <CheckCheck className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {notifications.length - unreadCount}
              </p>
              <p className="text-sm text-muted-foreground">Read</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Tabs value={filter} onValueChange={(v) => setFilter(v as typeof filter)}>
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="all">
            All ({notifications.length})
          </TabsTrigger>
          <TabsTrigger value="unread">
            Unread ({unreadCount})
          </TabsTrigger>
          <TabsTrigger value="read">
            Read ({notifications.length - unreadCount})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={filter} className="mt-6 space-y-3">
          {filteredNotifications.length === 0 ? (
            <Card className="p-12">
              <div className="flex flex-col items-center justify-center text-center">
                <div className="p-4 bg-muted rounded-full mb-4">
                  <Package className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No notifications</h3>
                <p className="text-sm text-muted-foreground max-w-sm">
                  {filter === "unread"
                    ? "You're all caught up! No unread notifications."
                    : filter === "read"
                    ? "No read notifications yet."
                    : "You don't have any notifications yet."}
                </p>
              </div>
            </Card>
          ) : (
            filteredNotifications.map((notification) => (
              <Card
                key={notification._id}
                className={`group relative transition-all hover:shadow-md ${
                  !notification.isRead ? "bg-primary/5" : ""
                } ${getPriorityColor(notification.priority)}`}
              >
                <div className="p-4">
                  <div className="flex gap-4">
                    {/* Icon */}
                    <div
                      className={`shrink-0 p-3 rounded-lg ${
                        !notification.isRead
                          ? "bg-primary/10 text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {getNotificationIcon(notification.type)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between gap-4">
                        <div
                          className="flex-1 cursor-pointer"
                          onClick={() => handleNotificationClick(notification)}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-base">
                              {notification.title}
                            </h3>
                            {!notification.isRead && (
                              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {notification.message}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          {!notification.isRead && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleMarkAsRead(notification._id)}
                              disabled={isPending}
                              title="Mark as read"
                            >
                              <CheckCheck className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(notification._id)}
                            disabled={isPending}
                            title="Delete"
                            className="hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>
                            {formatDistanceToNow(new Date(notification.createdAt), {
                              addSuffix: true,
                            })}
                          </span>
                        </div>
                        {notification.priority && (
                          <>
                            <span>•</span>
                            {getPriorityBadge(notification.priority)}
                          </>
                        )}
                        {notification.relatedEntityType && (
                          <>
                            <span>•</span>
                            <Badge variant="outline" className="text-xs">
                              {notification.relatedEntityType}
                            </Badge>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NotificationsPage;
