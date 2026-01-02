"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Edit, Trash2, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ReviewDialog from "./ReviewDialog";
import { getReviewsByBooking, deleteReview } from "@/services/review/review.service";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Review {
  _id: string;
  target: 'TOUR' | 'GUIDE';
  rating: number;
  content?: string;
  photos?: string[];
  experienceTags?: string[];
  isEdited: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ReviewSectionProps {
  bookingId: string;
  bookingStatus: string;
  tourTitle: string;
  guideName: string;
}

const ReviewSection = ({ bookingId, bookingStatus, tourTitle, guideName }: ReviewSectionProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [reviewTarget, setReviewTarget] = useState<'TOUR' | 'GUIDE'>('TOUR');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingReview, setDeletingReview] = useState<Review | null>(null);

  const fetchReviews = async () => {
    setLoading(true);
    const result = await getReviewsByBooking(bookingId);
    if (result.success) {
      setReviews(result.data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReviews();
  }, [bookingId]);

  const handleCreateReview = (target: 'TOUR' | 'GUIDE') => {
    setReviewTarget(target);
    setEditingReview(null);
    setDialogOpen(true);
  };

  const handleEditReview = (review: Review) => {
    setReviewTarget(review.target);
    setEditingReview(review);
    setDialogOpen(true);
  };

  const handleDeleteClick = (review: Review) => {
    setDeletingReview(review);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingReview) return;

    try {
      const result = await deleteReview(deletingReview._id);
      if (result.success) {
        toast.success("Review deleted successfully");
        fetchReviews();
      } else {
        toast.error(result.message || "Failed to delete review");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setDeleteDialogOpen(false);
      setDeletingReview(null);
    }
  };

  const handleReviewSuccess = () => {
    fetchReviews();
    setDialogOpen(false);
  };

  if (bookingStatus !== 'COMPLETED') {
    return null;
  }

  const tourReview = reviews.find(r => r.target === 'TOUR');
  const guideReview = reviews.find(r => r.target === 'GUIDE');

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const renderReviewCard = (review: Review | undefined, target: 'TOUR' | 'GUIDE', title: string) => {
    if (review) {
      return (
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg">{title}</CardTitle>
                <CardDescription>
                  {new Date(review.createdAt).toLocaleDateString()}
                  {review.isEdited && <span className="ml-2 text-xs">(Edited)</span>}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEditReview(review)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteClick(review)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Rating</p>
              {renderStars(review.rating)}
            </div>
            {review.content && (
              <div>
                <p className="text-sm text-muted-foreground mb-2">Review</p>
                <p className="text-sm">{review.content}</p>
              </div>
            )}
            {review.experienceTags && review.experienceTags.length > 0 && (
              <div>
                <p className="text-sm text-muted-foreground mb-2">Experience Tags</p>
                <div className="flex flex-wrap gap-2">
                  {review.experienceTags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      );
    }

    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription>Share your experience</CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={() => handleCreateReview(target)}
            className="w-full"
            variant="outline"
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Write a Review
          </Button>
        </CardContent>
      </Card>
    );
  };

  return (
    <>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Reviews</h2>
          <p className="text-muted-foreground">
            Share your experience with the tour and guide
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {renderReviewCard(tourReview, 'TOUR', `Review: ${tourTitle}`)}
          {renderReviewCard(guideReview, 'GUIDE', `Review: ${guideName}`)}
        </div>
      </div>

      <ReviewDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        bookingId={bookingId}
        target={reviewTarget}
        targetName={reviewTarget === 'TOUR' ? tourTitle : guideName}
        existingReview={editingReview}
        onSuccess={handleReviewSuccess}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Review</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this review? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ReviewSection;
