import { Prisma } from "@/generated/prisma/client";

export type UserRoleWithPermissions = Prisma.UserRoleGetPayload<{
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
