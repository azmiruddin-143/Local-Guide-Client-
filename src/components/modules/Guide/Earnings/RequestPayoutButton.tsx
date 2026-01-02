"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DollarSign } from "lucide-react";
import { RequestPayoutModal } from "./RequestPayoutModal";
import { WalletBalance } from "@/services/guide/earnings.service";

interface RequestPayoutButtonProps {
  wallet: WalletBalance;
}

export function RequestPayoutButton({ wallet }: RequestPayoutButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const payableBalance = wallet.payableBalance || 0;

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        disabled={payableBalance < 100}
        size="lg"
      >
        <DollarSign className="h-4 w-4 mr-2" />
        Request Payout
      </Button>

      <RequestPayoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        wallet={wallet}
      />
    </>
  );
}
