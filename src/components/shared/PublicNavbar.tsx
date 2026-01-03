import { getDefaultDashboardRoute } from "@/lib/auth-utils";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { getCookie } from "@/lib/tokenHandlers";
import { UserInfo } from "@/types/user.interface";
import { 
  Compass, 
  Menu, 
  User, 
  LayoutDashboard, 
  UserCircle, 
  Heart, 
  MapPin, 
  Calendar, 
  Settings, 
  LogOut,
  ChevronDown 
} from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Avatar, AvatarFallback } from "../ui/avatar";
import LogoutButton from "./LogoutButton";
import Image from "next/image";

const PublicNavbar = async () => {
  const accessToken = await getCookie("accessToken");
  let userInfo: UserInfo | null = null;

  if (accessToken) {
    try {
      userInfo = await getUserInfo();
    } catch (error) {
      console.error("Failed to get user info:", error);
    }
  }


  // Navigation items based on user role
  const getNavItems = () => {
    if (!userInfo) {
      return [
        { href: "/explore", label: "Explore Tours" },
        { href: "/all-guides", label: "Explore Guides" },
        { href: "/about", label: "About Us" },
        { href: "/contact", label: "Contact" },
      ];
    }

    const commonItems = [
      { href: "/explore", label: "Explore Tours" },
      { href: "/all-guides", label: "Explore Guides" },];

    switch (userInfo.role) {
      case "TOURIST":
        return [
          ...commonItems,
          { href: "/dashboard/bookings", label: "My Bookings" },
        ];
      case "GUIDE":
        return [
          ...commonItems,
          { href: "/guide/dashboard", label: "Dashboard" },
        ];
      case "ADMIN":
        return [
          ...commonItems,
          { href: "/admin/dashboard", label: "Admin Dashboard" },
        ];
      default:
        return commonItems;
    }
  };

  const navItems = getNavItems();

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl supports-backdrop-filter:bg-background/80 shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link 
          href="/" 
          className="flex items-center space-x-2 group transition-all duration-300 hover:scale-105"
        >
          <Image
            src={'/localGuide.png'}
            width={220}
            height={100}
            alt="Local Guide Logo"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="relative px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors duration-200 group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Desktop Auth Section */}
        <div className="hidden md:flex items-center space-x-3">
          {accessToken && userInfo ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="gap-2 h-10 px-3 hover:bg-accent/50 transition-all duration-200"
                >
                  <Avatar className="h-8 w-8 border-2 border-primary/20">
                    <AvatarFallback className="bg-gradient-to-br from-primary to-primary/60 text-primary-foreground text-xs font-semibold">
                      {getInitials(userInfo.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium leading-none">{userInfo.name}</span>
                    <span className="text-xs text-muted-foreground capitalize">{userInfo.role.toLowerCase()}</span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 p-2">
                <DropdownMenuLabel className="pb-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 border-2 border-primary/20">
                      <AvatarFallback className="bg-gradient-to-br from-primary to-primary/60 text-primary-foreground font-semibold">
                        {getInitials(userInfo.name)}
                      </AvatarFallback>
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
                    href={getDefaultDashboardRoute(userInfo.role)}
                    className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-md transition-colors"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                
                <DropdownMenuItem asChild>
                  <Link 
                    href="/my-profile" 
                    className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-md transition-colors"
                  >
                    <UserCircle className="h-4 w-4" />
                    <span>My Profile</span>
                  </Link>
                </DropdownMenuItem>
                {userInfo.role === "GUIDE" && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/guide/dashboard/my-tours"
                        className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-md transition-colors"
                      >
                        <MapPin className="h-4 w-4" />
                        <span>My Tours</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/guide/dashboard/bookings"
                        className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-md transition-colors"
                      >
                        <Calendar className="h-4 w-4" />
                        <span>Bookings</span>
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
                
                <DropdownMenuSeparator className="my-2" />
                
                <DropdownMenuItem asChild>
                  <Link 
                    href="/settings" 
                    className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-md transition-colors"
                  >
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
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
          ) : (
            <>
              <Link href="/login">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="font-medium hover:bg-accent/50 transition-all duration-200"
                >
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button 
                  size="sm"
                  className="font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-200"
                >
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="hover:bg-accent/50 transition-all duration-200"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex flex-col h-full">
                {/* User Info (Mobile) */}
                {accessToken && userInfo && (
                  <div className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-b">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-14 w-14 border-2 border-primary/20">
                        <AvatarFallback className="bg-gradient-to-br from-primary to-primary/60 text-primary-foreground text-lg font-semibold">
                          {getInitials(userInfo.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col space-y-1">
                        <p className="text-base font-semibold">{userInfo.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {userInfo.email}
                        </p>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary capitalize w-fit">
                          {userInfo.role.toLowerCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Links */}
                <nav className="flex-1 overflow-y-auto p-6">
                  <div className="flex flex-col space-y-1">
                    {navItems.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="flex items-center px-3 py-2.5 text-base font-medium rounded-lg hover:bg-accent transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}

                    {/* Authenticated User Links */}
                    {accessToken && userInfo && (
                      <>
                        <div className="h-px bg-border my-3" />
                        <Link
                          href={getDefaultDashboardRoute(userInfo.role)}
                          className="flex items-center gap-2 px-3 py-2.5 text-base font-medium rounded-lg hover:bg-accent transition-colors"
                        >
                          <LayoutDashboard className="h-4 w-4" />
                          Dashboard
                        </Link>
                        <Link
                          href="/my-profile"
                          className="flex items-center gap-2 px-3 py-2.5 text-base font-medium rounded-lg hover:bg-accent transition-colors"
                        >
                          <UserCircle className="h-4 w-4" />
                          My Profile
                        </Link>
                      
                        {userInfo.role === "GUIDE" && (
                          <>
                            <Link
                              href="/guide/dashboard/my-tours"
                              className="flex items-center gap-2 px-3 py-2.5 text-base font-medium rounded-lg hover:bg-accent transition-colors"
                            >
                              <MapPin className="h-4 w-4" />
                              My Tours
                            </Link>
                            <Link
                              href="/guide/dashboard/bookings"
                              className="flex items-center gap-2 px-3 py-2.5 text-base font-medium rounded-lg hover:bg-accent transition-colors"
                            >
                              <Calendar className="h-4 w-4" />
                              Bookings
                            </Link>
                          </>
                        )}
                        <Link
                          href="/settings"
                          className="flex items-center gap-2 px-3 py-2.5 text-base font-medium rounded-lg hover:bg-accent transition-colors"
                        >
                          <Settings className="h-4 w-4" />
                          Settings
                        </Link>
                      </>
                    )}
                  </div>
                </nav>

                {/* Auth Buttons */}
                <div className="p-6 border-t bg-background/50">
                  {accessToken && userInfo ? (
                    <LogoutButton />
                  ) : (
                    <div className="flex flex-col space-y-2">
                      <Link href="/login">
                        <Button 
                          variant="outline" 
                          className="w-full font-medium"
                        >
                          Login
                        </Button>
                      </Link>
                      <Link href="/register">
                        <Button 
                          className="w-full font-medium shadow-lg shadow-primary/20"
                        >
                          Sign Up
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default PublicNavbar;
