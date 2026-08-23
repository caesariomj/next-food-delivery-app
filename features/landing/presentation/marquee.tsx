const items = [
  "Real-Time Order Tracking",
  "No Hidden Fees Ever",
  "Free Delivery On First Order",
  "500+ Restaurants Available",
  "30-Minute Delivery Guarantee",
  "Now In 30+ Cities",
];

export default function Marquee() {
  return (
    <div className="relative flex overflow-x-hidden bg-foreground">
      <ul className="animate-marquee py-12 whitespace-nowrap">
        {items.map((item, index) => (
          <li
            className="inline-flex items-center gap-x-12 border-r-4 border-background px-12 text-2xl font-bold tracking-tight text-primary uppercase sm:px-24 sm:text-4xl"
            key={index}
          >
            <span className="block size-2 bg-secondary"></span>
            {item}
          </li>
        ))}
      </ul>
      <ul className="absolute top-0 animate-marquee2 py-12 whitespace-nowrap">
        {items.map((item, index) => (
          <li
            className="inline-flex items-center gap-x-12 border-r-4 border-background px-12 text-2xl font-bold tracking-tight text-primary uppercase sm:px-24 sm:text-4xl"
            key={index}
          >
            <span className="block size-2 bg-secondary"></span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
