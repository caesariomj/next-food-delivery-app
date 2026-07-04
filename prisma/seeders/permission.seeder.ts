import { PrismaClient } from "@/generated/prisma/client";
import { PERMISSIONS } from "@/lib/constants/permissions";

export default async function seedPermissions(prisma: PrismaClient) {
  const allPermissions = [...new Set(Object.values(PERMISSIONS).flat())];

  await Promise.all(
    allPermissions.map((name) => {
      return prisma.permission.upsert({
        where: { name },
        update: {},
        create: { name },
      });
    })
  );

  console.log(
    `✅ [${new Date().toLocaleTimeString()}] Seeder Permissions finished — ${allPermissions.length} records created.`
  );
}
