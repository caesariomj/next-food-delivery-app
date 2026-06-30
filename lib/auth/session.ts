import { cache } from "react";
import { headers } from "next/headers";

import { auth } from "@/lib/auth/server";
import prisma from "@/lib/prisma";

export const getSessionWithRoles = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return null;

  const roles = await prisma.userRole.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      role: {
        include: {
          permissions: true,
        },
      },
    },
  });

  return { ...session, roles };
});
