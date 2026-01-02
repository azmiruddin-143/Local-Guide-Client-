"use client";

import { IAvailability, DayOfWeek } from "@/types/availability.interface";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Edit, Trash2, Plus } from "lucide-react";
import { useState, useTransition } from "react";
import { toggleAvailability } from "@/services/guide/availability.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface AvailabilityTableProps {
  availabilities: IAvailability[];
  onAdd: (day: DayOfWeek) => void;
  onEdit: (availability: IAvailability) => void;
  onDelete: (availability: IAvailability) => void;
  fetchAvailabilities: () => void;
}

const ALL_DAYS = [
  DayOfWeek.MONDAY,
  DayOfWeek.TUESDAY,
  DayOfWeek.WEDNESDAY,
  DayOfWeek.THURSDAY,
  DayOfWeek.FRIDAY,
  DayOfWeek.SATURDAY,
  DayOfWeek.SUNDAY,
];

const DAY_LABELS: Record<DayOfWeek, string> = {
  [DayOfWeek.MONDAY]: "Monday",
  [DayOfWeek.TUESDAY]: "Tuesday",
  [DayOfWeek.WEDNESDAY]: "Wednesday",
  [DayOfWeek.THURSDAY]: "Thursday",
  [DayOfWeek.FRIDAY]: "Friday",
  [DayOfWeek.SATURDAY]: "Saturday",
  [DayOfWeek.SUNDAY]: "Sunday",
};

export function AvailabilityTable({
  availabilities,
  onAdd,
  onEdit,
  onDelete,
  fetchAvailabilities
}: AvailabilityTableProps) {
  const [isPending, startTransition] = useTransition();
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const availabilityMap = new Map(
    availabilities.map((a) => [a.dayOfWeek, a])
  );

  const handleToggle = (availability: IAvailability, checked: boolean) => {
    setTogglingId(availability._id);
    startTransition(async () => {
      const result = await toggleAvailability(availability._id, checked);
      if (result.success) {
        toast.success(
          checked ? "Availability enabled" : "Availability disabled"
        );
        fetchAvailabilities()
      } else {
        toast.error(result.message);
      }
      setTogglingId(null);
    });
  };

  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden md:block border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-4 font-semibold">Day</th>
              <th className="text-left p-4 font-semibold">Time</th>
              <th className="text-left p-4 font-semibold">Status</th>
              <th className="text-right p-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {ALL_DAYS.map((day) => {
              const availability = availabilityMap.get(day);

              return (
                <tr key={day} className="hover:bg-muted/30 transition-colors">
                  <td className="p-4 font-medium">{DAY_LABELS[day]}</td>
                  <td className="p-4">
                    {availability ? (
                      <span className="text-sm">
                        {availability.startTime} – {availability.endTime}
                      </span>
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        Not Set
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    {availability ? (
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={availability.isAvailable}
                          onCheckedChange={(checked) =>
                            handleToggle(availability, checked)
                          }
                          disabled={
                            isPending && togglingId === availability._id
                          }
                        />
                        <span
                          className={`text-sm font-medium ${
                            availability.isAvailable
                              ? "text-green-600"
                              : "text-gray-500"
                          }`}
                        >
                          {availability.isAvailable ? "Available" : "Unavailable"}
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      {availability ? (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onEdit(availability)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onDelete(availability)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onAdd(day)}
                          disabled={availabilities.length >= 7}
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Add
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {ALL_DAYS.map((day) => {
          const availability = availabilityMap.get(day);

          return (
            <div
              key={day}
              className="border rounded-lg p-4 space-y-3 bg-card hover:bg-muted/30 transition-colors"
            >
              {/* Day Header */}
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">{DAY_LABELS[day]}</h3>
                {availability ? (
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(availability)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(availability)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onAdd(day)}
                    disabled={availabilities.length >= 7}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                )}
              </div>

              {/* Time */}
              <div className="flex items-center justify-between py-2 border-t">
                <span className="text-sm text-muted-foreground">Time</span>
                {availability ? (
                  <span className="text-sm font-medium">
                    {availability.startTime} – {availability.endTime}
                  </span>
                ) : (
                  <span className="text-sm text-muted-foreground">Not Set</span>
                )}
              </div>

              {/* Status */}
              {availability && (
                <div className="flex items-center justify-between py-2 border-t">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={availability.isAvailable}
                      onCheckedChange={(checked) =>
                        handleToggle(availability, checked)
                      }
                      disabled={
                        isPending && togglingId === availability._id
                      }
                    />
                    <span
                      className={`text-sm font-medium ${
                        availability.isAvailable
                          ? "text-green-600"
                          : "text-gray-500"
                      }`}
                    >
                      {availability.isAvailable ? "Available" : "Unavailable"}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
