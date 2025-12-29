import { Metadata } from "next";
import { getPlatformSettings } from "@/services/settings/settings.service";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { GeneralSettingsContent } from "@/components/modules/Admin/Settings/GeneralSettingsContent";

export const metadata: Metadata = {
  title: "General Settings - Admin Dashboard",
  description: "Manage platform settings and configurations",
};

export default async function GeneralSettingsPage() {
  const result = await getPlatformSettings();

  if (!result.success || !result.data) {
    return (
      <div className="container mx-auto py-6 px-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {result.message || "Failed to load platform settings"}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return <GeneralSettingsContent initialSettings={result.data} />;
}