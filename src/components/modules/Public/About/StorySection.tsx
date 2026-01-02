"use client";

import { Compass, Sparkles } from "lucide-react";

export default function StorySection() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                <Compass className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Our Story</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Born from a Love of Travel & Connection
              </h2>
              
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  LocalGuide was founded in 2020 by a group of passionate travelers who believed that the best way to experience a new place is through the eyes of someone who lives there.
                </p>
                <p>
                  After countless trips where the most memorable moments came from chance encounters with locals, we realized there was a need for a platform that could facilitate these authentic connections at scale.
                </p>
                <p>
                  Today, we're proud to connect thousands of travelers with local guides who are eager to share their cities, cultures, and stories.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 p-8 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Sparkles className="w-16 h-16 text-primary mx-auto" />
                  <p className="text-lg font-semibold text-gray-900">
                    "Travel is not just about seeing new places,<br />it's about seeing through new eyes."
                  </p>
                  <p className="text-sm text-gray-600">- LocalGuide Team</p>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
