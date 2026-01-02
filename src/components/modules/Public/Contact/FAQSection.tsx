"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "How do I book a tour?",
    answer: "Browse our tours, select your preferred date and time, and complete the booking process. You'll receive instant confirmation via email.",
  },
  {
    question: "Can I cancel or reschedule my booking?",
    answer: "Yes! You can cancel or reschedule up to 24 hours before your tour starts for a full refund. Check our cancellation policy for details.",
  },
  {
    question: "How do I become a guide?",
    answer: "Click on 'Become a Guide' in the navigation menu, fill out the application form, and our team will review your profile within 2-3 business days.",
  },
  {
    question: "Are the guides verified?",
    answer: "Absolutely! All our guides go through a thorough verification process including background checks, interviews, and trial tours.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, debit cards, and popular digital payment methods including bKash, Nagad, and Rocket.",
  },
  {
    question: "Is there a minimum group size?",
    answer: "No, we offer both private and group tours. You can book a tour even if you're traveling solo.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
              <HelpCircle className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">FAQ</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Quick answers to common questions
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-xl overflow-hidden hover:border-primary/50 transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-4 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center p-8 bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl">
            <p className="text-lg text-gray-900 font-medium mb-2">
              Still have questions?
            </p>
            <p className="text-gray-600">
              Our support team is here to help. Reach out anytime!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
