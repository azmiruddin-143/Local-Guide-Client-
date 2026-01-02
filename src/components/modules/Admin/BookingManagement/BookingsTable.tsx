"use client";
import ManagementTable from "@/components/shared/ManagementTable";
import { 
  confirmBooking, 
  declineBooking, 
  cancelBooking, 
  completeBooking 
} from "@/services/admin/bookingManagement";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { bookingColumns, IBooking } from "./bookingColumns";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Ban, CheckCheck } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import BookingDetailsDialog from "./BookingDetailsDialog";


interface BookingsTableProps {
  bookings: IBooking[];
}

const BookingsTable = ({ bookings }: BookingsTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [selectedBooking, setSelectedBooking] = useState<IBooking | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [cancellingBooking, setCancellingBooking] = useState<IBooking | null>(null);
  const [cancellationReason, setCancellationReason] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleConfirm = async (booking: IBooking) => {
    setIsProcessing(true);
    const result = await confirmBooking(booking._id);
    setIsProcessing(false);

    if (result.success) {
      toast.success("Booking confirmed successfully");
      handleRefresh();
    } else {
      toast.error(result.message || "Failed to confirm booking");
    }
  };


  const handleCancel = async () => {
    if (!cancellingBooking || !cancellationReason.trim()) {
      toast.error("Please provide a cancellation reason");
      return;
    }

    setIsProcessing(true);
    const result = await cancelBooking(cancellingBooking._id, cancellationReason);
    setIsProcessing(false);

    if (result.success) {
      toast.success("Booking cancelled successfully");
      setCancellingBooking(null);
      setCancellationReason("");
      handleRefresh();
    } else {
      toast.error(result.message || "Failed to cancel booking");
    }
  };



  const handleViewDetails = (booking: IBooking) => {
    setSelectedBooking(booking);
    setIsDetailsOpen(true);
  };



  return (
    <>
      <ManagementTable
        data={bookings}
        columns={bookingColumns}
        onView={handleViewDetails}
        getRowKey={(booking) => booking._id}
        emptyMessage="No bookings found"
      />

      {/* Booking Details Dialog */}
      {selectedBooking && (
        <BookingDetailsDialog
          booking={selectedBooking}
          open={isDetailsOpen}
          onClose={() => {
            setIsDetailsOpen(false);
            setSelectedBooking(null);
          }}
        />
      )}

      {/* Cancel Booking Dialog */}
      <AlertDialog 
        open={!!cancellingBooking} 
        onOpenChange={(open) => {
          if (!open) {
            setCancellingBooking(null);
            setCancellationReason("");
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Booking</AlertDialogTitle>
            <AlertDialogDescription>
              Please provide a reason for cancelling this booking. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <Label htmlFor="cancellationReason">Cancellation Reason *</Label>
            <Textarea
              id="cancellationReason"
              value={cancellationReason}
              onChange={(e) => setCancellationReason(e.target.value)}
              placeholder="Enter reason for cancellation..."
              rows={4}
              className="mt-2"
              disabled={isProcessing}
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isProcessing}>Keep Booking</AlertDialogCancel>
            <AlertDialogAction 
              onClick={(e) => {
                e.preventDefault();
                handleCancel();
              }}
              disabled={isProcessing || !cancellationReason.trim()}
              className="bg-orange-600 hover:bg-orange-700"
            >
              {isProcessing ? "Cancelling..." : "Cancel Booking"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default BookingsTable;
