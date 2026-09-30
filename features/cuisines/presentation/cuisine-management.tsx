"use client";

import { useState } from "react";

import { RiAddLine, RiFileExcelLine } from "@remixicon/react";

import StatsGrid, {
  type StatsItem,
} from "@/components/common/data-display/stats-grid";
import PageBreadcrumb from "@/components/common/navigation/page-breadcrumb";
import { Button } from "@/components/ui/button";

import type {
  CuisineStatsResult,
  DashboardPageCuisine,
} from "../application/cuisine-types";
import CuisineDataTable from "./cuisine-data-table";
import CuisineDeleteConfirmationDialog from "./cuisine-delete-confirmation-dialog";
import CuisineDetailDialog from "./cuisine-detail-dialog";
import CuisineFormSheet from "./cuisine-form-sheet";

type CuisineManagementProps = {
  cuisines: DashboardPageCuisine[];
  cuisineStats: CuisineStatsResult;
};

export default function CuisineManagement({
  cuisines,
  cuisineStats,
}: CuisineManagementProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isFormSheetOpen, setIsFormSheetOpen] = useState(false);
  const [selectedCuisines, setSelectedCuisines] = useState<
    DashboardPageCuisine[]
  >([]);

  const statsItems: StatsItem[] = [
    {
      label: "Total Cuisines",
      value: cuisineStats.total,
    },
    {
      label: "Active",
      value: cuisineStats.active,
    },
    {
      label: "Linked Restaurants",
      value: cuisineStats.linkedRestaurants,
    },
  ];

  function handleOpenCreateFormSheet() {
    setSelectedCuisines([]);
    setIsFormSheetOpen(true);
  }

  function handleOpenEditFormSheet(cuisine: DashboardPageCuisine) {
    setSelectedCuisines([cuisine]);
    setIsFormSheetOpen(true);
  }

  function handleOpenDeleteActionDialog(
    selectedCuisines: DashboardPageCuisine[]
  ) {
    setSelectedCuisines((prev) => {
      const newCuisines = selectedCuisines.filter(
        (cuisine) =>
          !prev.some((selected) => selected.publicId === cuisine.publicId)
      );

      return [...prev, ...newCuisines];
    });

    setIsDeleteDialogOpen(true);
  }

  function handleOpenViewDialog(cuisine: DashboardPageCuisine) {
    setSelectedCuisines([cuisine]);
    setIsDetailDialogOpen(true);
  }

  // TODO: Implement export XLSX feature here
  function handleExportXlsx() {}

  return (
    <>
      <section className="flex h-full min-h-[calc(100vh-4.5rem)] flex-col divide-y-4 divide-foreground">
        <div className="flex flex-col items-start justify-between gap-4 p-4 md:flex-row md:items-center md:p-8">
          <div className="space-y-4">
            <h1 className="font-display text-6xl font-bold tracking-wide md:text-7xl">
              Cuisines Management
            </h1>
            <PageBreadcrumb />
          </div>
          <div className="flex w-full flex-col items-center justify-start gap-4 lg:flex-row lg:justify-end">
            <Button
              variant="background"
              size="xl"
              className="w-full md:w-fit"
              onClick={handleExportXlsx}
            >
              <RiFileExcelLine />
              Export XLSX
            </Button>
            <Button
              variant="default"
              size="xl"
              className="w-full md:w-fit"
              onClick={handleOpenCreateFormSheet}
            >
              <RiAddLine />
              Add Cuisine
            </Button>
          </div>
        </div>
        <div className="h-full space-y-8 bg-background-secondary p-4 md:p-8">
          <StatsGrid items={statsItems} />
          <CuisineDataTable
            className="space-y-8"
            cuisines={cuisines}
            selectedCuisines={selectedCuisines}
            setSelectedCuisinesAction={setSelectedCuisines}
            totalCuisines={cuisineStats.total}
            onDeleteAction={handleOpenDeleteActionDialog}
            onEditAction={handleOpenEditFormSheet}
            onViewAction={handleOpenViewDialog}
          />
        </div>
      </section>
      <CuisineFormSheet
        key={selectedCuisines[0]?.publicId ?? "new-cuisine"}
        isOpen={isFormSheetOpen}
        setIsOpenAction={setIsFormSheetOpen}
        selectedCuisine={selectedCuisines[0] ?? null}
      />
      <CuisineDetailDialog
        isOpen={isDetailDialogOpen}
        setIsOpen={setIsDetailDialogOpen}
        selectedCuisine={selectedCuisines[0] ?? null}
      />
      <CuisineDeleteConfirmationDialog
        selectedCuisines={selectedCuisines}
        setSelectedCuisines={setSelectedCuisines}
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
      />
    </>
  );
}
