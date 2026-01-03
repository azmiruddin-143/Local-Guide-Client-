"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getIconComponent } from "@/lib/icon-mapper";
import { cn } from "@/lib/utils";
import { NavSection } from "@/types/dashboard.interface";
import { UserInfo } from "@/types/user.interface";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserRole } from "@/lib/auth-utils";
import Image from "next/image";

interface DashboardSidebarContentProps {
  userInfo: UserInfo;
  navItems: NavSection[];
  dashboardHome: string;
}

const DashboardSidebarContent = ({
  userInfo,
  navItems,
  dashboardHome,
}: DashboardSidebarContentProps) => {
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
    <div className="hidden md:flex h-full w-64 flex-col border-r  from-card to-card/95">
      {/* Logo/Brand */}
      <div className="flex h-16 items-center border-b px-0 bg-card/50 backdrop-blur-sm">
        <Link href={'/'} className="">
          <div className="">
           <Image src={'/localGuide.png'} alt="localGuide" width={200} height={150} />
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4 overflow-y-auto">
        <nav className="space-y-6">
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
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-primary-foreground rounded-r-full" />
                      )}
                      {isActive && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-primary-foreground rounded-r-full" />
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
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
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

export default DashboardSidebarContent;
