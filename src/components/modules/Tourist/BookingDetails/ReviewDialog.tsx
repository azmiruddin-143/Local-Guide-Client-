"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Star, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { createReview, updateReview } from "@/services/review/review.service";
import { toast } from "sonner";

interface Review {
  _id: string;
  rating: number;
  content?: string;
  experienceTags?: string[];
}

interface ReviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookingId: string;
  target: 'TOUR' | 'GUIDE';
  targetName: string;
  existingReview?: Review | null;
  onSuccess: () => void;
}

const EXPERIENCE_TAGS = [
  "Amazing Experience",
  "Highly Recommended",
  "Great Value",
  "Professional",
  "Friendly",
  "Knowledgeable",
  "Well Organized",
  "Fun",
  "Educational",
  "Authentic",
  "Beautiful Locations",
  "Good Communication",
];

const ReviewDialog = ({
  open,
  onOpenChange,
  bookingId,
  target,
  targetName,
  existingReview,
  onSuccess,
}: ReviewDialogProps) => {
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [content, setContent] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (existingReview) {
      setRating(existingReview.rating);
      setContent(existingReview.content || "");
      setSelectedTags(existingReview.experienceTags || []);
    } else {
      setRating(5);
      setContent("");
      setSelectedTags([]);
    }
  }, [existingReview, open]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        rating,
        content: content.trim() || undefined,
        experienceTags: selectedTags.length > 0 ? selectedTags : undefined,
      };

      let result;
      if (existingReview) {
        result = await updateReview(existingReview._id, payload);
      } else {
        result = await createReview({
          bookingId,
          target,
          ...payload,
        });

        console.log(result);
        
      }

      if (result.success) {
        toast.success(
          existingReview ? "Review updated successfully" : "Review submitted successfully"
        );
        onSuccess();
      } else {
        toast.error(result.message || "Failed to submit review");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {existingReview ? "Edit Review" : "Write a Review"}
          </DialogTitle>
          <DialogDescription>
            Share your experience with {targetName}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating */}
          <div className="space-y-2">
            <Label>Rating *</Label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-8 w-8 ${
                      star <= (hoveredRating || rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-sm text-muted-foreground self-center">
                {rating} out of 5
              </span>
            </div>
          </div>

          {/* Review Content */}
          <div className="space-y-2">
            <Label htmlFor="content">Your Review (Optional)</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share details about your experience..."
              rows={5}
              maxLength={1000}
            />
            <p className="text-xs text-muted-foreground">
              {content.length}/1000 characters
            </p>
          </div>

          {/* Experience Tags */}
          <div className="space-y-2">
            <Label>Experience Tags (Optional)</Label>
            <p className="text-sm text-muted-foreground mb-3">
              Select tags that describe your experience
            </p>
            <div className="flex flex-wrap gap-2">
              {EXPERIENCE_TAGS.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => handleTagToggle(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {existingReview ? "Update Review" : "Submit Review"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewDialog;
