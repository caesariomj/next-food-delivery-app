import { cn } from "@/lib/utils/cn";

import RestaurantCard, { type RestaurantCardBase } from "./restaurant-card";

type RestaurantGridProps<T extends RestaurantCardBase> = {
  restaurants: T[];
  className?: string;
};

export default function RestaurantGrid<T extends RestaurantCardBase>({
  restaurants,
  className,
}: RestaurantGridProps<T>) {
  return (
    <ul
      className={cn(
        "grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] border-t-4 border-l-4 border-foreground",
        className
      )}
    >
      {restaurants.map((restaurant) => (
        <li
          key={restaurant.slug}
          className="border-r-4 border-b-4 border-foreground"
        >
          <RestaurantCard restaurant={restaurant} />
        </li>
      ))}
    </ul>
  );
}
