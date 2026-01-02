'use client';

import { Users, MapPin, ShoppingBag, DollarSign, TrendingUp, Star } from 'lucide-react';
import { AdminDashboardStats } from '@/services/admin/dashboard.service';

interface DashboardOverviewProps {
  stats: AdminDashboardStats;
}

export default function DashboardOverview({ stats }: DashboardOverviewProps) {
  const overviewCards = [
    {
      title: 'Total Users',
      value: stats.users.total.toLocaleString(),
      subtitle: `${stats.users.verified} verified`,
      icon: Users,
      bgColor: 'bg-blue-500',
      lightBg: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      title: 'Active Tours',
      value: stats.tours.active.toLocaleString(),
      subtitle: `${stats.tours.total} total tours`,
      icon: MapPin,
      bgColor: 'bg-green-500',
      lightBg: 'bg-green-50',
      textColor: 'text-green-600',
    },
    {
      title: 'Total Bookings',
      value: stats.bookings.total.toLocaleString(),
      subtitle: `৳${stats.revenue.total.toLocaleString()} revenue`,
      icon: ShoppingBag,
      bgColor: 'bg-purple-500',
      lightBg: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
    {
      title: 'Platform Revenue',
      value: `৳${stats.revenue.total.toLocaleString()}`,
      subtitle: `${stats.revenue.totalTransactions} transactions`,
      icon: DollarSign,
      bgColor: 'bg-yellow-500',
      lightBg: 'bg-yellow-50',
      textColor: 'text-yellow-600',
    },
    {
      title: 'Platform Fees',
      value: `৳${stats.payouts.totalPlatformFees.toLocaleString()}`,
      subtitle: `From ${stats.payouts.total} payouts`,
      icon: TrendingUp,
      bgColor: 'bg-orange-500',
      lightBg: 'bg-orange-50',
      textColor: 'text-orange-600',
    },
    {
      title: 'Total Reviews',
      value: stats.reviews.total.toLocaleString(),
      subtitle: `${stats.reviews.byTarget.reduce((sum, t) => sum + t.avgRating, 0) / stats.reviews.byTarget.length || 0} avg rating`,
      icon: Star,
      bgColor: 'bg-pink-500',
      lightBg: 'bg-pink-50',
      textColor: 'text-pink-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {overviewCards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-1">{card.title}</p>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{card.value}</h3>
                <p className="text-sm text-gray-500">{card.subtitle}</p>
              </div>
              <div className={`${card.lightBg} p-3 rounded-lg`}>
                <Icon className={`h-6 w-6 ${card.textColor}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
