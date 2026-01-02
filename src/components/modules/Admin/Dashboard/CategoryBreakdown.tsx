'use client';

import { PieChart } from 'lucide-react';

interface Category {
  _id: string;
  revenue: number;
  count: number;
}

interface CategoryBreakdownProps {
  categories: Category[];
}

const categoryColors = [
  { bg: 'bg-blue-500', text: 'text-blue-600', light: 'bg-blue-50' },
  { bg: 'bg-green-500', text: 'text-green-600', light: 'bg-green-50' },
  { bg: 'bg-yellow-500', text: 'text-yellow-600', light: 'bg-yellow-50' },
  { bg: 'bg-purple-500', text: 'text-purple-600', light: 'bg-purple-50' },
  { bg: 'bg-pink-500', text: 'text-pink-600', light: 'bg-pink-50' },
  { bg: 'bg-indigo-500', text: 'text-indigo-600', light: 'bg-indigo-50' },
  { bg: 'bg-red-500', text: 'text-red-600', light: 'bg-red-50' },
  { bg: 'bg-orange-500', text: 'text-orange-600', light: 'bg-orange-50' },
];

export default function CategoryBreakdown({ categories }: CategoryBreakdownProps) {
  const totalRevenue = categories.reduce((sum, cat) => sum + cat.revenue, 0);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Revenue by Category</h3>
          <p className="text-sm text-gray-600">Breakdown by tour category</p>
        </div>
        <div className="bg-blue-50 p-2 rounded-lg">
          <PieChart className="h-5 w-5 text-blue-600" />
        </div>
      </div>

      {categories.length === 0 ? (
        <div className="text-center py-12 text-gray-500">No category data available</div>
      ) : (
        <div className="space-y-4">
          {categories.map((category, index) => {
            const percentage = ((category.revenue / totalRevenue) * 100).toFixed(1);
            const colors = categoryColors[index % categoryColors.length];

            return (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${colors.bg}`} />
                    <span className="font-medium text-gray-700 capitalize">{category._id}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-gray-900">৳{category.revenue.toLocaleString()}</span>
                    <span className="text-gray-500 text-sm ml-2">({percentage}%)</span>
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className={`${colors.bg} h-full rounded-full transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 pl-6">{category.count} bookings</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
