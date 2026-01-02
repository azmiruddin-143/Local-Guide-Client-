"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format, addDays, startOfDay } from "date-fns";
import { createAvailability } from "@/services/guide/availability.service";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface AddAvailabilityDateModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedDate?: Date;
}

export function AddAvailabilityDateModal({
  isOpen,
  onClose,
  preselectedDate,
}: AddAvailabilityDateModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(preselectedDate);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");
  const [maxGuests, setMaxGuests] = useState(10);
  const [durationMins, setDurationMins] = useState(480); // 8 hours default
  const [pricePerPerson, setPricePerPerson] = useState(1500);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  useEffect(() => {
    if (preselectedDate) {
      setSelectedDate(preselectedDate);
    }
  }, [preselectedDate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDate) {
      toast.error("Please select a date");
      return;
    }

    if (startTime >= endTime) {
      toast.error("Start time must be before end time");
      return;
    }

    setIsSubmitting(true);

    const payload = {
      specificDate: selectedDate.toISOString(),
      startTime,
      endTime,
      durationMins,
      maxGroupSize: maxGuests,
      pricePerPerson,
      isAvailable: true,
      todaysTourist: {
        maxGuests,
      },
    };

    const result = await createAvailability(payload);

    if (result.success) {
      toast.success("Availability created successfully");
      onClose();
      resetForm();
    } else {
      toast.error(result.message);
    }

    setIsSubmitting(false);
  };

  const resetForm = () => {
    setSelectedDate(undefined);
    setStartTime("09:00");
    setEndTime("17:00");
    setMaxGuests(10);
    setDurationMins(480);
    setPricePerPerson(1500);
  };

  const today = startOfDay(new Date());
  const maxDate = addDays(today, 7);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Availability Slot</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Select Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < today || date > maxDate}
                />
              </PopoverContent>
            </Popover>
            <p className="text-xs text-muted-foreground">
              You can create availability within the next 7 days
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
            />
            <p className="text-xs text-muted-foreground">
              Maximum number of guests that can book this slot
            </p>
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
              {isSubmitting ? "Creating..." : "Create Availability"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
