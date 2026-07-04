import { PrismaClient } from "@/generated/prisma/client";
import { PERMISSIONS } from "@/lib/constants/permissions";

export default async function seedRolePermissions(prisma: PrismaClient) {
  for (const [roleName, permissions] of Object.entries(PERMISSIONS)) {
    const role = await prisma.role.findUniqueOrThrow({
      where: { name: roleName },
    });

    for (const permissionName of permissions) {
      const permission = await prisma.permission.findUniqueOrThrow({
        where: { name: permissionName },
      });

      await prisma.rolePermission.upsert({
        where: {
          roleId_permissionId: { roleId: role.id, permissionId: permission.id },
        },
        update: {},
        create: { roleId: role.id, permissionId: permission.id },
      });
    }
  }

  console.log(
    `✅ [${new Date().toLocaleTimeString()}] Seeder Role-Permissions finished — ${Object.keys(PERMISSIONS).length} records created.`
  );
}
