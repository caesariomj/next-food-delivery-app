import Link from "next/link";

import { RiRefreshLine } from "@remixicon/react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarFooter as ShadcnSidebarFooter } from "@/components/ui/sidebar";
import SignOutButton from "@/features/auth/presentation/sign-out-button";
import type { CurrentUserWithRoleAndPermissions } from "@/features/user/infrastructure/user-type";
import { DASHBOARD_PROFILE_DROPDOWN_MENU_ITEM_LINKS } from "@/lib/constants/navigation";
import { getFullNameInitials, toTitleCase } from "@/lib/utils/string";

type SidebarFooterProps = {
  user: CurrentUserWithRoleAndPermissions;
  className?: string;
};

export default function SidebarFooter({ user, className }: SidebarFooterProps) {
  return (
    <ShadcnSidebarFooter className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex cursor-pointer flex-row items-center gap-2 border-2 border-sidebar-accent p-3 transition-colors duration-200 ease-in-out hover:border-primary-900 focus:outline-none focus-visible:border-primary-900">
            <Avatar className="size-10 rounded-none after:rounded-none">
              <AvatarImage
                src={user.image ?? undefined}
                alt={`${user.name} profile photo`}
                className="rounded-none"
              />
              <AvatarFallback className="rounded-none! border-none! bg-secondary text-background">
                {getFullNameInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start gap-1">
              <span className="text-sm font-semibold tracking-tight text-background">
                {toTitleCase(user.name)}
              </span>
              <span className="text-xs font-normal tracking-tight text-background/80">
                {toTitleCase(user.roles[0].role.name)}
              </span>
            </div>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="top">
          <DropdownMenuGroup>
            {DASHBOARD_PROFILE_DROPDOWN_MENU_ITEM_LINKS.map((link) => {
              const Icon = link.icon;

              return (
                <div key={link.label}>
                  {link.separatorBefore && <DropdownMenuSeparator />}
                  <DropdownMenuItem asChild>
                    <Link href={link.href}>
                      <Icon className="size-5" />
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                </div>
              );
            })}
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              {/* TODO: Implement role switch button here */}
              <button className="w-full">
                <RiRefreshLine className="size-5" />
                Switch to Customer
              </button>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem variant="destructive" asChild>
              <SignOutButton className="w-full" />
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </ShadcnSidebarFooter>
  );
}
