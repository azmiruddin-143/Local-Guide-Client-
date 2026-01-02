import { Settings } from "lucide-react";

export function SettingsHeader() {
  return (
    <div className="flex items-start gap-4">
      <div className="p-3 rounded-lg bg-primary/10">
        <Settings className="h-6 w-6 text-primary" />
      </div>
      <div>
        <h1 className="text-3xl font-bold tracking-tight">General Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage platform configurations, fees, payouts, and general settings
        </p>
      </div>
    </div>
  );
}
