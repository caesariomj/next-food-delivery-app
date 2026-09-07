import Link from "next/link";

import { RiMenuLine } from "@remixicon/react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/logo";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { CurrentUserWithRoleAndPermissions } from "@/features/user/infrastructure/user-type";
import { cn } from "@/lib/utils/cn";
import { getFullNameInitials, toTitleCase } from "@/lib/utils/string";
import type { NavLink } from "@/types/navigation";

type MenuSheetProps = {
  links: readonly NavLink[];
  user: CurrentUserWithRoleAndPermissions | null;
  className?: string;
};

export default function MenuSheet({ links, user, className }: MenuSheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          className={cn(
            "relative inline-flex cursor-pointer items-center bg-primary text-base font-bold tracking-tight text-nowrap transition-colors duration-300 ease-in-out hover:bg-background focus:bg-background focus:text-foreground focus:outline-none",
            className
          )}
        >
          <RiMenuLine className="size-6" />
        </button>
      </SheetTrigger>
      <SheetContent
        className="min-w-screen"
        aria-label="Mobile Menu"
        aria-describedby="menu-sheet-description"
      >
        <SheetHeader>
          <SheetTitle>
            <Logo />
          </SheetTitle>
        </SheetHeader>
        <p id="menu-sheet-description" className="sr-only">
          Press escape or click the close button to close the menu.
        </p>
        <ul className="flex h-full flex-col divide-y-4 divide-foreground overflow-y-scroll border-y-4 border-foreground">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                className="flex bg-background p-4 text-base font-semibold tracking-tight text-foreground transition-colors duration-200 ease-in-out focus:bg-primary focus:outline-none"
                href={link.href}
              >
                {link.title}
              </Link>
            </li>
          ))}
          {user ? (
            <>
              <li className="flex gap-2 bg-background p-4 text-base font-semibold tracking-tight text-foreground transition-colors duration-200 ease-in-out focus:bg-primary focus:outline-none">
                Notifications
                <span className="flex h-6 w-auto items-center justify-center border-3 border-foreground bg-destructive p-2 text-sm font-bold text-background select-none">
                  9+
                </span>
              </li>
              <li className="flex bg-background p-4 text-base font-semibold tracking-tight text-foreground transition-colors duration-200 ease-in-out focus:bg-primary focus:outline-none">
                Dashboard
              </li>
              <li className="flex gap-2 bg-background p-4 text-base font-semibold tracking-tight text-foreground transition-colors duration-200 ease-in-out focus:bg-primary focus:outline-none">
                My Orders
                <span className="flex h-6 w-auto items-center justify-center border-3 border-foreground bg-destructive p-2 text-sm font-bold text-background select-none">
                  9+
                </span>
              </li>
              <li className="flex bg-background p-4 text-base font-semibold tracking-tight text-foreground transition-colors duration-200 ease-in-out focus:bg-primary focus:outline-none">
                Sign Out
              </li>
            </>
          ) : (
            <li className="flex flex-row items-center gap-2 p-4">
              <Button variant="outline" size="lg" asChild>
                <Link href="/auth/sign-in">Login</Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/auth/sign-up">Sign Up</Link>
              </Button>
            </li>
          )}
        </ul>
        {user && (
          <SheetFooter className="-p-4">
            <Link
              href="/profile"
              className="flex flex-row items-center gap-2 bg-foreground p-4"
            >
              <Avatar className="size-11 rounded-none after:rounded-none">
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
                <span className="text-lg font-semibold tracking-tight text-primary">
                  {toTitleCase(user.name)}
                </span>
                <span className="text-xs tracking-tight text-background/80">
                  {user.email}
                </span>
              </div>
            </Link>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
