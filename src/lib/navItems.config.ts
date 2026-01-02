""
import { NavSection } from "@/types/dashboard.interface";
import { getDefaultDashboardRoute, UserRole } from "./auth-utils";

export const getCommonNavItems = (role: UserRole): NavSection[] => {
    const defaultDashboard = getDefaultDashboardRoute(role);

    return [
        {
            items: [
                {
                    title: "Dashboard",
                    href: defaultDashboard,
                    icon: "LayoutDashboard",
                    roles: ["TOURIST", "GUIDE", "ADMIN"],
                },
                {
                    title: "My Profile",
                    href: `/my-profile`,
                    icon: "User",
                    roles: ["TOURIST", "GUIDE", "ADMIN"],
                },
                {
                    title: "Notifications",
                    href: "/notifications",
                    icon: "Bell",
                    roles: ["TOURIST", "GUIDE", "ADMIN"],
                }
            ]
        },
        {
            title: "Settings",
            items: [
                {
                    title: "Change Password",
                    href: "/change-password",
                    icon: "Settings",
                    roles: ["TOURIST", "GUIDE"],
                },
            ],
        },
    ]
}

export const guideNavItems: NavSection[] = [
    {
        title: "Tour Management",
        items: [
            {
                title: "My Tours",
                href: "/guide/dashboard/my-tours",
                icon: "Map",
                roles: ["GUIDE"],
            },
            {
                title: "Create Tour",
                href: "/guide/dashboard/create-tour",
                icon: "Plus",
                roles: ["GUIDE"],
            },
            {
                title: "Bookings",
                href: "/guide/dashboard/bookings",
                icon: "Calendar",
                roles: ["GUIDE"],
            },
        ],
    },
    {
        title: "Business",
        items: [
            {
                title: "Availability",
                href: "/guide/dashboard/availability",
                icon: "Clock",
                roles: ["GUIDE"],
            },
            {
                title: "Earnings",
                href: "/guide/dashboard/earnings",
                icon: "DollarSign",
                roles: ["GUIDE"],
            }
        ],
    }
]

export const touristNavItems: NavSection[] = [
    {
        title: "Bookings",
        items: [
            {
                title: "My Bookings",
                href: "/dashboard/bookings",
                icon: "Calendar",
                roles: ["TOURIST"],
            },
            {
                title: "Browse Tours",
                href: "/explore",
                icon: "Search",
                roles: ["TOURIST"],
            },
        ],
    },
    {
        title: "My Activity",
        items: [
            {
                title: "Payment History",
                href: "/dashboard/payment-history",
                icon: "CreditCard",
                roles: ["TOURIST"],
            },
        ],
    },
]

export const adminNavItems: NavSection[] = [
    {
        title: "User Management",
        items: [
            {
                title: "All Users",
                href: "/admin/dashboard/users-management",
                icon: "Users",
                roles: ["ADMIN"],
            },
        ],
    },
    {
        title: "Platform Management",
        items: [
            {
                title: "Tours",
                href: "/admin/dashboard/tours-management",
                icon: "Map",
                roles: ["ADMIN"],
            },
            {
                title: "Bookings",
                href: "/admin/dashboard/bookings-management",
                icon: "Calendar",
                roles: ["ADMIN"],
            },
        ],
    },
    {
        title: "Financial",
        items: [
            {
                title: "Payments",
                href: "/admin/dashboard/payments-management",
                icon: "CreditCard",
                roles: ["ADMIN"],
            },
            {
                title: "Payouts",
                href: "/admin/dashboard/payouts-management",
                icon: "DollarSign",
                roles: ["ADMIN"],
            }
        ],
    },
    {
        title: "Support",
        items: [
            {
                title: "Contact Messages",
                href: "/admin/dashboard/contact-messages",
                icon: "Messages",
                roles: ["ADMIN"],
            },
            {
                title: "Subscribe Emails",
                href: "/admin/dashboard/subscribe-emails",
                icon: "Mail",
                roles: ["ADMIN"],
            },
            {
                title: "Reviews",
                href: "/admin/dashboard/reviews-management",
                icon: "Star",
                roles: ["ADMIN"],
            },
        ],
    },{
        title: "Settings",
        items: [
            {
                title: "General Settings",
                href: "/admin/dashboard/general-settings",
                icon: "Settings",
                roles: ["ADMIN"],
            },{
                title: "Change Password",
                href: "/change-password",
                icon: "RotateCcwKey",
                roles: ["ADMIN"],
            },
        ],
    }
]

export const getNavItemsByRole = (role: UserRole): NavSection[] => {
    const commonNavItems = getCommonNavItems(role);

    switch (role) {
        case "ADMIN":
            return [...commonNavItems, ...adminNavItems];
        case "GUIDE":
            return [...commonNavItems, ...guideNavItems];
        case "TOURIST":
            return [...commonNavItems, ...touristNavItems];
        default:
            return [];
    }
}