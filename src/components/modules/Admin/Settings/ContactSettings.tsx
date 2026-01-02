"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone } from "lucide-react";

interface ContactSettingsProps {
  data: {
    address: string;
    phone: string;
    email: string;
    supportEmail: string;
    supportPhone: string;
    businessHours: string;
  };
  onUpdate: (data: any) => void;
}

export function ContactSettings({ data, onUpdate }: ContactSettingsProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Phone className="h-5 w-5 text-primary" />
          <CardTitle>Contact Information</CardTitle>
        </div>
        <CardDescription>
          Configure contact details displayed on the platform
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              value={data.address}
              onChange={(e) => onUpdate({ address: e.target.value })}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="business-hours">Business Hours</Label>
            <Textarea
              id="business-hours"
              value={data.businessHours}
              onChange={(e) => onUpdate({ businessHours: e.target.value })}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={data.phone}
              onChange={(e) => onUpdate({ phone: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={data.email}
              onChange={(e) => onUpdate({ email: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="support-phone">Support Phone</Label>
            <Input
              id="support-phone"
              value={data.supportPhone}
              onChange={(e) => onUpdate({ supportPhone: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="support-email">Support Email</Label>
            <Input
              id="support-email"
              type="email"
              value={data.supportEmail}
              onChange={(e) => onUpdate({ supportEmail: e.target.value })}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
