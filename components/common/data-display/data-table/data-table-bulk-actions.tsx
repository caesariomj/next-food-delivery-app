import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

type DataTableBulkActionsProps = {
  selectedCount: number;
  children: ReactNode;
  className?: string;
};

export default function DataTableBulkActions({
  children,
  selectedCount,
  className,
}: DataTableBulkActionsProps) {
  return (
    <div
      className={cn(
        "relative flex w-full flex-col items-start justify-between gap-16 bg-foreground px-8 py-4 neo-shadow lg:flex-row lg:items-center lg:gap-8",
        className
      )}
    >
      <div className="mt-3.5 w-56 lg:mt-0">
        <span className="text-xl font-semibold tracking-tight text-primary uppercase">
          {selectedCount} Selected
        </span>
      </div>
      <div className="flex w-full flex-row items-center justify-between gap-2 lg:justify-end">
        {children}
      </div>
    </div>
  );
}
