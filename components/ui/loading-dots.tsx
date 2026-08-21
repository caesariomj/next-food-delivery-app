import { cn } from "@/lib/utils/cn";

type LoadingDotsProps = {
  className?: string;
  variant?: "background" | "foreground";
};

const variantClasses = {
  background: "bg-background",
  foreground: "bg-foreground",
};

export default function LoadingDots({
  className,
  variant = "foreground",
}: LoadingDotsProps) {
  const color = variantClasses[variant];

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-x-4 dark:invert",
        className
      )}
    >
      <span className="sr-only">Loading...</span>
      <div
        className={cn(
          "size-3 animate-bounce [animation-delay:-0.3s] sm:size-4",
          color
        )}
      />
      <div
        className={cn(
          "size-3 animate-bounce [animation-delay:-0.15s] sm:size-4",
          color
        )}
      />
      <div className={cn("size-3 animate-bounce sm:size-4", color)} />
    </div>
  );
}
