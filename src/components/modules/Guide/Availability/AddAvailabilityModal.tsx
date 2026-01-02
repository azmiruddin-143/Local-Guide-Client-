"use client";

import { useState, useTransition } from "react";
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
import { createAvailability } from "@/services/guide/availability.service";
import { toast } from "sonner";
import { format } from "date-fns";

interface AddAvailabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedDate?: string; // ISO date string
}

export function AddAvailabilityModal({
  isOpen,
  onClose,
  preselectedDate,
}: AddAvailabilityModalProps) {
  const [isPending, startTransition] = useTransition();
  
  // Get today's date in YYYY-MM-DD format
  const today = format(new Date(), "yyyy-MM-dd");
  
  const [specificDate, setSpecificDate] = useState(preselectedDate || today);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");
  const [maxGroupSize, setMaxGroupSize] = useState(10);
  const [pricePerPerson, setPricePerPerson] = useState(50);
  const [maxGuests, setMaxGuests] = useState(10);

  const calculateDuration = (start: string, end: string): number => {
    const [startHour, startMin] = start.split(":").map(Number);
    const [endHour, endMin] = end.split(":").map(Number);
    return (endHour * 60 + endMin) - (startHour * 60 + startMin);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!specificDate) {
      toast.error("Please select a date");
      return;
    }

    if (startTime >= endTime) {
      toast.error("Start time must be before end time");
      return;
    }

    const durationMins = calculateDuration(startTime, endTime);

    if (durationMins <= 0) {
      toast.error("Invalid time range");
      return;
    }

    startTransition(async () => {
      const result = await createAvailability({
        specificDate,
        startTime,
        endTime,
        durationMins,
        maxGroupSize,
        pricePerPerson,
        isAvailable: true,
        todaysTourist: {
          maxGuests,
        },
      });

      if (result.success) {
        toast.success("Availability added successfully");
        onClose();
        // Reset form
        setSpecificDate(today);
        setStartTime("09:00");
        setEndTime("17:00");
        setMaxGroupSize(10);
        setPricePerPerson(50);
        setMaxGuests(10);
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Availability</DialogTitle>
          <DialogDescription>
            Set your availability for a specific date.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* Date Selection */}
            <div className="grid gap-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={specificDate}
                onChange={(e) => setSpecificDate(e.target.value)}
                min={today}
                disabled={isPending || !!preselectedDate}
                required
              />
            </div>

            {/* Time Range */}
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

            {/* Group Size and Price */}
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="maxGroupSize">Max Group Size</Label>
                <Input
                  id="maxGroupSize"
                  type="number"
                  min="1"
                  max="50"
                  value={maxGroupSize}
                  onChange={(e) => setMaxGroupSize(Number(e.target.value))}
                  disabled={isPending}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="pricePerPerson">Price Per Person ($)</Label>
                <Input
                  id="pricePerPerson"
                  type="number"
                  min="1"
                  step="0.01"
                  value={pricePerPerson}
                  onChange={(e) => setPricePerPerson(Number(e.target.value))}
                  disabled={isPending}
                  required
                />
              </div>
            </div>

            {/* Max Guests for Today's Tour */}
            <div className="grid gap-2">
              <Label htmlFor="maxGuests">Max Guests (Today&apos;s Tour)</Label>
              <Input
                id="maxGuests"
                type="number"
                min="1"
                max="50"
                value={maxGuests}
                onChange={(e) => setMaxGuests(Number(e.target.value))}
                disabled={isPending}
                required
              />
              <p className="text-xs text-muted-foreground">
                Maximum number of guests for today&apos;s tour feature
              </p>
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
            <Button type="submit" disabled={isPending || !specificDate}>
              {isPending ? "Adding..." : "Add Availability"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
