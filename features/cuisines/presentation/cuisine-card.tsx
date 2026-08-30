import Link from "next/link";

import { cn } from "@/lib/utils/cn";

import type { LandingPageCuisine } from "../application/cuisine-types";

type CuisineCardProps = {
  cuisine: LandingPageCuisine;
  className?: string;
};

export default function CuisineCard({ cuisine, className }: CuisineCardProps) {
  return (
    <Link
      href={`/cuisines/${cuisine.slug}`}
      className={cn(
        "flex h-full w-full shrink-0 flex-col flex-nowrap items-center justify-center gap-y-2 bg-background p-8 transition-colors duration-200 ease-in-out hover:bg-primary focus:bg-primary focus:outline-none",
        className
      )}
    >
      <span className="mb-4 text-center text-5xl md:text-6xl">
        {cuisine.icon}
      </span>
      <h3 className="text-center text-2xl font-bold tracking-tight text-foreground uppercase">
        {cuisine.name}
      </h3>
      {cuisine._count.restaurants > 0 && (
        <p className="text-center font-medium tracking-tight text-foreground/80">
          {cuisine._count.restaurants} spots
        </p>
      )}
    </Link>
  );
}
