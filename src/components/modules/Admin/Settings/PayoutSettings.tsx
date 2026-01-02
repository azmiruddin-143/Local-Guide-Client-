"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Wallet } from "lucide-react";

interface PayoutSettingsProps {
  data: {
    minimumAmount: number;
    processingDays: number;
    maxPendingPayouts: number;
  };
  onUpdate: (data: any) => void;
}

export function PayoutSettings({ data, onUpdate }: PayoutSettingsProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Wallet className="h-5 w-5 text-primary" />
          <CardTitle>Payout Configuration</CardTitle>
        </div>
        <CardDescription>
          Configure payout rules and processing settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="min-amount">
              Minimum Payout Amount (BDT)
            </Label>
            <Input
              id="min-amount"
              type="number"
              min="0"
              step="100"
              value={data.minimumAmount}
              onChange={(e) =>
                onUpdate({ minimumAmount: parseFloat(e.target.value) || 0 })
              }
            />
            <p className="text-xs text-muted-foreground">
              Minimum amount guides can request
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="processing-days">
              Processing Days
            </Label>
            <Input
              id="processing-days"
              type="number"
              min="1"
              max="30"
              value={data.processingDays}
              onChange={(e) =>
                onUpdate({ processingDays: parseInt(e.target.value) || 1 })
              }
            />
            <p className="text-xs text-muted-foreground">
              Expected processing time
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="max-pending">
              Max Pending Payouts
            </Label>
            <Input
              id="max-pending"
              type="number"
              min="1"
              max="20"
              value={data.maxPendingPayouts}
              onChange={(e) =>
                onUpdate({ maxPendingPayouts: parseInt(e.target.value) || 1 })
              }
            />
            <p className="text-xs text-muted-foreground">
              Per guide limit
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
