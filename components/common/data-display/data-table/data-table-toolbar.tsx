"use client";

import { RiArrowDownSLine, RiSearchLine } from "@remixicon/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils/cn";
import { isSortValue } from "@/lib/utils/pagination";
import type { SortOption, SortOptionValue } from "@/types/pagination";

type DataTableToolbarProps = {
  entityName: string;
  entityNamePlural: string;
  showedCount: number;
  totalCount: number;
  sortOptions: readonly SortOption[];
  sortBy: SortOptionValue;
  onSearchChangeAction: (value: string) => void;
  onSortChangeAction: (value: SortOptionValue) => void;
  className?: string;
};

export default function DataTableToolbar({
  entityName,
  entityNamePlural,
  showedCount,
  totalCount,
  sortOptions,
  sortBy,
  onSearchChangeAction,
  onSortChangeAction,
  className,
}: DataTableToolbarProps) {
  return (
    <div
      className={cn(
        "flex w-full flex-col divide-x-0 divide-y-4 divide-foreground border-4 border-foreground bg-background neo-shadow lg:flex-row lg:divide-x-4 lg:divide-y-0",
        className
      )}
    >
      <div className="flex w-full items-center divide-x-4 divide-foreground lg:w-1/2">
        <input
          type="text"
          name={`${entityName}-name`}
          id={`${entityName}-name`}
          placeholder={`Type a ${entityName} name...`}
          className="w-full p-4 focus:outline-none lg:pl-8"
          onChange={(e) => onSearchChangeAction(e.target.value)}
        />
        <button className="inline-flex cursor-pointer items-center gap-2 p-4 font-medium tracking-tight transition-colors duration-200 ease-in-out hover:bg-primary">
          <RiSearchLine className="size-6" />
          Search
        </button>
      </div>
      <div className="flex w-full flex-col items-center divide-x-0 divide-y-4 divide-foreground lg:w-1/2 lg:flex-row lg:divide-x-4 lg:divide-y-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex w-full cursor-pointer items-center justify-center gap-2 p-4 text-base font-semibold tracking-tight text-primary-800 transition-colors duration-200 ease-in-out hover:bg-primary focus:outline-none">
              Sort By:{" "}
              {sortOptions.find((option) => option.value === sortBy)?.label}
              <RiArrowDownSLine className="size-5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full" align="center">
            <DropdownMenuGroup>
              <DropdownMenuRadioGroup
                value={sortBy}
                onValueChange={(value) => {
                  if (isSortValue(sortOptions, value)) {
                    onSortChangeAction(value);
                  }
                }}
              >
                {sortOptions.map((option) => (
                  <DropdownMenuRadioItem
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="p-4 text-center">
          <span className="text-base font-semibold tracking-tight text-nowrap text-primary-800">
            Showing {Math.min(showedCount, totalCount)} of {totalCount}{" "}
            {entityNamePlural}
          </span>
        </div>
      </div>
    </div>
  );
}
