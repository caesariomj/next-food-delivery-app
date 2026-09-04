import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import type { LandingPageHeroRestaurant } from "@/features/restaurants/infrastructure/restaurant-type";
import { cn } from "@/lib/utils/cn";

type RestaurantListProps = {
  restaurants: LandingPageHeroRestaurant[];
  className?: string;
};

// TODO: Implement rating, average delivery, and deals rendering here
export default function RestaurantList({
  restaurants,
  className,
}: RestaurantListProps) {
  return (
    <ul className={cn("space-y-4", className)}>
      {restaurants.map((restaurant) => (
        <li key={restaurant.publicId}>
          <Link
            href={`/restaurants/${restaurant.slug}`}
            className="relative flex flex-col items-start gap-4 border-4 border-background/5 bg-primary-950/25 p-4 transition-all duration-200 ease-in-out hover:-translate-y-1 hover:border-primary focus:-translate-y-1 focus:border-primary focus:outline-none sm:flex-row sm:items-center"
          >
            <div className="flex size-16 items-center justify-center bg-primary-950/50 sm:size-20">
              <span className="text-3xl sm:text-4xl">
                {restaurant.cuisines[0]?.cuisine.icon}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-lg font-semibold tracking-tight text-background sm:text-xl">
                {restaurant.name}
              </p>
              <div className="flex flex-wrap items-center gap-4">
                {restaurant.cuisines.length > 0 && (
                  <div className="min-w-full space-x-2 sm:min-w-auto">
                    <Badge className="border-3 border-primary-950/50 bg-transparent p-2 text-background/50">
                      {restaurant.cuisines[0].cuisine.name}
                    </Badge>
                    {restaurant.cuisines.length > 1 && (
                      <Badge className="border-3 border-primary-950/50 bg-transparent p-2 text-background/50">
                        + {restaurant.cuisines.length}
                      </Badge>
                    )}
                  </div>
                )}
                <span className="text-sm font-bold tracking-tight text-nowrap text-primary sm:text-base">
                  ⭐ 4.5
                </span>
                <span className="text-sm font-medium text-nowrap text-background/80 sm:text-base">
                  25-30 Min.
                </span>
              </div>
            </div>
            <Badge
              variant="secondary"
              className="absolute top-4 right-4 px-4 py-2"
            >
              Deals
            </Badge>
          </Link>
        </li>
      ))}
    </ul>
  );
}
