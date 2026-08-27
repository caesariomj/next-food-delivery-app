import { Prisma } from "@/generated/prisma/client";

export const landingPageHeroRestaurantSelect = {
  publicId: true,
  name: true,
  slug: true,
  cuisines: {
    select: {
      cuisine: {
        select: { name: true, icon: true },
      },
    },
  },
  // TODO: Implement rating, average delivery time and promo/deals join logic here
} satisfies Prisma.RestaurantSelect;

export const landingPageTopRatedRestaurantsSelect = {
  publicId: true,
  name: true,
  slug: true,
  logoUrl: true,
  cuisines: {
    select: {
      cuisine: {
        select: { name: true, icon: true },
      },
    },
  },
  // TODO: Implement rating, average delivery time, promo/deals, and minimum price join logic here
} satisfies Prisma.RestaurantSelect;

export type LandingPageHeroRestaurant = Prisma.RestaurantGetPayload<{
  select: typeof landingPageHeroRestaurantSelect;
}>;

export type LandingPageTopRatedRestaurant = Prisma.RestaurantGetPayload<{
  select: typeof landingPageTopRatedRestaurantsSelect;
}>;
