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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { failPayout } from "@/services/admin/payout.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

interface FailPayoutDialogProps {
  payout: any;
  onClose: () => void;
}

export function FailPayoutDialog({ payout, onClose }: FailPayoutDialogProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [failureReason, setFailureReason] = useState("");

  const handleFail = async () => {
    if (!payout) return;

    if (!failureReason.trim()) {
      toast.error("Please provide a failure reason");
      return;
    }

    setIsLoading(true);
    try {
      const result = await failPayout(payout._id, failureReason);

      if (result.success) {
        toast.success("Payout marked as failed");
        onClose();
        router.refresh();
        setFailureReason("");
      } else {
        toast.error(result.message || "Failed to mark payout as failed");
      }
    } catch (error) {
      toast.error("An error occurred");
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
          <DialogTitle>Fail Payout Request</DialogTitle>
          <DialogDescription>
            Mark this payout as failed and return funds to guide
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Warning Alert */}
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <p className="font-medium mb-1">This action will:</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Mark the payout as FAILED</li>
                <li>Return {formatCurrency(payout.amount)} to guide's available balance</li>
                <li>Refund the platform fee of {formatCurrency(payout.platformFee)}</li>
                <li>Notify the guide about the failure</li>
              </ul>
            </AlertDescription>
          </Alert>

          {/* Payout Info */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Guide:</span>
              <span className="font-medium">{payout.guideId.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Requested Amount:</span>
              <span className="font-medium">{formatCurrency(payout.amount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Net Amount:</span>
              <span className="font-medium text-green-600">
                {formatCurrency(payout.netAmount)}
              </span>
            </div>
          </div>

          {/* Failure Reason */}
          <div className="space-y-2">
            <Label htmlFor="failureReason">
              Failure Reason <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="failureReason"
              value={failureReason}
              onChange={(e) => setFailureReason(e.target.value)}
              placeholder="Enter the reason for payout failure (e.g., Invalid account details, Insufficient funds, etc.)"
              rows={4}
              disabled={isLoading}
              required
            />
            <p className="text-xs text-muted-foreground">
              This reason will be shown to the guide
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleFail}
            disabled={isLoading || !failureReason.trim()}
          >
            {isLoading ? "Processing..." : "Mark as Failed"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
