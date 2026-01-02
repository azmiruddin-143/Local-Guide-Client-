'use client';

import { Star, MapPin } from 'lucide-react';
import Link from 'next/link';

interface TopRatedTour {
  _id: string;
  title: string;
  slug: string;
  category: string;
  averageRating: number;
  reviewCount: number;
  guide: {
    name: string;
  };
}

interface TopRatedToursProps {
  tours: TopRatedTour[];
}

export default function TopRatedTours({ tours }: TopRatedToursProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Top Rated Tours</h3>
          <p className="text-sm text-gray-600">Highest rated active tours</p>
        </div>
        <div className="bg-yellow-50 p-2 rounded-lg">
          <Star className="h-5 w-5 text-yellow-600" />
        </div>
      </div>

      {tours.length === 0 ? (
        <div className="text-center py-12 text-gray-500">No tours available</div>
      ) : (
        <div className="space-y-4">
          {tours.map((tour, index) => (
            <Link
              key={tour._id}
              href={`/tours/${tour.slug}`}
              className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
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
                <h4 className="font-semibold text-gray-900 mb-1 line-clamp-1">{tour.title}</h4>
                <div className="flex items-center gap-3 text-sm text-gray-600 mb-2">
                  <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs font-medium capitalize">
                    {tour.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {tour.guide.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-gray-900">{tour.averageRating.toFixed(1)}</span>
                  </div>
                  <span className="text-sm text-gray-500">({tour.reviewCount} reviews)</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
