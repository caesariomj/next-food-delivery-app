import Link from "next/link";

import { RiShoppingBagFill } from "@remixicon/react";

import Logo from "@/components/ui/logo";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import type { CurrentUserWithRoleAndPermissions } from "@/features/user/infrastructure/user-type";
import type { NavLink } from "@/types/navigation";

import CartSheet from "./cart-sheet";
import MenuSheet from "./menu-sheet";
import ProfileDropdown from "./profile-dropdown";
import NotificationDropdown from "../../../common/navigation/notification-dropdown";

const links: readonly NavLink[] = [
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

type NavbarProps = {
  user: CurrentUserWithRoleAndPermissions | null;
};

export default function Navbar({ user }: NavbarProps) {
  // TODO: Implement cart items retreival from user data here
  const cart = {
    cartItems: [
      {
        id: 1,
        name: "Margherita Pizza",
        price: 12.99,
      },
    ],
  };

  return (
    <NavigationMenu className="sticky top-0 left-0 z-2 flex h-12 min-w-full items-center justify-between border-b-4 border-b-foreground bg-primary px-4 sm:h-16 lg:px-16">
      <Logo />
      <NavigationMenuList className="hidden h-12 gap-x-2 sm:h-16 lg:flex">
        {links.map((link) => (
          <NavigationMenuItem key={link.href}>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link
                className="h-12 text-base font-semibold tracking-tight text-foreground"
                href={link.href}
              >
                {link.title}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
      <div className="flex h-12 items-center border-x-4 border-foreground sm:h-16">
        <CartSheet
          cartItems={cart.cartItems}
          className="min-w-screen sm:min-w-96"
        >
          <button className="relative inline-flex h-full cursor-pointer items-center border-r-4 border-foreground bg-primary px-3.5 text-base font-bold tracking-tight text-nowrap transition-colors duration-300 ease-in-out hover:bg-background focus:bg-background focus:text-foreground focus:outline-none sm:px-5">
            <RiShoppingBagFill className="size-6" />
            {cart.cartItems.length > 0 && (
              <span className="absolute top-0 right-0 flex h-5 w-auto items-center justify-center border-b-3 border-l-3 border-foreground bg-destructive p-1 text-xs font-bold text-background select-none sm:p-2 md:h-6 md:text-sm">
                {cart.cartItems.length}
              </span>
            )}
          </button>
        </CartSheet>
        <div className="hidden h-full divide-x-4 divide-foreground sm:flex">
          {user ? (
            <>
              <NotificationDropdown className="h-full" />
              <ProfileDropdown className="h-full" user={user} />
            </>
          ) : (
            <>
              <Link
                href="/auth/sign-in"
                className="inline-flex items-center bg-primary px-8 text-base font-bold tracking-tight text-nowrap text-foreground transition-colors duration-200 ease-in-out hover:bg-background hover:text-foreground focus:bg-background focus:text-foreground focus:outline-none"
              >
                Sign In
              </Link>
              <Link
                href="/auth/sign-up"
                className="inline-flex items-center bg-secondary px-8 text-base font-bold tracking-tight text-nowrap text-background transition-colors duration-200 ease-in-out hover:bg-background hover:text-foreground focus:bg-background focus:text-foreground focus:outline-none"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
        <MenuSheet
          links={links}
          user={user}
          className="block h-full px-3.5 sm:hidden"
        />
      </div>
    </NavigationMenu>
  );
}
