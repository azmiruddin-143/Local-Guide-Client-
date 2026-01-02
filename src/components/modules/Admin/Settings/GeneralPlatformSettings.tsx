"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Globe } from "lucide-react";

interface GeneralPlatformSettingsProps {
  data: {
    platformName: string;
    supportEmail: string;
    supportPhone: string;
    maintenanceMode: boolean;
    allowNewGuideRegistrations: boolean;
  };
  onUpdate: (data: any) => void;
}

export function GeneralPlatformSettings({
  data,
  onUpdate,
}: GeneralPlatformSettingsProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-primary" />
          <CardTitle>General Platform Settings</CardTitle>
        </div>
        <CardDescription>
          Configure basic platform information and features
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="platform-name">Platform Name</Label>
            <Input
              id="platform-name"
              value={data.platformName}
              onChange={(e) => onUpdate({ platformName: e.target.value })}
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

          <div className="space-y-2">
            <Label htmlFor="support-phone">Support Phone</Label>
            <Input
              id="support-phone"
              value={data.supportPhone}
              onChange={(e) => onUpdate({ supportPhone: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
              <p className="text-sm text-muted-foreground">
                Enable to show maintenance page to users
              </p>
            </div>
            <Switch
              id="maintenance-mode"
              checked={data.maintenanceMode}
              onCheckedChange={(checked) =>
                onUpdate({ maintenanceMode: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="allow-registrations">
                Allow New Guide Registrations
              </Label>
              <p className="text-sm text-muted-foreground">
                Enable to allow new guides to register
              </p>
            </div>
            <Switch
              id="allow-registrations"
              checked={data.allowNewGuideRegistrations}
              onCheckedChange={(checked) =>
                onUpdate({ allowNewGuideRegistrations: checked })
              }
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
