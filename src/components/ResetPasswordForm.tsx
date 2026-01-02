"use client";

import { useActionState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Compass, Lock, Loader2, CheckCircle } from "lucide-react";
import Link from "next/link";
import { resetPasswordWithToken } from "@/services/auth/auth.service";
import { toast } from "sonner";
import InputFieldError from "./shared/InputFieldError";
import { useRouter } from "next/navigation";

interface ResetPasswordFormProps {
  params: any
}

export default function ResetPasswordForm({ params }: ResetPasswordFormProps) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    resetPasswordWithToken,
    null
  );

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
    if (state && state.success && state.message) {
      toast.success(state.message);
      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    }
  }, [state, router]);

  return (
    <div className="w-full max-w-md space-y-6">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="flex justify-center">
          <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
            <Compass className="h-8 w-8 text-primary" />
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reset Password</h1>
          <p className="text-gray-600 mt-2">
            Enter your new password below
          </p>
        </div>
      </div>

      {/* Success Message */}
      {state?.success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
            <div>
              <h3 className="font-semibold text-green-900 text-sm">
                Password Reset Successfully!
              </h3>
              <p className="text-sm text-green-800 mt-1">
                Redirecting you to login page...
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Form */}
      <form action={formAction} className="space-y-4">
        <input type="hidden" name="token" value={params.token} />
        <input type="id" name="id" value={params.id} />

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
          <Label htmlFor="confirmPassword">Confirm Password</Label>
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

        <Button
          type="submit"
          className="w-full h-11 text-base font-semibold"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Resetting Password...
            </>
          ) : (
            "Reset Password"
          )}
        </Button>
      </form>

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
              <li>Both passwords must match</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Back to Login */}
      <div className="text-center">
        <Link
          href="/login"
          className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
}
