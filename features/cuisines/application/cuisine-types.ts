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

export type BulkActionCuisineResult =
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

export const landingPageHeroCuisineSelect = {
  publicId: true,
  name: true,
  slug: true,
  icon: true,
} satisfies Prisma.CuisineSelect;

export type LandingPageHeroCuisine = Prisma.CuisineGetPayload<{
  select: typeof landingPageHeroCuisineSelect;
}>;

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

export type LandingPageCuisine = Prisma.CuisineGetPayload<{
  select: typeof landingPageCuisineSelect;
}>;

export const dashboardPageCuisineSelect = {
  publicId: true,
  name: true,
  slug: true,
  icon: true,
  description: true,
  isActive: true,
  createdAt: true,
  _count: {
    select: {
      restaurants: true,
    },
  },
} satisfies Prisma.CuisineSelect;

export type DashboardPageCuisine = Prisma.CuisineGetPayload<{
  select: typeof dashboardPageCuisineSelect;
}>;

export type CuisineStatsResult = {
  total: number;
  active: number;
  linkedRestaurants: number;
};
