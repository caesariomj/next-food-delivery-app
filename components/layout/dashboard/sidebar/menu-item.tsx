"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  SidebarMenuButton,
  SidebarMenuItem as ShadcnSidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils/cn";
import type { NavItem } from "@/types/navigation";

type SidebarMenuItemProps = {
  item: NavItem;
  className?: string;
};

export default function SidebarMenuItem({
  item,
  className,
}: SidebarMenuItemProps) {
  const pathname = usePathname();
  const isActive = pathname === item.href;

  return (
    <ShadcnSidebarMenuItem className={className}>
      <SidebarMenuButton size="lg" isActive={isActive} asChild>
        <Link href={item.href}>
          <span className="text-xl">{item.icon}</span>
          <span className="text-base font-medium">{item.title}</span>
          {item.badge && item.badge > 0 && (
            <div
              className={cn(
                "inline-flex h-8 w-10 items-center justify-center text-center",
                isActive
                  ? "bg-foreground text-primary"
                  : "border-2 border-primary text-primary"
              )}
            >
              <span className="font-semibold">{item.badge}</span>
            </div>
          )}
        </Link>
      </SidebarMenuButton>
    </ShadcnSidebarMenuItem>
  );
}
