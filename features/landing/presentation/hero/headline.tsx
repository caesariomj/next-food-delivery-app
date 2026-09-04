import Link from "next/link";

import { RiPriceTag3Fill, RiRestaurant2Fill } from "@remixicon/react";

import { Button } from "@/components/ui/button";

type Stat = {
  value: string;
  label: string;
};

const stats: readonly Stat[] = [
  { value: "500+", label: "Restaurants" },
  { value: "25min", label: "Avg. delivery" },
  { value: "4.8/5.0", label: "App rating" },
];

export default function Headline() {
  return (
    <div className="relative w-full overflow-hidden p-4 sm:p-16 lg:w-1/2">
      <div className="relative z-1 space-y-8">
        <div className="flex max-w-64 flex-row items-start gap-2 border-4 border-foreground bg-secondary px-4 py-2 neo-shadow-lg">
          <span className="mt-2.5 block size-2 animate-pulse bg-background" />
          <p className="text-base font-bold tracking-tight text-background uppercase sm:text-lg">
            Now delivering in 30+ cities
          </p>
        </div>
        <h1 className="mb-12 max-w-96 font-display text-8xl leading-28 font-black text-foreground sm:text-9xl sm:leading-36">
          <span>Hungry?</span>
          <br />
          <span className="text-secondary">We&apos;ve</span>
          <br />
          <span className="bg-foreground px-8 text-primary">Got It</span>
        </h1>
        <p className="mb-16 text-lg font-semibold tracking-tight text-foreground/80 sm:text-xl">
          Order from hundreds of local restaurants, food courts, and cloud
          kitchens — all in one place. Fast, fresh, and real food from your
          city&apos;s best spots.
        </p>
        <div className="mb-16 flex flex-wrap items-center gap-8">
          <Button variant="default" size="2xl" asChild>
            <Link href="/restaurants">
              <RiRestaurant2Fill className="size-6" />
              Browse Restaurants
            </Link>
          </Button>
          <Button variant="foreground" size="2xl" asChild>
            <Link href="/cuisines?filter=deals">
              <RiPriceTag3Fill className="size-6" />
              See Today&apos;s Deals
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4 border-t-4 border-dashed border-foreground pt-8 sm:grid-cols-3 sm:gap-16">
          {stats.map((stat) => (
            <p
              key={stat.label}
              className="flex flex-col text-lg font-medium tracking-tighter text-foreground/80 sm:text-xl"
            >
              <span className="font-display text-5xl text-foreground sm:text-6xl">
                {stat.value}
              </span>
              {stat.label}
            </p>
          ))}
        </div>
      </div>
      <div className="absolute -top-48 -right-64 z-0 size-112 rotate-z-24 border-4 border-foreground bg-primary sm:-top-24 sm:-right-32" />
    </div>
  );
}
