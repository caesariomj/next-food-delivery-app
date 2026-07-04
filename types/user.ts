import { Prisma } from "@/generated/prisma/client";
import type { auth } from "@/lib/auth/server";

export type AuthUser = (typeof auth.$Infer.Session)["user"];
export type AuthSession = (typeof auth.$Infer.Session)["session"];

export type UserRole = Prisma.UserRoleGetPayload<{
  include: {
    role: {
      include: {
        permissions: {
          include: {
            permission: true;
          };
        };
      };
    };
  };
}>;

export type UserWithPermissions = AuthUser & {
  roles: UserRole[];
};
