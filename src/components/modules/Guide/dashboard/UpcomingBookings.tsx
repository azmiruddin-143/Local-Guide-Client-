'use client';

import { Calendar, User, Users } from 'lucide-react';
import Link from 'next/link';

interface UpcomingBooking {
  _id: string;
  startAt: string;
  numGuests: number;
  amountTotal: number;
  status: string;
  paymentStatus: string;
  tour: {
    title: string;
  };
  tourist: {
    name: string;
    email: string;
  };
}

interface UpcomingBookingsProps {
  bookings: UpcomingBooking[];
}

export default function UpcomingBookings({ bookings }: UpcomingBookingsProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Upcoming Bookings</h3>
          <p className="text-sm text-gray-600">Your next scheduled tours</p>
        </div>
        <div className="bg-blue-50 p-2 rounded-lg">
          <Calendar className="h-5 w-5 text-blue-600" />
        </div>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-12 text-gray-500">No upcoming bookings</div>
      ) : (
        <div className="space-y-3">
          {bookings.slice(0, 5).map((booking) => {
            const startDate = new Date(booking.startAt);
            const dateStr = startDate.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            });
            const timeStr = startDate.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
            });

            return (
              <Link
                key={booking._id}
                href={`/guide/dashboard/bookings/${booking._id}`}
                className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
              >
                {/* Date Badge */}
                <div className="flex-shrink-0 bg-blue-50 rounded-lg p-3 text-center min-w-[60px]">
                  <p className="text-xs text-blue-600 font-medium">{startDate.toLocaleDateString('en-US', { month: 'short' })}</p>
                  <p className="text-xl font-bold text-blue-700">{startDate.getDate()}</p>
                </div>

                {/* Booking Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 mb-1 line-clamp-1">{booking.tour.title}</h4>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <User className="h-3 w-3" />
                    <span className="truncate">{booking.tourist.name}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span>{timeStr}</span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {booking.numGuests} guests
                    </span>
                  </div>
                </div>

                {/* Amount */}
                <div className="text-right flex-shrink-0">
                  <p className="font-semibold text-gray-900">৳{booking.amountTotal.toLocaleString()}</p>
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
          href="/guide/dashboard/bookings"
          className="block text-center mt-4 text-sm text-primary hover:text-primary/80 font-medium"
        >
          View all bookings →
        </Link>
      )}
    </div>
  );
}
