"use client";

import ManagementTable from "@/components/shared/ManagementTable";
import { ITour } from "@/types/tour.interface";
import { useState } from "react";
import { tourColumns } from "./tourColumns";
import TourDetailDialog from "./TourDetailDialog";
import ToggleTourStatusDialog from "./ToggleTourStatusDialog";
import DeleteTourDialog from "./DeleteTourDialog";
import { useRouter } from "next/navigation";

interface MyToursTableProps {
  tours: ITour[];
}

export default function MyToursTable({ tours = [] }: MyToursTableProps) {
  const router = useRouter();
  const [viewingTour, setViewingTour] = useState<ITour | null>(null);
  const [togglingTour, setTogglingTour] = useState<ITour | null>(null);
  const [deletingTour, setDeletingTour] = useState<ITour | null>(null);

  const handleView = (tour: ITour) => {
    setViewingTour(tour);
  };

  const handleOnOff = (tour: ITour) => {
    setTogglingTour(tour);
  };

  const handleEdit = (tour: ITour) => {
    router.push(`/guide/dashboard/edit-tour/${tour._id}`);
  };

  const handleDelete = (tour: ITour) => {
    setDeletingTour(tour);
  };

  const handleCloseAndRefresh = () => {
    setViewingTour(null);
    setTogglingTour(null);
    setDeletingTour(null);
    router.refresh();
  };

  return (
    <>
      <ManagementTable
        data={tours}
        columns={tourColumns}
        onView={handleView}
        onEdit={handleEdit}
        onToggle={handleOnOff}
        onDelete={handleDelete}
        getRowKey={(tour) => tour._id}
        emptyMessage="No tours found. Create your first tour to get started!"
      />

      {/* View Detail Dialog */}
      {viewingTour && (
        <TourDetailDialog
          tour={viewingTour}
          open={!!viewingTour}
          onClose={() => setViewingTour(null)}
        />
      )}

      {/* Toggle Status Dialog */}
      {togglingTour && (
        <ToggleTourStatusDialog
          tour={togglingTour}
          isOpen={!!togglingTour}
          onClose={handleCloseAndRefresh}
        />
      )}

      {/* Delete Dialog */}
      {deletingTour && (
        <DeleteTourDialog
          tour={deletingTour}
          isOpen={!!deletingTour}
          onClose={handleCloseAndRefresh}
        />
      )}
    </>
  );
}
