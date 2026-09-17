import type { Cuisine, Prisma } from "@/generated/prisma/client";
import {
  PAGINATION_DEFAULT_CURRENT_PAGE,
  PAGINATION_DEFAULT_PER_PAGE,
  PAGINATION_DEFAULT_SORT,
} from "@/lib/constants/pagination";
import type { SortOptionValue } from "@/types/pagination";

import {
  CUISINES_HERO_CAROUSEL_LIMIT,
  CUISINES_LANDING_SECTION_LIMIT,
} from "../domain/cuisine-constant";
import {
  countCuisines,
  findCuisineByName,
  findCuisines,
} from "../infrastructure/cuisine-repository";
import {
  type CuisineStatsResult,
  type DashboardPageCuisine,
  dashboardPageCuisineSelect,
  type LandingPageCuisine,
  landingPageCuisineSelect,
  type LandingPageHeroCuisine,
  landingPageHeroCuisineSelect,
} from "./cuisine-types";

const SORT_MAP: Record<
  SortOptionValue,
  Prisma.CuisineOrderByWithRelationInput
> = {
  created_at_asc: { createdAt: "asc" },
  created_at_desc: { createdAt: "desc" },
  name_asc: { name: "asc" },
  name_desc: { name: "desc" },
  restaurants_count_asc: { restaurants: { _count: "asc" } },
  restaurants_count_desc: { restaurants: { _count: "desc" } },
};

export async function getCuisines(): Promise<Cuisine[]> {
  return await findCuisines();
}

export async function getCuisineByName(name: string): Promise<Cuisine | null> {
  return await findCuisineByName({
    where: {
      name,
    },
  });
}

export async function getCuisineStats(): Promise<CuisineStatsResult> {
  return await countCuisines();
}

export async function getLandingPageHeroCuisines(): Promise<
  LandingPageHeroCuisine[]
> {
  return await findCuisines({
    select: landingPageHeroCuisineSelect,
    where: {
      isActive: true,
    },
    take: CUISINES_HERO_CAROUSEL_LIMIT,
  });
}

export async function getLandingPageCuisines(): Promise<LandingPageCuisine[]> {
  return await findCuisines({
    select: landingPageCuisineSelect,
    where: {
      isActive: true,
    },
    take: CUISINES_LANDING_SECTION_LIMIT,
  });
}

export async function getDashboardCuisines(
  q: string = "",
  sortBy: SortOptionValue = PAGINATION_DEFAULT_SORT,
  page: number = PAGINATION_DEFAULT_CURRENT_PAGE,
  perPage: number = PAGINATION_DEFAULT_PER_PAGE
): Promise<DashboardPageCuisine[]> {
  const whereCondition: Prisma.CuisineWhereInput | undefined = q
    ? {
        name: {
          contains: q,
          mode: "insensitive",
        },
      }
    : undefined;

  const orderBy = SORT_MAP[sortBy] ?? SORT_MAP.created_at_desc;

  return await findCuisines({
    select: dashboardPageCuisineSelect,
    where: whereCondition,
    skip: page > 1 ? perPage * (page - 1) : 0,
    take: perPage,
    orderBy,
  });
}
