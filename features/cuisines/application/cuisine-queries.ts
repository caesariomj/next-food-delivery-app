import type { Cuisine } from "@/generated/prisma/client";

import {
  CUISINES_HERO_CAROUSEL_LIMIT,
  CUISINES_LANDING_SECTION_LIMIT,
} from "../domain/cuisine-constant";
import {
  findCuisineByName,
  findCuisines,
} from "../infrastructure/cuisine-repository";
import {
  LandingPageCuisine,
  landingPageCuisineSelect,
  LandingPageHeroCuisine,
  landingPageHeroCuisineSelect,
} from "./cuisine-types";

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

export async function getLandingPageCuisines(): Promise<LandingPageCuisine[]> {
  return await findCuisines({
    select: landingPageCuisineSelect,
    where: {
      isActive: true,
    },
    take: CUISINES_LANDING_SECTION_LIMIT,
  });
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
