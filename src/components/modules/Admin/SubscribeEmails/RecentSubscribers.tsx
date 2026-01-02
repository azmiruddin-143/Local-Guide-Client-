import { Subscriber } from '@/services/newsletter/newsletter.service';
import { format } from 'date-fns';
import { Mail, TrendingUp } from 'lucide-react';

interface RecentSubscribersProps {
  subscribers: Subscriber[];
}

export default function RecentSubscribers({ subscribers }: RecentSubscribersProps) {
  // Ensure subscribers is always an array
  const subscribersList = Array.isArray(subscribers) ? subscribers : [];

  if (subscribersList.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">Recent Subscribers</h2>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {subscribersList.map((subscriber) => (
          <div key={subscriber._id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{subscriber.email}</p>
                  <p className="text-xs text-gray-500">
                    {format(new Date(subscriber.subscribedAt), 'MMM dd, yyyy • hh:mm a')}
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                New
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
