"use client";

import LogoutButton from "@/components/shared/LogoutButton";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { logoutUser } from "@/services/auth/logoutUser";
import { UserInfo } from "@/types/user.interface";
import { Settings, User, KeyRound, ChevronDown, Home } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface UserDropdownProps {
  userInfo: UserInfo;
}

const UserDropdown = ({ userInfo }: UserDropdownProps) => {


  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="gap-2 h-10 px-2 hover:bg-accent/50 transition-all duration-200 group"
        >
          <Avatar className="h-8 w-8 border-2 border-primary/20 transition-all duration-200 group-hover:border-primary/40">
            {userInfo.avatarUrl === null ? (
              <AvatarFallback className="bg-linear-to-br from-primary to-primary/60 text-primary-foreground font-semibold">
                {getInitials(userInfo.name)}
              </AvatarFallback>
            ) : (
              <Image
                src={userInfo.avatarUrl as string}
                alt={userInfo.name}
                height={50}
                width={50}
              />
            )}
          </Avatar>
          <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-y-0.5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 p-2">
        <DropdownMenuLabel className="pb-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border-2 border-primary/20">
              {userInfo.avatarUrl === null ? (
                <AvatarFallback className="bg-linear-to-br from-primary to-primary/60 text-primary-foreground font-semibold">
                  {getInitials(userInfo.name)}
                </AvatarFallback>
              ) : (
                <Image
                  src={userInfo.avatarUrl as string}
                  alt={userInfo.name}
                  height={50}
                  width={50}
                />
              )}
            </Avatar>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-semibold leading-none">{userInfo.name}</p>
              <p className="text-xs text-muted-foreground leading-none">
                {userInfo.email}
              </p>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary capitalize w-fit">
                {userInfo.role.toLowerCase()}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-2" />
        
        <DropdownMenuItem asChild>
          <Link 
            href="/my-profile" 
            className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-md transition-colors"
          >
            <User className="h-4 w-4" />
            <span>My Profile</span>
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild>
          <Link 
            href="/change-password" 
            className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-md transition-colors"
          >
            <KeyRound className="h-4 w-4" />
            <span>Change Password</span>
          </Link>
        </DropdownMenuItem>
        
        {userInfo.role === 'ADMIN' && <DropdownMenuItem asChild>
          <Link
            href="/admin/dashboard/general-settings"
            className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-md transition-colors"
          >
            <Home className="h-4 w-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>}
        <DropdownMenuItem asChild>
          <Link
            href="/"
            className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-md transition-colors"
          >
            <Settings className="h-4 w-4" />
            <span>Return To Home</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="my-2" />
        
        <DropdownMenuItem asChild className="p-0">
          <div className="w-full">
            <LogoutButton />
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
