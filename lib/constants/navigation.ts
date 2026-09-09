import {
  RiCustomerService2Fill,
  RiDashboard2Fill,
  RiInstagramFill,
  RiTakeawayFill,
  RiTiktokFill,
  RiTwitterXFill,
  RiUser3Fill,
  RiYoutubeFill,
} from "@remixicon/react";

import type {
  LinkGroup,
  LinkItem,
  ProfileDropdownMenuItemLink,
} from "@/types/link";
import type { NavGroup, NavLink } from "@/types/navigation";

export const MAIN_NAVBAR_LINKS: readonly NavLink[] = [
  {
    title: "Cuisines",
    href: "/cuisines",
  },
  {
    title: "Restaurants",
    href: "/restaurants",
  },
  {
    title: "Deals",
    href: "/deals",
  },
  {
    title: "Partnership",
    href: "/partnership",
  },
];

export const MAIN_PROFILE_DROPDOWN_MENU_ITEM_LINKS: readonly ProfileDropdownMenuItemLink[] =
  [
    {
      label: "Account",
      href: "/account",
      icon: RiUser3Fill,
    },
    {
      label: "My Orders",
      href: "/orders",
      icon: RiTakeawayFill,
      // TODO: Implement user order permissions to conditionally render menu item here
    },
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: RiDashboard2Fill,
      permissions: ["dashboard.access"],
      separatorBefore: true,
    },
    {
      label: "Help & Support",
      href: "/help-center",
      icon: RiCustomerService2Fill,
      separatorBefore: true,
    },
  ];

export const MAIN_FOOTER_LINK_GROUPS: readonly LinkGroup[] = [
  {
    header: "Discover",
    links: [
      { label: "All restaurants", href: "/restaurants" },
      { label: "Top rated", href: "/cuisines?sort=rating" },
      { label: "New arrivals", href: "/cuisines?sort=latest" },
      { label: "Today's deals", href: "/cuisines?filter=deals" },
      { label: "Cuisines", href: "/cuisines" },
    ],
  },
  {
    header: "Company",
    links: [
      { label: "About us", href: "/about-us" },
      { label: "Partner with us", href: "/partnership" },
      { label: "Careers", href: "/careers" },
      { label: "Blogs", href: "/blogs" },
      { label: "Press", href: "/press" },
    ],
  },
  {
    header: "Support",
    links: [
      { label: "Help center", href: "/help-center" },
      { label: "Contact us", href: "/contact-us" },
      { label: "Privacy policy", href: "/privacy-policy" },
      { label: "Terms of service", href: "/terms-of-service" },
      { label: "Cookie settings", href: "/cookie-settings" },
    ],
  },
];

export const MAIN_FOOTER_SOCIAL_LINKS: readonly LinkItem[] = [
  {
    label: "Instagram",
    href: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "#",
    icon: RiInstagramFill,
  },
  {
    label: "X",
    href: process.env.NEXT_PUBLIC_X_URL ?? "#",
    icon: RiTwitterXFill,
  },
  {
    label: "TikTok",
    href: process.env.NEXT_PUBLIC_TIKTOK_URL ?? "#",
    icon: RiTiktokFill,
  },
  {
    label: "YouTube",
    href: process.env.NEXT_PUBLIC_YOUTUBE_URL ?? "#",
    icon: RiYoutubeFill,
  },
];

export const DASHBOARD_SIDEBAR_NAV_GROUPS: readonly NavGroup[] = [
  {
    label: "Overview",
    items: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: "🏠",
        permissions: ["dashboard.access"],
      },
      {
        title: "Analytics",
        href: "/dashboard/analytics",
        icon: "📊",
        permissions: ["analytics.access"],
      },
    ],
  },
  {
    label: "Catalog",
    items: [
      {
        title: "Cuisines",
        href: "/dashboard/cuisines",
        icon: "🍽️",
        permissions: ["cuisines.view"],
      },
      {
        title: "Restaurant Applications",
        href: "/dashboard/restaurant-applications",
        icon: "📝",
        permissions: ["restaurant-applications.view"],
        badge: 10,
      },
      {
        title: "Restaurants",
        href: "/dashboard/restaurants",
        icon: "🏪",
        permissions: ["restaurants.view"],
      },
      {
        title: "Menu Items",
        href: "/dashboard/menu-items",
        icon: "🍔",
        permissions: ["menu-items.view.any", "menu-items.view.own"],
      },
      {
        title: "Deals",
        href: "/dashboard/deals",
        icon: "📋",
        permissions: ["deals.view.any", "deals.view.own"],
      },
    ],
  },
  {
    label: "Operations",
    items: [
      {
        title: "Orders",
        href: "/dashboard/orders",
        icon: "📦",
        permissions: ["orders.view.any", "orders.view.own"],
      },
      {
        title: "Drivers",
        href: "/dashboard/drivers",
        icon: "🛵",
        permissions: ["drivers.view.any", "drivers.view.own"],
      },
      {
        title: "Vouchers",
        href: "/dashboard/vouchers",
        icon: "🏷️",
        permissions: ["vouchers.view.any", "vouchers.view.own"],
      },
    ],
  },
  {
    label: "Users",
    items: [
      {
        title: "Customers",
        href: "/dashboard/customers",
        icon: "👤",
        permissions: ["customers.view.any"],
      },
      {
        title: "Merchants",
        href: "/dashboard/merchants",
        icon: "👨‍💼",
        permissions: ["merchants.view.any"],
      },
      {
        title: "Admins",
        href: "/dashboard/admins",
        icon: "🛡️",
        permissions: ["admins.view.any"],
      },
    ],
  },
  {
    label: "Systems",
    items: [
      {
        title: "Settings",
        href: "/dashboard/settings",
        icon: "⚙️",
        permissions: ["settings.access"],
      },
    ],
  },
];
