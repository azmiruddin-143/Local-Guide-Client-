"use client";

import { useActionState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Compass, Mail, Loader2, ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";
import { forgotPassword } from "@/services/auth/auth.service";
import { toast } from "sonner";
import InputFieldError from "./shared/InputFieldError";

export default function ForgotPasswordForm() {
  const [state, formAction, isPending] = useActionState(forgotPassword, null);

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
    if (state && state.success && state.message) {
      toast.success(state.message);
    }
  }, [state]);

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
          <h1 className="text-2xl font-bold text-gray-900">Forgot Password?</h1>
          <p className="text-gray-600 mt-2">
            No worries! Enter your email and we'll send you reset instructions
          </p>
        </div>
      </div>

      {/* Success Message */}
      {state?.success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
            <div>
              <h3 className="font-semibold text-green-900 text-sm">Email Sent!</h3>
              <p className="text-sm text-green-800 mt-1">
                Check your inbox for password reset instructions. The link will expire in 10 minutes.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Form */}
      <form action={formAction} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              className="h-11 pl-10"
              required
              disabled={isPending}
              defaultValue={state?.formData?.email}
            />
          </div>
          <InputFieldError field="email" state={state} />
        </div>

        <Button
          type="submit"
          className="w-full h-11 text-base font-semibold"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            "Send Reset Link"
          )}
        </Button>
      </form>

      {/* Back to Login */}
      <div className="text-center">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Login
        </Link>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Compass className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
          <div>
            <h3 className="font-semibold text-blue-900 text-sm">Need Help?</h3>
            <p className="text-sm text-blue-800 mt-1">
              If you don't receive an email, check your spam folder or{" "}
              <Link href="/contact" className="underline font-medium">
                contact support
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
