"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tour } from "@/services/tour/tour.service";
import { IAvailability } from "@/types/availability.interface";
import { Users, Calendar, Clock, DollarSign, AlertCircle } from "lucide-react";
import { useState } from "react";
import BookingModal from "./BookingModal";
import { UserInfo } from "@/types/user.interface";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface BookingCardProps {
  tour: Tour;
  selectedDate: Date | null;
  selectedSlot: IAvailability | null;
  numGuests: number;
  onGuestsChange: (num: number) => void;
  user: UserInfo;
  hasAvailability: boolean;
}

export default function BookingCard({
  tour,
  selectedDate,
  selectedSlot,
  numGuests,
  onGuestsChange,
  user,
  hasAvailability
}: BookingCardProps) {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const pathname = usePathname()

  console.log(pathname);
  
  // Use availability price if available, otherwise show placeholder
  const pricePerPerson = selectedSlot?.pricePerPerson || 0;
  const totalPrice = pricePerPerson * numGuests;
  
  // Calculate available slots from selected availability
  const maxGuests = selectedSlot?.maxGroupSize || selectedSlot?.todaysTourist?.maxGuests || 10;
  const bookedGuests = selectedSlot?.todaysTourist?.count || 0;
  const availableSlots = maxGuests - bookedGuests;
  
  // Check if can book
  const canBook = selectedDate && 
                  selectedSlot && 
                  numGuests > 0 && 
                  numGuests <= availableSlots &&
                  availableSlots > 0 &&
                  hasAvailability;

  const handleGuestsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 1;
    const maxAllowed = selectedSlot ? availableSlots : maxGuests;
    const clamped = Math.max(1, Math.min(value, maxAllowed));
    onGuestsChange(clamped);
  };

  const formatCurrency = (amount: number) => {
    return `৳${amount.toLocaleString()}`;
  };
  
  return (
    <>
      <Card className="shadow-lg">
        <CardHeader className="pb-4">
          {hasAvailability && selectedSlot ? (
            <>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">{formatCurrency(pricePerPerson)}</span>
                <span className="text-muted-foreground">/ person</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Price for selected time slot
              </p>
            </>
          ) : (
            <>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-muted-foreground">Select a slot</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {hasAvailability ? "Choose a time slot to see pricing" : "No availability set by guide"}
              </p>
            </>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          

          {/* Number of Guests */}
          <div className="space-y-2">
            <Label htmlFor="guests" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Number of Guests
            </Label>
            <Input
              id="guests"
              type="number"
              min={1}
              max={selectedSlot ? availableSlots : maxGuests}
              value={numGuests}
              onChange={handleGuestsChange}
              className="text-center text-lg font-semibold"
              disabled={!selectedSlot}
            />
            {selectedSlot ? (
              <p className="text-xs text-muted-foreground">
                {availableSlots} spot{availableSlots !== 1 ? "s" : ""} available for this slot
              </p>
            ) : (
              <p className="text-xs text-muted-foreground">
                Please select a time slot to see availability
              </p>
            )}
          </div>

          {/* Selected Date/Time */}
          {selectedDate && selectedSlot ? (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg space-y-2">
              <div className="flex items-center gap-2 text-sm text-green-900">
                <Calendar className="w-4 h-4" />
                <span className="font-medium">
                  {selectedDate.toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-green-900">
                <Clock className="w-4 h-4" />
                <span>
                  {selectedSlot.startTime} - {selectedSlot.endTime}
                </span>
              </div>
              {selectedSlot.todaysTourist && (
                <div className="flex items-center gap-2 text-sm text-green-900 pt-1 border-t border-green-200">
                  <Users className="w-4 h-4" />
                  <span>
                    {selectedSlot.todaysTourist.maxGuests - (selectedSlot.todaysTourist.count || 0)} of  {selectedSlot.todaysTourist.maxGuests} spots available
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-start gap-2 text-sm text-amber-900">
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                <span>Please select an available time slot to continue</span>
              </div>
            </div>
          )}

          {/* Price Breakdown */}
          {selectedSlot && hasAvailability ? (
            <div className="space-y-2 pt-4 border-t">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {formatCurrency(pricePerPerson)} × {numGuests} guest{numGuests > 1 ? "s" : ""}
                </span>
                <span className="font-medium">{formatCurrency(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t">
                <span>Total</span>
                <span className="flex items-center gap-1">
                  {formatCurrency(totalPrice)}
                </span>
              </div>
            </div>
          ) : (
            <div className="space-y-2 pt-4 border-t">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Total</span>
                <span>--</span>
              </div>
              <p className="text-xs text-center text-muted-foreground">
                {hasAvailability ? "Select a time slot to see total price" : "No pricing available"}
              </p>
            </div>
          )}

          {/* Book Now Button */}
          {!hasAvailability ? (
            <Button
              disabled
              className="w-full h-12 text-lg font-semibold"
              size="lg"
            >
              No Availability
            </Button>
          ) : !user._id ? (
              <Link href={`/login?redirect=${pathname}`}>
              <Button
                className="w-full h-12 text-lg font-semibold cursor-pointer"
                size="lg"
              >
                Login to Book
              </Button>
            </Link>
          ) : (
            <Button
              onClick={() => setShowBookingModal(true)}
              disabled={!canBook}
              className="w-full h-12 text-lg font-semibold cursor-pointer"
              size="lg"
            >
              {!selectedDate || !selectedSlot
                ? "Select Date & Time"
                : availableSlots === 0
                ? "Fully Booked"
                : "Book Now"}
            </Button>
          )}

          {/* Additional Info */}
          {hasAvailability && (
            <p className="text-xs text-center text-muted-foreground">
              You won't be charged yet
            </p>
          )}
        </CardContent>
      </Card>

      {/* Booking Modal */}
      {showBookingModal && canBook && (
        <BookingModal
          tour={tour}
          selectedDate={selectedDate}
          selectedSlot={selectedSlot}
          numGuests={numGuests}
          totalPrice={totalPrice}
          onClose={() => setShowBookingModal(false)}
        />
      )}
    </>
  );
}
