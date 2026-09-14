export type SortOption<T extends string = string> = {
  value: T;
  label: string;
};

export type SortOptionValue = SortOption["value"];

export type PaginationSearchParams = {
  q?: string;
  sort?: SortOptionValue;
  page?: string;
  perPage?: string;
};
