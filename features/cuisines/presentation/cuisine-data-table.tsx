"use client";

import type { Dispatch, SetStateAction } from "react";

import { RiInformation2Line } from "@remixicon/react";

import DataTable from "@/components/common/data-display/data-table/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { TableCell, TableHead, TableRow } from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BASE_SORT_OPTIONS } from "@/lib/constants/pagination";
import { cn } from "@/lib/utils/cn";
import { formatFullDateTime, formatShortDate } from "@/lib/utils/date";

import type { DashboardPageCuisine } from "../application/cuisine-types";
import CuisineStatusActionButton from "./cuisine-status-action-button";

type CuisineDataTableProps = {
  className?: string;
  cuisines: DashboardPageCuisine[];
  selectedCuisines: DashboardPageCuisine[];
  setSelectedCuisinesAction: Dispatch<SetStateAction<DashboardPageCuisine[]>>;
  totalCuisines: number;
  onDeleteAction: (cuisineItems: DashboardPageCuisine[]) => void;
  onEditAction: (cuisine: DashboardPageCuisine) => void;
  onViewAction: (cuisine: DashboardPageCuisine) => void;
};

const SORT_OPTIONS = [
  ...BASE_SORT_OPTIONS,
  { value: "restaurants_count_desc", label: "Most Linked Restaurants" },
  { value: "restaurants_count_asc", label: "Least Linked Restaurants" },
] as const;

export default function CuisineDataTable({
  className,
  cuisines,
  selectedCuisines,
  setSelectedCuisinesAction,
  totalCuisines,
  onDeleteAction,
  onEditAction,
  onViewAction,
}: CuisineDataTableProps) {
  function handleSelectAllCuisines() {
    if (selectedCuisines.length === cuisines.length) {
      setSelectedCuisinesAction([]);
    } else {
      setSelectedCuisinesAction(cuisines);
    }
  }

  function handleSelectCuisine(cuisine: DashboardPageCuisine) {
    setSelectedCuisinesAction((prev) => {
      const exists = prev.some(
        (selected) => selected.publicId === cuisine.publicId
      );

      return exists
        ? prev.filter((selected) => selected.publicId !== cuisine.publicId)
        : [...prev, cuisine];
    });
  }

  return (
    <DataTable
      entityName="cuisine"
      entityNamePlural="cuisines"
      isEmpty={cuisines.length === 0}
      totalCount={totalCuisines}
      showedCount={cuisines.length}
      selectedCount={selectedCuisines.length}
      columnCount={8}
      sortOptions={SORT_OPTIONS}
      bulkActions={
        <>
          <CuisineStatusActionButton
            publicIds={selectedCuisines.map((cuisine) => cuisine.publicId)}
            status="active"
            onSuccessAction={() => setSelectedCuisinesAction([])}
          >
            Set Active
          </CuisineStatusActionButton>
          <CuisineStatusActionButton
            publicIds={selectedCuisines.map((cuisine) => cuisine.publicId)}
            status="inactive"
            onSuccessAction={() => setSelectedCuisinesAction([])}
          >
            Set Inactive
          </CuisineStatusActionButton>
          <Button
            variant="destructive"
            size="lg"
            className="absolute top-4 right-8 px-6 lg:static lg:px-8"
            onClick={() => onDeleteAction(selectedCuisines)}
          >
            Delete Selected
          </Button>
        </>
      }
      header={
        <>
          <TableHead className="min-w-12">
            <Checkbox
              checked={
                selectedCuisines.length === cuisines.length &&
                cuisines.length > 0
              }
              onCheckedChange={() => handleSelectAllCuisines()}
              disabled={cuisines.length === 0}
            />
          </TableHead>
          <TableHead className="min-w-12">Icon</TableHead>
          <TableHead className="min-w-72">Name</TableHead>
          <TableHead className="min-w-52 text-center">Slug</TableHead>
          <TableHead className="min-w-64 text-center">
            Total Linked Restaurants
          </TableHead>
          <TableHead className="min-w-40 text-center">Status</TableHead>
          <TableHead className="min-w-40">Created</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </>
      }
      className={className}
    >
      {cuisines.map((cuisine) => (
        <TableRow key={cuisine.publicId}>
          <TableCell>
            <Checkbox
              checked={selectedCuisines.some(
                (selected) => selected.publicId === cuisine.publicId
              )}
              onCheckedChange={() => handleSelectCuisine(cuisine)}
            />
          </TableCell>
          <TableCell className="text-3xl">{cuisine.icon}</TableCell>
          <TableCell
            className={cn(
              "text-base font-semibold tracking-tight",
              cuisine.description && "flex flex-col items-start gap-y-1"
            )}
          >
            <p>{cuisine.name}</p>
            {cuisine.description && (
              <span className="max-w-72 truncate text-sm text-foreground/80">
                {cuisine.description}
              </span>
            )}
          </TableCell>
          <TableCell className="text-center">
            <Badge variant="outline-primary" className="px-4 py-2 normal-case">
              {cuisine.slug}
            </Badge>
          </TableCell>
          <TableCell className="text-center text-base">
            {cuisine._count.restaurants}
          </TableCell>
          <TableCell className="text-center">
            <Badge
              variant={cuisine.isActive ? "outline-success" : "outline"}
              className="px-4 py-2"
            >
              {cuisine.isActive ? "Active" : "Inactive"}
            </Badge>
          </TableCell>
          <TableCell>
            {formatShortDate(cuisine.createdAt)}
            <Tooltip>
              <TooltipTrigger className="ms-4 cursor-pointer" asChild>
                <button>
                  <RiInformation2Line className="size-6" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{formatFullDateTime(cuisine.createdAt)}</p>
              </TooltipContent>
            </Tooltip>
          </TableCell>
          <TableCell className="space-x-2 text-right">
            <Button variant="outline" onClick={() => onViewAction(cuisine)}>
              View
            </Button>
            <Button
              variant="outline-primary"
              onClick={() => onEditAction(cuisine)}
            >
              Edit
            </Button>
            <Button
              variant="outline-destructive"
              onClick={() => onDeleteAction([cuisine])}
            >
              Delete
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </DataTable>
  );
}
