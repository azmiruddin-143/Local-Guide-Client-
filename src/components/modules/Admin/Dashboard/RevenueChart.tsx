'use client';

import { TrendingUp } from 'lucide-react';

interface MonthlyRevenue {
  _id: {
    year: number;
    month: number;
  };
  revenue: number;
  count: number;
}

interface RevenueChartProps {
  monthlyRevenue: MonthlyRevenue[];
}

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function RevenueChart({ monthlyRevenue }: RevenueChartProps) {
  // Reverse to show oldest to newest
  const data = [...monthlyRevenue].reverse();
  const maxRevenue = Math.max(...data.map((d) => d.revenue), 1);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Revenue Trend</h3>
          <p className="text-sm text-gray-600">Monthly revenue over time</p>
        </div>
        <div className="bg-green-50 p-2 rounded-lg">
          <TrendingUp className="h-5 w-5 text-green-600" />
        </div>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-12 text-gray-500">No revenue data available</div>
      ) : (
        <div className="space-y-4">
          {data.map((item, index) => {
            const percentage = (item.revenue / maxRevenue) * 100;
            const monthLabel = `${monthNames[item._id.month - 1]} ${item._id.year}`;

            return (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-700">{monthLabel}</span>
                  <div className="text-right">
                    <span className="font-semibold text-gray-900">৳{item.revenue.toLocaleString()}</span>
                    <span className="text-gray-500 ml-2 text-xs">({item.count} bookings)</span>
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-green-400 to-green-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
