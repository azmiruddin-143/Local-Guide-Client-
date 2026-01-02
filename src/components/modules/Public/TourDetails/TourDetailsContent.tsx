"use client";

import { Tour } from "@/services/tour/tour.service";
import { IAvailability } from "@/types/availability.interface";
import TourHero from "./TourHero";
import TourInfo from "./TourInfo";
import GuideInfo from "./GuideInfo";
import AvailabilityCalendar from "./AvailabilityCalendar";
import BookingCard from "./BookingCard";
import TourReviews from "./TourReviews";
import GuideReviews from "./GuideReviews";
import { useState } from "react";
import { UserInfo } from "@/types/user.interface";

interface TourDetailsContentProps {
  tour: Tour;
  availability: IAvailability[];
  user: UserInfo
}

export default function TourDetailsContent({ tour, availability,user }: TourDetailsContentProps) {
  // Set first available slot as default if exists
  const firstSlot = availability.length > 0 ? availability[0] : null;
  const firstDate = firstSlot ? new Date(firstSlot.specificDate) : null;
  
  const [selectedDate, setSelectedDate] = useState<Date | null>(firstDate);
  const [selectedSlot, setSelectedSlot] = useState<IAvailability | null>(firstSlot);
  const [numGuests, setNumGuests] = useState(1);

  // Check if there's any availability
  const hasAvailability = availability.length > 0;


  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section with Images */}
      <TourHero tour={tour} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* Left Column - Tour Details */}
        <div className="lg:col-span-2 space-y-6">
          <TourInfo tour={tour} />
          
          <GuideInfo guide={tour.guideId} />
          
          {hasAvailability ? (
            <AvailabilityCalendar
              availability={availability}
              selectedDate={selectedDate}
              selectedSlot={selectedSlot}
              onSelectDate={setSelectedDate}
              onSelectSlot={setSelectedSlot}
              tourId={tour._id}
            />
          ) : (
            <div className="p-8 bg-amber-50 border border-amber-200 rounded-lg text-center">
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-amber-900 mb-1">No Availability Yet</h3>
                  <p className="text-sm text-amber-700">
                    The guide hasn't set up any available time slots for this tour yet. Please check back later or contact the guide directly.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Booking Card (Sticky) */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <BookingCard
              tour={tour}
              selectedDate={selectedDate}
              selectedSlot={selectedSlot}
              numGuests={numGuests}
              onGuestsChange={setNumGuests}
              user={user}
              hasAvailability={hasAvailability}
            />
          </div>
        </div>
      </div>

      {/* Reviews Section - Full Width */}
      <div className="mt-12 space-y-8">
        {/* Tour Reviews */}
        <TourReviews tourId={tour._id} />
        
        {/* Guide Reviews */}
        <GuideReviews guideId={tour.guideId._id} />
      </div>
    </div>
  );
}
