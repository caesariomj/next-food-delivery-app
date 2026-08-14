import prisma from "@/lib/prisma";

import type { UserRoleWithPermissions } from "./user-role-type";

export async function getUserRolesByUserId(
  userId: string
): Promise<UserRoleWithPermissions[]> {
  return await prisma.userRole.findMany({
    where: { userId },
    include: {
      role: {
        include: {
          permissions: { include: { permission: true } },
        },
      },
    },
  });
}
