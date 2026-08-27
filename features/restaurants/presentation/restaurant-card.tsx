import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils/cn";

type CardCuisine = { cuisine: { name: string; icon: string | null } };

export type RestaurantCardBase = {
  publicId: string;
  name: string;
  slug: string;
  logoUrl: string | null;
  cuisines: CardCuisine[];
  // TODO: Add deals, rating, price fields here once implemented
};

type RestaurantCardProps<T extends RestaurantCardBase> = {
  restaurant: T;
  className?: string;
};

export default function RestaurantCard<T extends RestaurantCardBase>({
  restaurant,
  className,
}: RestaurantCardProps<T>) {
  return (
    <Link
      href={`/restaurants/${restaurant.slug}`}
      className={cn(
        "group flex h-full w-full flex-col divide-y-4 divide-foreground bg-background transition-colors duration-200 ease-in-out hover:bg-background-secondary focus:bg-background-secondary focus:outline-none",
        className
      )}
    >
      <div className="flex h-full max-h-60 min-h-60 w-full items-center justify-center overflow-hidden">
        {restaurant.logoUrl ? (
          <div className="h-full w-full bg-foreground">
            <Image
              src={restaurant.logoUrl}
              alt={`${restaurant.name} logo`}
              className="aspect-square h-full w-full scale-100 object-cover transition-transform duration-200 ease-in-out group-hover:scale-110 group-focus:scale-110"
              width={200}
              height={200}
              quality={25}
            />
          </div>
        ) : (
          <span className="scale-100 text-7xl transition-transform duration-200 ease-in-out group-hover:scale-110 group-focus:scale-110">
            {restaurant.cuisines[0]?.cuisine.icon}
          </span>
        )}
      </div>
      <div className="flex w-full flex-col items-start gap-y-2 p-4">
        <h3 className="text-2xl font-bold tracking-tight uppercase">
          {restaurant.name}
        </h3>
        <ul className="flex min-h-20 w-full flex-row flex-wrap items-center justify-start gap-1">
          <li>
            <Badge variant="secondary" className="px-4 py-2">
              Deals
            </Badge>
          </li>
        </ul>
        <div className="mt-2 mb-4 flex w-full items-center justify-between gap-2">
          <span className="text-base font-bold tracking-tight text-primary-900">
            ⭐ 4.5
          </span>
          <span className="text-base font-medium text-foreground/80">
            10-15 Min.
          </span>
        </div>
        <div className="mt-auto w-full border-4 border-foreground bg-primary p-2 text-center">
          <span className="font-semibold tracking-tight">Min. 8 $</span>
        </div>
      </div>
    </Link>
  );
}
