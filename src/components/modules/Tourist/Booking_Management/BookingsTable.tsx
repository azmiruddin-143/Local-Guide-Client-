"use client";
import ManagementTable from "@/components/shared/ManagementTable";
import { cancelBooking, retryPayment } from "@/services/tourist/booking.service";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { bookingsColumns, IBooking } from "./bookingsColumns";
import { Button } from "@/components/ui/button";
import { Ban, CreditCard, AlertCircle } from "lucide-react";
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
import Link from "next/link";

interface BookingsTableProps {
  bookings: IBooking[];
}

const BookingsTable = ({ bookings }: BookingsTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [cancellingBooking, setCancellingBooking] = useState<IBooking | null>(null);
  const [cancellationReason, setCancellationReason] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
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

  const handleRetryPayment = async (booking: IBooking) => {
    setIsProcessing(true);
    const result = await retryPayment(booking._id);
    setIsProcessing(false);
    
    if (result.success) {
      toast.success("Redirecting to payment gateway...");
      
      // Redirect to SSLCommerz payment gateway
      if (result.data?.paymentUrl?.GatewayPageURL) {
        window.location.href = result.data.paymentUrl.GatewayPageURL;
      } else {
        toast.error("Payment URL not received");
      }
    } else {
      toast.error(result.message || "Failed to retry payment");
    }
  };

  // Enhanced columns with action buttons
  const enhancedColumns = [
    ...bookingsColumns,
    {
      header: "Actions",
      accessor: (booking: IBooking) => {
        // Show retry payment for failed payments
        if (booking.paymentStatus === "FAILED" || booking.paymentStatus === "PENDING") {
          return (
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                className="text-blue-600 hover:text-blue-700"
                onClick={() => handleRetryPayment(booking)}
                disabled={isProcessing}
              >
                <CreditCard className="mr-1 h-3 w-3" />
                {isProcessing ? "Processing..." : booking.paymentStatus === "FAILED" ? "Retry Payment" : "Complete Payment"}
              </Button>
            </div>
          );
        }

        // Show cancel for pending bookings only
        if (booking.status === "PENDING" && booking.paymentStatus !== "SUCCEEDED") {
          return (
            <Button
              size="sm"
              variant="outline"
              className="text-orange-600 hover:text-orange-700"
              onClick={() => setCancellingBooking(booking)}
              disabled={isProcessing}
            >
              <Ban className="mr-1 h-3 w-3" />
              Cancel
            </Button>
          );
        }

        // Show reminder for pending payment with succeeded status
        if (booking.status === "PENDING" && booking.paymentStatus === "SUCCEEDED") {
          return (
            <div className="flex items-center gap-1 text-xs text-yellow-600">
              <AlertCircle className="h-3 w-3" />
              <span>Awaiting confirmation</span>
            </div>
          );
        }

        return null;
      },
    },
  ];

  return (
    <>
      <ManagementTable
        data={bookings}
        columns={enhancedColumns}
        onView={(booking) => router.push(`/dashboard/bookings/${booking._id}`)}
        getRowKey={(booking) => booking._id}
        emptyMessage="No bookings found"
      />

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
