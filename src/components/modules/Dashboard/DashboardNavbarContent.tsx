"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserInfo } from "@/types/user.interface";
import { INotification, NotificationType } from "@/types/notification.interface";
import { 
  Bell, 
  Menu, 
  Search, 
  Command, 
  CheckCheck, 
  Trash2, 
  Clock,
  Calendar,
  CreditCard,
  Star,
  DollarSign,
  UserCheck,
  Lock
} from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import DashboardMobileSidebar from "./DashboardMobileSidebar";
import UserDropdown from "./UserDropdown";
import { NavSection } from "@/types/dashboard.interface";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";
import {
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
} from "@/services/notification/notification.service";
import { toast } from "sonner";
import SearchBar from "./SearchBar";

interface DashboardNavbarContentProps {
  userInfo: UserInfo;
  navItems?: NavSection[];
  dashboardHome?: string;
  initialNotifications?: INotification[];
  initialUnreadCount?: number;
}

const DashboardNavbarContent = ({
  userInfo,
  navItems,
  dashboardHome,
  initialNotifications = [],
  initialUnreadCount = 0,
}: DashboardNavbarContentProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [notifications, setNotifications] = useState<INotification[]>(initialNotifications);
  const [unreadCount, setUnreadCount] = useState(initialUnreadCount);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  // Get only the 5 most recent notifications for navbar
  const recentNotifications = notifications.slice(0, 5);

  const handleMarkAsRead = async (notificationId: string) => {
    startTransition(async () => {
      const success = await markNotificationAsRead(notificationId);
      if (success) {
        setNotifications((prev) =>
          prev.map((n) => (n._id === notificationId ? { ...n, isRead: true } : n))
        );
        setUnreadCount((prev) => Math.max(0, prev - 1));
        router.refresh();
      }
    });
  };

  const handleMarkAllAsRead = async () => {
    if (unreadCount === 0) return;

    startTransition(async () => {
      const success = await markAllNotificationsAsRead();
      if (success) {
        setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
        setUnreadCount(0);
        toast.success("All notifications marked as read");
        router.refresh();
      }
    });
  };

  const handleDelete = async (notificationId: string) => {
    startTransition(async () => {
      const success = await deleteNotification(notificationId);
      if (success) {
        const wasUnread = notifications.find((n) => n._id === notificationId)?.isRead === false;
        setNotifications((prev) => prev.filter((n) => n._id !== notificationId));
        if (wasUnread) {
          setUnreadCount((prev) => Math.max(0, prev - 1));
        }
        router.refresh();
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
    const iconClass = "h-4 w-4";
    switch (type) {
      case NotificationType.BOOKING_CREATED:
      case NotificationType.BOOKING_CONFIRMED:
      case NotificationType.BOOKING_DECLINED:
      case NotificationType.BOOKING_CANCELLED:
      case NotificationType.BOOKING_COMPLETED:
        return <Calendar className={`${iconClass} text-blue-500`} />;
      case NotificationType.PAYMENT_SUCCESS:
        return <CreditCard className={`${iconClass} text-green-500`} />;
      case NotificationType.PAYMENT_FAILED:
      case NotificationType.PAYMENT_REFUNDED:
        return <CreditCard className={`${iconClass} text-orange-500`} />;
      case NotificationType.REVIEW_RECEIVED_TOUR:
      case NotificationType.REVIEW_RECEIVED_GUIDE:
        return <Star className={`${iconClass} text-yellow-500`} />;
      case NotificationType.PAYOUT_REQUESTED:
      case NotificationType.PAYOUT_PROCESSED:
        return <DollarSign className={`${iconClass} text-green-500`} />;
      case NotificationType.PAYOUT_FAILED:
      case NotificationType.PAYOUT_CANCELLED:
        return <DollarSign className={`${iconClass} text-red-500`} />;
      case NotificationType.ACCOUNT_VERIFIED:
      case NotificationType.ACCOUNT_STATUS_CHANGED:
        return <UserCheck className={`${iconClass} text-blue-500`} />;
      case NotificationType.PASSWORD_RESET_SUCCESS:
        return <Lock className={`${iconClass} text-purple-500`} />;
      default:
        return <Bell className={`${iconClass} text-gray-500`} />;
    }
  };

  useEffect(() => {
    const checkSmallerScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkSmallerScreen();
    window.addEventListener("resize", checkSmallerScreen);

    return () => {
      window.removeEventListener("resize", checkSmallerScreen);
    };
  }, []);
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-xl supports-backdrop-filter:bg-background/80 shadow-sm">
      <div className="flex h-16 items-center justify-between gap-4 px-4 md:px-6">
        {/* Mobile Menu Toggle */}
        <Sheet open={isMobile && isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon"
              className="hover:bg-accent/50 transition-all duration-200"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <DashboardMobileSidebar
              userInfo={userInfo}
              navItems={navItems || []}
              dashboardHome={dashboardHome || ""}
            />
          </SheetContent>
        </Sheet>
        {/* Search Bar */}
        <SearchBar userInfo={userInfo} />
       

        {/* Right Side Actions */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-accent/50 transition-all duration-200 group"
              >
                <Bell className="h-5 w-5 transition-transform group-hover:scale-110 group-hover:rotate-12" />
                {unreadCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] font-semibold animate-pulse"
                  >
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 p-0">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <div>
                  <h3 className="font-semibold text-sm">Notifications</h3>
                  <p className="text-xs text-muted-foreground">
                    You have {unreadCount} unread message
                    {unreadCount !== 1 ? "s" : ""}
                  </p>
                </div>
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleMarkAllAsRead}
                    disabled={isPending}
                    className="h-8 text-xs gap-1"
                  >
                    <CheckCheck className="h-3 w-3" />
                    Mark all read
                  </Button>
                )}
              </div>

              {/* Notifications List */}
              <ScrollArea className="h-[300px]">
                {recentNotifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 px-4">
                    <Bell className="h-12 w-12 text-muted-foreground/50 mb-3" />
                    <p className="text-sm font-medium text-muted-foreground">
                      No notifications
                    </p>
                    <p className="text-xs text-muted-foreground">
                      You're all caught up!
                    </p>
                  </div>
                ) : (
                  <div className="divide-y">
                    {recentNotifications.map((notification) => (
                      <div
                        key={notification._id}
                        className={`group relative p-4 hover:bg-accent/50 transition-colors cursor-pointer ${
                          !notification.isRead ? "bg-primary/5" : ""
                        }`}
                        onClick={() => handleNotificationClick(notification)}
                      >
                        <div className="flex gap-3">
                          {/* Icon */}
                          <div className="shrink-0 mt-0.5">
                            {getNotificationIcon(notification.type)}
                          </div>

                          {/* Content */}
                          <div className="flex-1 space-y-1">
                            <div className="flex items-start justify-between gap-2">
                              <p className="text-sm font-medium leading-none">
                                {notification.title}
                              </p>
                              {!notification.isRead && (
                                <div className="h-2 w-2 rounded-full bg-primary shrink-0 mt-1" />
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-2">
                              {notification.message}
                            </p>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              <span>
                                {formatDistanceToNow(new Date(notification.createdAt), {
                                  addSuffix: true,
                                })}
                              </span>
                            </div>
                          </div>

                          {/* Delete Button */}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(notification._id);
                            }}
                            disabled={isPending}
                          >
                            <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>

              {/* Footer */}
              {notifications.length > 0 && (
                <div className="border-t p-2">
                  <Button
                    variant="ghost"
                    className="w-full text-xs font-medium text-primary hover:text-primary"
                    onClick={() => router.push("/notifications")}
                  >
                    View all notifications
                  </Button>
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Dropdown */}
          <UserDropdown userInfo={userInfo} />
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbarContent;
