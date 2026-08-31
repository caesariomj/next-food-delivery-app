import { getLandingPageCuisines } from "@/features/cuisines/application/cuisine-queries";
import CuisineGrid from "@/features/cuisines/presentation/cuisine-grid";

type CuisineGridLoaderProps = {
  className?: string;
};

export default async function CuisineGridLoader({
  className,
}: CuisineGridLoaderProps) {
  const cuisines = await getLandingPageCuisines();

  return cuisines.length > 0 ? (
    <CuisineGrid cuisines={cuisines} className={className} />
  ) : (
    <div className="flex h-108 flex-col items-center justify-center border-4 border-foreground bg-background p-8 text-center">
      <h3 className="text-2xl font-black text-foreground uppercase sm:text-4xl">
        Plate&apos;s Empty 🍽️
      </h3>
      <p className="mt-2 text-sm text-foreground sm:text-base">
        We checked twice. Still empty.
      </p>
    </div>
  );
}
