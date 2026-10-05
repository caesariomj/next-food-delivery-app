import type { Metadata } from "next";

import {
  getDashboardCuisines,
  getCuisineStats,
} from "@/features/cuisines/application/cuisine-queries";
import CuisineManagement from "@/features/cuisines/presentation/cuisine-management";
import {
  PAGINATION_DEFAULT_CURRENT_PAGE,
  PAGINATION_DEFAULT_PER_PAGE,
  PAGINATION_DEFAULT_SORT,
} from "@/lib/constants/pagination";
import { toNumber } from "@/lib/utils/number";
import type { PaginationSearchParams } from "@/types/pagination";

export const metadata: Metadata = {
  title: "Cuisines Management",
  description: "Cuisines management",
};

type CuisinesPageProps = {
  searchParams: Promise<PaginationSearchParams>;
};

export default async function CuisinesPage({
  searchParams,
}: CuisinesPageProps) {
  const { q, sort, page, perPage } = await searchParams;

  const [cuisines, cuisineStats] = await Promise.all([
    getDashboardCuisines(
      q,
      sort ?? PAGINATION_DEFAULT_SORT,
      page ? toNumber(page) : PAGINATION_DEFAULT_CURRENT_PAGE,
      perPage ? toNumber(perPage) : PAGINATION_DEFAULT_PER_PAGE
    ),
    getCuisineStats(),
  ]);

  return <CuisineManagement cuisines={cuisines} cuisineStats={cuisineStats} />;
}
