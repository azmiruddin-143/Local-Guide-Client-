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
import { deleteTour } from "@/services/guide/tour.service";
import { useState } from "react";
import { toast } from "sonner";
import { AlertTriangle, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface DeleteTourDialogProps {
  tour: ITour;
  isOpen: boolean;
  onClose: () => void;
}

export default function DeleteTourDialog({
  tour,
  isOpen,
  onClose,
}: DeleteTourDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deleteTour(tour._id);
      toast.success("Tour deleted successfully", {
        description: "The tour has been permanently removed",
      });
      onClose();
    } catch (error: any) {
      toast.error("Failed to delete tour", {
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
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Delete Tour
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete &quot;{tour.title}&quot;?
          </DialogDescription>
        </DialogHeader>

        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            This action cannot be undone. All tour data, including bookings and
            reviews, will be permanently deleted.
          </AlertDescription>
        </Alert>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            disabled={isLoading}
            variant="destructive"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Delete Tour
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
