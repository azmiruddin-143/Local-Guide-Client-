'use client';

import { Search, Calendar, Heart, User } from 'lucide-react';
import Link from 'next/link';
import { TouristDashboardStats } from '@/services/tourist/dashboard.service';

interface QuickActionsProps {
  stats: TouristDashboardStats;
}

export default function QuickActions({ stats }: QuickActionsProps) {
  const actions = [
    {
      title: 'Explore Tours',
      description: 'Find your next adventure',
      icon: Search,
      href: '/explore',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'My Bookings',
      description: `${stats.bookings.total} total bookings`,
      icon: Calendar,
      href: '/dashboard/bookings',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      badge: stats.bookings.upcoming.length,
    },
    {
      title: 'Profile Settings',
      description: 'Update your preferences',
      icon: User,
      href: '/dashboard/settings',
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((action, index) => {
        const Icon = action.icon;
        return (
          <Link
            key={index}
            href={action.href}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all hover:scale-105"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`${action.bgColor} p-3 rounded-lg`}>
                <Icon className={`h-6 w-6 ${action.color}`} />
              </div>
              {action.badge !== undefined && action.badge > 0 && (
                <span className="bg-red-100 text-red-700 text-xs font-semibold px-2 py-1 rounded-full">
                  {action.badge}
                </span>
              )}
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
            <p className="text-sm text-gray-600">{action.description}</p>
          </Link>
        );
      })}
    </div>
  );
}
