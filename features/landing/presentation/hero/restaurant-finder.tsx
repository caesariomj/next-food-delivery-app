import { Suspense } from "react";

import LoadingDots from "@/components/ui/loading-dots";

import AddressInput from "./address-input";
import CuisineTabsLoader from "./cuisine-tabs-loader";
import RestaurantListLoader from "./restaurant-list-loader";
import type { RestaurantSearchParams } from "../../infrastructure/landing-type";

type RestaurantFinderProps = {
  params: RestaurantSearchParams;
};

export default async function RestaurantFinder({
  params,
}: RestaurantFinderProps) {
  return (
    <div className="w-full divide-y-4 divide-foreground lg:flex lg:w-1/2 lg:flex-col">
      <div className="bg-primary p-4 sm:p-8">
        <AddressInput />
      </div>
      <div className="bg-foreground lg:flex lg:flex-1 lg:flex-col">
        <Suspense
          fallback={
            <div className="flex h-28 w-full animate-pulse items-center justify-center bg-primary-950/25">
              <LoadingDots variant="background" />
            </div>
          }
        >
          <CuisineTabsLoader />
        </Suspense>
        <div className="w-full flex-1 border-t-4 border-t-background/10 bg-foreground p-4 sm:p-8">
          <Suspense
            fallback={
              <div className="flex h-28 w-full animate-pulse items-center justify-center bg-primary-950/25">
                <LoadingDots variant="background" />
              </div>
            }
          >
            <RestaurantListLoader params={params} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
