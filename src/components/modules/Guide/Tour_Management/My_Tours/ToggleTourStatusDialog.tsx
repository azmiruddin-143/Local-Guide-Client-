"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ITour } from "@/types/tour.interface";
import { toggleTourStatus } from "@/services/guide/tour.service";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface ToggleTourStatusDialogProps {
  tour: ITour;
  isOpen: boolean;
  onClose: () => void;
}

export default function ToggleTourStatusDialog({
  tour,
  isOpen,
  onClose,
}: ToggleTourStatusDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async () => {
    setIsLoading(true);
    try {
      await toggleTourStatus(tour._id);
      toast.success(
        `Tour ${tour.isActive ? "deactivated" : "activated"} successfully`,
        {
          description: tour.isActive
            ? "Your tour is now hidden from public listings"
            : "Your tour is now visible to tourists",
        }
      );
      onClose();
    } catch (error: any) {
      toast.error("Failed to update tour status", {
        description: error.message || "Please try again later",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {tour.isActive ? "Deactivate" : "Activate"} Tour
          </DialogTitle>
          <DialogDescription>
            {tour.isActive ? (
              <>
                Are you sure you want to deactivate &quot;{tour.title}&quot;?
                This tour will be hidden from public listings and tourists
                won&apos;t be able to book it.
              </>
            ) : (
              <>
                Are you sure you want to activate &quot;{tour.title}&quot;? This
                tour will be visible to tourists and available for booking.
              </>
            )}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={handleToggle}
            disabled={isLoading}
            variant={tour.isActive ? "destructive" : "default"}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {tour.isActive ? "Deactivate" : "Activate"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
