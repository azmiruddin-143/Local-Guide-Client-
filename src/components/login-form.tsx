"use client";
import { loginUser } from "@/services/auth/loginUser";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import InputFieldError from "./shared/InputFieldError";
import { Button } from "./ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Compass, Mail, Lock } from "lucide-react";

const LoginForm = ({ redirect }: { redirect?: string }) => {
  const [state, formAction, isPending] = useActionState(loginUser, null);

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message); 
    }
  }, [state]);

  return (
    <form action={formAction} className="space-y-6">
      {redirect && <input type="hidden" name="redirect" value={redirect} />}
      
      {/* Welcome Message */}
      <div className="text-center space-y-2">
        <div className="flex justify-center">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Compass className="h-6 w-6 text-primary" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Welcome back</h2>
        <p className="text-gray-600">Sign in to continue your journey</p>
      </div>

      <FieldGroup>
        <div className="space-y-4">
          {/* Email */}
          <Field>
            <FieldLabel htmlFor="email">Email Address</FieldLabel>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                className="h-11 pl-10"
              />
            </div>
            <InputFieldError field="email" state={state} />
          </Field>

          {/* Password */}
          <Field>
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <a
                href="/forgot-password"
                className="text-sm text-primary hover:underline font-medium"
              >
                Forgot?
              </a>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                className="h-11 pl-10"
              />
            </div>
            <InputFieldError field="password" state={state} />
          </Field>
        </div>

        {/* Info Box */}
        <div className="mt-4 p-4 rounded-lg bg-linear-to-r from-blue-50 to-indigo-50 border border-blue-100">
          <div className="flex items-start gap-3">
            <Compass className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
            <div className="text-sm text-blue-900">
              <p className="font-medium mb-1">Explore Local Experiences</p>
              <p className="text-blue-800">
                Connect with local guides and discover authentic tours in destinations around the world.
              </p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6 space-y-4">
          <Button 
            type="submit" 
            disabled={isPending}
            className="w-full h-11 text-base font-semibold"
          >
            {isPending ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </span>
            ) : (
              "Sign In"
            )}
          </Button>

          <FieldDescription className="text-center">
            Don&apos;t have an account?{" "}
            <a href="/register" className="text-primary font-medium hover:underline">
              Create account
            </a>
          </FieldDescription>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">New to LocalGuide?</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-3">
            <a
              href="/explore"
              className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700 "
            >
              <Compass className="h-4 w-4 max-sm:hidden" />
              Browse Tours
            </a>
            <a
              href="/become-a-guide"
              className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700 text-nowrap"
            >
              <Mail className="h-4 w-4 max-sm:hidden" />
              Become a Guide
            </a>
          </div>
        </div>
      </FieldGroup>
    </form>
  );
};

export default LoginForm;
