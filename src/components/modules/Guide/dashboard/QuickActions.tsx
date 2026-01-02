'use client';

import { Plus, Calendar, MapPin, Settings } from 'lucide-react';
import Link from 'next/link';
import { GuideDashboardStats } from '@/services/guide/dashboard.service';

interface QuickActionsProps {
  stats: GuideDashboardStats;
}

export default function QuickActions({ stats }: QuickActionsProps) {
  const actions = [
    {
      title: 'Create Tour',
      icon: Plus,
      href: '/guide/dashboard/tours/create',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Manage Bookings',
      icon: Calendar,
      href: '/guide/dashboard/bookings',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      badge: stats.bookings.upcoming.length,
    },
    {
      title: 'My Tours',
      icon: MapPin,
      href: '/guide/dashboard/tours',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      badge: stats.tours.active,
    },
    {
      title: 'Settings',
      icon: Settings,
      href: '/guide/dashboard/settings',
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
      <div className="space-y-3">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Link
              key={index}
              href={action.href}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
            >
              <div className="flex items-center gap-3">
                <div className={`${action.bgColor} p-2 rounded-lg`}>
                  <Icon className={`h-5 w-5 ${action.color}`} />
                </div>
                <span className="font-medium text-gray-900">{action.title}</span>
              </div>
              {action.badge !== undefined && action.badge > 0 && (
                <span className="bg-red-100 text-red-700 text-xs font-semibold px-2 py-1 rounded-full">
                  {action.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
