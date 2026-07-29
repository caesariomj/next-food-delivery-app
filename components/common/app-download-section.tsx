import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import type { Feature } from "@/types/feature";

type AppDownloadSectionProps = {
  className?: string;
};

type AppLink = {
  icon: string;
  text: string;
  name: string;
  url: string;
};

const features = [
  {
    icon: "📍",
    title: "Live Tracking",
    description: "Watch your rider on a live map from restaurant to your door.",
  },
  {
    icon: "🔔",
    title: "Smart Alerts",
    description:
      "Get notified when your food is ready, picked up, or nearly there.",
  },
  {
    icon: "⭐",
    title: "Save Favorites",
    description:
      "Reorder your go-to meals in seconds. No searching, just tapping.",
  },
  {
    icon: "🎁",
    title: "App Deals",
    description:
      "Exclusive discounts and early access to new restaurant launches.",
  },
] satisfies readonly Feature[];

const appLinks = [
  {
    icon: "🍎",
    text: "Download on the",
    name: "App Store",
    url: "https://apps.apple.com/",
  },
  {
    icon: "▶",
    text: "Get it on",
    name: "Google Play",
    url: "https://play.google.com/store/apps",
  },
] satisfies readonly AppLink[];

export default function AppDownloadSection({
  className,
}: AppDownloadSectionProps) {
  return (
    <section
      className={cn(
        "flex flex-col justify-between gap-16 bg-primary lg:flex-row lg:items-center",
        className
      )}
    >
      <div className="w-full space-y-8 lg:w-1/2">
        <h2 className="font-display text-8xl leading-none font-black tracking-tight md:text-9xl">
          GET THE APP.
          <br />
          EAT FASTER.
        </h2>
        <p className="w-full max-w-xl text-base font-medium tracking-tight text-foreground/80">
          Track orders live, reorder your favorites in one tap, and get
          exclusive app-only deals. Available on iOS and Android.
        </p>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-8">
          {appLinks.map((app) => (
            <Button key={app.name} variant="foreground" size="2xl" asChild>
              <Link
                href={app.url}
                target="_blank"
                className="flex max-w-full items-center md:max-w-72"
              >
                <span className="text-4xl">{app.icon}</span>
                <div className="flex flex-col items-start gap-y-1">
                  <span className="text-xs font-medium">{app.text}</span>
                  <strong className="text-xl">{app.name}</strong>
                </div>
              </Link>
            </Button>
          ))}
        </div>
      </div>
      <ul className="grid w-full grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8 lg:w-1/2">
        {features.map((feature) => (
          <li
            key={feature.title}
            className="flex h-60 w-full flex-col justify-center space-y-2 border-4 bg-background p-4 neo-shadow-lg"
          >
            <span className="text-4xl">{feature.icon}</span>
            <h3 className="mt-4 text-2xl font-bold tracking-tight uppercase">
              {feature.title}
            </h3>
            <p className="text-base font-medium tracking-tight text-foreground/80">
              {feature.description}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
