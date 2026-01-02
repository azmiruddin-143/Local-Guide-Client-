"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IAvailability } from "@/types/availability.interface";
import { Calendar, Clock, AlertCircle, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format, isSameDay, startOfDay, addDays } from "date-fns";

interface AvailabilityCalendarProps {
  availability: IAvailability[];
  selectedDate: Date | null;
  selectedSlot: IAvailability | null;
  onSelectDate: (date: Date | null) => void;
  onSelectSlot: (slot: IAvailability | null) => void;
  tourId: string;
}

export default function AvailabilityCalendar({
  availability,
  selectedDate,
  selectedSlot,
  onSelectDate,
  onSelectSlot,
  tourId,
}: AvailabilityCalendarProps) {
  const today = startOfDay(new Date());
  const next7Days = Array.from({ length: 7 }, (_, i) => addDays(today, i));

  const getAvailabilitiesForDate = (date: Date) => {
    return availability.filter(
      (a) => a.isAvailable && isSameDay(new Date(a.specificDate), date)
    );
  };

  const handleSlotClick = (slot: IAvailability) => {
    if (selectedSlot?._id === slot._id) {
      onSelectSlot(null);
      onSelectDate(null);
    } else {
      onSelectSlot(slot);
      onSelectDate(new Date(slot.specificDate));
    }
  };

  const availableSlots = availability.filter((slot) => slot.isAvailable);

  if (availableSlots.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Availability
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <AlertCircle className="w-12 h-12 text-muted-foreground mb-3" />
            <p className="text-muted-foreground">
              No availability set by the guide yet.
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Please check back later or contact the guide directly.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Guide Availability
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-1">
          Select a date and time slot to book your tour
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {next7Days.map((date) => {
            const daySlots = getAvailabilitiesForDate(date);
            const isToday = isSameDay(date, new Date());

            if (daySlots.length === 0) {
              return (
                <div
                  key={date.toISOString()}
                  className="p-4 rounded-lg border border-dashed border-gray-200 bg-gray-50"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-400">
                        {format(date, "EEEE, MMM d")}
                        {isToday && (
                          <span className="ml-2 text-xs">(Today)</span>
                        )}
                      </p>
                      <p className="text-sm text-gray-400 mt-1">
                        No slots available
                      </p>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={date.toISOString()}
                className={`p-4 rounded-lg border ${
                  isToday ? "border-primary bg-primary/5" : "border-gray-200"
                }`}
              >
                <p className="font-semibold mb-3">
                  {format(date, "EEEE, MMMM d")}
                  {isToday && (
                    <span className="ml-2 text-sm text-primary">(Today)</span>
                  )}
                </p>

                <div className="space-y-2">
                  {daySlots.map((slot) => {
                    const isSelected = selectedSlot?._id === slot._id;
                    const isBooked = slot.todaysTourist?.isBooked;
                    const guestCount = slot.todaysTourist?.count || 0;
                    const maxGuests = slot.todaysTourist?.maxGuests || 10;
                    const bookedTourId = slot.todaysTourist?.tourId;

                    
                    // Check if this specific tour is fully booked
                    const isThisTourBooked = bookedTourId === tourId;
                    const isFull = isBooked && guestCount >= maxGuests;
                    const remainingSpots = maxGuests - guestCount;

                    return (
                      <button
                        key={slot._id}
                        onClick={() => !isFull && handleSlotClick(slot)}
                        disabled={isFull || isBooked && !isThisTourBooked}
                        className={`w-full flex items-center justify-between p-3 rounded-md border-2 transition-all ${
                          isFull
                            ? "border-gray-200 bg-gray-100 cursor-not-allowed opacity-60"
                            : isSelected
                            ? "border-primary bg-primary/5 shadow-md"
                            : "border-gray-200 hover:border-primary/50 hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <span className="font-medium">
                              {slot.startTime} - {slot.endTime}
                            </span>
                          </div>

                          {isThisTourBooked && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Users className="w-3 h-3" />
                              <span>
                                {guestCount}/{maxGuests}
                              </span>
                            </div>
                          )}

                          {isBooked && !isThisTourBooked && (
                            <Badge variant="destructive" className="text-xs">
                              Booked with another tour
                            </Badge>
                          )}


                          {isBooked && remainingSpots > 0 && remainingSpots <= 3 && (
                            <Badge variant="outline" className="text-xs">
                              {remainingSpots} spot{remainingSpots > 1 ? "s" : ""} left
                            </Badge>
                          )}
                        </div>

                        <Badge
                          variant={
                            isFull
                              ? "destructive"
                              : isSelected
                              ? "default"
                              : "secondary"
                          }
                          className="ml-auto"
                        >
                          {isFull ? "Full" : isSelected ? "Selected" : isBooked && !isThisTourBooked ? "Booked" : "Available"}
                        </Badge>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {selectedSlot && selectedDate && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-900">
              <strong>Selected:</strong> {format(selectedDate, "EEEE, MMMM d, yyyy")}
            </p>
            <p className="text-sm text-blue-700 mt-1">
              Time: {selectedSlot.startTime} - {selectedSlot.endTime}
            </p>
            {selectedSlot.todaysTourist && (
              <p className="text-sm text-blue-700 mt-1">
                Available spots: {selectedSlot.todaysTourist.maxGuests - (selectedSlot.todaysTourist.count || 0)}/
                {selectedSlot.todaysTourist.maxGuests}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
