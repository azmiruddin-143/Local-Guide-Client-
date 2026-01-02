"use client";

import { MapPin, Users, Globe, Award } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-primary/10 to-background py-20 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
            Discover Authentic Local Experiences
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            We connect curious travelers with passionate local guides who share their cities through unique, personalized tours.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <p className="text-2xl font-bold text-gray-900">500+</p>
              <p className="text-sm text-gray-600">Local Guides</p>
            </div>
            
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <p className="text-2xl font-bold text-gray-900">100+</p>
              <p className="text-sm text-gray-600">Cities</p>
            </div>
            
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Globe className="w-8 h-8 text-primary" />
              </div>
              <p className="text-2xl font-bold text-gray-900">50+</p>
              <p className="text-sm text-gray-600">Countries</p>
            </div>
            
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <p className="text-2xl font-bold text-gray-900">10K+</p>
              <p className="text-sm text-gray-600">Happy Travelers</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
