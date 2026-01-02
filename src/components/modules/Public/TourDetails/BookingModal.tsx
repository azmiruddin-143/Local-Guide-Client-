"use client";

import { useState } from "react";
import { Tour } from "@/services/tour/tour.service";
import { IAvailability } from "@/types/availability.interface";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, Users, MapPin, DollarSign, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createBooking } from "@/services/tourist/booking.service";


interface BookingModalProps {
  tour: Tour;
  selectedDate: Date;
  selectedSlot: IAvailability;
  numGuests: number;
  totalPrice: number;
  onClose: () => void;
}

export default function BookingModal({
  tour,
  selectedDate,
  selectedSlot,
  numGuests,
  totalPrice,
  onClose,
}: BookingModalProps) {
  const router = useRouter();
  const [specialRequests, setSpecialRequests] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatCurrency = (amount: number) => {
    return `৳${amount.toLocaleString()}`;
  };

  const formatDuration = (mins: number) => {
    if (mins < 60) return `${mins} minutes`;
    const hours = Math.floor(mins / 60);
    const minutes = mins % 60;
    return minutes > 0 ? `${hours}h ${minutes}m` : `${hours} hours`;
  };

  const handleConfirmBooking = async () => {
    setIsSubmitting(true);

    try {
      // Parse time from "09:00 AM" or "9:00 AM" format
      const parseTime = (timeStr: string) => {
        const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
        if (!match) return { hour: 0, min: 0 };
        
        let hour = parseInt(match[1]);
        const min = parseInt(match[2]);
        const period = match[3].toUpperCase();
        
        // Convert to 24-hour format
        if (period === 'PM' && hour !== 12) {
          hour += 12;
        } else if (period === 'AM' && hour === 12) {
          hour = 0;
        }
        
        return { hour, min };
      };

      // Calculate start and end times
      const { hour: startHour, min: startMin } = parseTime(selectedSlot.startTime);
      const startAt = new Date(selectedDate);
      startAt.setHours(startHour, startMin, 0, 0);

      const endAt = new Date(startAt);
      endAt.setMinutes(endAt.getMinutes() + selectedSlot.durationMins);

      const bookingData = {
        tourId: tour._id,
        availabilityId: selectedSlot._id,
        startAt: startAt.toISOString(),
        endAt: endAt.toISOString(),
        numGuests,
        specialRequests: specialRequests || null,
      };

 
      const result = await createBooking(bookingData);


      if (!result.success) {
        // Check if authentication error
        if (result.message.includes("Authentication required") || result.message.includes("login")) {
          toast.error("Please login to book a tour");
          router.push("/login?redirect=/tours/" + tour.slug);
          return;
        }
        throw new Error(result.message);
      }

      toast.success("Booking created! Redirecting to payment...");
      onClose();
      
      // Redirect to payment page with booking ID
      router.push(`/tourist/bookings/${result.data._id}/payment`);
    } catch (error: any) {
      console.error("Booking error:", error);
      toast.error(error.message || "Failed to create booking. Please try again.");
      console.log(error);
      
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Confirm Your Booking</DialogTitle>
          <DialogDescription>
            Review your booking details before confirming
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Tour Summary */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">{tour.title}</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>
                  {selectedDate.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>
                  {selectedSlot.startTime} - {selectedSlot.endTime}
                </span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="w-4 h-4" />
                <span>
                  {numGuests} guest{numGuests > 1 ? "s" : ""}
                </span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{formatDuration(selectedSlot.durationMins)}</span>
              </div>
            </div>
            <div className="flex items-start gap-2 text-sm text-muted-foreground pt-2 border-t">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{tour.meetingPoint}</span>
            </div>
          </div>

          {/* Guide Info */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium mb-1">Your Guide</p>
            <p className="text-lg font-semibold">{tour.guideId.name}</p>
          </div>

          {/* Special Requests */}
          <div className="space-y-2">
            <Label htmlFor="special-requests">
              Special Requests (Optional)
            </Label>
            <Textarea
              id="special-requests"
              placeholder="Any dietary restrictions, accessibility needs, or special requests..."
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>

          {/* Price Breakdown */}
          <div className="space-y-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-semibold">Price Details</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  {formatCurrency(selectedSlot.pricePerPerson)} × {numGuests} guest{numGuests > 1 ? "s" : ""}
                </span>
                <span className="font-medium">{formatCurrency(totalPrice)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-blue-300 text-lg font-bold">
                <span>Total</span>
                <span className="flex items-center gap-1">
                 
                  {formatCurrency(totalPrice)}
                </span>
              </div>
            </div>
          </div>

          {/* Important Info */}
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm">
            <p className="font-medium mb-2">Important Information:</p>
            <ul className="space-y-1 text-muted-foreground list-disc list-inside">
              <li>Booking confirmation will be sent to your email</li>
              <li>Guide will contact you 24 hours before the tour</li>
              <li>Free cancellation up to 48 hours before the tour</li>
              <li>Please arrive 10 minutes before the start time</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmBooking}
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                "Confirm & Book"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
