'use client';

import { MapPin, Calendar, DollarSign, Star, TrendingUp, Users } from 'lucide-react';
import { GuideDashboardStats } from '@/services/guide/dashboard.service';

interface GuideDashboardOverviewProps {
  stats: GuideDashboardStats;
}

export default function GuideDashboardOverview({ stats }: GuideDashboardOverviewProps) {
  const overviewCards = [
    {
      title: 'Active Tours',
      value: stats.tours.active.toLocaleString(),
      subtitle: `${stats.tours.total} total tours`,
      icon: MapPin,
      bgColor: 'bg-blue-500',
      lightBg: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      title: 'Total Bookings',
      value: stats.bookings.total.toLocaleString(),
      subtitle: `${stats.bookings.upcoming.length} upcoming`,
      icon: Calendar,
      bgColor: 'bg-purple-500',
      lightBg: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
    {
      title: 'Total Earnings',
      value: `৳${stats.earnings.total.toLocaleString()}`,
      subtitle: `${stats.earnings.totalTransactions} transactions`,
      icon: DollarSign,
      bgColor: 'bg-green-500',
      lightBg: 'bg-green-50',
      textColor: 'text-green-600',
    },
    {
      title: 'Average Rating',
      value: stats.reviews.average.toFixed(1),
      subtitle: `${stats.reviews.total} reviews`,
      icon: Star,
      bgColor: 'bg-yellow-500',
      lightBg: 'bg-yellow-50',
      textColor: 'text-yellow-600',
    },
    {
      title: 'Total Payouts',
      value: `৳${stats.payouts.totalPaidOut.toLocaleString()}`,
      subtitle: `${stats.payouts.total} payouts`,
      icon: TrendingUp,
      bgColor: 'bg-orange-500',
      lightBg: 'bg-orange-50',
      textColor: 'text-orange-600',
    },
    {
      title: 'Pending Payouts',
      value: stats.payouts.pending.count.toLocaleString(),
      subtitle: `৳${stats.payouts.pending.totalNetAmount.toLocaleString()}`,
      icon: Users,
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
