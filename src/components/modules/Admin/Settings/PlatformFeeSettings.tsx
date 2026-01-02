"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DollarSign, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface PlatformFeeSettingsProps {
  data: {
    percentage: number;
    type: "PERCENTAGE" | "FIXED";
    enabled: boolean;
  };
  onUpdate: (data: any) => void;
}

export function PlatformFeeSettings({ data, onUpdate }: PlatformFeeSettingsProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-primary" />
          <CardTitle>Platform Fee Configuration</CardTitle>
        </div>
        <CardDescription>
          Configure commission rates and fee structure for the platform
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            Platform fee is deducted when guides request payouts. Tourists pay the full amount.
          </AlertDescription>
        </Alert>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="fee-percentage">
              Fee Percentage (%)
            </Label>
            <Input
              id="fee-percentage"
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={data.percentage}
              onChange={(e) =>
                onUpdate({ percentage: parseFloat(e.target.value) || 0 })
              }
            />
            <p className="text-xs text-muted-foreground">
              Current: {data.percentage}% commission on each payout
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fee-type">Fee Type</Label>
            <Select
              value={data.type}
              onValueChange={(value) => onUpdate({ type: value })}
            >
              <SelectTrigger id="fee-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PERCENTAGE">Percentage</SelectItem>
                <SelectItem value="FIXED">Fixed Amount (Coming Soon)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              How the platform fee is calculated
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <Label htmlFor="fee-enabled">Enable Platform Fee</Label>
            <p className="text-sm text-muted-foreground">
              Turn off to disable all platform fees
            </p>
          </div>
          <Switch
            id="fee-enabled"
            checked={data.enabled}
            onCheckedChange={(checked) => onUpdate({ enabled: checked })}
          />
        </div>

        {/* Example Calculation */}
        <div className="rounded-lg bg-muted p-4 space-y-2">
          <p className="text-sm font-medium">Example Calculation:</p>
          <div className="text-sm space-y-1">
            <p>Tourist Payment: ৳1,000</p>
            <p>Platform Fee ({data.percentage}%): ৳{((1000 * data.percentage) / 100).toFixed(2)}</p>
            <p className="font-semibold text-primary">
              Guide Receives: ৳{(1000 - (1000 * data.percentage) / 100).toFixed(2)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
