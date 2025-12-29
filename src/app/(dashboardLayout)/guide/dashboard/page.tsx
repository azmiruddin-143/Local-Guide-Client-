import { Suspense } from 'react';
import { getGuideDashboardStats } from '@/services/guide/dashboard.service';
import GuideDashboardOverview from '@/components/modules/Guide/dashboard/GuideDashboardOverview';
import WalletCard from '@/components/modules/Guide/dashboard/WalletCard';
import QuickActions from '@/components/modules/Guide/dashboard/QuickActions';
import EarningsChart from '@/components/modules/Guide/dashboard/EarningsChart';
import TopEarningTours from '@/components/modules/Guide/dashboard/TopEarningTours';
import UpcomingBookings from '@/components/modules/Guide/dashboard/UpcomingBookings';
import RecentReviews from '@/components/modules/Guide/dashboard/RecentReviews';
import BookingsChart from '@/components/modules/Guide/dashboard/BookingsChart';


export const metadata = {
  title: 'Guide Dashboard | LocalGuide',
  description: 'Guide dashboard with earnings, bookings, and tour statistics',
};

export default async function GuideDashboardPage() {
  const stats = await getGuideDashboardStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome Back!</h1>
        <p className="text-gray-600 mt-1">Here's an overview of your tours and earnings.</p>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        {/* Overview Cards */}
        <GuideDashboardOverview stats={stats} />

        {/* Wallet & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <WalletCard wallet={stats.wallet} payouts={stats.payouts} />
          </div>
          <QuickActions stats={stats} />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <EarningsChart monthlyEarnings={stats.earnings.monthly} />
          <BookingsChart monthlyBookings={stats.bookings.monthly} />
        </div>

        {/* Top Tours & Upcoming Bookings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TopEarningTours tours={stats.earnings.byTour} />
          <UpcomingBookings bookings={stats.bookings.upcoming} />
        </div>

        {/* Recent Reviews */}
        <RecentReviews reviews={stats.reviews.recent} average={stats.reviews.average} />
      </Suspense>
    </div>
  );
}