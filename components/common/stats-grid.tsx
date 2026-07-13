import { cn } from "@/lib/utils/cn";

export type StatsItem = {
  label: string;
  value: number | string;
};

type StatsGridProps = {
  items: StatsItem[];
  className?: string;
};

const desktopCols = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
} as const;

export default function StatsGrid({ items, className }: StatsGridProps) {
  const desktopGridCols =
    desktopCols[Math.min(items.length, 4) as keyof typeof desktopCols];

  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-1 border-4 border-foreground bg-foreground",
        desktopGridCols,
        className
      )}
    >
      {items.map((item) => (
        <div key={item.label} className="space-y-4 bg-background p-8">
          <p className="text-xl font-bold tracking-tight text-foreground uppercase">
            {item.label}
          </p>
          <span className="font-display text-6xl tracking-tighter text-foreground">
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
}
