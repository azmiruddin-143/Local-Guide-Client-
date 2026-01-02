import { Suspense } from 'react';
import { getAdminDashboardStats } from '@/services/admin/dashboard.service';
import DashboardOverview from '@/components/modules/Admin/Dashboard/DashboardOverview';
import RevenueChart from '@/components/modules/Admin/Dashboard/RevenueChart';
import BookingsChart from '@/components/modules/Admin/Dashboard/BookingsChart';

import TopRatedTours from '@/components/modules/Admin/Dashboard/TopRatedTours';

import TopEarners from '@/components/modules/Admin/Dashboard/TopEarners';
import QuickStats from '@/components/modules/Admin/Dashboard/QuickStats';
import CategoryBreakdown from '@/components/modules/Admin/Dashboard/CategoryBreakdown';
import RecentUsers from '@/components/modules/Admin/Dashboard/RecentUsers';

export const metadata = {
  title: 'Admin Dashboard | LocalGuide',
  description: 'Comprehensive admin dashboard with platform statistics',
};

export default async function AdminDashboardPage() {
  const stats = await getAdminDashboardStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your platform.</p>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        {/* Overview Cards */}
        <DashboardOverview stats={stats} />

        {/* Quick Stats */}
        <QuickStats stats={stats} />

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RevenueChart monthlyRevenue={stats.revenue.monthly} />
          <BookingsChart monthlyBookings={stats.bookings.monthly} />
        </div>

        {/* Category & Top Tours */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CategoryBreakdown categories={stats.revenue.byCategory} />
          <TopRatedTours tours={stats.tours.topRated} />
        </div>

        {/* Recent Users & Top Earners */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentUsers users={stats.users.recent} />
          <TopEarners earners={stats.wallets.topEarners} />
        </div>
      </Suspense>
    </div>
  );
}
