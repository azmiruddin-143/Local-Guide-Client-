'use client';

import { Mail, CheckCircle, AlertCircle } from "lucide-react";
import { useState, useTransition } from "react";
import { subscribeToNewsletter } from "@/services/newsletter/newsletter.service";

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(email);
    
    if (!email) {
      setStatus('error');
      setMessage('Please enter your email address');
      return;
    }

    startTransition(async () => {
      const result = await subscribeToNewsletter(email);
      console.log(result);
      
      if (result.success) {
        setStatus('success');
        setMessage(result.message);
        setEmail('');
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setStatus('idle');
          setMessage('');
        }, 5000);
      } else {
        setStatus('error');
        setMessage(result.message);
        
        // Reset error message after 5 seconds
        setTimeout(() => {
          setStatus('idle');
          setMessage('');
        }, 5000);
      }
    });
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Get Travel Inspiration
          </h2>
          <p className="text-gray-600 mb-8">
            Subscribe to our newsletter for exclusive deals, travel tips, and destination guides
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
              required
              disabled={isPending}
            />
            <button
              type="submit"
              disabled={isPending}
              className="bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>

          {/* Status Messages */}
          {status === 'success' && (
            <div className="mt-4 flex items-center justify-center gap-2 text-green-600 bg-green-50 px-4 py-3 rounded-lg animate-in fade-in slide-in-from-top-2 duration-300">
              <CheckCircle className="h-5 w-5" />
              <p className="text-sm font-medium">{message}</p>
            </div>
          )}

          {status === 'error' && (
            <div className="mt-4 flex items-center justify-center gap-2 text-red-600 bg-red-50 px-4 py-3 rounded-lg animate-in fade-in slide-in-from-top-2 duration-300">
              <AlertCircle className="h-5 w-5" />
              <p className="text-sm font-medium">{message}</p>
            </div>
          )}

          {status === 'idle' && (
            <p className="text-sm text-gray-500 mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
