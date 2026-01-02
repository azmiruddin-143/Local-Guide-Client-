'use client';

import { TrendingUp, DollarSign } from 'lucide-react';
import Link from 'next/link';

interface TopEarningTour {
  _id: string;
  earnings: number;
  bookings: number;
  tour: {
    title: string;
    slug: string;
  };
}

interface TopEarningToursProps {
  tours: TopEarningTour[];
}

export default function TopEarningTours({ tours }: TopEarningToursProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Top Earning Tours</h3>
          <p className="text-sm text-gray-600">Your highest revenue tours</p>
        </div>
        <div className="bg-green-50 p-2 rounded-lg">
          <DollarSign className="h-5 w-5 text-green-600" />
        </div>
      </div>

      {tours.length === 0 ? (
        <div className="text-center py-12 text-gray-500">No tours available</div>
      ) : (
        <div className="space-y-3">
          {tours.map((tour, index) => (
            <Link
              key={tour._id}
              href={`/tours/${tour.tour.slug}`}
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
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

              {/* Tour Info */}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 mb-1 line-clamp-1">{tour.tour.title}</h4>
                <p className="text-sm text-gray-500">{tour.bookings} bookings</p>
              </div>

              {/* Earnings */}
              <div className="text-right flex-shrink-0">
                <div className="flex items-center gap-1 text-green-600 font-semibold">
                  <TrendingUp className="h-4 w-4" />
                  <span>৳{tour.earnings.toLocaleString()}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
