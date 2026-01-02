'use client';

import { MapPin, Calendar, User, Users } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface UpcomingTrip {
  _id: string;
  startAt: string;
  numGuests: number;
  amountTotal: number;
  status: string;
  paymentStatus: string;
  tour: {
    title: string;
    slug: string;
    city: string;
    mediaUrls?: string[];
  };
  guide: {
    name: string;
    avatarUrl?: string;
  };
}

interface UpcomingTripsProps {
  bookings: UpcomingTrip[];
}

export default function UpcomingTrips({ bookings }: UpcomingTripsProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Upcoming Trips</h3>
          <p className="text-sm text-gray-600">Your next adventures</p>
        </div>
        <div className="bg-blue-50 p-2 rounded-lg">
          <MapPin className="h-5 w-5 text-blue-600" />
        </div>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-12">
          <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 mb-4">No upcoming trips</p>
          <Link
            href="/explore"
            className="inline-block bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition"
          >
            Explore Tours
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.slice(0, 5).map((booking) => {
            const startDate = new Date(booking.startAt);
            const dateStr = startDate.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            });

            return (
              <Link
                key={booking._id}
                href={`/dashboard/bookings/${booking._id}`}
                className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
              >
                {/* Tour Image */}
                <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
                  {booking.tour.mediaUrls && booking.tour.mediaUrls[0] ? (
                    <Image
                      src={booking.tour.mediaUrls[0]}
                      alt={booking.tour.title}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <MapPin className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Trip Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 mb-1 line-clamp-1">{booking.tour.title}</h4>
                  <div className="flex items-center gap-3 text-sm text-gray-600 mb-2">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {booking.tour.city}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {dateStr}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {booking.guide.name}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {booking.numGuests} guests
                    </span>
                  </div>
                </div>

                {/* Amount & Status */}
                <div className="text-right flex-shrink-0">
                  <p className="font-semibold text-gray-900 mb-1">৳{booking.amountTotal.toLocaleString()}</p>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      booking.status === 'CONFIRMED'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {bookings.length > 5 && (
        <Link
          href="/dashboard/bookings"
          className="block text-center mt-4 text-sm text-primary hover:text-primary/80 font-medium"
        >
          View all trips →
        </Link>
      )}
    </div>
  );
}
