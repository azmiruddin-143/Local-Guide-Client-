"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updatePlatformSettings } from "@/services/settings/settings.service";
import { IPlatformSettings } from "@/types/settings.interface";
import { SettingsHeader } from "./SettingsHeader";
import { PlatformFeeSettings } from "./PlatformFeeSettings";
import { PayoutSettings } from "./PayoutSettings";
import { PaymentSettings } from "./PaymentSettings";

import { Button } from "@/components/ui/button";
import { Save, RotateCcw } from "lucide-react";
import { GeneralPlatformSettings } from "./GeneralPlatformSettings";
import { SocialLinksSettings } from "./SocialLinksSettings";
import { ContactSettings } from "./ContactSettings";
import { SEOSettings } from "./SEOSettings";

interface GeneralSettingsContentProps {
  initialSettings: IPlatformSettings;
}

export function GeneralSettingsContent({
  initialSettings,
}: GeneralSettingsContentProps) {
  const router = useRouter();
  const [settings, setSettings] = useState<IPlatformSettings>(initialSettings);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const handleUpdate = (section: keyof IPlatformSettings, data: any) => {
    setSettings((prev) => ({
      ...prev,
      [section]: { ...prev[section], ...data },
    }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const result = await updatePlatformSettings(settings);

      if (result.success) {
        toast.success("Settings updated successfully");
        setHasChanges(false);
        router.refresh();
      } else {
        toast.error(result.message || "Failed to update settings");
      }
    } catch (error) {
      toast.error("An error occurred while updating settings");
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setSettings(initialSettings);
    setHasChanges(false);
    toast.info("Changes discarded");
  };

  return (
    <div className="container mx-auto py-6 px-4 max-w-7xl space-y-6">
      <SettingsHeader />

      {/* Sticky Save Bar */}
      {hasChanges && (
        <div className="sticky top-0 z-10 bg-primary/10 border border-primary/20 rounded-lg p-4 flex items-center justify-between">
          <p className="text-sm font-medium">
            You have unsaved changes
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              disabled={isSaving}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Discard
            </Button>
            <Button size="sm" onClick={handleSave} disabled={isSaving}>
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      )}

      {/* Settings Sections */}
      <div className="grid gap-6">
        <PlatformFeeSettings
          data={settings.platformFee}
          onUpdate={(data) => handleUpdate("platformFee", data)}
        />

        <PayoutSettings
          data={settings.payout}
          onUpdate={(data) => handleUpdate("payout", data)}
        />

        <PaymentSettings
          data={settings.payment}
          onUpdate={(data) => handleUpdate("payment", data)}
        />

        <GeneralPlatformSettings
          data={settings.general}
          onUpdate={(data: any) => handleUpdate("general", data)}
        />

        <SocialLinksSettings
          data={settings.socialLinks}
          onUpdate={(data: any) => handleUpdate("socialLinks", data)}
        />

        <ContactSettings
          data={settings.contacts}
          onUpdate={(data: any) => handleUpdate("contacts", data)}
        />

        <SEOSettings
          data={settings.seo}
          onUpdate={(data: any) => handleUpdate("seo", data)}
        />
      </div>

      {/* Bottom Save Button */}
      <div className="flex justify-end gap-2 pt-4 border-t">
        <Button
          variant="outline"
          onClick={handleReset}
          disabled={!hasChanges || isSaving}
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Discard Changes
        </Button>
        <Button onClick={handleSave} disabled={!hasChanges || isSaving}>
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? "Saving..." : "Save All Changes"}
        </Button>
      </div>
    </div>
  );
}
