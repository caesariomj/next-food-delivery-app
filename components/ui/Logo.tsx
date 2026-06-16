import Link from "next/link";
import { cn } from "@/lib/utils/cn";

const appName = process.env.NEXT_PUBLIC_APP_NAME ?? "My App";
const words = appName.trim().split(/\s+/);
type LogoProps = {
  variant?: "light" | "dark" | "primary" | "secondary";
  className?: string;
};

export default function Logo({ variant = "light", className }: LogoProps) {
  let baseClass =
    "group inline-flex items-center gap-x-2 font-display text-2xl tracking-wider focus:outline-none md:text-4xl";
  let highlightClass = "leading-none inline-block pt-2 pb-1 px-2";

  switch (variant) {
    case "light":
      baseClass += " text-foreground";
      highlightClass +=
        " bg-foreground text-primary transition-colors duration-300 ease-in-out group-hover:text-background group-focus:text-background";
      break;

    case "dark":
      baseClass += " text-background";
      highlightClass +=
        " bg-background text-foreground transition-colors duration-300 ease-in-out group-hover:bg-primary group-focus:bg-primary";
      break;

    case "primary":
      baseClass += " text-background";
      highlightClass +=
        " bg-primary text-foreground transition-colors duration-300 ease-in-out group-hover:bg-background group-focus:bg-background";
      break;

    case "secondary":
      baseClass += " text-background";
      highlightClass +=
        " bg-secondary text-foreground transition-colors duration-300 ease-in-out group-hover:bg-background group-focus:bg-background";
      break;

    default:
      baseClass += " text-background";
      highlightClass +=
        " bg-background text-foreground transition-colors duration-300 ease-in-out group-hover:bg-primary group-focus:bg-primary";
      break;
  }

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
