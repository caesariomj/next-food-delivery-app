import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SignOutButton from "@/features/auth/presentation/sign-out-button";
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
  const userPermissions = extractUserPermissions(user);

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
        <DropdownMenuGroup>
          {MAIN_PROFILE_DROPDOWN_MENU_ITEM_LINKS.filter(
            (link) =>
              !link.permissions ||
              hasAllPermissions(userPermissions, link.permissions)
          ).map((link) => {
            const Icon = link.icon;

            return (
              <div key={link.href}>
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
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem variant="destructive" asChild>
            <SignOutButton className="w-full" />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
