"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Calendar, Clock, Info, Users } from "lucide-react";
import { IAvailability } from "@/types/availability.interface";
import { AvailabilityCalendarView } from "@/components/modules/Guide/Availability/AvailabilityCalendarView";
import { AddAvailabilityDateModal } from "@/components/modules/Guide/Availability/AddAvailabilityDateModal";
import { EditAvailabilityDateModal } from "@/components/modules/Guide/Availability/EditAvailabilityDateModal";
import { DeleteAvailabilityModal } from "@/components/modules/Guide/Availability/DeleteAvailabilityModal";
import { useRouter } from "next/navigation";
import { IUser } from "@/types/user.interface";

interface AvailabilityContentProps {
  initialAvailabilities: IAvailability[];
  user: IUser
}

export function AvailabilityContent({ initialAvailabilities, user }: AvailabilityContentProps) {
  const router = useRouter();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedAvailability, setSelectedAvailability] = useState<IAvailability | null>(null);
  const [preselectedDate, setPreselectedDate] = useState<Date | undefined>();

  const handleAdd = (date?: Date) => {
    setPreselectedDate(date);
    setIsAddModalOpen(true);
  };

  const handleEdit = (availability: IAvailability) => {
    setSelectedAvailability(availability);
    setIsEditModalOpen(true);
  };

  const handleDelete = (availability: IAvailability) => {
    setSelectedAvailability(availability);
    setIsDeleteModalOpen(true);
  };

  const handleCloseModals = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedAvailability(null);
    setPreselectedDate(undefined);
    // Refresh the page data
    router.refresh();
  };

  // Calculate stats
  const totalBookedGuests = initialAvailabilities.reduce(
    (sum, a) => sum + (a.todaysTourist?.count || 0),
    0
  );
  const activeSlots = initialAvailabilities.filter((a) => a.isAvailable).length;

  return (
    <div className={`container mx-auto py-6 px-4 max-w-7xl space-y-6  ${user.isVerified ? '' : 'hidden'}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Availability Management
          </h1>
          <p className="text-muted-foreground mt-2">
            Create availability slots for the next 7 days
          </p>
        </div>
        <Button onClick={() => handleAdd()} size="lg">
          <Plus className="h-4 w-4 mr-2" />
          Add Availability
        </Button>
      </div>

      {/* Info Cards */}
      <div className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-4`}>
        <div className="rounded-lg border p-4 space-y-2">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Total Slots</h3>
          </div>
          <p className="text-3xl font-bold">{initialAvailabilities.length}</p>
          <p className="text-sm text-muted-foreground">
            Available time slots
          </p>
        </div>

        <div className="rounded-lg border p-4 space-y-2">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-green-600" />
            <h3 className="font-semibold">Active Slots</h3>
          </div>
          <p className="text-3xl font-bold">{activeSlots}</p>
          <p className="text-sm text-muted-foreground">
            Ready for bookings
          </p>
        </div>

        <div className="rounded-lg border p-4 space-y-2">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold">Booked Guests</h3>
          </div>
          <p className="text-3xl font-bold">{totalBookedGuests}</p>
          <p className="text-sm text-muted-foreground">
            Total confirmed guests
          </p>
        </div>

        <div className="rounded-lg border p-4 space-y-2 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900">
          <div className="flex items-center gap-2">
            <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h3 className="font-semibold text-blue-900 dark:text-blue-100">
              Quick Tip
            </h3>
          </div>
          <p className="text-sm text-blue-800 dark:text-blue-200">
            Create multiple slots per day for different times
          </p>
        </div>
      </div>

      {/* Calendar View */}
      <div className="rounded-lg border bg-card">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Your Availability Calendar</h2>
          <p className="text-sm text-muted-foreground mt-1">
            View and manage your availability for the next 7 days
          </p>
        </div>
        <div className="p-6">
          <AvailabilityCalendarView
            availabilities={initialAvailabilities}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>

      {/* Modals */}
      <AddAvailabilityDateModal
        isOpen={isAddModalOpen}
        onClose={handleCloseModals}
        preselectedDate={preselectedDate}
      />

      <EditAvailabilityDateModal
        isOpen={isEditModalOpen}
        onClose={handleCloseModals}
        availability={selectedAvailability}
      />

      <DeleteAvailabilityModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseModals}
        availability={selectedAvailability}
      />
    </div>
  );
}
