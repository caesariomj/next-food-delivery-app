import type { ReactNode } from "react";
import { redirect } from "next/navigation";

import DashboardNavbar from "@/components/layout/dashboard/navbar";
import DashboardSidebar from "@/components/layout/dashboard/sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getCurrentUserWithPermissions } from "@/features/auth/application/get-current-user";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const user = await getCurrentUserWithPermissions();

  if (!user) {
    redirect("/auth/sign-in");
  }

  return (
    <SidebarProvider>
      <DashboardSidebar user={user} />
      <SidebarInset>
        <DashboardNavbar />
        <main className="overflow-y-auto">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
