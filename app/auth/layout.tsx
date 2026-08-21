"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiArrowLeftLongLine } from "@remixicon/react";

import Logo from "@/components/ui/logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return pathname === "/auth/error" ? (
    <main>{children}</main>
  ) : (
    <main className="flex min-h-screen flex-col lg:flex-row-reverse">
      <section className="flex min-h-screen w-full flex-col justify-center bg-background px-4 py-8 sm:p-16 lg:w-3/5">
        <div className="mb-8 flex flex-col items-start gap-4 lg:mb-0 lg:hidden">
          <Link
            href="/"
            className="inline-flex gap-x-4 font-semibold tracking-tight text-nowrap text-secondary-700 uppercase transition-colors duration-200 ease-in-out hover:text-foreground focus:text-foreground focus:outline-none"
          >
            <RiArrowLeftLongLine size={24} />
            Back to Home
          </Link>
          <Logo variant="light" />
        </div>
        {children}
      </section>
      <section className="static h-full w-full bg-foreground px-4 py-8 sm:p-16 lg:fixed lg:inset-s-0 lg:w-2/5">
        <div className="mb-8 hidden gap-4 lg:flex lg:items-center lg:justify-between">
          <Logo variant="primary" />
          <Link
            href="/"
            className="inline-flex gap-x-4 font-semibold tracking-tight text-nowrap text-secondary uppercase transition-colors duration-200 ease-in-out hover:text-white focus:text-white focus:outline-none"
          >
            <RiArrowLeftLongLine size={24} />
            Back to Home
          </Link>
        </div>
        <h2 className="mb-4 font-display text-7xl leading-none tracking-tight text-background sm:text-8xl">
          Your City. Your <span className="text-primary">Food.</span>{" "}
          <span className="text-secondary">Your Way.</span>
        </h2>
        <p className="mb-8 text-base font-medium tracking-tight text-primary-600 sm:mb-16 sm:text-lg">
          Join thousands of food lovers getting the best local restaurants
          delivered fast — no hassle, no hidden fees.
        </p>
        <ul className="mb-6 sm:mb-12">
          <li className="flex items-center gap-x-4 border-x-3 border-t-3 border-primary-950 p-4">
            <span
              aria-hidden="true"
              className="bg-primary-950 p-2 text-xl sm:text-2xl"
            >
              🚀
            </span>
            <div className="flex flex-col">
              <h3 className="text-base font-semibold tracking-tight text-background uppercase sm:text-lg">
                Free Delivery on First Order
              </h3>
              <p className="text-sm tracking-tight text-primary-600 sm:text-base">
                No promo code needed, automatically applied
              </p>
            </div>
          </li>
          <li className="flex items-center gap-x-4 border-3 border-primary-950 p-4">
            <span
              aria-hidden="true"
              className="bg-primary-950 p-2 text-xl sm:text-2xl"
            >
              📍
            </span>
            <div className="flex flex-col">
              <h3 className="text-base font-semibold tracking-tight text-background uppercase sm:text-lg">
                Live Order Tracking
              </h3>
              <p className="text-sm tracking-tight text-primary-600 sm:text-base">
                Watch your rider in real time, every step
              </p>
            </div>
          </li>
          <li className="flex items-center gap-x-4 border-x-3 border-b-3 border-primary-950 p-4">
            <span
              aria-hidden="true"
              className="bg-primary-950 p-2 text-xl sm:text-2xl"
            >
              🏪
            </span>
            <div className="flex flex-col">
              <h3 className="text-base font-semibold tracking-tight text-background uppercase sm:text-lg">
                500+ Restaurants
              </h3>
              <p className="text-sm tracking-tight text-primary-600 sm:text-base">
                Local favorites and hidden gems near you
              </p>
            </div>
          </li>
        </ul>
        <div className="flex flex-col items-center gap-8 border-t border-t-primary-950 pt-4 sm:pt-8 md:flex-row">
          <div className="rouned-md flex">
            <span className="flex size-10 items-center justify-center rounded-full border-3 border-foreground bg-primary p-2 text-sm font-bold tracking-tight">
              AK
            </span>
            <span className="z-20 -ml-2.5 flex size-10 items-center justify-center rounded-full border-3 border-foreground bg-error-700 p-2 text-sm font-bold tracking-tight text-background">
              RJ
            </span>
            <span className="z-20 -ml-2.5 flex size-10 items-center justify-center rounded-full border-3 border-foreground bg-primary-900 p-2 text-sm font-bold tracking-tight text-primary">
              MS
            </span>
            <span className="z-20 -ml-2.5 flex size-10 items-center justify-center rounded-full border-3 border-foreground bg-primary-950 p-2 text-sm font-bold tracking-tight text-primary-600">
              +
            </span>
          </div>
          <p className="text-center text-base font-medium tracking-tight text-primary-600 sm:text-start sm:text-lg">
            <strong className="text-primary">12,400+</strong> people joined this
            month, across 30+ cities nationwide
          </p>
        </div>
      </section>
    </main>
  );
}
