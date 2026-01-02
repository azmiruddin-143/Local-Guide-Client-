"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import ManagementTable from "@/components/shared/ManagementTable";
import { payoutsColumns } from "./payoutsColumns";
import { ProcessPayoutDialog } from "./ProcessPayoutDialog";
import { FailPayoutDialog } from "./FailPayoutDialog";
import { PayoutDetailsDialog } from "./PayoutDetailsDialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";

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

interface PayoutsTableNewProps {
  payouts: Payout[];
}

export function PayoutsTableNew({ payouts }: PayoutsTableNewProps) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [processingPayout, setProcessingPayout] = useState<Payout | null>(null);
  const [failingPayout, setFailingPayout] = useState<Payout | null>(null);
  const [viewingPayout, setViewingPayout] = useState<Payout | null>(null);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleView = (payout: Payout) => {
    setViewingPayout(payout);
  };

  // Enhanced columns with action buttons for pending payouts
  const enhancedColumns = [
    ...payoutsColumns,
    {
      header: "Quick Actions",
      accessor: (payout: Payout) => {
        if (payout.status === "PENDING") {
          return (
            <div className="flex items-center gap-1">
              <Button
                size="sm"
                variant="ghost"
                className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                onClick={() => setProcessingPayout(payout)}
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Process
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                onClick={() => setFailingPayout(payout)}
              >
                <XCircle className="h-4 w-4 mr-1" />
                Fail
              </Button>
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
        data={payouts}
        columns={enhancedColumns}
        onView={handleView}
        getRowKey={(payout) => payout._id}
        emptyMessage="No payout requests found"
      />

      {/* Dialogs */}
      <ProcessPayoutDialog
        payout={processingPayout}
        onClose={() => {
          setProcessingPayout(null);
          handleRefresh();
        }}
      />
      <FailPayoutDialog
        payout={failingPayout}
        onClose={() => {
          setFailingPayout(null);
          handleRefresh();
        }}
      />
      <PayoutDetailsDialog
        payout={viewingPayout}
        onClose={() => setViewingPayout(null)}
      />
    </>
  );
}
