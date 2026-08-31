import { Suspense } from "react";
import Link from "next/link";

import { RiArrowRightLongLine } from "@remixicon/react";

import { Button } from "@/components/ui/button";
import LoadingDots from "@/components/ui/loading-dots";

import CuisineGridLoader from "./grid-loader";

type CuisinesSectionProps = {
  className?: string;
};

export default function CuisinesSection({ className }: CuisinesSectionProps) {
  return (
    <section className={className}>
      <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
        <h2 className="max-w-full font-display text-7xl leading-none font-black text-foreground sm:text-9xl lg:max-w-2xl">
          What Are You Craving?
        </h2>
        <Button
          variant="foreground"
          size="2xl"
          className="w-full lg:w-fit"
          asChild
        >
          <Link href="/cuisines">
            Browse Cuisines
            <RiArrowRightLongLine className="size-6" />
          </Link>
        </Button>
      </div>
      <Suspense
        fallback={
          <div className="flex h-108 w-full animate-pulse items-center justify-center bg-background-secondary">
            <LoadingDots />
          </div>
        }
      >
        <CuisineGridLoader />
      </Suspense>
    </section>
  );
}
