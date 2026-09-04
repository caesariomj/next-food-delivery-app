import { getLandingPageHeroCuisines } from "@/features/cuisines/application/cuisine-queries";

import CuisineTabs from "./cuisine-tabs";

type CuisineTabsLoaderProps = {
  className?: string;
};

export default async function CuisineTabsLoader({
  className,
}: CuisineTabsLoaderProps) {
  const cuisines = await getLandingPageHeroCuisines();

  if (cuisines.length === 0) return null;

  return <CuisineTabs cuisines={cuisines} className={className} />;
}
