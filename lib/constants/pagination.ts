import type { SortOption, SortOptionValue } from "@/types/pagination";

export const PAGINATION_DEFAULT_CURRENT_PAGE = 1;
export const PAGINATION_DEFAULT_PER_PAGE = 10;
export const PAGINATION_PER_PAGE_OPTIONS = Array.from(
  { length: 10 },
  (_, index) => (index + 1) * 5
);
export const PAGINATION_DEFAULT_SORT: SortOptionValue = "created_at_desc";

export const SORT_OPTIONS = [
  { value: "created_at_desc", label: "Newest" },
  { value: "created_at_asc", label: "Oldest" },
  { value: "name_asc", label: "Name: A-Z" },
  { value: "name_desc", label: "Name: Z-A" },
] as const satisfies SortOption[];
