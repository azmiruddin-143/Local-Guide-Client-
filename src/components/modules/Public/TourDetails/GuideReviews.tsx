"use client";

import { useState, useEffect } from "react";
import { getReviewsByGuideId } from "@/services/review/review.service";
import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarOutlineIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { IReview } from "@/types/review.interface";

interface GuideReviewsProps {
  guideId: string;
}

interface ReviewsResponse {
  success: boolean;
  data?: {
    reviews: IReview[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
      hasMore: boolean;
    };
  };
  message?: string;
}

export default function GuideReviews({ guideId }: GuideReviewsProps) {
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 0,
    hasMore: false,
  });

  const limit = 5;

  useEffect(() => {
    loadReviews();
  }, [page, guideId]);

  const loadReviews = async () => {
    setLoading(true);
    try {
      const response: ReviewsResponse = await getReviewsByGuideId(guideId, page, limit);
      if (response.success && response.data) {
        setReviews(response.data.reviews);
        setPagination({
          total: response.data.pagination.total,
          totalPages: response.data.pagination.totalPages,
          hasMore: response.data.pagination.hasMore,
        });
      }
    } catch (error) {
      console.error("Failed to load reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <div key={star}>
            {star <= rating ? (
              <StarIcon className="w-5 h-5 text-yellow-400" />
            ) : (
              <StarOutlineIcon className="w-5 h-5 text-gray-300" />
            )}
          </div>
        ))}
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (pagination.total === 0 && !loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Guide Reviews</h2>
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <StarOutlineIcon className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500">No reviews yet for this guide.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 mt-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Guide Reviews ({pagination.total})
        </h2>
      </div>

      {loading ? (
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full" />
                <div className="flex-1 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-1/4" />
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="space-y-6">
            {reviews.map((review) => (
              <div
                key={review._id?.toString()}
                className="border-b border-gray-200 last:border-0 pb-6 last:pb-0"
              >
                <div className="flex gap-4">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    {review.authorId?.avatarUrl ? (
                      <Image
                        src={review.authorId.avatarUrl}
                        alt={review.authorId.name || "User"}
                        width={48}
                        height={48}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-lg">
                          {review.authorId?.name?.charAt(0).toUpperCase() || "U"}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Review Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {review.authorId?.name || "Anonymous"}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          {renderStars(review.rating)}
                          {review.verifiedBooking && (
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                              Verified Booking
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500 whitespace-nowrap">
                        {formatDate(review.createdAt)}
                      </span>
                    </div>

                    {review.content && (
                      <p className="text-gray-700 leading-relaxed mb-3">
                        {review.content}
                      </p>
                    )}

                    {review.experienceTags && review.experienceTags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {review.experienceTags.map((tag: string, index: number) => (
                          <span
                            key={index}
                            className="text-xs bg-green-50 text-green-700 px-3 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {review.photos && review.photos.length > 0 && (
                      <div className="flex gap-2 flex-wrap">
                        {review.photos.map((photo: string, index: number) => (
                          <Image
                            key={index}
                            src={photo}
                            alt={`Review photo ${index + 1}`}
                            width={100}
                            height={100}
                            className="rounded-lg object-cover"
                          />
                        ))}
                      </div>
                    )}

                    {review.isEdited && (
                      <p className="text-xs text-gray-400 mt-2">Edited</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              
              <div className="flex gap-1">
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pageNum) => {
                  // Show first page, last page, current page, and pages around current
                  if (
                    pageNum === 1 ||
                    pageNum === pagination.totalPages ||
                    (pageNum >= page - 1 && pageNum <= page + 1)
                  ) {
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        className={`w-10 h-10 rounded-lg transition-colors ${
                          page === pageNum
                            ? "bg-green-600 text-white"
                            : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  } else if (pageNum === page - 2 || pageNum === page + 2) {
                    return (
                      <span key={pageNum} className="w-10 h-10 flex items-center justify-center">
                        ...
                      </span>
                    );
                  }
                  return null;
                })}
              </div>

              <button
                onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                disabled={page === pagination.totalPages}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
