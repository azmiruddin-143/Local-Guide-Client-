"use client";

import { useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Compass, Lock, Loader2, CheckCircle, Shield } from "lucide-react";
import { changePassword } from "@/services/auth/auth.service";
import { toast } from "sonner";
import InputFieldError from "@/components/shared/InputFieldError";

export default function ChangePasswordForm() {
  const [state, formAction, isPending] = useActionState(changePassword, null);

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
    if (state && state.success && state.message) {
      toast.success(state.message);
      // Reset form on success
      const form = document.getElementById("change-password-form") as HTMLFormElement;
      if (form) form.reset();
    }
  }, [state]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="relative overflow-hidden rounded-lg bg-linear-to-br from-primary/10 via-primary/5 to-background border p-6">
        <div className="relative z-10">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Change Password</h1>
              <p className="text-muted-foreground mt-1">
                Update your password to keep your account secure
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {state?.success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
            <div>
              <h3 className="font-semibold text-green-900 text-sm">
                Password Changed Successfully!
              </h3>
              <p className="text-sm text-green-800 mt-1">
                Your password has been updated. Please use your new password for future logins.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Form Card */}
      <Card>
        <CardHeader>
          <CardTitle>Update Your Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form id="change-password-form" action={formAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="oldPassword">Current Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="oldPassword"
                  name="oldPassword"
                  type="password"
                  placeholder="Enter current password"
                  className="h-11 pl-10"
                  required
                  disabled={isPending}
                />
              </div>
              <InputFieldError field="oldPassword" state={state} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  placeholder="Enter new password"
                  className="h-11 pl-10"
                  required
                  disabled={isPending}
                />
              </div>
              <InputFieldError field="newPassword" state={state} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm new password"
                  className="h-11 pl-10"
                  required
                  disabled={isPending}
                />
              </div>
              <InputFieldError field="confirmPassword" state={state} />
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                className="w-full h-11 text-base font-semibold"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Changing Password...
                  </>
                ) : (
                  "Change Password"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Compass className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
          <div>
            <h3 className="font-semibold text-blue-900 text-sm">
              Password Requirements
            </h3>
            <ul className="text-sm text-blue-800 mt-1 space-y-1 list-disc list-inside">
              <li>At least 6 characters long</li>
              <li>New password must be different from current password</li>
              <li>Both new passwords must match</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
