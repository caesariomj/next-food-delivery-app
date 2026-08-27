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
    take: 10,
  });
}

export async function getLandingPageTopRatedRestaurants(): Promise<
  LandingPageTopRatedRestaurant[]
> {
  return await findRestaurants({
    select: landingPageTopRatedRestaurantsSelect,
    take: 8,
  });
}
