"use client";

import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PayoutDetailsDialogProps {
  payout: any;
  onClose: () => void;
}

export function PayoutDetailsDialog({ payout, onClose }: PayoutDetailsDialogProps) {
  const formatCurrency = (amount: number) => {
    return `৳${amount.toLocaleString()}`;
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: any; className?: string }> = {
      PENDING: { variant: "secondary", className: "bg-yellow-100 text-yellow-800" },
      PROCESSING: { variant: "secondary", className: "bg-blue-100 text-blue-800" },
      SENT: { variant: "default", className: "bg-green-100 text-green-800" },
      FAILED: { variant: "destructive" },
      CANCELLED: { variant: "outline" },
    };

    const { variant, className } = variants[status] || { variant: "outline" };
    return (
      <Badge variant={variant} className={className}>
        {status}
      </Badge>
    );
  };

  if (!payout) return null;

  return (
    <Dialog open={!!payout} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Payout Details</DialogTitle>
          <DialogDescription>
            Complete information about this payout request
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Guide Info */}
          <div>
            <h3 className="text-sm font-medium mb-3">Guide Information</h3>
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={payout.guideId.avatarUrl} />
                <AvatarFallback>{payout.guideId.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{payout.guideId.name}</div>
                <div className="text-sm text-muted-foreground">{payout.guideId.email}</div>
                {payout.guideId.phoneNumber && (
                  <div className="text-sm text-muted-foreground">
                    {payout.guideId.phoneNumber}
                  </div>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Amount Breakdown */}
          <div>
            <h3 className="text-sm font-medium mb-3">Amount Breakdown</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Requested Amount:</span>
                <span className="font-medium">{formatCurrency(payout.amount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Platform Fee:</span>
                <span className="font-medium text-red-600">
                  -{formatCurrency(payout.platformFee)}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="font-semibold">Net Amount (Guide Receives):</span>
                <span className="font-bold text-green-600">
                  {formatCurrency(payout.netAmount)}
                </span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Payment Details */}
          <div>
            <h3 className="text-sm font-medium mb-3">Payment Details</h3>
            <div className="space-y-2">
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
              {payout.accountDetails?.branchName && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Branch Name:</span>
                  <span className="font-medium">{payout.accountDetails.branchName}</span>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Status & Dates */}
          <div>
            <h3 className="text-sm font-medium mb-3">Status & Timeline</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Status:</span>
                {getStatusBadge(payout.status)}
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Requested At:</span>
                <span className="font-medium">
                  {format(new Date(payout.requestedAt), "MMM dd, yyyy HH:mm")}
                </span>
              </div>
              {payout.processedAt && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Processed At:</span>
                  <span className="font-medium">
                    {format(new Date(payout.processedAt), "MMM dd, yyyy HH:mm")}
                  </span>
                </div>
              )}
              {payout.providerPayoutId && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Provider Payout ID:</span>
                  <span className="font-medium font-mono text-sm">
                    {payout.providerPayoutId}
                  </span>
                </div>
              )}
              {payout.failureReason && (
                <div className="flex flex-col gap-1">
                  <span className="text-muted-foreground">Failure Reason:</span>
                  <span className="text-sm text-destructive bg-destructive/10 p-2 rounded">
                    {payout.failureReason}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
