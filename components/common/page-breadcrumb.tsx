"use client";

import { Fragment } from "react";
import { usePathname } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function PageBreadcrumb() {
  const pathname = usePathname();
  const breadcrumbItems = pathname.split("/").filter(Boolean);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbItems.map((item, index) => {
          const label = item.replaceAll("-", " ");
          const href = "/" + breadcrumbItems.slice(0, index + 1).join("/");
          const isLast = index === breadcrumbItems.length - 1;

          return (
            <Fragment key={item}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={href} className="underline">
                    {label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
