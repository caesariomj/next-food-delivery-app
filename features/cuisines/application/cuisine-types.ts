import { Prisma } from "@/generated/prisma/client";

export type CreateCuisineResult =
  | {
      success: true;
      cuisine: {
        name: string;
      };
    }
  | {
      success: false;
      reason: "NAME_EXISTS" | "UNKNOWN_ERROR";
    };

export type DeleteCuisineResult =
  | {
      success: true;
      data: {
        affected: number;
      };
    }
  | {
      success: false;
      reason: "CUISINE_NONEXISTENT" | "UNKNOWN_ERROR";
    };

export type UpdateCuisineResult =
  | {
      success: true;
      cuisine: {
        name: string;
      };
    }
  | {
      success: false;
      reason: "NAME_EXISTS" | "UNKNOWN_ERROR";
    };

export const landingPageCuisineSelect = {
  publicId: true,
  name: true,
  slug: true,
  icon: true,
  _count: {
    select: {
      restaurants: true,
    },
  },
} satisfies Prisma.CuisineSelect;

export const landingPageHeroCuisineSelect = {
  publicId: true,
  name: true,
  slug: true,
  icon: true,
} satisfies Prisma.CuisineSelect;

export type LandingPageCuisine = Prisma.CuisineGetPayload<{
  select: typeof landingPageCuisineSelect;
}>;

export type LandingPageHeroCuisine = Prisma.CuisineGetPayload<{
  select: typeof landingPageHeroCuisineSelect;
}>;
