"use client";

import Link from "next/link";

import { RiArrowRightLongLine, RiCoupon2Fill } from "@remixicon/react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

type ClaimButtonProps = {
  isLoggedIn: boolean;
  className?: string;
};

export default function ClaimButton({
  isLoggedIn,
  className,
}: ClaimButtonProps) {
  // TODO: Implement promo claim logic here
  function handlePromoClaim() {
    if (!isLoggedIn) return;

    toast.success("Promo claimed!");
  }

  return (
    <Button
      variant="background"
      size="xl"
      className={className}
      onClick={handlePromoClaim}
      asChild={!isLoggedIn}
    >
      {isLoggedIn ? (
        <>
          Claim Now <RiCoupon2Fill className="size-6" />
        </>
      ) : (
        <Link href="/auth/sign-in">
          Claim Now <RiArrowRightLongLine className="size-6" />
        </Link>
      )}
    </Button>
  );
}
