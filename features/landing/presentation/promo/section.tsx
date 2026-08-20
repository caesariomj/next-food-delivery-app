import Link from "next/link";

import { RiArrowRightLongLine } from "@remixicon/react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

import ClaimButton from "./claim-button";

type PromoSectionProps = {
  isLoggedIn: boolean;
  className?: string;
};

const appName = process.env.NEXT_PUBLIC_APP_NAME ?? "My App";

export default function PromoSection({
  isLoggedIn,
  className,
}: PromoSectionProps) {
  return (
    <section className="flex flex-col divide-x-0 divide-y-4 divide-foreground lg:flex-row lg:divide-x-4 lg:divide-y-0">
      <div
        className={cn(
          "w-full space-y-8 bg-secondary px-8 py-16 md:px-16 md:py-32 lg:w-1/2",
          className
        )}
      >
        <Badge
          variant="outline-background"
          className="px-4 py-2 text-sm sm:text-base"
        >
          Limited time
        </Badge>
        <h2 className="max-w-lg font-display text-7xl tracking-tight text-background sm:text-9xl">
          Free Delivery All Week
        </h2>
        <p className="max-w-2xl text-sm font-semibold tracking-tight text-background/80 sm:text-lg">
          First 3 orders on us. No promo code needed — just make an account,
          order and we&apos;ll waive the delivery fee automatically.
        </p>
        <ClaimButton isLoggedIn={isLoggedIn} className="w-full md:w-fit" />
      </div>
      <div
        className={cn(
          "w-full space-y-8 bg-foreground px-8 py-16 md:px-16 md:py-32 lg:w-1/2",
          className
        )}
      >
        <Badge
          variant="outline-primary"
          className="bg-transparent px-4 py-2 text-sm sm:text-base"
        >
          For restaurants
        </Badge>
        <h2 className="max-w-lg font-display text-7xl tracking-tight text-primary sm:text-9xl">
          List Your Restaurant
        </h2>
        <p className="max-w-2xl text-sm font-semibold tracking-tight text-primary/80 sm:text-lg">
          Join 500+ restaurants already earning more with {appName}. Zero
          upfront costs, setup in under 24 hours.
        </p>
        <Button variant="default" size="xl" className="w-full md:w-fit" asChild>
          <Link href="/partnership">
            Partner With Us <RiArrowRightLongLine className="size-6" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
