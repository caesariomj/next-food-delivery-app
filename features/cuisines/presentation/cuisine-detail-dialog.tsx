"use client";

import type { Dispatch, SetStateAction } from "react";

import DetailDialog from "@/components/common/dialogs/detail";
import { Badge } from "@/components/ui/badge";

import type { DashboardPageCuisine } from "../application/cuisine-types";

type CuisineDetailDialogProps = {
  selectedCuisine: DashboardPageCuisine | null;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export default function CuisineDetailDialog({
  selectedCuisine,
  isOpen,
  setIsOpen,
}: CuisineDetailDialogProps) {
  return (
    <DetailDialog
      title={selectedCuisine?.name ?? ""}
      description={`${selectedCuisine?.name} Cuisine • ${selectedCuisine?.isActive ? "Active" : "Inactive"}`}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] border-t-4 border-l-4 border-foreground">
        <div className="flex w-full flex-col items-start gap-2 border-r-4 border-b-4 border-foreground bg-background p-4">
          <p className="text-sm font-semibold tracking-tight text-foreground/80 uppercase">
            Icon
          </p>
          <span className="text-3xl">{selectedCuisine?.icon}</span>
        </div>
        <div className="flex w-full flex-col items-start gap-2 border-r-4 border-b-4 border-foreground bg-background p-4">
          <p className="text-sm font-semibold tracking-tight text-foreground/80 uppercase">
            Name
          </p>
          <span className="text-lg font-semibold tracking-tight text-foreground">
            {selectedCuisine?.name}
          </span>
        </div>
        <div className="flex w-full flex-col items-start gap-2 border-r-4 border-b-4 border-foreground bg-background p-4">
          <p className="text-sm font-semibold tracking-tight text-foreground/80 uppercase">
            Slug
          </p>
          <span className="text-lg font-semibold tracking-tight text-foreground">
            {selectedCuisine?.slug}
          </span>
        </div>
        <div className="flex w-full flex-col items-start gap-2 border-r-4 border-b-4 border-foreground bg-background p-4">
          <p className="text-sm font-semibold tracking-tight text-foreground/80 uppercase">
            Status
          </p>
          <Badge
            variant={selectedCuisine?.isActive ? "outline-success" : "outline"}
            className="px-4 py-1.5"
          >
            {selectedCuisine?.isActive ? "Active" : "Inactive"}
          </Badge>
        </div>
        <div className="col-span-full flex w-full flex-col items-start gap-2 border-r-4 border-b-4 border-foreground bg-background p-4">
          <span className="text-sm font-semibold tracking-tight text-foreground/80 uppercase">
            Description
          </span>
          <p className="text-lg font-medium tracking-tighter text-foreground">
            {selectedCuisine?.description}
          </p>
        </div>
      </div>
    </DetailDialog>
  );
}
