import { cn } from "@/lib/utils/cn";

const features = [
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
    <section className={cn("space-y-8", className)}>
      <h2 className="mb-12 max-w-2xl font-display text-9xl leading-none font-black">
        How
        <br />
        It Works
      </h2>
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] divide-x-4 divide-foreground border-4 border-foreground">
        {features.map((feature, index) => (
          <li
            key={feature.title}
            className="flex h-full w-full flex-col items-start gap-y-2 bg-background p-8 transition-colors duration-200 ease-in-out hover:bg-primary"
          >
            <span className="mb-6 font-display text-8xl tracking-tight text-primary-700/75">{`0${index + 1}`}</span>
            <span className="mb-4 text-5xl">{feature.icon}</span>
            <h3 className="mb-2 text-2xl font-bold tracking-tight uppercase">
              {feature.title}
            </h3>
            <p className="tracking-tight">{feature.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
