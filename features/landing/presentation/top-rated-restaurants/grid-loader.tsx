import { getLandingPageTopRatedRestaurants } from "@/features/restaurants/application/restaurant-queries";
import RestaurantGrid from "@/features/restaurants/presentation/restaurant-grid";

type TopRatedRestaurantsGridLoaderProps = {
  className?: string;
};

export default async function TopRatedRestaurantsGridLoader({
  className,
}: TopRatedRestaurantsGridLoaderProps) {
  const restaurants = await getLandingPageTopRatedRestaurants();

  return restaurants.length > 0 ? (
    <RestaurantGrid restaurants={restaurants} className={className} />
  ) : (
    <div className="flex h-108 flex-col items-center justify-center border-4 border-foreground bg-background p-8 text-center">
      <h3 className="text-2xl font-black text-foreground uppercase sm:text-4xl">
        Kitchen&apos;s Closed 🍽️
      </h3>
      <p className="mt-2 text-sm text-foreground sm:text-base">
        Nothing plated up here yet. Check back soon.
      </p>
    </div>
  );
}
