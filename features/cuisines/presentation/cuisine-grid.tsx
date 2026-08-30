import { cn } from "@/lib/utils/cn";

import type { LandingPageCuisine } from "../application/cuisine-types";

import CuisineCard from "./cuisine-card";

type CuisineGridProps = {
  cuisines: LandingPageCuisine[];
  className?: string;
};

export default function CuisineGrid({ cuisines, className }: CuisineGridProps) {
  return (
    <ul
      className={cn(
        "grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] border-t-4 border-l-4 border-foreground",
        className
      )}
    >
      {cuisines.map((cuisine) => (
        <li
          key={cuisine.slug}
          className="min-w-0 border-r-4 border-b-4 border-foreground"
        >
          <CuisineCard cuisine={cuisine} />
        </li>
      ))}
    </ul>
  );
}
