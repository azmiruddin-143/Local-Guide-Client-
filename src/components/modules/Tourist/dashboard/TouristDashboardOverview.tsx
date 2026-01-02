'use client';

import { Calendar, DollarSign, Star, Heart, MapPin, TrendingUp } from 'lucide-react';
import { TouristDashboardStats } from '@/services/tourist/dashboard.service';

interface TouristDashboardOverviewProps {
  stats: TouristDashboardStats;
}

export default function TouristDashboardOverview({ stats }: TouristDashboardOverviewProps) {
  const completedCount = stats.bookings.byStatus.find((s) => s._id === 'COMPLETED')?.count || 0;
  const avgRating = stats.reviews.byTarget.reduce((sum, t) => sum + t.avgRating, 0) / stats.reviews.byTarget.length || 0;

  const overviewCards = [
    {
      title: 'Total Bookings',
      value: stats.bookings.total.toLocaleString(),
      subtitle: `${completedCount} completed`,
      icon: Calendar,
      bgColor: 'bg-blue-500',
      lightBg: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      title: 'Total Spent',
      value: `৳${stats.spending.total.toLocaleString()}`,
      subtitle: `${stats.spending.totalTransactions} transactions`,
      icon: DollarSign,
      bgColor: 'bg-green-500',
      lightBg: 'bg-green-50',
      textColor: 'text-green-600',
    },
    {
      title: 'Reviews Given',
      value: stats.reviews.total.toLocaleString(),
      subtitle: `${avgRating.toFixed(1)} avg rating`,
      icon: Star,
      bgColor: 'bg-yellow-500',
      lightBg: 'bg-yellow-50',
      textColor: 'text-yellow-600',
    },
    {
      title: 'Upcoming Trips',
      value: stats.bookings.upcoming.length.toLocaleString(),
      subtitle: 'Confirmed tours',
      icon: MapPin,
      bgColor: 'bg-purple-500',
      lightBg: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
    {
      title: 'Avg Transaction',
      value: `৳${Math.round(stats.spending.avgTransaction).toLocaleString()}`,
      subtitle: 'Per booking',
      icon: TrendingUp,
      bgColor: 'bg-orange-500',
      lightBg: 'bg-orange-50',
      textColor: 'text-orange-600',
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
