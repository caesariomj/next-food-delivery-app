import type { PrismaClient } from "@/generated/prisma/client";
import { toSlug, toTitleCase } from "@/lib/utils/string";

import { restaurants } from "./data/restaurant.data";

export default async function seedDummyRestaurant(prisma: PrismaClient) {
  for (const rawRestaurant of restaurants) {
    const {
      name: rawName,
      description,
      logoUrl,
      coverImageUrl,
      phone,
      email,
      address,
      latitude,
      longitude,
      status,
      owners,
      cuisines: restaurantCuisines,
      operatingHours,
    } = rawRestaurant;

    const name = toTitleCase(rawName);
    const slug = toSlug(rawName);

    const restaurant = await prisma.restaurant.upsert({
      where: {
        slug,
      },
      update: {},
      create: {
        name,
        slug,
        description,
        logoUrl,
        coverImageUrl,
        phone,
        email,
        address,
        latitude,
        longitude,
        status,
      },
    });

    for (const { email: ownerEmail } of owners) {
      const user = await prisma.user.findUnique({
        where: {
          email: ownerEmail,
        },
      });

      if (!user) {
        throw new Error(
          `User with email "${ownerEmail}" not found. Seed your users table before running this seeder.`
        );
      }

      await prisma.userRestaurant.upsert({
        where: {
          userId_restaurantId: {
            userId: user.id,
            restaurantId: restaurant.id,
          },
        },
        update: {},
        create: {
          userId: user.id,
          restaurantId: restaurant.id,
        },
      });
    }

    for (const restaurantCuisineName of restaurantCuisines) {
      const cuisine = await prisma.cuisine.findUnique({
        where: {
          slug: toSlug(restaurantCuisineName),
        },
      });

      if (!cuisine) {
        throw new Error(
          `Cuisine "${restaurantCuisineName}" not found. Seed your cuisines table before running this seeder.`
        );
      }

      await prisma.restaurantCuisine.upsert({
        where: {
          restaurantId_cuisineId: {
            restaurantId: restaurant.id,
            cuisineId: cuisine.id,
          },
        },
        update: {},
        create: {
          restaurantId: restaurant.id,
          cuisineId: cuisine.id,
        },
      });
    }

    for (const { dayOfWeek, openTime, closeTime } of operatingHours) {
      await prisma.restaurantOperatingHour.upsert({
        where: {
          restaurantId_dayOfWeek: {
            restaurantId: restaurant.id,
            dayOfWeek,
          },
        },
        update: {},
        create: {
          restaurantId: restaurant.id,
          dayOfWeek,
          openTime,
          closeTime,
        },
      });
    }
  }

  console.log(
    `✅ [${new Date().toLocaleTimeString()}] Seeder Restaurants finished — ${restaurants.length} records created.`
  );
}
