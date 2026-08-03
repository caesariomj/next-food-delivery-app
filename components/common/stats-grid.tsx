import { cn } from "@/lib/utils/cn";

export type StatsItem = {
  label: string;
  value: number | string;
};

type StatsGridProps = {
  items: StatsItem[];
  className?: string;
};

export default function StatsGrid({ items, className }: StatsGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] border-t-4 border-l-4 border-foreground",
        className
      )}
    >
      {items.map((item) => (
        <div
          key={item.label}
          className="w-full space-y-4 border-r-4 border-b-4 border-foreground bg-background p-8"
        >
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
