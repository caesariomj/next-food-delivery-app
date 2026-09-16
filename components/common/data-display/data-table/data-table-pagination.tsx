"use client";

import type { ComponentProps } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils/cn";

type DataTablePaginationProps = ComponentProps<"nav"> & {
  currentPage: number;
  totalPages: number;
};

export default function DataTablePagination({
  currentPage,
  totalPages,
  className,
  ...props
}: DataTablePaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams.toString());

  let curr = currentPage;

  if (currentPage === 1) {
    curr += 1;
  } else if (currentPage === totalPages) {
    curr -= 1;
  }

  const floor = curr - 1;
  const ceiling = curr + 1;

  const paginationItems = [floor, curr, ceiling].filter(
    (page) => page >= 1 && page <= totalPages
  );

  function PaginationPreviousItem() {
    const onFirstPage = currentPage === 1;

    if (onFirstPage) {
      params.set("page", "1");
    } else {
      params.set("page", (currentPage - 1).toString());
    }

    return (
      <PaginationItem>
        <PaginationPrevious
          className={cn(
            "w-10 sm:w-auto",
            onFirstPage && "pointer-events-none opacity-50"
          )}
          href={`${pathname}?${params.toString()}`}
          scroll={false}
          aria-disabled={onFirstPage}
          text="Prev"
        />
      </PaginationItem>
    );
  }

  function PaginationNextItem() {
    const onLastPage = currentPage === totalPages;

    if (onLastPage) {
      params.set("page", totalPages.toString());
    } else {
      params.set("page", (currentPage + 1).toString());
    }

    return (
      <PaginationItem>
        <PaginationNext
          className={cn(
            "w-10 sm:w-auto",
            onLastPage && "pointer-events-none opacity-50"
          )}
          href={`${pathname}?${params.toString()}`}
          scroll={false}
          aria-disabled={onLastPage}
        />
      </PaginationItem>
    );
  }

  return (
    <Pagination
      {...props}
      className={cn("justify-center sm:justify-end", className)}
    >
      <PaginationContent>
        {PaginationPreviousItem()}
        {totalPages > 3 && Math.max(...paginationItems) === totalPages && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {paginationItems.map((item) => {
          params.set("page", item.toString());

          return (
            <PaginationItem key={item}>
              <PaginationLink
                href={`${pathname}?${params.toString()}`}
                scroll={false}
                isActive={currentPage === item}
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        {totalPages > 3 && Math.max(...paginationItems) < totalPages && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {PaginationNextItem()}
      </PaginationContent>
    </Pagination>
  );
}
