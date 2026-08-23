import type { Feature } from "@/types/feature";

const features: readonly Feature[] = [
  {
    icon: "📍",
    title: "Set your location",
    description:
      "Enter your address or allow location access. We'll show you every restaurant that can deliver to you right now.",
  },
  {
    icon: "🛒",
    title: "Pick your food",
    description:
      "Browse menus, filter by cuisine, price, or rating. Add items to your cart from multiple stores — yes, really.",
  },
  {
    icon: "💳",
    title: "Pay securely",
    description:
      "Checkout with card, e-wallet, or cash on delivery. No hidden fees — what you see is what you pay.",
  },
  {
    icon: "🛵",
    title: "Track live",
    description:
      "Watch your order get prepared and follow your rider in real time. Hungry doesn't have to mean patient.",
  },
];

type HowItWorksSectionProps = {
  className?: string;
};

export default function HowItWorksSection({
  className,
}: HowItWorksSectionProps) {
  return (
    <section className={className}>
      <h2 className="max-w-full text-start font-display text-7xl leading-none font-black text-foreground sm:text-9xl lg:max-w-2xl">
        How
        <br />
        It Works
      </h2>
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] border-t-4 border-l-4 border-foreground">
        {features.map((feature, index) => (
          <li
            key={feature.title}
            className="flex h-full w-full flex-col items-start gap-y-2 border-r-4 border-b-4 border-foreground bg-background p-4 transition-colors duration-200 ease-in-out hover:bg-primary sm:p-8"
          >
            <span className="mb-4 font-display text-6xl tracking-tight text-primary-700/75 sm:mb-6 sm:text-8xl">{`0${index + 1}`}</span>
            <span className="mb-4 text-4xl sm:text-5xl">{feature.icon}</span>
            <h3 className="mb-2 text-xl font-bold tracking-tight uppercase sm:text-2xl">
              {feature.title}
            </h3>
            <p className="text-sm font-medium tracking-tight text-foreground/80 sm:text-base">
              {feature.description}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
