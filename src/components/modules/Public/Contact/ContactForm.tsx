"use client";

import { useActionState, useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Send, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { submitContact } from "@/services/contact/submitContact";
import InputFieldError from "@/components/shared/InputFieldError";

const inquiryTypes = [
  "General Inquiry",
  "Booking Support",
  "Become a Guide",
  "Partnership",
  "Technical Issue",
  "Feedback",
  "Other",
];

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContact, null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedInquiryType, setSelectedInquiryType] = useState<string>("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      setIsSubmitted(true);
      
      // Reset all form fields
      setFullName("");
      setEmail("");
      setPhoneNumber("");
      setSelectedInquiryType("");
      setSubject("");
      setMessage("");

      // Reset success state after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } else if (state && !state.success) {
      toast.error(state.message || "Please check the form for errors");

      // Scroll to first error if exists
      if (state.errors && state.errors.length > 0) {
        const firstError = state.errors[0];
        const element = document.getElementById(firstError.field);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          element.focus();
        }
      }
    }
  }, [state]);

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Send Us a Message
            </h2>
            <p className="text-lg text-gray-600">
              Fill out the form below and we'll respond within 24 hours
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 md:p-12">
            {isSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Thank You!
                </h3>
                <p className="text-gray-600">
                  Your message has been sent successfully. We'll get back to you soon.
                </p>
                <Button
                  onClick={() => setIsSubmitted(false)}
                  variant="outline"
                  className="mt-4"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form ref={formRef} action={formAction} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Field>
                    <FieldLabel htmlFor="fullName">
                      Full Name <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      placeholder="John Doe"
                      className="h-11"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      disabled={isPending}
                    />
                    <InputFieldError field="fullName" state={state} />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="email">
                      Email Address <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      className="h-11"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isPending}
                    />
                    <InputFieldError field="email" state={state} />
                  </Field>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <Field>
                    <FieldLabel htmlFor="phoneNumber">
                      Phone Number <span className="text-gray-400">(Optional)</span>
                    </FieldLabel>
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      placeholder="+880 1933946077"
                      className="h-11"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      disabled={isPending}
                    />
                    <InputFieldError field="phoneNumber" state={state} />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="inquiryType">
                      Inquiry Type <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Select 
                      name="inquiryType" 
                      value={selectedInquiryType}
                      onValueChange={setSelectedInquiryType}
                      disabled={isPending}
                    >
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select inquiry type" />
                      </SelectTrigger>
                      <SelectContent>
                        {inquiryTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <InputFieldError field="inquiryType" state={state} />
                  </Field>
                </div>

                <Field>
                  <FieldLabel htmlFor="subject">
                    Subject <span className="text-red-500">*</span>
                  </FieldLabel>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="How can we help you?"
                    className="h-11"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    disabled={isPending}
                  />
                  <InputFieldError field="subject" state={state} />
                </Field>

                <Field>
                  <FieldLabel htmlFor="message">
                    Message <span className="text-red-500">*</span>
                  </FieldLabel>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us more about your inquiry..."
                    className="min-h-40 resize-none"
                    maxLength={1000}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={isPending}
                  />
                  <InputFieldError field="message" state={state} />
                  <p className="text-xs text-gray-500 mt-1">
                    Maximum 1000 characters
                  </p>
                </Field>

                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full h-12 text-base font-semibold"
                >
                  {isPending ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
