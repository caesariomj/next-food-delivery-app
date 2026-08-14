import { cache } from "react";

import { getUserRolesByUserId } from "@/features/user-role/infrastructure/user-role-repository";
import type { CurrentUserWithRoleAndPermissions } from "@/features/user/infrastructure/user-type";

import { getSession } from "../infrastructure/better-auth-server";

export const getCurrentUserWithPermissions = cache(async () => {
  const session = await getSession();

  if (!session) return null;

  const userRoles = await getUserRolesByUserId(session.user.id);

  return {
    ...session.user,
    roles: userRoles,
  } satisfies CurrentUserWithRoleAndPermissions;
});
