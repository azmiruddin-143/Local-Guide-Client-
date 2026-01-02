'use client';

import { IReview } from '@/types/review.interface';
import { deleteReviewByAdmin } from '@/services/admin/reviewManagement';
import { format } from 'date-fns';
import { X, Star, User, MapPin, Calendar, Tag, Image as ImageIcon, Trash2, CheckCircle } from 'lucide-react';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

interface ReviewDetailsModalProps {
  review: IReview;
  onClose: () => void;
}

export default function ReviewDetailsModal({ review, onClose }: ReviewDetailsModalProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    if (!confirm('Are you sure you want to delete this review? This action cannot be undone.')) return;

    setIsDeleting(true);
    startTransition(async () => {
      await deleteReviewByAdmin(review._id!);
      setIsDeleting(false);
      onClose();
      router.refresh();
    });
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-2 text-lg font-semibold text-gray-900">{rating}.0</span>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Review Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Type and Rating */}
          <div className="flex items-center justify-between">
            <span className={`inline-flex px-4 py-2 rounded-lg text-sm font-medium ${
              review.target === 'TOUR' 
                ? 'bg-purple-100 text-purple-800' 
                : 'bg-green-100 text-green-800'
            }`}>
              {review.target} Review
            </span>
            {renderStars(review.rating)}
          </div>

          {/* Author Information */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Author Information</h3>
            <div className="flex items-center gap-4">
              {review.authorId?.avatarUrl ? (
                <img
                  src={review.authorId.avatarUrl}
                  alt={review.authorId.name}
                  className="w-16 h-16 rounded-full"
                />
              ) : (
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-blue-600" />
                </div>
              )}
              <div>
                <p className="text-lg font-medium text-gray-900">{review.authorId?.name}</p>
                <p className="text-sm text-gray-600">{review.authorId?.email}</p>
                {review.verifiedBooking && (
                  <div className="flex items-center gap-1 text-sm text-green-600 mt-1">
                    <CheckCircle className="w-4 h-4" />
                    Verified Booking
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Target Information */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {review.target === 'TOUR' ? 'Tour Information' : 'Guide Information'}
            </h3>
            {review.target === 'TOUR' ? (
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Tour</p>
                  <p className="text-base font-medium text-gray-900">{review.tourId?.title || 'N/A'}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <User className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Guide</p>
                  <p className="text-base font-medium text-gray-900">{review.guideId?.name || 'N/A'}</p>
                  <p className="text-sm text-gray-600">{review.guideId?.email}</p>
                </div>
              </div>
            )}
          </div>

          {/* Review Content */}
          {review.content && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Review Content</h3>
              <div className="bg-gray-50 rounded-xl p-6">
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {review.content}
                </p>
              </div>
            </div>
          )}

          {/* Experience Tags */}
          {review.experienceTags && review.experienceTags.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Tag className="w-5 h-5 text-gray-600" />
                <h3 className="text-lg font-semibold text-gray-900">Experience Tags</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {review.experienceTags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Photos */}
          {review.photos && review.photos.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <ImageIcon className="w-5 h-5 text-gray-600" />
                <h3 className="text-lg font-semibold text-gray-900">Photos</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {review.photos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`Review photo ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Metadata */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Metadata</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Created</p>
                  <p className="text-sm font-medium text-gray-900">
                    {format(new Date(review.createdAt), 'MMM dd, yyyy • hh:mm a')}
                  </p>
                </div>
              </div>
              {review.isEdited && (
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Last Edited</p>
                    <p className="text-sm font-medium text-gray-900">
                      {format(new Date(review.updatedAt), 'MMM dd, yyyy • hh:mm a')}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex items-center justify-between gap-4">
          <button
            onClick={handleDelete}
            disabled={isPending || isDeleting}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Trash2 className="w-4 h-4" />
            {isDeleting ? 'Deleting...' : 'Delete Review'}
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
