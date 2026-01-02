import SubscribeEmailsHeader from '@/components/modules/Admin/SubscribeEmails/SubscribeEmailsHeader';
import SubscribersTable from '@/components/modules/Admin/SubscribeEmails/SubscribersTable';
import RecentSubscribers from '@/components/modules/Admin/SubscribeEmails/RecentSubscribers';
import { getAllSubscribers, getSubscriberStats, Subscriber, SubscriberStats } from '@/services/newsletter/newsletter.service';
import { Metadata } from 'next';
import TablePagination from '@/components/shared/TablePagination';
import { queryStringFormatter } from '@/lib/formatters';
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: 'Newsletter Subscribers | Admin Dashboard',
  description: 'Manage newsletter subscribers and view subscription statistics',
};

export default async function SubscribeEmailsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  // Fetch data in parallel
  const [subscribersResult, statsResult] = await Promise.all([
    getAllSubscribers(queryString),
    getSubscriberStats(),
  ]);

  console.log(subscribersResult, statsResult);
  



  const stats: SubscriberStats = statsResult.success && statsResult.data ? statsResult.data : {
    totalSubscribers: 0,
    totalUnsubscribed: 0,
    recentSubscribers: [],
  };

  return (
    <div className="space-y-6">
      <SubscribeEmailsHeader stats={stats} />
      
      {stats.recentSubscribers && stats.recentSubscribers.length > 0 && (
        <RecentSubscribers subscribers={stats.recentSubscribers} />
      )}
      
      <SubscribersTable subscribers={subscribersResult.data} meta={subscribersResult.meta} />
      
    </div>
  );
}
