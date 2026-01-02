"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import InputFieldError from "./shared/InputFieldError";
import { Button } from "./ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { register } from "@/services/auth/register";
import { Compass, User, MapPin } from "lucide-react";

const RegisterForm = () => {
  const [state, formAction, isPending] = useActionState(register, null);
  const [selectedRole, setSelectedRole] = useState<"TOURIST" | "GUIDE">("TOURIST");

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  const handleSubmit = (formData: FormData) => {
    // Ensure role is set in FormData
    if (!formData.get('role')) {
      formData.set('role', selectedRole);
    }
    formAction(formData);
  };

  return (
    <form action={handleSubmit} className="space-y-6">
      {/* Role Selection */}
      <div className="space-y-3">
        <FieldLabel className="text-base">I want to join as</FieldLabel>
        <div className="grid grid-cols-2 gap-4">
          {/* Tourist Option */}
          <button
            type="button"
            onClick={() => setSelectedRole("TOURIST")}
            className={`relative flex flex-col items-center justify-center p-6 rounded-lg border-2 transition-all ${
              selectedRole === "TOURIST"
                ? "border-primary bg-primary/5 shadow-md"
                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            <User className={`h-8 w-8 mb-2 ${selectedRole === "TOURIST" ? "text-primary" : "text-gray-400"}`} />
            <span className={`font-semibold ${selectedRole === "TOURIST" ? "text-primary" : "text-gray-700"}`}>
              Tourist
            </span>
            <span className="text-xs text-gray-500 mt-1">Explore tours</span>
            {selectedRole === "TOURIST" && (
              <div className="absolute top-2 right-2 h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </button>

          {/* Guide Option */}
          <button
            type="button"
            onClick={() => setSelectedRole("GUIDE")}
            className={`relative flex flex-col items-center justify-center p-6 rounded-lg border-2 transition-all ${
              selectedRole === "GUIDE"
                ? "border-primary bg-primary/5 shadow-md"
                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            <MapPin className={`h-8 w-8 mb-2 ${selectedRole === "GUIDE" ? "text-primary" : "text-gray-400"}`} />
            <span className={`font-semibold ${selectedRole === "GUIDE" ? "text-primary" : "text-gray-700"}`}>
              Guide
            </span>
            <span className="text-xs text-gray-500 mt-1">Offer tours</span>
            {selectedRole === "GUIDE" && (
              <div className="absolute top-2 right-2 h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </button>
        </div>
        <input type="hidden" name="role" value={selectedRole} key={selectedRole} />
      </div>

      {/* Form Fields */}
      <FieldGroup>
        <div className="space-y-4">
          {/* Full Name */}
          <Field>
            <FieldLabel htmlFor="name">Full Name</FieldLabel>
            <Input 
              id="name" 
              name="name" 
              type="text" 
              placeholder={selectedRole === "GUIDE" ? "Jane Smith" : "John Doe"}
              className="h-11"
            />
            <InputFieldError field="name" state={state} />
          </Field>

          {/* Email */}
          <Field>
            <FieldLabel htmlFor="email">Email Address</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              className="h-11"
            />
            <InputFieldError field="email" state={state} />
          </Field>

          {/* Password */}
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input 
              id="password" 
              name="password" 
              type="password"
              placeholder="Minimum 6 characters"
              className="h-11"
            />
            <InputFieldError field="password" state={state} />
          </Field>

          {/* Confirm Password */}
          <Field>
            <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Re-enter your password"
              className="h-11"
            />
            <InputFieldError field="confirmPassword" state={state} />
          </Field>
        </div>

        {/* Role-specific Info */}
        <div className="mt-4 p-4 rounded-lg bg-blue-50 border border-blue-100">
          <div className="flex items-start gap-3">
            <Compass className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
            <div className="text-sm text-blue-900">
              {selectedRole === "TOURIST" ? (
                <>
                  <p className="font-medium mb-1">As a Tourist, you can:</p>
                  <ul className="list-disc list-inside space-y-1 text-blue-800">
                    <li>Browse and book amazing local tours</li>
                    <li>Connect with verified local guides</li>
                    <li>Leave reviews and save favorite tours</li>
                  </ul>
                </>
              ) : (
                <>
                  <p className="font-medium mb-1">As a Guide, you can:</p>
                  <ul className="list-disc list-inside space-y-1 text-blue-800">
                    <li>Create and manage your tour listings</li>
                    <li>Accept bookings from travelers</li>
                    <li>Earn money sharing your local expertise</li>
                  </ul>
                </>
              )}
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
                Creating Account...
              </span>
            ) : (
              `Create ${selectedRole === "GUIDE" ? "Guide" : "Tourist"} Account`
            )}
          </Button>

          <FieldDescription className="text-center">
            Already have an account?{" "}
            <a href="/login" className="text-primary font-medium hover:underline">
              Sign in
            </a>
          </FieldDescription>

          <p className="text-xs text-center text-gray-500">
            By creating an account, you agree to our{" "}
            <a href="/terms" className="text-primary hover:underline">Terms of Service</a>
            {" "}and{" "}
            <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>
          </p>
        </div>
      </FieldGroup>
    </form>
  );
};

export default RegisterForm;
