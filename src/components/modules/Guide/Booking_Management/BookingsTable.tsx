"use client";
import ManagementTable from "@/components/shared/ManagementTable";
import { confirmBooking, declineBooking, cancelBooking, completeBooking } from "@/services/guide/booking.service";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { bookingsColumns, IBooking } from "./bookingsColumns";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Ban, CheckCheck, MoreVertical, Eye } from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface BookingsTableProps {
  bookings: IBooking[];
}

const BookingsTable = ({ bookings }: BookingsTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [confirmingBooking, setConfirmingBooking] = useState<IBooking | null>(null);
  const [decliningBooking, setDecliningBooking] = useState<IBooking | null>(null);
  const [cancellingBooking, setCancellingBooking] = useState<IBooking | null>(null);
  const [completingBooking, setCompletingBooking] = useState<IBooking | null>(null);
  const [cancellationReason, setCancellationReason] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleConfirm = async () => {
    if (!confirmingBooking) return;

    setIsProcessing(true);
    const result = await confirmBooking(confirmingBooking._id);
    setIsProcessing(false);

    if (result.success) {
      toast.success("Booking confirmed successfully");
      setConfirmingBooking(null);
      handleRefresh();
    } else {
      toast.error(result.message || "Failed to confirm booking");
    }
  };

  const handleDecline = async () => {
    if (!decliningBooking) return;

    setIsProcessing(true);
    const result = await declineBooking(decliningBooking._id);
    setIsProcessing(false);

    if (result.success) {
      toast.success("Booking declined successfully");
      setDecliningBooking(null);
      handleRefresh();
    } else {
      toast.error(result.message || "Failed to decline booking");
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

  const handleComplete = async () => {
    if (!completingBooking) return;

    // Check if tour has ended
    const tourEndTime = completingBooking.endAt 
      ? new Date(completingBooking.endAt) 
      : new Date(completingBooking.startAt);
    
    const now = new Date();
    
    if (now < tourEndTime) {
      toast.error("Cannot complete booking before the tour ends");
      return;
    }
    
    setIsProcessing(true);
    const result = await completeBooking(completingBooking._id);
    setIsProcessing(false);

    if (result.success) {
      toast.success("Booking marked as completed");
      setCompletingBooking(null);
      handleRefresh();
    } else {
      toast.error(result.message || "Failed to complete booking");
    }
  };

  // Enhanced columns with action dropdown
  const enhancedColumns = [
    ...bookingsColumns,
    {
      header: "Actions",
      accessor: (booking: IBooking) => {
        const isPendingWithPayment = booking.status === "PENDING" && booking.paymentStatus === "SUCCEEDED";
        const isConfirmed = booking.status === "CONFIRMED";
        const hasActions = isPendingWithPayment || isConfirmed;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {/* View - Always available */}
              <DropdownMenuItem
                onClick={() => router.push(`/guide/dashboard/bookings/${booking._id}`)}
                className="cursor-pointer"
              >
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>

              {hasActions && <DropdownMenuSeparator />}

              {/* Pending with payment succeeded - show confirm/decline */}
              {isPendingWithPayment && (
                <>
                  <DropdownMenuItem
                    onClick={() => setConfirmingBooking(booking)}
                    className="text-green-600 cursor-pointer"
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Confirm Booking
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setDecliningBooking(booking)}
                    className="text-red-600 cursor-pointer"
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Decline Booking
                  </DropdownMenuItem>
                </>
              )}

              {/* Confirmed - show complete/cancel */}
              {isConfirmed && (
                <>
                  <DropdownMenuItem
                    onClick={() => {
                      const tourEndTime = booking.endAt 
                        ? new Date(booking.endAt) 
                        : new Date(booking.startAt);
                      const now = new Date();
                      
                      if (now < tourEndTime) {
                        toast.error("Cannot complete booking before the tour ends");
                        return;
                      }
                      setCompletingBooking(booking);
                    }}
                    className="text-blue-600 cursor-pointer"
                  >
                    <CheckCheck className="mr-2 h-4 w-4" />
                    Mark as Completed
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setCancellingBooking(booking)}
                    className="text-orange-600 cursor-pointer"
                  >
                    <Ban className="mr-2 h-4 w-4" />
                    Cancel Booking
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <>
      <ManagementTable
        data={bookings}
        columns={enhancedColumns}
        getRowKey={(booking) => booking._id}
        emptyMessage="No bookings found"
      />

      {/* Confirm Booking Dialog */}
      <AlertDialog open={!!confirmingBooking} onOpenChange={(open) => !open && setConfirmingBooking(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Booking</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to confirm this booking? The tourist will be notified.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isProcessing}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm} disabled={isProcessing}>
              {isProcessing ? "Confirming..." : "Confirm Booking"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Decline Booking Dialog */}
      <AlertDialog open={!!decliningBooking} onOpenChange={(open) => !open && setDecliningBooking(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Decline Booking</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to decline this booking? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isProcessing}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDecline} 
              disabled={isProcessing}
              className="bg-red-600 hover:bg-red-700"
            >
              {isProcessing ? "Declining..." : "Decline Booking"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Cancel Booking Dialog */}
      <AlertDialog open={!!cancellingBooking} onOpenChange={(open) => {
        if (!open) {
          setCancellingBooking(null);
          setCancellationReason("");
        }
      }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Booking</AlertDialogTitle>
            <AlertDialogDescription>
              Please provide a reason for cancelling this booking.
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

      {/* Complete Booking Dialog */}
      <AlertDialog open={!!completingBooking} onOpenChange={(open) => !open && setCompletingBooking(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Complete Booking</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to mark this booking as completed? This indicates the tour has been successfully finished.
              {completingBooking && (
                <div className="mt-2 text-sm text-muted-foreground">
                  Tour end time: {completingBooking.endAt 
                    ? new Date(completingBooking.endAt).toLocaleString() 
                    : new Date(completingBooking.startAt).toLocaleString()}
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isProcessing}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleComplete} 
              disabled={isProcessing}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isProcessing ? "Completing..." : "Mark as Completed"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default BookingsTable;
