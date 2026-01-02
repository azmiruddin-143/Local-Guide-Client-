"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Do I need experience to become a guide?",
    answer: "No professional experience required! If you're passionate about your city and enjoy sharing knowledge, you can become a guide. We provide training and resources to help you get started.",
  },
  {
    question: "How will I get paid?",
    answer: "We process payments weekly via bank transfer or mobile banking. You'll receive your earnings every Friday for tours completed the previous week. We handle all payment processing securely.",
  },
  {
    question: "Can I choose my own timings?",
    answer: "Absolutely! You have complete control over your schedule. Set your availability, choose which days you want to work, and accept bookings that fit your schedule.",
  },
  {
    question: "How many tours can I create?",
    answer: "There's no limit! You can create as many tour listings as you want. Offer different experiences - food tours, history walks, photography tours, or custom experiences.",
  },
  {
    question: "What if a tourist cancels?",
    answer: "We have a fair cancellation policy. If a traveler cancels more than 48 hours before the tour, you won't be affected. For late cancellations, you'll receive partial compensation.",
  },
  {
    question: "How do I set my pricing?",
    answer: "You set your own prices! We provide pricing guidelines based on your location and tour type, but you have full control. You can adjust prices anytime based on demand and seasonality.",
  },
  {
    question: "What support do you provide?",
    answer: "We offer 24/7 support, training materials, guide community forums, and a dedicated success manager. You'll also get tips on creating great tours and marketing your services.",
  },
  {
    question: "Is there a fee to join?",
    answer: "No! It's completely free to sign up and create your profile. We only take a small commission (15-20%) when you successfully complete a tour. No hidden fees or monthly charges.",
  },
];

export default function GuideFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Got questions? We&apos;ve got answers
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-primary/50 transition-all"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition"
              >
                <span className="font-semibold text-gray-900 pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 text-gray-500 flex-shrink-0 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="max-w-3xl mx-auto mt-12 text-center">
          <p className="text-gray-600">
            Still have questions?{" "}
            <a href="mailto:support@example.com" className="text-primary font-semibold hover:underline">
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
