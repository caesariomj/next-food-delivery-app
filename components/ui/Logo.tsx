import Link from "next/link";

import { cn } from "@/lib/utils/cn";

type LogoVariant = "light" | "dark" | "primary" | "secondary";

type LogoProps = {
  variant?: LogoVariant;
  className?: string;
};

const appName = process.env.NEXT_PUBLIC_APP_NAME ?? "My App";
const words = appName.trim().split(/\s+/);

const variantClasses: Record<LogoVariant, { base: string; highlight: string }> =
  {
    light: {
      base: "text-foreground",
      highlight:
        "bg-foreground text-primary transition-colors duration-200 ease-in-out group-hover:text-background group-focus:text-background",
    },
    dark: {
      base: "text-background",
      highlight:
        "bg-background text-foreground transition-colors duration-200 ease-in-out group-hover:bg-primary group-focus:bg-primary",
    },
    primary: {
      base: "text-background",
      highlight:
        "bg-primary text-foreground transition-colors duration-200 ease-in-out group-hover:bg-background group-focus:bg-background",
    },
    secondary: {
      base: "text-background",
      highlight:
        "bg-secondary text-foreground transition-colors duration-200 ease-in-out group-hover:bg-background group-focus:bg-background",
    },
  };

export default function Logo({ variant = "light", className }: LogoProps) {
  const { base, highlight } = variantClasses[variant];

  const baseClass = cn(
    "group inline-flex items-center gap-x-2 font-display text-2xl tracking-wider focus:outline-none md:text-4xl",
    base
  );
  const highlightClass = cn(
    "leading-none inline-block pt-2 pb-1 px-2",
    highlight
  );

  return (
    <Link href="/" className={cn(baseClass, className)}>
      {words.map((word, index) => (
        <span
          key={index}
          className={cn(index === words.length - 1 ? highlightClass : "pt-1")}
        >
          {word}
        </span>
      ))}
    </Link>
  );
}
