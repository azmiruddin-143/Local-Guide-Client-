import { getDefaultDashboardRoute } from "@/lib/auth-utils";
import { getNavItemsByRole } from "@/lib/navItems.config";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { getUserNotifications, getUnreadCount } from "@/services/notification/notification.service";
import { UserInfo } from "@/types/user.interface";
import DashboardNavbarContent from "./DashboardNavbarContent";

const DashboardNavbar = async () => {
  const userInfo = (await getUserInfo()) as UserInfo;
  const navItems = getNavItemsByRole(userInfo.role);
  const dashboardHome = getDefaultDashboardRoute(userInfo.role);
  
  // Fetch notifications and unread count
  const [notifications, unreadCount] = await Promise.all([
    getUserNotifications(),
    getUnreadCount(),
  ]);

  return (
    <DashboardNavbarContent
      userInfo={userInfo}
      navItems={navItems}
      dashboardHome={dashboardHome}
      initialNotifications={notifications}
      initialUnreadCount={unreadCount}
    />
  );
};

export default DashboardNavbar;
