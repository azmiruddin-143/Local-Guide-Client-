'use client';

import { Star, MessageSquare } from 'lucide-react';

interface RecentReview {
  _id: string;
  rating: number;
  content: string | null;
  target: string;
  createdAt: string;
  tour: {
    title: string;
  };
  guide?: {
    name: string;
  };
}

interface RecentReviewsProps {
  reviews: RecentReview[];
}

export default function RecentReviews({ reviews }: RecentReviewsProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Your Reviews</h3>
          <p className="text-sm text-gray-600">Recent feedback you've given</p>
        </div>
        <div className="bg-yellow-50 p-2 rounded-lg">
          <Star className="h-5 w-5 text-yellow-600 fill-yellow-600" />
        </div>
      </div>

      {reviews.length === 0 ? (
        <div className="text-center py-12">
          <Star className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No reviews yet</p>
          <p className="text-sm text-gray-400 mt-1">Complete a tour to leave your first review</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.slice(0, 5).map((review) => {
            const reviewDate = new Date(review.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            });

            return (
              <div key={review._id} className="p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1 line-clamp-1">{review.tour.title}</h4>
                    {review.guide && (
                      <p className="text-sm text-gray-600">Guide: {review.guide.name}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">{reviewDate}</p>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0 ml-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {review.content && (
                  <div className="flex items-start gap-2 mt-2">
                    <MessageSquare className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700 line-clamp-2">{review.content}</p>
                  </div>
                )}

                <span
                  className={`inline-block mt-3 text-xs px-2 py-0.5 rounded-full ${
                    review.target === 'GUIDE'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-green-100 text-green-700'
                  }`}
                >
                  {review.target === 'GUIDE' ? 'Guide Review' : 'Tour Review'}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {reviews.length > 5 && (
        <div className="text-center mt-4">
          <button className="text-sm text-primary hover:text-primary/80 font-medium">
            View all reviews →
          </button>
        </div>
      )}
    </div>
  );
}
