"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { RiLogoutBoxLine } from "@remixicon/react";
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
import { signOut } from "@/features/auth/application/sign-out";
import { reportAuthError } from "@/features/auth/infrastructure/auth-error-monitoring";
import {
  extractUserPermissions,
  hasAllPermissions,
} from "@/features/permission/application/permission-utils";
import type { CurrentUserWithRoleAndPermissions } from "@/features/user/infrastructure/user-type";
import { MAIN_PROFILE_DROPDOWN_MENU_ITEM_LINKS } from "@/lib/constants/navigation";
import { cn } from "@/lib/utils/cn";
import { getFullNameInitials, toTitleCase } from "@/lib/utils/string";

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

  async function handleSignOut(): Promise<void> {
    if (isSignOutLoading) return;

    setIsSignOutLoading(true);

    try {
      const { error } = await signOut();

      if (error) {
        reportAuthError({
          context: "sign_out",
          errorCode: error.code,
          error,
        });

        toast.error(error.message ?? "Failed to sign out.");
        return;
      }

      router.replace("/");
    } catch (error) {
      reportAuthError({
        context: "sign_out",
        error,
      });

      toast.error("Something went wrong on our end. Please try again later.");
    } finally {
      setIsSignOutLoading(false);
    }
  }

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
        {MAIN_PROFILE_DROPDOWN_MENU_ITEM_LINKS.filter(
          (link) =>
            !link.permissions ||
            hasAllPermissions(userPermissions, link.permissions)
        ).map((link) => {
          const Icon = link.icon;

          return (
            <div key={link.href}>
              {link.separatorBefore && <DropdownMenuSeparator />}
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <Link href={link.href}>
                    <Icon className="size-5" />
                    {link.label}
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </div>
          );
        })}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          onClick={handleSignOut}
          className="font-semibold"
          disabled={isSignOutLoading}
        >
          <RiLogoutBoxLine />
          {isSignOutLoading ? "Signing Out..." : "Sign Out"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
