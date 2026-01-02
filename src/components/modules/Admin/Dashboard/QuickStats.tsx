'use client';

import { Mail, MessageSquare, Wallet, AlertCircle } from 'lucide-react';
import { AdminDashboardStats } from '@/services/admin/dashboard.service';
import Link from 'next/link';

interface QuickStatsProps {
  stats: AdminDashboardStats;
}

export default function QuickStats({ stats }: QuickStatsProps) {
  const quickStats = [
    {
      title: 'Newsletter Subscribers',
      value: stats.subscribers.active,
      icon: Mail,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      link: '/admin/dashboard/subscribe-emails',
    },
    {
      title: 'Unread Messages',
      value: stats.contacts.unread,
      icon: MessageSquare,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      link: '/admin/dashboard/contact-messages',
      alert: stats.contacts.unread > 0,
    },
    {
      title: 'Total Wallets',
      value: stats.wallets.total,
      icon: Wallet,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      link: '#',
    },
    {
      title: 'Pending Payouts',
      value: stats.payouts.pending.count,
      icon: AlertCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      link: '/admin/dashboard/payouts-management',
      alert: stats.payouts.pending.count > 0,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {quickStats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Link
            key={index}
            href={stat.link}
            className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all hover:scale-105"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  {stat.alert && (
                    <span className="flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                  )}
                </div>
              </div>
              <div className={`${stat.bgColor} p-3 rounded-lg`}>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
