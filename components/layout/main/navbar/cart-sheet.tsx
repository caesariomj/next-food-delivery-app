import type { ReactNode } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type CartItem = {
  id: number;
  name: string;
  price: number;
};

type CartSheetProps = {
  cartItems: CartItem[];
  children: ReactNode;
  className?: string;
};

// TODO: Implement cart feature here
export default function CartSheet({
  cartItems,
  children,
  className,
}: CartSheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        className={className}
        aria-label="Cart Menu"
        aria-describedby="cart-sheet-description"
      >
        <SheetHeader>
          <SheetTitle className="text-6xl">Your Cart</SheetTitle>
        </SheetHeader>
        <p id="cart-sheet-description" className="sr-only">
          Press escape or click the close button to close the cart menu.
        </p>
        <div className="px-8">
          {cartItems.length === 0 ? (
            <p>
              Your cart is feeling lonely. Browse the menu and add your
              favorites.
            </p>
          ) : (
            <ul>
              {cartItems.map((item) => (
                <li key={item.id}>
                  {item.name} - ${item.price.toFixed(2)}
                </li>
              ))}
            </ul>
          )}
        </div>
        <SheetFooter>
          <Button size="lg" asChild>
            <Link href="/cuisines">Explore Menu</Link>
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
