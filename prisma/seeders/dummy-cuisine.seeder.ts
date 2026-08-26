import type { PrismaClient } from "@/generated/prisma/client";
import { toSlug, toTitleCase } from "@/lib/utils/string";

import { cuisines } from "./data/cuisine.data";

export default async function seedDummyCuisine(prisma: PrismaClient) {
  for (const { name: rawName, icon, isActive } of cuisines) {
    const name = toTitleCase(rawName);
    const slug = toSlug(rawName);

    await prisma.cuisine.upsert({
      where: { slug },
      update: {},
      create: {
        name,
        slug,
        description: `Delicious ${name.toLowerCase()} dishes made fresh.`,
        icon,
        isActive,
      },
    });
  }

  console.log(
    `✅ [${new Date().toLocaleTimeString()}] Seeder Cuisines finished — ${cuisines.length} records created.`
  );
}
