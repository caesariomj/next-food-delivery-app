import type { Permission } from "@/generated/prisma/client";
import type { NavGroup } from "@/types/navigation";

export function filterNavGroupsByPermissions(
  groups: readonly NavGroup[],
  userPermissions: Permission[]
): NavGroup[] {
  const permissionNames = new Set(userPermissions.map((p) => p.name));

  return groups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) =>
        item.permissions.some((permission) => permissionNames.has(permission))
      ),
    }))
    .filter((group) => group.items.length > 0);
}
