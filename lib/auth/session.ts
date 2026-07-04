import { cache } from "react";
import { headers } from "next/headers";

import { auth } from "@/lib/auth/server";
import prisma from "@/lib/prisma";
import type { UserWithPermissions } from "@/types/user";

export const getUserWithPermissions = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return null;

  const userRoles = await prisma.userRole.findMany({
    where: { userId: session.user.id },
    include: {
      role: {
        include: {
          permissions: { include: { permission: true } },
        },
      },
    },
  });

  return {
    ...session.user,
    roles: userRoles,
  } satisfies UserWithPermissions;
});
