"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { IAvailability } from "@/types/availability.interface";
import { updateAvailability } from "@/services/guide/availability.service";
import { toast } from "sonner";
import { format } from "date-fns";

interface EditAvailabilityDateModalProps {
  isOpen: boolean;
  onClose: () => void;
  availability: IAvailability | null;
}

export function EditAvailabilityDateModal({
  isOpen,
  onClose,
  availability,
}: EditAvailabilityDateModalProps) {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [maxGuests, setMaxGuests] = useState(10);
  const [durationMins, setDurationMins] = useState(0);
  const [pricePerPerson, setPricePerPerson] = useState(1500);
  const [isAvailable, setIsAvailable] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Helper to convert 12-hour format to 24-hour format for HTML time input
  const convertTo24Hour = (time12h: string): string => {
    if (!time12h) return "";
    
    // If already in 24-hour format (no AM/PM), return as is
    if (!time12h.includes("AM") && !time12h.includes("PM")) {
      return time12h;
    }
    
    const [time, modifier] = time12h.split(" ");
    let [hours, minutes] = time.split(":");
    
    if (hours === "12") {
      hours = modifier === "AM" ? "00" : "12";
    } else if (modifier === "PM") {
      hours = String(parseInt(hours, 10) + 12);
    }
    
    // Pad with zero if needed
    hours = hours.padStart(2, "0");
    
    return `${hours}:${minutes}`;
  };

  useEffect(() => {
    if (availability) {
      setStartTime(convertTo24Hour(availability.startTime));
      setEndTime(convertTo24Hour(availability.endTime));
      setMaxGuests(availability.maxGroupSize || availability.todaysTourist?.maxGuests || 10);
      setDurationMins(availability.durationMins || 0);
      setPricePerPerson(availability.pricePerPerson || 1500);
      setIsAvailable(availability.isAvailable);
    }
  }, [availability]);

  // Calculate duration when times change
  useEffect(() => {
    if (startTime && endTime) {
      const [startHour, startMin] = startTime.split(":").map(Number);
      const [endHour, endMin] = endTime.split(":").map(Number);
      const duration = (endHour * 60 + endMin) - (startHour * 60 + startMin);
      if (duration > 0) {
        setDurationMins(duration);
      }
    }
  }, [startTime, endTime]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!availability) return;

    if (startTime >= endTime) {
      toast.error("Start time must be before end time");
      return;
    }

    setIsSubmitting(true);

    const payload = {
      startTime,
      endTime,
      durationMins,
      maxGroupSize: maxGuests,
      pricePerPerson,
      isAvailable,
      todaysTourist: {
        maxGuests,
      },
    };

    const result = await updateAvailability(availability._id, payload);

    if (result.success) {
      toast.success("Availability updated successfully");
      onClose();
    } else {
      toast.error(result.message);
    }

    setIsSubmitting(false);
  };

  if (!availability) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Availability Slot</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="rounded-lg bg-muted p-3">
            <p className="text-sm font-medium">
              {format(new Date(availability.specificDate), "EEEE, MMMM d, yyyy")}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time</Label>
              <Input
                id="startTime"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endTime">End Time</Label>
              <Input
                id="endTime"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="maxGuests">Maximum Guests</Label>
            <Input
              id="maxGuests"
              type="number"
              min="1"
              max="50"
              value={maxGuests}
              onChange={(e) => setMaxGuests(parseInt(e.target.value))}
              required
              disabled={availability.todaysTourist?.isBooked}
            />
            {availability.todaysTourist?.isBooked && (
              <p className="text-xs text-amber-600">
                Cannot change max guests for booked slots
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="pricePerPerson">Price Per Person (৳)</Label>
            <Input
              id="pricePerPerson"
              type="number"
              min="0"
              step="50"
              value={pricePerPerson}
              onChange={(e) => setPricePerPerson(parseInt(e.target.value))}
              required
            />
            <p className="text-xs text-muted-foreground">
              Price for this specific time slot
            </p>
          </div>

          <div className="space-y-2">
            <Label>Duration</Label>
            <div className="text-sm text-muted-foreground">
              {Math.floor(durationMins / 60)}h {durationMins % 60}m
            </div>
            <p className="text-xs text-muted-foreground">
              Automatically calculated from start and end time
            </p>
          </div>

          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="isAvailable">Available for Booking</Label>
              <p className="text-sm text-muted-foreground">
                Toggle to enable/disable this slot
              </p>
            </div>
            <Switch
              id="isAvailable"
              checked={isAvailable}
              onCheckedChange={setIsAvailable}
            />
          </div>

          {availability.todaysTourist?.isBooked && (
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 p-3">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Booked:</strong> {availability.todaysTourist.count}/
                {availability.todaysTourist.maxGuests} guests
              </p>
            </div>
          )}

          <div className="flex gap-2 justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update Availability"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
