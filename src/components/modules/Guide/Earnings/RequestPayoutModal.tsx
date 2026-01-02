"use client";

import { useState, useEffect } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { requestPayout, WalletBalance } from "@/services/guide/earnings.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getPlatformSettings } from "@/services/settings/settings.service";

interface RequestPayoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  wallet: WalletBalance;
}

export function RequestPayoutModal({ isOpen, onClose, wallet }: RequestPayoutModalProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [amount, setAmount] = useState("");
  const [platformFeePercentage, setPlatformFeePercentage] = useState(15);
  const [accountDetails, setAccountDetails] = useState({
    accountNumber: "",
    accountName: "",
    bankName: "",
    branchName: "",
    mobileNumber: "",
  });

  // Fetch platform fee percentage on mount
  useEffect(() => {
    const fetchPlatformFee = async () => {
      const result = await getPlatformSettings();
      if (result.success && result.data) {
        setPlatformFeePercentage(result.data.platformFee.percentage);
      }
    };
    fetchPlatformFee();
  }, []);

  // Calculate platform fee and net amount
  const amountNum = parseFloat(amount) || 0;
  const platformFee = (amountNum * platformFeePercentage) / 100;
  const netAmount = amountNum - platformFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const amountNum = parseFloat(amount);

    // Validation
    if (!paymentMethod) {
      toast.error("Please select a payment method");
      return;
    }

    if (!amountNum || amountNum <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (amountNum < 100) {
      toast.error("Minimum payout amount is 100 BDT");
      return;
    }

    if (amountNum > (wallet.payableBalance || 0)) {
      toast.error(`Insufficient balance. Payable: ৳${(wallet.payableBalance || 0).toLocaleString()}`);
      return;
    }

    if (!accountDetails.accountNumber || !accountDetails.accountName) {
      toast.error("Please fill in all required account details");
      return;
    }

    setIsLoading(true);

    try {
      const result = await requestPayout({
        amount: amountNum,
        paymentMethod,
        accountDetails: {
          accountNumber: accountDetails.accountNumber,
          accountName: accountDetails.accountName,
          ...(accountDetails.bankName && { bankName: accountDetails.bankName }),
          ...(accountDetails.branchName && { branchName: accountDetails.branchName }),
          ...(accountDetails.mobileNumber && { mobileNumber: accountDetails.mobileNumber }),
        },
      });

      if (result.success) {
        toast.success("Payout request submitted successfully");
        onClose();
        router.refresh();
        // Reset form
        setAmount("");
        setPaymentMethod("");
        setAccountDetails({
          accountNumber: "",
          accountName: "",
          bankName: "",
          branchName: "",
          mobileNumber: "",
        });
      } else {
        toast.error(result.message || "Failed to request payout");
      }
    } catch (error) {
      toast.error("An error occurred while requesting payout");
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return `৳${amount.toLocaleString()}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Request Payout</DialogTitle>
          <DialogDescription>
            Request a payout from your available balance
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4 max-h-[500px] overflow-y-scroll">
            {/* Available Balance Info */}
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Payable Balance: <span className="font-semibold">{formatCurrency(wallet.payableBalance || 0)}</span>
                <br />
                Minimum payout: ৳100
              </AlertDescription>
            </Alert>

            {/* Amount */}
            <div className="grid gap-2">
              <Label htmlFor="amount">Payout Amount (BDT) *</Label>
              <Input
                id="amount"
                type="number"
                min="100"
                max={wallet.payableBalance || 0}
                step="1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                disabled={isLoading}
                required
              />
              <p className="text-xs text-muted-foreground">
                Enter amount between ৳100 and {formatCurrency(wallet.payableBalance || 0)}
              </p>
            </div>

            {/* Platform Fee Breakdown */}
            {amountNum > 0 && (
              <Alert className="bg-blue-50 border-blue-200">
                <AlertCircle className="h-4 w-4 text-blue-600" />
                <AlertDescription>
                  <div className="space-y-2 text-sm">
                    <p className="font-medium text-blue-900">Payout Breakdown:</p>
                    <div className="space-y-1 text-blue-800">
                      <div className="flex justify-between">
                        <span>Requested Amount:</span>
                        <span className="font-medium">{formatCurrency(amountNum)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Platform Fee ({platformFeePercentage}%):</span>
                        <span className="font-medium text-red-600">-{formatCurrency(platformFee)}</span>
                      </div>
                      <div className="flex justify-between pt-1 border-t border-blue-300">
                        <span className="font-semibold">You Will Receive:</span>
                        <span className="font-bold text-green-600">{formatCurrency(netAmount)}</span>
                      </div>
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            )}

            {/* Payment Method */}
            <div className="grid gap-2">
              <Label htmlFor="paymentMethod">Payment Method *</Label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod} disabled={isLoading}>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                  <SelectItem value="bkash">bKash</SelectItem>
                  <SelectItem value="nagad">Nagad</SelectItem>
                  <SelectItem value="rocket">Rocket</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Account Details */}
            <div className="grid gap-2">
              <Label htmlFor="accountNumber">
                {paymentMethod === "bank_transfer" ? "Account Number" : "Mobile Number"} *
              </Label>
              <Input
                id="accountNumber"
                value={accountDetails.accountNumber}
                onChange={(e) => setAccountDetails({ ...accountDetails, accountNumber: e.target.value })}
                placeholder={paymentMethod === "bank_transfer" ? "Enter account number" : "Enter mobile number"}
                disabled={isLoading}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="accountName">Account Name *</Label>
              <Input
                id="accountName"
                value={accountDetails.accountName}
                onChange={(e) => setAccountDetails({ ...accountDetails, accountName: e.target.value })}
                placeholder="Enter account holder name"
                disabled={isLoading}
                required
              />
            </div>

            {paymentMethod === "bank_transfer" && (
              <>
                <div className="grid gap-2">
                  <Label htmlFor="bankName">Bank Name</Label>
                  <Input
                    id="bankName"
                    value={accountDetails.bankName}
                    onChange={(e) => setAccountDetails({ ...accountDetails, bankName: e.target.value })}
                    placeholder="Enter bank name"
                    disabled={isLoading}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="branchName">Branch Name</Label>
                  <Input
                    id="branchName"
                    value={accountDetails.branchName}
                    onChange={(e) => setAccountDetails({ ...accountDetails, branchName: e.target.value })}
                    placeholder="Enter branch name"
                    disabled={isLoading}
                  />
                </div>
              </>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || !paymentMethod || !amount}>
              {isLoading ? "Requesting..." : "Request Payout"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
