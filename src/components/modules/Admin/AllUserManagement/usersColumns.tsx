/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DateCell } from "@/components/shared/cell/DateCell";
import { StatusBadgeCell } from "@/components/shared/cell/StatusBadgeCell";
import { UserInfoCell } from "@/components/shared/cell/UserInfoCell";
import { Column } from "@/components/shared/ManagementTable";
import { IUser } from "@/types/user.interface";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle } from "lucide-react";

export const usersColumns: Column<IUser>[] = [
  {
    header: "User",
    accessor: (user) => (
      <UserInfoCell
        name={user.name}
        email={user.email}
        photo={user.avatarUrl as string}
      />
    ),
  },
  {
    header: "Role",
    accessor: (user) => {
      const roleColors: Record<string, string> = {
        ADMIN: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
        GUIDE: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
        TOURIST: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      };
      
      return (
        <Badge className={roleColors[user.role] || ""}>
          {user.role}
        </Badge>
      );
    },
  },
  {
    header: "Phone",
    accessor: (user) => (
      <span className="text-sm">{user.phoneNumber || "N/A"}</span>
    ),
  },
  {
    header: "Location",
    accessor: (user) => (
      <span className="text-sm">{user.location || "N/A"}</span>
    ),
  },
  {
    header: "Languages",
    accessor: (user) => {
      if (!user.languages || user.languages.length === 0) {
        return <span className="text-xs text-gray-500">None</span>;
      }

      return (
        <div className="flex flex-wrap gap-1">
          {user.languages.slice(0, 3).map((lang, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
            >
              {lang}
            </span>
          ))}
          {user.languages.length > 3 && (
            <span className="text-xs text-gray-500">
              +{user.languages.length - 3}
            </span>
          )}
        </div>
      );
    },
  },
  {
    header: "Verified",
    accessor: (user) => (
      <div className="flex items-center gap-1">
        {user.isVerified ? (
          <>
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span className="text-sm text-green-600">Yes</span>
          </>
        ) : (
          <>
            <XCircle className="h-4 w-4 text-red-600" />
            <span className="text-sm text-red-600">No</span>
          </>
        )}
      </div>
    ),
  },
  {
    header: "Status",
    accessor: (user) => (
      <StatusBadgeCell 
        isActive={user.isActive} 
        activeText="Active" 
        inactiveText="Inactive"
        blockedText="Blocked"
      />
    ),
  },
  {
    header: "Joined",
    accessor: (user) => <DateCell date={user.createdAt} />,
  },
];
