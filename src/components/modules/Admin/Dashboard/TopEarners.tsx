'use client';

import { TrendingUp, Wallet } from 'lucide-react';

interface TopEarner {
  _id: string;
  balance: number;
  totalEarned: number;
  totalPlatformFee?: number;
  guide: {
    email: string;
    name: string;
  };
}

interface TopEarnersProps {
  earners: TopEarner[];
}

export default function TopEarners({ earners }: TopEarnersProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Top Earning Guides</h3>
          <p className="text-sm text-gray-600">Highest earning guides</p>
        </div>
        <div className="bg-green-50 p-2 rounded-lg">
          <Wallet className="h-5 w-5 text-green-600" />
        </div>
      </div>

      {earners.length === 0 ? (
        <div className="text-center py-12 text-gray-500">No earners data available</div>
      ) : (
        <div className="space-y-3">
          {earners.map((earner, index) => (
            <div
              key={earner._id}
              className="flex items-center gap-4 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
            >
              {/* Rank Badge */}
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  index === 0
                    ? 'bg-yellow-100 text-yellow-700'
                    : index === 1
                    ? 'bg-gray-100 text-gray-700'
                    : index === 2
                    ? 'bg-orange-100 text-orange-700'
                    : 'bg-blue-100 text-blue-700'
                }`}
              >
                {index + 1}
              </div>

              {/* Avatar */}
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white font-semibold">
                {earner.guide.name.charAt(0).toUpperCase()}
              </div>

              {/* Guide Info */}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 truncate">{earner.guide.name}</h4>
                <p className="text-sm text-gray-600 truncate">{earner.guide.email}</p>
              </div>

              {/* Earnings */}
              <div className="text-right flex-shrink-0">
                <div className="flex items-center gap-1 text-green-600 font-semibold">
                  <TrendingUp className="h-4 w-4" />
                  <span>৳{earner.totalEarned.toLocaleString()}</span>
                </div>
                <p className="text-xs text-gray-500">Balance: ৳{earner.balance.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
