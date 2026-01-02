"use client";

import { Heart, Eye, Target } from "lucide-react";

export default function MissionSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Mission & Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We believe in creating meaningful connections between travelers and local communities
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 space-y-4">
              <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center">
                <Target className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To empower local guides to share their passion and knowledge while providing travelers with authentic, memorable experiences that go beyond typical tourism.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 space-y-4">
              <div className="w-14 h-14 rounded-full bg-blue-200 flex items-center justify-center">
                <Eye className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                A world where every traveler can discover the heart of a destination through the eyes of those who know it best - the locals who call it home.
              </p>
            </div>

            <div className="bg-gradient-to-br from-rose-50 to-rose-100 rounded-2xl p-8 space-y-4">
              <div className="w-14 h-14 rounded-full bg-rose-200 flex items-center justify-center">
                <Heart className="w-7 h-7 text-rose-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Our Values</h3>
              <p className="text-gray-600 leading-relaxed">
                Authenticity, community, sustainability, and cultural respect guide everything we do. We celebrate diversity and foster genuine human connections.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
