import { PrismaClient } from "@/generated/prisma/client";
import { ROLES } from "@/lib/constants/roles";

export default async function seedRoles(prisma: PrismaClient) {
  await Promise.all(
    ROLES.map((name) => {
      return prisma.role.upsert({
        where: { name },
        update: {},
        create: { name },
      });
    })
  );

  console.log(
    `✅ [${new Date().toLocaleTimeString()}] Seeder Roles finished — ${ROLES.length} records created.`
  );
}
