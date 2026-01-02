"use client";

import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { SheetTitle } from "@/components/ui/sheet";
import { getIconComponent } from "@/lib/icon-mapper";
import { cn } from "@/lib/utils";
import { NavSection } from "@/types/dashboard.interface";
import { UserInfo } from "@/types/user.interface";
import { UserRole } from "@/lib/auth-utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

interface DashboardMobileSidebarContentProps {
  userInfo: UserInfo;
  navItems: NavSection[];
  dashboardHome: string;
}

const DashboardMobileSidebar = ({
  userInfo,
  navItems,
  dashboardHome,
}: DashboardMobileSidebarContentProps) => {
  const pathname = usePathname();
  const userRole = userInfo.role as UserRole;

  // Filter nav items based on user role
  const filteredNavItems = navItems.map(section => ({
    ...section,
    items: section.items.filter(item => 
      !item.roles || item.roles.includes(userRole)
    )
  })).filter(section => section.items.length > 0);

  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-card to-card/95">
      {/* Logo */}
      <div className="flex h-16 items-center border-b px-6 bg-card/50 backdrop-blur-sm">
        <Link href={dashboardHome} className="flex items-center space-x-2 group">
          <div className="">
                     <Image src={'/localGuide.png'} alt="localGuide" width={50} height={50} />
                    </div>
          <span className="text-lg font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Local Guide
          </span>
        </Link>
      </div>
      <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4 overflow-y-auto">
        <nav className="space-y-1">
          {filteredNavItems.map((section, sectionIdx) => (
            <div key={sectionIdx}>
              {section.title && (
                <h4 className="mb-1 px-3 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                  {section.title}
                </h4>
              )}
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = getIconComponent(item.icon);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "group flex items-center gap-3 rounded-lg px-3 py-1 text-sm font-medium transition-all duration-200 relative overflow-hidden",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      )}
                    >
                      {/* Active indicator */}
                      {isActive && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-primary-foreground rounded-r-full" />
                      )}
                      {isActive && (
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-primary-foreground rounded-r-full" />
                      )}
                      <div className={cn(
                        "flex items-center justify-center w-8 h-8 rounded-md transition-colors",
                        isActive 
                          ? "bg-primary-foreground/20" 
                          : "bg-transparent group-hover:bg-accent"
                      )}>
                        <Icon className="h-4 w-4" />
                      </div>
                      
                      <span className="flex-1">{item.title}</span>
                      
                      {item.badge && (
                        <Badge
                          variant={isActive ? "secondary" : "default"}
                          className="ml-auto text-[10px] px-1.5 py-0"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  );
                })}
              </div>
              {sectionIdx < filteredNavItems.length - 1 && (
                <Separator className="my-4 opacity-50" />
              )}
            </div>
          ))}
        </nav>
      </ScrollArea>

      {/* User Info at Bottom */}
      <div className="border-t bg-card/50 backdrop-blur-sm p-4">
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/50 transition-colors">
          <div className="relative">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center ring-2 ring-background">
              <span className="text-sm font-bold text-primary-foreground">
                {userInfo.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-500 ring-2 ring-background" />
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-semibold truncate">{userInfo.name}</p>
            <p className="text-xs text-muted-foreground capitalize flex items-center gap-1">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary" />
              {userInfo.role.toLowerCase()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMobileSidebar;
