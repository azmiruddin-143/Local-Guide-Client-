"use client";

import { useState } from "react";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProcessPayoutDialog } from "./ProcessPayoutDialog";
import { FailPayoutDialog } from "./FailPayoutDialog";
import { CheckCircle, XCircle, Eye } from "lucide-react";
import { PayoutDetailsDialog } from "./PayoutDetailsDialog";

interface Payout {
  _id: string;
  guideId: {
    _id: string;
    name: string;
    email: string;
    phoneNumber?: string;
    avatarUrl?: string;
  };
  amount: number;
  platformFee: number;
  netAmount: number;
  currency: string;
  status: string;
  paymentMethod: string;
  accountDetails: any;
  requestedAt: string;
  processedAt?: string;
  failureReason?: string;
  providerPayoutId?: string;
}

interface PayoutsTableProps {
  payouts: Payout[];
}

export function PayoutsTable({ payouts }: PayoutsTableProps) {
  const [processingPayout, setProcessingPayout] = useState<Payout | null>(null);
  const [failingPayout, setFailingPayout] = useState<Payout | null>(null);
  const [viewingPayout, setViewingPayout] = useState<Payout | null>(null);

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

  const formatCurrency = (amount: number, currency: string = "BDT") => {
    return `৳${amount.toLocaleString()}`;
  };

  const pendingPayouts = payouts.filter((p) => p.status === "PENDING");
  const processedPayouts = payouts.filter((p) => p.status !== "PENDING");

  return (
    <>
      <div className="space-y-6">
        {/* Pending Payouts */}
        {pendingPayouts.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3">
              Pending Payouts ({pendingPayouts.length})
            </h3>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Guide</TableHead>
                    <TableHead>Requested</TableHead>
                    <TableHead>Platform Fee</TableHead>
                    <TableHead>Net Amount</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingPayouts.map((payout) => (
                    <TableRow key={payout._id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={payout.guideId.avatarUrl} />
                            <AvatarFallback>
                              {payout.guideId.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{payout.guideId.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {payout.guideId.email}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {formatCurrency(payout.amount, payout.currency)}
                      </TableCell>
                      <TableCell className="text-red-600">
                        -{formatCurrency(payout.platformFee, payout.currency)}
                      </TableCell>
                      <TableCell className="font-semibold text-green-600">
                        {formatCurrency(payout.netAmount, payout.currency)}
                      </TableCell>
                      <TableCell className="capitalize">
                        {payout.paymentMethod?.replace("_", " ")}
                      </TableCell>
                      <TableCell>
                        {format(new Date(payout.requestedAt), "MMM dd, yyyy")}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setViewingPayout(payout)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-green-600 hover:text-green-700"
                            onClick={() => setProcessingPayout(payout)}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Process
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-red-600 hover:text-red-700"
                            onClick={() => setFailingPayout(payout)}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Fail
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}

        {/* Processed Payouts */}
        {processedPayouts.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3">
              Processed Payouts ({processedPayouts.length})
            </h3>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Guide</TableHead>
                    <TableHead>Requested</TableHead>
                    <TableHead>Platform Fee</TableHead>
                    <TableHead>Net Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {processedPayouts.map((payout) => (
                    <TableRow key={payout._id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={payout.guideId.avatarUrl} />
                            <AvatarFallback>
                              {payout.guideId.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{payout.guideId.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {payout.guideId.email}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {formatCurrency(payout.amount, payout.currency)}
                      </TableCell>
                      <TableCell className="text-red-600">
                        -{formatCurrency(payout.platformFee, payout.currency)}
                      </TableCell>
                      <TableCell className="font-semibold text-green-600">
                        {formatCurrency(payout.netAmount, payout.currency)}
                      </TableCell>
                      <TableCell>{getStatusBadge(payout.status)}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{format(new Date(payout.requestedAt), "MMM dd, yyyy")}</div>
                          {payout.processedAt && (
                            <div className="text-xs text-muted-foreground">
                              Processed: {format(new Date(payout.processedAt), "MMM dd")}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setViewingPayout(payout)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}

        {payouts.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No payout requests found
          </div>
        )}
      </div>

      {/* Dialogs */}
      <ProcessPayoutDialog
        payout={processingPayout}
        onClose={() => setProcessingPayout(null)}
      />
      <FailPayoutDialog
        payout={failingPayout}
        onClose={() => setFailingPayout(null)}
      />
      <PayoutDetailsDialog
        payout={viewingPayout}
        onClose={() => setViewingPayout(null)}
      />
    </>
  );
}
