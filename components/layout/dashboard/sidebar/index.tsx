import { Sidebar } from "@/components/ui/sidebar";
import { extractUserPermissions } from "@/features/permission/application/permission-utils";
import type { CurrentUserWithRoleAndPermissions } from "@/features/user/infrastructure/user-type";

import SidebarContent from "./content";
import SidebarFooter from "./footer";
import SidebarHeader from "./header";

type DashboardSidebarProps = {
  user: CurrentUserWithRoleAndPermissions;
};

export default function DashboardSidebar({ user }: DashboardSidebarProps) {
  const userPermissions = extractUserPermissions(user);

  return (
    <Sidebar>
      <SidebarHeader className="h-15" />
      <SidebarContent permissions={userPermissions} />
      <SidebarFooter user={user} />
    </Sidebar>
  );
}
