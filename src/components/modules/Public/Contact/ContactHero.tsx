"use client";

import { Mail, MessageSquare } from "lucide-react";

export default function ContactHero() {
  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-primary/10 to-background py-16 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-2">
            <MessageSquare className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Get in Touch</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            We'd Love to Hear from You
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Have questions, feedback, or need assistance? Our team is here to help you every step of the way.
          </p>
        </div>
      </div>
    </section>
  );
}
