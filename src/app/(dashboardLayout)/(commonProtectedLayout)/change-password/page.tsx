import ChangePasswordForm from "@/components/modules/Common_Protected/ChangePasswordForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Change Password - LocalGuide",
  description: "Update your account password",
};

export default function ChangePasswordPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <ChangePasswordForm />
    </div>
  );
}
