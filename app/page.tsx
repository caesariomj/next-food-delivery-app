import type { Metadata } from "next";

import AppDownloadSection from "@/components/common/sections/app-download-section";
import Footer from "@/components/layout/main/footer";
import Navbar from "@/components/layout/main/navbar";
import { getCurrentUserWithPermissions } from "@/features/auth/application/get-current-user";
import type { RestaurantSearchParams } from "@/features/landing/infrastructure/landing-type";
import CuisinesSection from "@/features/landing/presentation/cuisines/section";
import RestaurantFinder from "@/features/landing/presentation/hero/restaurant-finder";
import HeroSection from "@/features/landing/presentation/hero/section";
import HowItWorksSection from "@/features/landing/presentation/how-it-works-section";
import Marquee from "@/features/landing/presentation/marquee";
import PromoSection from "@/features/landing/presentation/promo/section";
import TopRatedRestaurantsSection from "@/features/landing/presentation/top-rated-restaurants/section";

export const metadata: Metadata = {
  title: `Hungry? We Fixed That. ― ${process.env.NEXT_PUBLIC_APP_NAME}`,
  description:
    "Raw, fast restaurant search. Pick a cuisine, drop your address, eat. That's it.",
};

type HomeProps = {
  searchParams: Promise<RestaurantSearchParams>;
};

export default async function Home({ searchParams }: HomeProps) {
  const [user, params] = await Promise.all([
    getCurrentUserWithPermissions(),
    searchParams,
  ]);

  return (
    <>
      <Navbar user={user} />
      <main className="divide-y-4 divide-foreground">
        <HeroSection restaurantFinder={<RestaurantFinder params={params} />} />
        <Marquee />
        <CuisinesSection className="space-y-16 px-4 py-8 md:px-16 md:py-32" />
        <HowItWorksSection className="space-y-16 bg-background-secondary px-4 py-8 md:px-16 md:py-32" />
        <TopRatedRestaurantsSection className="space-y-16 bg-background px-4 py-8 md:px-16 md:py-32" />
        <PromoSection
          isLoggedIn={user !== null}
          className="px-4 py-8 md:px-16 md:py-32"
        />
        <AppDownloadSection className="px-4 py-8 md:px-16 md:py-32" />
      </main>
      <Footer />
    </>
  );
}
