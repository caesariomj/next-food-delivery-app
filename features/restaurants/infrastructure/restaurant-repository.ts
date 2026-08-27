import type { Prisma } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";

export async function findRestaurants<T extends Prisma.RestaurantFindManyArgs>(
  args?: Prisma.SelectSubset<T, Prisma.RestaurantFindManyArgs>
): Promise<Prisma.RestaurantGetPayload<T>[]> {
  return await prisma.restaurant.findMany(args);
}
