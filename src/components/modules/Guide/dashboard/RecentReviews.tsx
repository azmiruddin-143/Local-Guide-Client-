'use client';

import { Star, MessageSquare } from 'lucide-react';

interface RecentReview {
  _id: string;
  rating: number;
  content: string | null;
  target: string;
  createdAt: string;
  author: {
    name: string;
    avatarUrl?: string;
  };
  tour: {
    title: string;
  };
}

interface RecentReviewsProps {
  reviews: RecentReview[];
  average: number;
}

export default function RecentReviews({ reviews, average }: RecentReviewsProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Recent Reviews</h3>
          <p className="text-sm text-gray-600">Latest feedback from tourists</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-yellow-50 p-2 rounded-lg">
            <Star className="h-5 w-5 text-yellow-600 fill-yellow-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{average.toFixed(1)}</p>
            <p className="text-xs text-gray-500">Avg Rating</p>
          </div>
        </div>
      </div>

      {reviews.length === 0 ? (
        <div className="text-center py-12 text-gray-500">No reviews yet</div>
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
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    {review.author.avatarUrl ? (
                      <img
                        src={review.author.avatarUrl}
                        alt={review.author.name}
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                        {review.author.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>

                  {/* Review Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">{review.author.name}</h4>
                        <p className="text-xs text-gray-500">{reviewDate}</p>
                      </div>
                      <div className="flex items-center gap-1">
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
                    <p className="text-sm text-gray-600 mb-2 line-clamp-1">{review.tour.title}</p>
                    {review.content && (
                      <div className="flex items-start gap-2 mt-2">
                        <MessageSquare className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-gray-700 line-clamp-2">{review.content}</p>
                      </div>
                    )}
                    <span
                      className={`inline-block mt-2 text-xs px-2 py-0.5 rounded-full ${
                        review.target === 'GUIDE'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {review.target === 'GUIDE' ? 'Guide Review' : 'Tour Review'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
