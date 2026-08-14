import type { AuthUser } from "@/features/auth/infrastructure/auth-type";
import type { UserRoleWithPermissions } from "@/features/user-role/infrastructure/user-role-type";

export type CurrentUserWithRoleAndPermissions = AuthUser & {
  roles: UserRoleWithPermissions[];
};
