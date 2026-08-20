import Link from "next/link";

import {
  RiInstagramFill,
  RiTiktokFill,
  RiTwitterXFill,
  RiYoutubeFill,
} from "@remixicon/react";

import Logo from "@/components/ui/logo";
import type { LinkGroup, LinkItem } from "@/types/link";

const appName = process.env.NEXT_PUBLIC_APP_NAME ?? "My App";

const linkGroups: readonly LinkGroup[] = [
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

const socialLinks: readonly LinkItem[] = [
  {
    label: "Instagram",
    href: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "#",
    icon: <RiInstagramFill className="size-5" />,
  },
  {
    label: "X",
    href: process.env.NEXT_PUBLIC_X_URL ?? "#",
    icon: <RiTwitterXFill className="size-5" />,
  },
  {
    label: "TikTok",
    href: process.env.NEXT_PUBLIC_TIKTOK_URL ?? "#",
    icon: <RiTiktokFill className="size-5" />,
  },
  {
    label: "YouTube",
    href: process.env.NEXT_PUBLIC_YOUTUBE_URL ?? "#",
    icon: <RiYoutubeFill className="size-5" />,
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-foreground p-8 lg:p-24">
      <div className="grid grid-cols-2 gap-8 pb-16 lg:grid-cols-4 lg:gap-16">
        <div className="space-y-8">
          <Logo variant="dark" />
          <p className="text-sm tracking-tight text-background/50 sm:text-base">
            Your city&apos;s food, delivered fast. We connect hungry people with
            the best local restaurants — no fluff, no nonsense.
          </p>
        </div>
        {linkGroups.map((group) => (
          <div key={group.header} className="space-y-4 lg:space-y-8">
            <p className="text-base font-bold tracking-tight text-primary uppercase sm:text-lg">
              {group.header}
            </p>
            <ul className="space-y-2 lg:space-y-4">
              {group.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm tracking-tight text-background/50 transition-colors duration-300 ease-in-out hover:text-background focus:text-background focus:outline-none sm:text-base"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <hr className="w-full border-background/50" />
      <div className="relative z-1 flex flex-col items-center justify-between gap-8 pt-8 pb-[clamp(4rem,18vw,28rem)] md:flex-row">
        <p className="text-sm tracking-tight text-background/50 sm:text-base">
          © {currentYear} {appName}. All rights reserved.
        </p>
        <div className="flex flex-row gap-x-8">
          {socialLinks.map((social) => (
            <Link
              key={social.label}
              href={social.href}
              className="border border-background/50 p-2 text-background/50 transition-colors duration-300 ease-in-out hover:border-primary hover:text-primary focus:border-primary focus:text-primary focus:outline-none"
              aria-label={`Go to ${social.label.toLocaleLowerCase()}`}
              target="_blank"
            >
              {social.icon}
            </Link>
          ))}
        </div>
      </div>
      <p className="absolute -bottom-[clamp(0.75rem,8vw,8rem)] left-1/2 z-0 -translate-x-1/2 text-center font-display text-[clamp(5rem,30vw,50rem)] leading-none text-nowrap text-background select-none">
        {appName}
      </p>
    </footer>
  );
}
