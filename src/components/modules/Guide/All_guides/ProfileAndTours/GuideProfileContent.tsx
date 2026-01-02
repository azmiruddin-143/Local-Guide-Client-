"use client";

import { UserInfo } from "@/types/user.interface";
import { GuideAvailability } from "@/services/guide/guide.service";
import Image from "next/image";
import Link from "next/link";
import { 
  MapPin, 
  Star, 
  Languages, 
  CheckCircle, 
  Calendar,
  Mail,
  Award,
  Clock,
  ArrowRight
} from "lucide-react";
import { useState } from "react";

interface GuideProfileContentProps {
  guide: UserInfo;
  availability: GuideAvailability[];
}

export default function GuideProfileContent({ guide, availability }: GuideProfileContentProps) {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Group availability by date
  const availabilityByDate = availability.reduce((acc, slot) => {
    const date = new Date(slot.specificDate).toDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(slot);
    return acc;
  }, {} as Record<string, GuideAvailability[]>);

  // Filter availability for selected month
  const filteredDates = Object.keys(availabilityByDate).filter(dateStr => {
    const date = new Date(dateStr);
    return date.getMonth() === selectedMonth && date.getFullYear() === selectedYear;
  }).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  const formatTime = (timeStr: string) => {
    return new Date(`2000-01-01T${timeStr}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="relative h-64 bg-gradient-to-r from-blue-500 to-purple-600">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }} />
            </div>
          </div>

          <div className="relative px-8 pb-8">
            {/* Profile Image */}
            <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-20">
              <div className="relative">
                {guide.avatarUrl ? (
                  <Image
                    src={guide.avatarUrl}
                    alt={guide.name}
                    width={160}
                    height={160}
                    className="rounded-2xl border-4 border-white shadow-xl object-cover"
                  />
                ) : (
                  <div className="w-40 h-40 rounded-2xl border-4 border-white shadow-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <span className="text-6xl font-bold text-white">
                      {guide.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                {guide.isVerified && (
                  <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-full shadow-lg">
                    <CheckCircle size={24} />
                  </div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                      {guide.name}
                    </h1>
                    {guide.location && (
                      <div className="flex items-center gap-2 text-gray-600 mb-3">
                        <MapPin size={20} className="text-blue-600" />
                        <span className="text-lg">{guide.location}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-4">
                      {guide.reviewCount && guide.reviewCount > 0 ? (
                        <div className="flex items-center gap-1">
                          <Star size={20} className="text-yellow-500 fill-yellow-500" />
                          <span className="font-semibold text-gray-900">
                            {guide.averageRating?.toFixed(1) || '0.0'}
                          </span>
                          <span className="text-gray-500">
                            ({guide.reviewCount} review{guide.reviewCount !== 1 ? 's' : ''})
                          </span>
                        </div>
                      ) : (
                        <span className="text-gray-500 text-sm">No reviews yet</span>
                      )}
                      {guide.isVerified && (
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold flex items-center gap-1">
                          <CheckCircle size={16} />
                          Verified Guide
                        </span>
                      )}
                    </div>
                  </div>

                  <Link
                    href={`/all-guides/${guide._id}/tours`}
                    className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl"
                  >
                    View All Tours
                    <ArrowRight size={20} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Guide Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About Me</h2>
              {guide.bio ? (
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {guide.bio}
                </p>
              ) : (
                <p className="text-gray-500 italic">No bio available</p>
              )}
            </div>

            {/* Languages */}
            {guide.languages && guide.languages.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Languages size={24} className="text-purple-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Languages</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {guide.languages.map((lang) => (
                    <span
                      key={lang}
                      className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg font-medium"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Expertise */}
            {guide.expertise && guide.expertise.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Award size={24} className="text-green-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Expertise</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {guide.expertise.map((exp) => (
                    <span
                      key={exp}
                      className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-medium"
                    >
                      {exp}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Contact */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Mail size={24} className="text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Contact</h2>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail size={20} className="text-gray-400" />
                  <span className="text-gray-700">{guide.email}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Availability */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-4">
              <div className="flex items-center gap-2 mb-6">
                <Calendar size={24} className="text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Availability</h2>
              </div>

              {/* Month Selector */}
              <div className="mb-6">
                <select
                  value={`${selectedYear}-${selectedMonth}`}
                  onChange={(e) => {
                    const [year, month] = e.target.value.split('-');
                    setSelectedYear(parseInt(year));
                    setSelectedMonth(parseInt(month));
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {Array.from({ length: 12 }, (_, i) => {
                    const date = new Date();
                    date.setMonth(date.getMonth() + i);
                    return (
                      <option key={i} value={`${date.getFullYear()}-${date.getMonth()}`}>
                        {months[date.getMonth()]} {date.getFullYear()}
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* Availability List */}
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {filteredDates.length > 0 ? (
                  filteredDates.map((dateStr) => {
                    const slots = availabilityByDate[dateStr];
                    const availableSlots = slots.filter(s => !s.isBooked);
                    
                    return (
                      <div key={dateStr} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-semibold text-gray-900">
                            {formatDate(dateStr)}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            availableSlots.length > 0
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {availableSlots.length > 0 
                              ? `${availableSlots.length} slot${availableSlots.length > 1 ? 's' : ''}`
                              : 'Fully Booked'
                            }
                          </span>
                        </div>
                        <div className="space-y-2">
                          {slots.map((slot) => (
                            <div
                              key={slot._id}
                              className={`flex items-center justify-between p-2 rounded ${
                                slot.isBooked
                                  ? 'bg-gray-100 text-gray-400'
                                  : 'bg-blue-50 text-blue-700'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <Clock size={16} />
                                <span className="text-sm font-medium">
                                  {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                                </span>
                              </div>
                              {slot.isBooked && (
                                <span className="text-xs">Booked</span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-12">
                    <Calendar size={48} className="mx-auto text-gray-300 mb-3" />
                    <p className="text-gray-500">No availability for this month</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
