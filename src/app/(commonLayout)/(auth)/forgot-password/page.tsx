import ForgotPasswordForm from "@/components/ForgotPasswordForm";
import { Metadata } from "next";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Forgot Password - LocalGuide",
  description: "Reset your LocalGuide account password",
};

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 px-4 py-12">
      <ForgotPasswordForm />
    </div>
  );
}