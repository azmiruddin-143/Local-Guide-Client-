import NotificationsPage from "@/components/modules/Notifications/NotificationsPage";
import { getUserNotifications } from "@/services/notification/notification.service";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notifications - LocalGuide",
  description: "View and manage your notifications",
};

const Notifications = async () => {
  const notifications = await getUserNotifications();
  console.log(notifications);
  
  
  return <NotificationsPage initialNotifications={notifications} />;
};

export default Notifications;
