"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { processPayout } from "@/services/admin/payout.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface ProcessPayoutDialogProps {
  payout: any;
  onClose: () => void;
}

export function ProcessPayoutDialog({ payout, onClose }: ProcessPayoutDialogProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [providerPayoutId, setProviderPayoutId] = useState("");

  const handleProcess = async () => {
    if (!payout) return;

    setIsLoading(true);
    try {
      const result = await processPayout(payout._id, providerPayoutId || undefined);

      if (result.success) {
        toast.success("Payout processed successfully");
        onClose();
        router.refresh();
        setProviderPayoutId("");
      } else {
        toast.error(result.message || "Failed to process payout");
      }
    } catch (error) {
      toast.error("An error occurred while processing payout");
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return `৳${amount.toLocaleString()}`;
  };

  if (!payout) return null;

  return (
    <Dialog open={!!payout} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Process Payout Request</DialogTitle>
          <DialogDescription>
            Confirm payout processing for {payout.guideId.name}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Payout Summary */}
          <Alert className="bg-blue-50 border-blue-200">
            <AlertCircle className="h-4 w-4 text-blue-600" />
            <AlertDescription>
              <div className="space-y-2 text-sm">
                <p className="font-medium text-blue-900">Payout Summary:</p>
                <div className="space-y-1 text-blue-800">
                  <div className="flex justify-between">
                    <span>Guide:</span>
                    <span className="font-medium">{payout.guideId.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Requested Amount:</span>
                    <span className="font-medium">{formatCurrency(payout.amount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Platform Fee:</span>
                    <span className="font-medium text-red-600">
                      -{formatCurrency(payout.platformFee)}
                    </span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-blue-300">
                    <span className="font-semibold">Guide Will Receive:</span>
                    <span className="font-bold text-green-600">
                      {formatCurrency(payout.netAmount)}
                    </span>
                  </div>
                </div>
              </div>
            </AlertDescription>
          </Alert>

          {/* Payment Details */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Payment Method:</span>
              <span className="font-medium capitalize">
                {payout.paymentMethod?.replace("_", " ")}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Account Number:</span>
              <span className="font-medium">{payout.accountDetails?.accountNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Account Name:</span>
              <span className="font-medium">{payout.accountDetails?.accountName}</span>
            </div>
            {payout.accountDetails?.bankName && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Bank Name:</span>
                <span className="font-medium">{payout.accountDetails.bankName}</span>
              </div>
            )}
          </div>

          {/* Provider Payout ID (Optional) */}
          <div className="space-y-2">
            <Label htmlFor="providerPayoutId">
              Provider Payout ID (Optional)
            </Label>
            <Input
              id="providerPayoutId"
              value={providerPayoutId}
              onChange={(e) => setProviderPayoutId(e.target.value)}
              placeholder="Enter transaction/reference ID"
              disabled={isLoading}
            />
            <p className="text-xs text-muted-foreground">
              Enter the transaction ID from your payment provider for tracking
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleProcess} disabled={isLoading}>
            {isLoading ? "Processing..." : "Confirm & Process"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
