"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreditCard } from "lucide-react";

interface PaymentSettingsProps {
  data: {
    currency: string;
    taxPercentage: number;
    gateway: "SSLCOMMERZ" | "STRIPE" | "BOTH";
  };
  onUpdate: (data: any) => void;
}

export function PaymentSettings({ data, onUpdate }: PaymentSettingsProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-primary" />
          <CardTitle>Payment Configuration</CardTitle>
        </div>
        <CardDescription>
          Configure payment gateway and currency settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="currency">Currency</Label>
            <Input
              id="currency"
              value={data.currency}
              onChange={(e) => onUpdate({ currency: e.target.value })}
              placeholder="BDT"
            />
            <p className="text-xs text-muted-foreground">
              Default platform currency
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tax-percentage">
              Tax/VAT Percentage (%)
            </Label>
            <Input
              id="tax-percentage"
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={data.taxPercentage}
              onChange={(e) =>
                onUpdate({ taxPercentage: parseFloat(e.target.value) || 0 })
              }
            />
            <p className="text-xs text-muted-foreground">
              Applied to transactions
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="gateway">Payment Gateway</Label>
            <Select
              value={data.gateway}
              onValueChange={(value) => onUpdate({ gateway: value })}
            >
              <SelectTrigger id="gateway">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SSLCOMMERZ">SSLCommerz</SelectItem>
                <SelectItem value="STRIPE">Stripe</SelectItem>
                <SelectItem value="BOTH">Both</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Active payment gateway
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
