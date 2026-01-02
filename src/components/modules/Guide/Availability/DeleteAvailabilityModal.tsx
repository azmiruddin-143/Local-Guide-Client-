"use client";

import { useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IAvailability, DayOfWeek } from "@/types/availability.interface";
import { deleteAvailability } from "@/services/guide/availability.service";
import { toast } from "sonner";
import { AlertTriangle } from "lucide-react";

interface DeleteAvailabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  availability: IAvailability | null;
}

const DAY_LABELS: Record<DayOfWeek, string> = {
  [DayOfWeek.MONDAY]: "Monday",
  [DayOfWeek.TUESDAY]: "Tuesday",
  [DayOfWeek.WEDNESDAY]: "Wednesday",
  [DayOfWeek.THURSDAY]: "Thursday",
  [DayOfWeek.FRIDAY]: "Friday",
  [DayOfWeek.SATURDAY]: "Saturday",
  [DayOfWeek.SUNDAY]: "Sunday",
};

export function DeleteAvailabilityModal({
  isOpen,
  onClose,
  availability,
}: DeleteAvailabilityModalProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!availability) return;

    if (availability?.todaysTourist?.count as number > 0) {
      toast.error("Cannot delete availability with tourists");
      onClose();
      return;
    }

    startTransition(async () => {
      const result = await deleteAvailability(availability._id);

      if (result.success) {
        toast.success("Availability deleted successfully");
        onClose();
      } else {
        toast.error(result.message);
      }
    });
  };


  if (!availability) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <DialogTitle>Delete Availability</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this availability?
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="py-4">
          <div className="rounded-lg border p-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Day:</span>
              <span className="text-sm">{DAY_LABELS[availability?.dayOfWeek as DayOfWeek]}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Time:</span>
              <span className="text-sm">
                {availability.startTime} – {availability.endTime}
              </span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            This action cannot be undone. You can always add it back later.
          </p>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
