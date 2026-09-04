import { getLandingPageHeroRestaurants } from "@/features/restaurants/application/restaurant-queries";

import RestaurantList from "./restaurant-list";
import type { RestaurantSearchParams } from "../../infrastructure/landing-type";

type RestaurantListLoaderProps = {
  params: RestaurantSearchParams;
  className?: string;
};

export default async function RestaurantListLoader({
  params,
  className,
}: RestaurantListLoaderProps) {
  const { latitude, longitude, cuisine } = params;

  const restaurants = await getLandingPageHeroRestaurants(
    latitude,
    longitude,
    cuisine
  );

  if (restaurants.length === 0) {
    return (
      <div className="border-4 border-background/5 bg-primary-950/25 p-4">
        <p className="text-center text-base font-medium tracking-tight text-background">
          {(latitude && longitude) || cuisine
            ? "No restaurants matched your search. Try adjusting it."
            : "No restaurants found."}
        </p>
      </div>
    );
  }

  return <RestaurantList restaurants={restaurants} className={className} />;
}
