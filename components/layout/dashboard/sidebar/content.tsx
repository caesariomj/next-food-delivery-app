import {
  SidebarContent as ShadcnSidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import type { Permission } from "@/generated/prisma/client";
import { DASHBOARD_SIDEBAR_NAV_GROUPS } from "@/lib/constants/navigation";
import { filterNavGroupsByPermissions } from "@/lib/utils/navigation";

import SidebarMenuItem from "./menu-item";

type SidebarContentProps = {
  permissions: Permission[];
};

export default function SidebarContent({ permissions }: SidebarContentProps) {
  const filteredNavGroups = filterNavGroupsByPermissions(
    DASHBOARD_SIDEBAR_NAV_GROUPS,
    permissions
  );

  return (
    <ShadcnSidebarContent>
      {filteredNavGroups.map((group) => (
        <SidebarGroup key={group.label}>
          <SidebarGroupLabel className="tracking-widest">
            {group.label}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {group.items.map((item) => (
                <SidebarMenuItem key={item.title} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </ShadcnSidebarContent>
  );
}
