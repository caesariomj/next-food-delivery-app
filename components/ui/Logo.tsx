import Link from "next/link";

const appName = process.env.NEXT_PUBLIC_APP_NAME ?? "My App";
const words = appName.trim().split(/\s+/);
type LogoProps = {
  variant?: "light" | "dark" | "primary" | "secondary";
  className?: string;
};

export default function Logo({ variant = "light", className }: LogoProps) {
  let baseClass =
    "inline-flex items-center gap-x-2 font-display tracking-wider text-2xl md:text-4xl focus:outline-none";
  let highlightClass = "leading-none inline-block pt-2 pb-1 px-2";

  switch (variant) {
    case "light":
      baseClass += " text-foreground";
      highlightClass += " bg-foreground text-background";
      break;

    case "dark":
      baseClass += " text-background";
      highlightClass += " bg-background text-foreground";
      break;

    case "primary":
      baseClass += " text-background";
      highlightClass += " bg-primary text-foreground";
      break;

    case "secondary":
      baseClass += " text-background";
      highlightClass += " bg-secondary text-foreground";
      break;

    default:
      baseClass += " text-background";
      highlightClass += " bg-background text-foreground";
      break;
  }

  return (
    <Link href="/" className={baseClass + " " + className}>
      {words.map((word, index) => (
        <span
          key={index}
          className={index === words.length - 1 ? highlightClass : "pt-1"}
        >
          {word}
        </span>
      ))}
    </Link>
  );
}
