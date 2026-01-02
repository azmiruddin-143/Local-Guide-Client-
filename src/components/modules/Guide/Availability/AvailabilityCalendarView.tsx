"use client";

import { IAvailability } from "@/types/availability.interface";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Users, Clock } from "lucide-react";
import { format, addDays, isSameDay, startOfDay } from "date-fns";

interface AvailabilityCalendarViewProps {
  availabilities: IAvailability[];
  onAdd: (date: Date) => void;
  onEdit: (availability: IAvailability) => void;
  onDelete: (availability: IAvailability) => void;
}

export function AvailabilityCalendarView({
  availabilities,
  onAdd,
  onEdit,
  onDelete,
}: AvailabilityCalendarViewProps) {
  const today = startOfDay(new Date());
  const next7Days = Array.from({ length: 7 }, (_, i) => addDays(today, i));

  const getAvailabilitiesForDate = (date: Date) => {
    return availabilities.filter((a) =>
      isSameDay(new Date(a.specificDate), date)
    );
  };

  return (
    <div className="space-y-4">
      {next7Days.map((date) => {
        const dayAvailabilities = getAvailabilitiesForDate(date);
        const isToday = isSameDay(date, new Date());

        return (
          <div
            key={date.toISOString()}
            className={`rounded-lg border p-4 ${
              isToday ? "border-primary bg-primary/5" : ""
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-semibold text-lg">
                  {format(date, "EEEE, MMMM d")}
                  {isToday && (
                    <span className="ml-2 text-sm text-primary">(Today)</span>
                  )}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {dayAvailabilities.length} slot
                  {dayAvailabilities.length !== 1 ? "s" : ""} available
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onAdd(date)}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Slot
              </Button>
            </div>

            {dayAvailabilities.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No availability slots for this day</p>
              </div>
            ) : (
              <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                {dayAvailabilities.map((availability) => (
                  <div
                    key={availability._id}
                    className={`rounded-md border p-3 ${
                      !availability.isAvailable
                        ? "bg-muted opacity-60"
                        : availability.todaysTourist?.isBooked
                        ? "bg-blue-50 dark:bg-blue-950/20 border-blue-200"
                        : ""
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">
                          {availability.startTime} - {availability.endTime}
                        </span>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => onEdit(availability)}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-destructive"
                          onClick={() => onDelete(availability)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3 text-muted-foreground" />
                        <span>
                          {availability.todaysTourist?.count || 0}/
                          {availability.todaysTourist?.maxGuests || 10}
                        </span>
                      </div>
                      <div>
                        {availability.isAvailable ? (
                          <span className="text-green-600 dark:text-green-400 text-xs font-medium">
                            Available
                          </span>
                        ) : (
                          <span className="text-muted-foreground text-xs">
                            Unavailable
                          </span>
                        )}
                      </div>
                    </div>

                    {availability.todaysTourist?.isBooked && (
                      <div className="mt-2 pt-2 border-t text-xs text-blue-600 dark:text-blue-400">
                        ✓ Booked for tour
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
