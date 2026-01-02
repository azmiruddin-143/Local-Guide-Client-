"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import ManagementTable from "@/components/shared/ManagementTable";
import { payoutsColumnsNew } from "./payoutsColumnsNew";
import { PayoutDetailsDialog } from "./PayoutDetailsDialog";
import { cancelPayout } from "@/services/guide/earnings.service";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
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

interface Payout {
  _id: string;
  amount: number;
  platformFee: number;
  netAmount: number;
  currency: string;
  status: string;
  paymentMethod: string;
  requestedAt: string;
  processedAt?: string;
}

interface PayoutsTableNewProps {
  payouts: Payout[];
}

export function PayoutsTableNew({ payouts }: PayoutsTableNewProps) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [viewingPayout, setViewingPayout] = useState<Payout | null>(null);
  const [cancellingPayout, setCancellingPayout] = useState<Payout | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleView = (payout: Payout) => {
    setViewingPayout(payout);
  };

  const handleCancelPayout = async () => {
    if (!cancellingPayout) return;

    setIsLoading(true);
    try {
      const result = await cancelPayout(cancellingPayout._id);
      if (result.success) {
        toast.success("Payout cancelled successfully");
        setCancellingPayout(null);
        handleRefresh();
      } else {
        toast.error(result.message || "Failed to cancel payout");
      }
    } catch (error) {
      toast.error("An error occurred while cancelling payout");
    } finally {
      setIsLoading(false);
    }
  };

  // Enhanced columns with cancel button for pending payouts
  const enhancedColumns = [
    ...payoutsColumnsNew,
    {
      header: "Quick Actions",
      accessor: (payout: Payout) => {
        if (payout.status === "PENDING") {
          return (
            <Button
              size="sm"
              variant="ghost"
              className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
              onClick={() => setCancellingPayout(payout)}
              disabled={isLoading}
            >
              <XCircle className="h-4 w-4 mr-1" />
              Cancel
            </Button>
          );
        }
        return null;
      },
    },
  ];

  if (payouts.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>No payout requests yet</p>
        <p className="text-sm mt-2">Request your first payout to see it here</p>
      </div>
    );
  }

  return (
    <>
      <ManagementTable
        data={payouts}
        columns={enhancedColumns}
        onView={handleView}
        getRowKey={(payout) => payout._id}
        emptyMessage="No payout requests found"
      />

      {/* Cancel Confirmation Dialog */}
      <AlertDialog 
        open={!!cancellingPayout} 
        onOpenChange={(open) => !open && setCancellingPayout(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Payout Request</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this payout request? The amount will be returned to your available balance.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Keep Request</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancelPayout}
              disabled={isLoading}
              className="bg-destructive hover:bg-destructive/90"
            >
              {isLoading ? "Cancelling..." : "Cancel Payout"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Payout Details Dialog */}
      <PayoutDetailsDialog
        payout={viewingPayout}
        onClose={() => setViewingPayout(null)}
      />
    </>
  );
}
