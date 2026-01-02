"use client";

import { useState, useTransition, useEffect } from "react";
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
import { Input } from "@/components/ui/input";
import { IAvailability, DayOfWeek } from "@/types/availability.interface";
import { updateAvailability } from "@/services/guide/availability.service";
import { toast } from "sonner";

interface EditAvailabilityModalProps {
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

export function EditAvailabilityModal({
  isOpen,
  onClose,
  availability,
}: EditAvailabilityModalProps) {
  const [isPending, startTransition] = useTransition();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    if (availability) {
      setStartTime(availability.startTime);
      setEndTime(availability.endTime);
    }
  }, [availability]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!availability) return;

    if (startTime >= endTime) {
      toast.error("Start time must be before end time");
      return;
    }

    startTransition(async () => {
      const result = await updateAvailability(availability._id, {
        startTime,
        endTime,
      });

      if (result.success) {
        toast.success("Availability updated successfully");
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
          <DialogTitle>Edit Availability</DialogTitle>
          <DialogDescription>
            Update your availability for {DAY_LABELS[availability.dayOfWeek as DayOfWeek]}.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Day of Week</Label>
              <div className="px-3 py-2 bg-muted rounded-md text-sm">
                {DAY_LABELS[availability.dayOfWeek as DayOfWeek]}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="startTime">Start Time</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  disabled={isPending}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="endTime">End Time</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  disabled={isPending}
                  required
                />
              </div>
            </div>
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
            <Button type="submit" disabled={isPending}>
              {isPending ? "Updating..." : "Update Availability"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
