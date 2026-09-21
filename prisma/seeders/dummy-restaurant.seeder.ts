import type { PrismaClient } from "@/generated/prisma/client";

import { restaurants } from "./data/restaurant.data";

export default async function seedDummyRestaurant(prisma: PrismaClient) {
  for (const data of restaurants) {
    await prisma.restaurant.upsert({
      where: { slug: data.slug },
      update: {},
      create: data,
    });
  }

  console.log(
    `✅ [${new Date().toLocaleTimeString()}] Seeder Restaurants finished — ${restaurants.length} records created.`
  );
}
