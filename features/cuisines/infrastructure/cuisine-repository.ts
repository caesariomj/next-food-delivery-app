import type { Prisma, Cuisine } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";

export async function deleteCuisineByPublicIds(
  args?: Prisma.CuisineDeleteManyArgs
): Promise<Prisma.BatchPayload> {
  return await prisma.cuisine.deleteMany(args);
}

export async function findCuisines<T extends Prisma.CuisineFindManyArgs>(
  args?: Prisma.SelectSubset<T, Prisma.CuisineFindManyArgs>
) {
  return await prisma.cuisine.findMany(args);
}

export async function findCuisineByName(
  args: Prisma.CuisineFindUniqueArgs
): Promise<Cuisine | null> {
  return await prisma.cuisine.findUnique(args);
}

export async function insertCuisine(
  name: string,
  slug: string,
  isActive: boolean,
  description?: string,
  icon?: string
): Promise<Cuisine> {
  return await prisma.cuisine.create({
    data: { name, slug, description, icon, isActive },
  });
}

export async function updateCuisine(
  publicId: string,
  name: string,
  slug: string,
  isActive: boolean,
  description?: string,
  icon?: string
): Promise<Cuisine> {
  return await prisma.cuisine.update({
    where: { publicId },
    data: { name, slug, description, icon, isActive },
  });
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
