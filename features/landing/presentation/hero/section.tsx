import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

import Headline from "./headline";

type HeroSectionProps = {
  restaurantFinder: ReactNode;
  className?: string;
};

export default function HeroSection({
  restaurantFinder,
  className,
}: HeroSectionProps) {
  return (
    <section
      className={cn(
        "flex flex-col divide-x-0 divide-y-4 divide-foreground lg:flex-row lg:divide-x-4 lg:divide-y-0",
        className
      )}
    >
      <Headline />
      {restaurantFinder}
    </section>
  );
}
