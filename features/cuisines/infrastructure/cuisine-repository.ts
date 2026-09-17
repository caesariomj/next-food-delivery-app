import type { Cuisine, Prisma } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";

import type { CuisineStatsResult } from "../application/cuisine-types";

export async function insertCuisine(
  args: Prisma.CuisineCreateArgs
): Promise<Cuisine> {
  return await prisma.cuisine.create(args);
}

export async function findCuisineByName(
  args: Prisma.CuisineFindUniqueArgs
): Promise<Cuisine | null> {
  return await prisma.cuisine.findUnique(args);
}

export async function findCuisines<T extends Prisma.CuisineFindManyArgs>(
  args?: Prisma.SelectSubset<T, Prisma.CuisineFindManyArgs>
) {
  return await prisma.cuisine.findMany(args);
}

export async function isCuisineNameTaken(
  name: string,
  excludePublicId?: string
): Promise<boolean> {
  return await prisma.cuisine
    .findFirst({
      where: {
        name,
        publicId: {
          not: excludePublicId,
        },
      },
      select: {
        publicId: true,
      },
    })
    .then((result) => Boolean(result));
}

export async function countCuisines(): Promise<CuisineStatsResult> {
  const [total, active, cuisinesWithRestaurantCount] = await Promise.all([
    prisma.cuisine.count(),
    prisma.cuisine.count({
      where: {
        isActive: true,
      },
    }),
    prisma.restaurantCuisine.count(),
  ]);

  return {
    total,
    active,
    linkedRestaurants: cuisinesWithRestaurantCount,
  };
}

export async function updateCuisine(
  args: Prisma.CuisineUpdateArgs
): Promise<Cuisine> {
  return await prisma.cuisine.update(args);
}

export async function updateCuisines(
  args: Prisma.CuisineUpdateManyArgs
): Promise<Prisma.BatchPayload> {
  return await prisma.cuisine.updateMany(args);
}

export async function deleteCuisineByPublicIds(
  args?: Prisma.CuisineDeleteManyArgs
): Promise<Prisma.BatchPayload> {
  return await prisma.cuisine.deleteMany(args);
}
