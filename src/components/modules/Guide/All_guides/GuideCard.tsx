'use client';

import { UserInfo } from '@/types/user.interface';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Star, Languages, CheckCircle, Calendar, UtensilsCrossed, ClosedCaption, ShieldClose } from 'lucide-react';

interface GuideCardProps {
  guide: UserInfo;
}

export default function GuideCard({ guide }: GuideCardProps) {
  const getAvailabilityStatus = () => {
    // This is a placeholder - you can integrate with actual availability system
    const statuses = [
      { label: 'Available Today', color: 'bg-green-500', icon: '🟢' },
      { label: 'Limited Slots', color: 'bg-yellow-500', icon: '🟡' },
      { label: 'Fully Booked', color: 'bg-red-500', icon: '🔴' },
    ];
    return statuses[Math.floor(Math.random() * statuses.length)];
  };

  const availability = getAvailabilityStatus();

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
      {/* Profile Image */}
      <div className="relative h-64 bg-gradient-to-br from-blue-100 to-purple-100 overflow-hidden">
        {guide.avatarUrl ? (
          <Image
            src={guide.avatarUrl}
            alt={guide.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-4xl font-bold">
              {guide.name.charAt(0).toUpperCase()}
            </div>
          </div>
        )}
        
        {/* Verified Badge */}
        {guide.isVerified
        ?  (
          <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg">
            <CheckCircle size={14} />
            Verified
          </div>
          ) : (
            <div className="absolute top-3 right-3 bg-rose-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg">
              <ShieldClose size={14}  />
              NotVerified
            </div> 
        )}

        {/* Availability Badge
        <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg">
          <span>{availability.icon}</span>
          <span>{availability.label}</span>
        </div> */}
      </div>

      {/* Card Content */}
      <div className="p-5 space-y-3">
        {/* Name */}
        <h3 className="text-xl font-bold text-gray-900 truncate">
          {guide.name}
        </h3>

        {/* Location */}
        {guide.location && (
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin size={16} className="text-blue-600" />
            <span className="text-sm">{guide.location}</span>
          </div>
        )}

        {/* Languages */}
        {guide.languages && guide.languages.length > 0 && (
          <div className="flex items-start gap-2">
            <Languages size={16} className="text-purple-600 mt-0.5" />
            <div className="flex flex-wrap gap-1">
              {guide.languages.slice(0, 3).map((lang) => (
                <span
                  key={lang}
                  className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full"
                >
                  {lang}
                </span>
              ))}
              {guide.languages.length > 3 && (
                <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                  +{guide.languages.length - 3}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Expertise */}
        {guide.expertise && guide.expertise.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {guide.expertise.slice(0, 3).map((exp) => (
              <span
                key={exp}
                className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded"
              >
                {exp}
              </span>
            ))}
            {guide.expertise.length > 3 && (
              <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs font-medium rounded">
                +{guide.expertise.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Bio */}
        {guide.bio && (
          <p className="text-sm text-gray-600 line-clamp-2">
            {guide.bio}
          </p>
        )}

        {/* Rating */}
        <div className="flex items-center gap-2 pt-2 border-t">
          <div className="flex items-center gap-1">
            <Star size={16} className="text-yellow-500 fill-yellow-500" />
            <span className="font-semibold text-gray-900">
              {guide.averageRating ? guide.averageRating.toFixed(1) : 'New'}
            </span>
          </div>
          <span className="text-sm text-gray-500">
            ({guide.reviewCount || 0} review{guide.reviewCount !== 1 ? 's' : ''})
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-3">
          <Link
            href={`/all-guides/${guide._id}`}
            className="flex-1 px-4 py-2 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            View Profile
          </Link>
          <Link
            href={`/all-guides/${guide._id}/tours`}
            className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 text-center rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            See Tours
          </Link>
        </div>

      </div>
    </div>
  );
}
