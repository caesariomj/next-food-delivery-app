import type { SortOption } from "@/types/pagination";

export function isSortValue<T extends readonly SortOption[]>(
  options: T,
  value: string | null
): value is T[number]["value"] {
  return options.some((option) => option.value === value);
}
