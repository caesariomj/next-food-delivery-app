import type { Metadata } from "next";

import DashboardSection from "@/features/dashboard/presentation/dashboard-section";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Your business, at a glance. Real-time stats, order updates, and product controls wrapped in bold perfection. Less time deciphering graphs, more time stacking sales. Let’s get to work!",
};

export default function Dashboard() {
  return <DashboardSection />;
}
