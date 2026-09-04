"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import type { LandingPageHeroCuisine } from "@/features/cuisines/application/cuisine-types";
import { CUISINES_HERO_CAROUSEL_LIMIT } from "@/features/cuisines/domain/cuisine-constant";
import { cn } from "@/lib/utils/cn";

type CuisineTabsProps = {
  cuisines: LandingPageHeroCuisine[];
  className?: string;
};

type CuisineTab = {
  slug: string;
  icon: string;
  name: string;
};

const ALL_TAB: CuisineTab = { slug: "all", icon: "🍽️", name: "All" };

export default function CuisineTabs({ cuisines, className }: CuisineTabsProps) {
  const [selectedCuisine, setSelectedCuisine] = useState<string>(ALL_TAB.slug);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  function setQueryParams(cuisine: string) {
    if (!cuisine) return;

    setSelectedCuisine(cuisine);

    const params = new URLSearchParams(searchParams.toString());

    if (cuisine !== ALL_TAB.slug) {
      params.set("cuisine", cuisine);
    } else {
      params.delete("cuisine");
    }

    const query = params.toString();

    router.push(`${pathname}?${query}`, {
      scroll: false,
    });
  }

  return (
    <Carousel className={cn("w-full bg-background/10", className)}>
      <CarouselContent>
        {[ALL_TAB, ...cuisines].map((tab) => (
          <CarouselItem className="h-28 basis-32 pl-1" key={tab.slug}>
            <button
              className={cn(
                "relative z-0 inline-flex h-full w-full cursor-pointer flex-col items-center justify-center gap-y-2 font-bold uppercase transition-colors duration-200 ease-in-out focus:outline-none",
                selectedCuisine === tab.slug
                  ? "bg-primary text-foreground"
                  : "bg-foreground text-background hover:bg-primary hover:text-foreground focus:bg-primary focus:text-foreground"
              )}
              onClick={() => setQueryParams(tab.slug)}
            >
              <span className="text-3xl">{tab.icon}</span>
              <p className="max-w-24 text-sm text-wrap">{tab.name}</p>
              <div
                className={cn(
                  "absolute bottom-0 z-1 h-1.5 w-full bg-secondary transition-transform",
                  selectedCuisine === tab.slug
                    ? "translate-y-0"
                    : "translate-y-full"
                )}
              />
            </button>
          </CarouselItem>
        ))}
        {cuisines.length === CUISINES_HERO_CAROUSEL_LIMIT && (
          <CarouselItem className="h-28 basis-32 pl-1">
            <Link
              href="/cuisines"
              className="inline-flex h-full w-full items-center justify-center bg-foreground text-center text-sm font-bold text-background uppercase transition-colors duration-200 ease-in-out hover:bg-primary hover:text-foreground focus:bg-primary focus:text-foreground focus:outline-none"
            >
              See All
            </Link>
          </CarouselItem>
        )}
      </CarouselContent>
    </Carousel>
  );
}
