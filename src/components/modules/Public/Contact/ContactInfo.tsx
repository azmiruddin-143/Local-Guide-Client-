"use client";

import { IPlatformSettings } from "@/types/settings.interface";
import { Mail, Phone, MapPin, Clock } from "lucide-react";



export default function ContactInfo({ settings }: { settings: IPlatformSettings }) {
  
  const contactDetails = [
    {
      icon: Mail,
      title: "Email Us",
      details: [settings.contacts.supportEmail, settings.general.supportEmail],
      color: "text-primary",
      bg: "bg-primary/5",
    },
    {
      icon: Phone,
      title: "Call Us",
      details: [settings.contacts.phone,settings.contacts.supportPhone],
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: [settings.contacts.address],
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: [settings.contacts.businessHours],
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
  ];
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactDetails.map((item, index) => (
              <div
                key={index}
                className="p-6 rounded-xl border border-gray-200 hover:border-primary/50 hover:shadow-lg transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-lg ${item.bg} flex items-center justify-center mb-4`}>
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <div className="space-y-1">
                  {item.details.map((detail, idx) => (
                    <p key={idx} className="text-sm text-gray-600">
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
