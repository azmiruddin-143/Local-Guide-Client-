"use client";

import { Badge } from "@/components/ui/badge";
import { IsActive } from "@/types/user.interface";

interface StatusBadgeCellProps {
  isDeleted?: boolean;
  activeText?: string;
  deletedText?: string;
  inactiveText?: string;
  blockedText?: string;
  isActive?: IsActive | boolean;
}

export function StatusBadgeCell({
  isDeleted,
  activeText = "Active",
  deletedText = "Deleted",
  inactiveText = "Inactive",
  blockedText = "Blocked",
  isActive
}: StatusBadgeCellProps) {
  // Handle deleted status first
  if (isDeleted) {
    return <Badge variant="destructive">{deletedText}</Badge>;
  }

  // Handle IsActive enum values
  if (isActive === IsActive.BLOCKED) {
    return <Badge variant="destructive">{blockedText}</Badge>;
  }

  if (isActive === IsActive.ACTIVE || isActive === true) {
    return <Badge variant="default">{activeText}</Badge>;
  }

  // Inactive or undefined
  return <Badge variant="secondary">{inactiveText}</Badge>;
}
