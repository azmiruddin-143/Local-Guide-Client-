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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, XCircle, Clock, AlertCircle } from "lucide-react";

interface PayoutDetailsDialogProps {
  payout: any;
  onClose: () => void;
}

export function PayoutDetailsDialog({ payout, onClose }: PayoutDetailsDialogProps) {
  const formatCurrency = (amount: number) => {
    return `৳${amount.toLocaleString()}`;
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: any; className?: string; icon: any }> = {
      PENDING: { 
        variant: "secondary", 
        className: "bg-yellow-100 text-yellow-800",
        icon: Clock
      },
      PROCESSING: { 
        variant: "secondary", 
        className: "bg-blue-100 text-blue-800",
        icon: Clock
      },
      SENT: { 
        variant: "default", 
        className: "bg-green-100 text-green-800",
        icon: CheckCircle
      },
      FAILED: { 
        variant: "destructive",
        icon: XCircle
      },
      CANCELLED: { 
        variant: "outline",
        icon: XCircle
      },
    };

    const { variant, className, icon: Icon } = variants[status] || { 
      variant: "outline",
      icon: AlertCircle
    };
    
    return (
      <Badge variant={variant} className={className}>
        <Icon className="h-3 w-3 mr-1" />
        {status}
      </Badge>
    );
  };

  const getStatusMessage = (status: string) => {
    const messages: Record<string, { title: string; description: string; variant: any }> = {
      PENDING: {
        title: "Payout Pending",
        description: "Your payout request is being reviewed by our team. This usually takes 3-5 business days.",
        variant: "default"
      },
      PROCESSING: {
        title: "Processing Payout",
        description: "Your payout is currently being processed. You will receive the funds soon.",
        variant: "default"
      },
      SENT: {
        title: "Payout Sent Successfully",
        description: "Your payout has been processed and sent to your account. Please check your payment method.",
        variant: "default"
      },
      FAILED: {
        title: "Payout Failed",
        description: "Your payout request failed. The amount has been returned to your available balance.",
        variant: "destructive"
      },
      CANCELLED: {
        title: "Payout Cancelled",
        description: "You cancelled this payout request. The amount has been returned to your available balance.",
        variant: "default"
      },
    };

    return messages[status] || {
      title: "Payout Status",
      description: "Status information not available.",
      variant: "default"
    };
  };

  if (!payout) return null;

  const statusInfo = getStatusMessage(payout.status);

  return (
    <Dialog open={!!payout} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Payout Request Details</DialogTitle>
          <DialogDescription>
            Complete information about your payout request
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 max-h-[400px] overflow-y-scroll">
          {/* Status Alert */}
          <Alert variant={statusInfo.variant} className={
            payout.status === "SENT" ? "bg-green-50 border-green-200" :
            payout.status === "PENDING" ? "bg-yellow-50 border-yellow-200" :
            payout.status === "FAILED" ? "bg-red-50 border-red-200" :
            ""
          }>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <p className="font-medium mb-1">{statusInfo.title}</p>
              <p className="text-sm">{statusInfo.description}</p>
            </AlertDescription>
          </Alert>

          {/* Status Badge */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Current Status:</span>
            {getStatusBadge(payout.status)}
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
                  -{formatCurrency(payout.platformFee || 0)}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="font-semibold">You Receive:</span>
                <span className="font-bold text-green-600">
                  {formatCurrency(payout.netAmount || payout.amount)}
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

          {/* Timeline */}
          <div>
            <h3 className="text-sm font-medium mb-3">Timeline</h3>
            <div className="space-y-2">
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
                  <span className="text-muted-foreground">Transaction ID:</span>
                  <span className="font-medium font-mono text-sm">
                    {payout.providerPayoutId}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Failure Reason */}
          {payout.status === "FAILED" && payout.failureReason && (
            <>
              <Separator />
              <div>
                <h3 className="text-sm font-medium mb-2 text-destructive">Failure Reason</h3>
                <Alert variant="destructive">
                  <XCircle className="h-4 w-4" />
                  <AlertDescription>
                    {payout.failureReason}
                  </AlertDescription>
                </Alert>
                <p className="text-xs text-muted-foreground mt-2">
                  The requested amount has been returned to your available balance. 
                  Please correct the issue and request payout again.
                </p>
              </div>
            </>
          )}

          {/* Success Message */}
          {payout.status === "SENT" && (
            <>
              <Separator />
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-900">
                  <p className="font-medium mb-1">Payment Sent Successfully!</p>
                  <p className="text-sm">
                    The amount of {formatCurrency(payout.netAmount)} has been sent to your {payout.paymentMethod?.replace("_", " ")} account. 
                    Please allow 1-2 business days for the funds to reflect in your account.
                  </p>
                </AlertDescription>
              </Alert>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
