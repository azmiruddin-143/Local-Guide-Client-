'use client';

import { Users, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';

interface RecentUser {
  _id: string;
  role: string;
  email: string;
  name: string;
  isVerified: boolean;
  createdAt: string;
}

interface RecentUsersProps {
  users: RecentUser[];
}

const roleColors: Record<string, { bg: string; text: string }> = {
  ADMIN: { bg: 'bg-red-100', text: 'text-red-700' },
  GUIDE: { bg: 'bg-blue-100', text: 'text-blue-700' },
  TOURIST: { bg: 'bg-green-100', text: 'text-green-700' },
};

export default function RecentUsers({ users }: RecentUsersProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Recent Users</h3>
          <p className="text-sm text-gray-600">Latest registered users</p>
        </div>
        <div className="bg-blue-50 p-2 rounded-lg">
          <Users className="h-5 w-5 text-blue-600" />
        </div>
      </div>

      {users.length === 0 ? (
        <div className="text-center py-12 text-gray-500">No users available</div>
      ) : (
          <div className="space-y-3  max-h-[400px] overflow-hidden overflow-y-scroll">
          {users.map((user) => {
            const roleColor = roleColors[user.role] || roleColors.TOURIST;
            const joinDate = new Date(user.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            });

            return (
              <Link
                key={user._id}
                href={`/admin/dashboard/users-management?searchTerm=${user.name}`}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
              >
                {/* Avatar */}
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                  {user.name.charAt(0).toUpperCase()}
                </div>

                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-gray-900 truncate">{user.name}</h4>
                    {user.isVerified ? (
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 truncate">{user.email}</p>
                </div>

                {/* Role & Date */}
                <div className="text-right flex-shrink-0">
                  <span className={`px-2 py-1 ${roleColor.bg} ${roleColor.text} rounded text-xs font-medium`}>
                    {user.role}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">{joinDate}</p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
