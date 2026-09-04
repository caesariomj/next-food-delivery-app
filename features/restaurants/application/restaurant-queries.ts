import { Prisma } from "@/generated/prisma/client";

import {
  RESTAURANT_HERO_LIMIT,
  RESTAURANT_LANDING_TOP_RATED_SECTION_LIMIT,
} from "../domain/restaurant-constant";
import { findRestaurants } from "../infrastructure/restaurant-repository";
import {
  type LandingPageHeroRestaurant,
  type LandingPageTopRatedRestaurant,
  landingPageHeroRestaurantSelect,
  landingPageTopRatedRestaurantsSelect,
} from "../infrastructure/restaurant-type";

export async function getLandingPageHeroRestaurants(
  latitude?: string,
  longitude?: string,
  cuisineSlug?: string
): Promise<LandingPageHeroRestaurant[]> {
  const orConditions: Prisma.RestaurantWhereInput[] = [];

  if (latitude && longitude) {
    orConditions.push({
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    });
  }

  if (cuisineSlug) {
    orConditions.push({
      cuisines: {
        some: {
          cuisine: {
            slug: cuisineSlug,
          },
        },
      },
    });
  }

  return await findRestaurants({
    select: landingPageHeroRestaurantSelect,
    where: orConditions.length > 0 ? { OR: orConditions } : undefined,
    take: RESTAURANT_HERO_LIMIT,
  });
}

export async function getLandingPageTopRatedRestaurants(): Promise<
  LandingPageTopRatedRestaurant[]
> {
  return await findRestaurants({
    select: landingPageTopRatedRestaurantsSelect,
    take: RESTAURANT_LANDING_TOP_RATED_SECTION_LIMIT,
  });
}
