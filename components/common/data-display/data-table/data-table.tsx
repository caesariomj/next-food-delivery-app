"use client";

import type { ReactNode } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  PAGINATION_DEFAULT_CURRENT_PAGE,
  PAGINATION_DEFAULT_PER_PAGE,
  PAGINATION_DEFAULT_SORT,
} from "@/lib/constants/pagination";
import { cn } from "@/lib/utils/cn";
import { toNumber } from "@/lib/utils/number";
import { isSortValue } from "@/lib/utils/pagination";
import type { SortOption, SortOptionValue } from "@/types/pagination";

import DataTableBulkActions from "./data-table-bulk-actions";
import DataTablePagination from "./data-table-pagination";
import DataTablePerPageSelect from "./data-table-per-page-select";
import DataTableToolbar from "./data-table-toolbar";

type DataTableProps = {
  entityName: string;
  entityNamePlural: string;
  isEmpty: boolean;
  totalCount: number;
  showedCount: number;
  selectedCount: number;
  columnCount: number;
  sortOptions: readonly SortOption[];
  bulkActions: ReactNode;
  header: ReactNode;
  children: ReactNode;
  className?: string;
};

export default function DataTable({
  entityName,
  entityNamePlural,
  isEmpty,
  totalCount,
  showedCount,
  selectedCount,
  columnCount,
  sortOptions,
  bulkActions,
  header,
  children,
  className,
}: DataTableProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const sortByParam = searchParams.get("sort");
  const sortBy = isSortValue(sortOptions, sortByParam)
    ? sortByParam
    : PAGINATION_DEFAULT_SORT;
  const currentPage =
    toNumber(searchParams.get("page")) ?? PAGINATION_DEFAULT_CURRENT_PAGE;
  const perPage =
    searchParams.get("perPage") ?? PAGINATION_DEFAULT_PER_PAGE.toString();
  const totalPages = Math.ceil(totalCount / Number(perPage));

  function setQueryParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());

    params.set(key, value);

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function handleSearchChange(value: string) {
    setQueryParam("search", value);
  }

  function handleSortChange(value: SortOptionValue) {
    setQueryParam("sort", value);
  }

  function handlePerPageChange(value: string) {
    setQueryParam("perPage", value);
  }

  return (
    <div className={cn(className)}>
      <DataTableToolbar
        entityName={entityName}
        entityNamePlural={entityNamePlural}
        showedCount={showedCount}
        totalCount={totalCount}
        sortOptions={sortOptions}
        sortBy={sortBy}
        onSearchChangeAction={handleSearchChange}
        onSortChangeAction={handleSortChange}
      />
      {selectedCount > 0 && (
        <DataTableBulkActions selectedCount={selectedCount}>
          {bulkActions}
        </DataTableBulkActions>
      )}
      <div className="max-w-full border-4 border-foreground bg-background neo-shadow sm:max-w-[calc(100vw-23rem)]">
        <Table>
          <TableHeader>
            <TableRow>{header}</TableRow>
          </TableHeader>
          <TableBody>
            {isEmpty ? (
              <TableRow>
                <TableCell colSpan={columnCount} className="h-24 text-center">
                  No {entityNamePlural} found.
                </TableCell>
              </TableRow>
            ) : (
              children
            )}
          </TableBody>
        </Table>
        <div className="flex w-full flex-col items-center justify-between gap-4 border-t-4 border-foreground p-4 sm:flex-row">
          <DataTablePerPageSelect
            perPage={perPage}
            onPerPageChangeAction={handlePerPageChange}
          />
          <DataTablePagination
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </div>
      </div>
    </div>
  );
}
