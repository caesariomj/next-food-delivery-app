import type { SortOptionValue } from "@/types/pagination";

import { SORT_OPTIONS } from "../constants/pagination";

export function isSortValue(value: string | null): value is SortOptionValue {
  return SORT_OPTIONS.some((option) => option.value === value);
}
