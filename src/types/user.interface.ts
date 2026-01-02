import { UserRole } from "@/lib/auth-utils";

export enum IsActive {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    BLOCKED = "BLOCKED"
}

export enum ERole {
    ADMIN = 'ADMIN',
    TOURIST = 'TOURIST',
    GUIDE = 'GUIDE',
}

export interface UserInfo {
    _id?: string;
    name: string;
    email: string;
    role: UserRole;
    bio?: string | null;
    languages?: string[];
    avatarUrl?: string | null;
    isVerified: boolean;
    phoneNumber?: string | null;
    location?: string | null;
    
    // Guide-specific fields
    expertise?: string[];
    dailyRate?: number | null;
    reviewCount?: number;
    averageRating?: number;
    
    // Tourist-specific fields
    travelPreferences?: string[];
    
    needPasswordChange?: boolean;
    status?: "ACTIVE" | "BLOCKED" | "DELETED";
    isActive?: IsActive | null;
    isDeleted?: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface IUser {
    _id?: string;
    name: string;
    email: string;
    role: UserRole | ERole;
    bio?: string | null;
    languages?: string[];
    avatarUrl?: string | null;
    isVerified: boolean;
    phoneNumber?: string | null;
    location?: string | null;

    // Guide-specific fields
    expertise?: string[];
    dailyRate?: number | null;
    reviewCount?: number;
    averageRating?: number;

    // Tourist-specific fields
    travelPreferences?: string[];

    needPasswordChange?: boolean;
    status?: "ACTIVE" | "BLOCKED" | "DELETED";
    isActive?: IsActive;
    isDeleted?: boolean;
    createdAt: string;
    updatedAt: string;
}