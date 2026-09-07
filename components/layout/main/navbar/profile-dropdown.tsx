"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  RiCustomerService2Fill,
  RiDashboard2Fill,
  RiLogoutBoxLine,
  RiTakeawayFill,
  RiUser3Fill,
} from "@remixicon/react";
import * as Sentry from "@sentry/nextjs";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  extractUserPermissions,
  hasAllPermissions,
} from "@/features/permission/application/permission-utils";
import type { CurrentUserWithRoleAndPermissions } from "@/features/user/infrastructure/user-type";
import { authClient } from "@/lib/auth/client";
import { cn } from "@/lib/utils/cn";
import { getFullNameInitials, toTitleCase } from "@/lib/utils/string";
import type { LinkItem } from "@/types/link";

type ProfileDropdownMenuItemLink = LinkItem & {
  permissions?: string[];
  separatorBefore?: boolean;
};

const profileDropdownMenuItemLinks: readonly ProfileDropdownMenuItemLink[] = [
  {
    label: "Account",
    href: "/account",
    icon: <RiUser3Fill className="size-5" />,
  },
  {
    label: "My Orders",
    href: "/orders",
    icon: <RiTakeawayFill className="size-5" />,
    // TODO: Implement user order permissions to conditionally render menu item here
  },
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <RiDashboard2Fill className="size-5" />,
    permissions: ["dashboard.access"],
    separatorBefore: true,
  },
  {
    label: "Help & Support",
    href: "/help-center",
    icon: <RiCustomerService2Fill className="size-5" />,
    separatorBefore: true,
  },
];

type ProfileDropdownProps = {
  user: CurrentUserWithRoleAndPermissions;
  className?: string;
};

export default function ProfileDropdown({
  user,
  className,
}: ProfileDropdownProps) {
  const [isSignOutLoading, setIsSignOutLoading] = useState(false);
  const router = useRouter();

  const userPermissions = extractUserPermissions(user);

  const handleSignOut = async () => {
    if (isSignOutLoading) return;
    setIsSignOutLoading(true);

    try {
      const { error } = await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.replace("/");
          },
        },
      });

      if (error) {
        toast.error(error.message ?? "Failed to sign out");
        Sentry.captureException(new Error(error.message ?? "Sign out failed"), {
          extra: { status: error.status, statusText: error.statusText },
        });
        router.replace("/");
      }
    } catch (unexpected) {
      Sentry.captureException(unexpected);
      toast.error("Something went wrong while signing out");
      router.replace("/");
    } finally {
      setIsSignOutLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "inline-flex cursor-pointer items-center gap-x-5 divide-foreground overflow-hidden bg-primary pr-0 text-base font-bold tracking-tight text-nowrap transition-colors duration-300 ease-in-out hover:bg-background focus:bg-background focus:text-foreground focus:outline-none sm:divide-x-3 sm:pr-6",
            className
          )}
        >
          <Avatar className="size-18 rounded-none after:rounded-none">
            <AvatarImage
              src={user.image ?? undefined}
              alt={`${user.name} profile photo`}
              className="rounded-none"
            />
            <AvatarFallback className="rounded-none! border-none! bg-secondary text-background">
              {getFullNameInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <span>{toTitleCase(user.name)}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="mt-1 w-72">
        {profileDropdownMenuItemLinks
          .filter(
            (link) =>
              !link.permissions ||
              hasAllPermissions(userPermissions, link.permissions)
          )
          .map((link) => (
            <div key={link.href}>
              {link.separatorBefore && <DropdownMenuSeparator />}
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <Link href={link.href}>
                    {link.icon}
                    {link.label}
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </div>
          ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          onClick={handleSignOut}
          className="font-semibold"
          disabled={isSignOutLoading}
        >
          <RiLogoutBoxLine />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
