import type { CurrentUserWithRoleAndPermissions } from "@/features/user/infrastructure/user-type";
import type { Permission } from "@/generated/prisma/client";

export function extractUserPermissions(
  user: CurrentUserWithRoleAndPermissions
): Permission[] {
  const allPermissions = user.roles.flatMap((userRole) =>
    userRole.role.permissions.map((permission) => permission.permission)
  );

  return [...new Map(allPermissions.map((p) => [p.id, p])).values()];
}

export function hasAnyPermissions(
  userPermissions: Permission[],
  permissionsToSearch: string[]
): boolean {
  return userPermissions.some((userPermission) =>
    permissionsToSearch.includes(userPermission.name)
  );
}

export function hasAllPermissions(
  userPermissions: Permission[],
  permissionsToSearch: string[]
): boolean {
  return permissionsToSearch.every((permission) =>
    userPermissions.some((userPermission) => userPermission.name === permission)
  );
}
