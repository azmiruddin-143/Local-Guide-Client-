import { Mail, Users, UserX } from 'lucide-react';
import { SubscriberStats } from '@/services/newsletter/newsletter.service';

interface SubscribeEmailsHeaderProps {
  stats: SubscriberStats;
}

export default function SubscribeEmailsHeader({ stats }: SubscribeEmailsHeaderProps) {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Newsletter Subscribers</h1>
      <p className="text-gray-600 mb-6">Manage and view all newsletter subscriptions</p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600 mb-1">Total Subscribers</p>
              <p className="text-3xl font-bold text-blue-900">{stats.totalSubscribers}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600 mb-1">Active Subscribers</p>
              <p className="text-3xl font-bold text-green-900">{stats.totalSubscribers}</p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <Mail className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 border border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-600 mb-1">Unsubscribed</p>
              <p className="text-3xl font-bold text-red-900">{stats.totalUnsubscribed}</p>
            </div>
            <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
              <UserX className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
