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

export async function getLandingPageHeroRestaurants(): Promise<
  LandingPageHeroRestaurant[]
> {
  return await findRestaurants({
    select: landingPageHeroRestaurantSelect,
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
