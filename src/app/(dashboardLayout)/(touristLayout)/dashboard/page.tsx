import { Suspense } from 'react';
import { getTouristDashboardStats } from '@/services/tourist/dashboard.service';
import TouristDashboardOverview from '@/components/modules/Tourist/dashboard/TouristDashboardOverview';
import QuickActions from '@/components/modules/Tourist/dashboard/QuickActions';
import SpendingChart from '@/components/modules/Tourist/dashboard/SpendingChart';
import BookingsChart from '@/components/modules/Tourist/dashboard/BookingsChart';
import CategoryBreakdown from '@/components/modules/Tourist/dashboard/CategoryBreakdown';
import UpcomingTrips from '@/components/modules/Tourist/dashboard/UpcomingTrips';
import RecentReviews from '@/components/modules/Tourist/dashboard/RecentReviews';

export const metadata = {
  title: 'Tourist Dashboard | LocalGuide',
  description: 'Tourist dashboard with bookings, spending, and travel statistics',
};

export default async function TouristDashboardPage() {
  const stats = await getTouristDashboardStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome Back, Explorer!</h1>
        <p className="text-gray-600 mt-1">Ready for your next adventure? Here's your travel summary.</p>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        {/* Overview Cards */}
        <TouristDashboardOverview stats={stats} />

        {/* Quick Actions */}
        <QuickActions stats={stats} />

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SpendingChart monthlySpending={stats.spending.monthly} />
          <BookingsChart monthlyBookings={stats.bookings.monthly} />
        </div>

        {/* Category & Upcoming Trips */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CategoryBreakdown categories={stats.bookings.byCategory} />
          <UpcomingTrips bookings={stats.bookings.upcoming} />
        </div>

        {/* Recent Reviews */}
        <RecentReviews reviews={stats.reviews.recent} />
      </Suspense>
    </div>
  );
}
