import { Metadata } from "next";
import {
  ContactHero,
  ContactInfo,
  ContactForm,
  FAQSection,
} from "@/components/modules/Public/Contact";
import { getPlatformSettings } from "@/services/settings/settings.service";

export const metadata: Metadata = {
  title: "Contact Us | LocalGuide - Get in Touch",
  description:
    "Have questions or need assistance? Contact LocalGuide's support team. We're here to help you with bookings, becoming a guide, or any inquiries.",
};

export default async function ContactPage() {
  const settings = await getPlatformSettings()
  return (
    <main className="min-h-screen">
      <ContactHero />
      <ContactInfo settings={settings.data} />
      <ContactForm />
      <FAQSection />
    </main>
  );
}
