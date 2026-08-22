import { PrismaClient } from "@/generated/prisma/client";
import { ROLES } from "@/lib/constants/roles";

export default async function seedRoles(prisma: PrismaClient) {
  const allRoles = Object.values(ROLES);

  await Promise.all(
    allRoles.map((name) => {
      return prisma.role.upsert({
        where: { name },
        update: {},
        create: { name },
      });
    })
  );

  console.log(
    `✅ [${new Date().toLocaleTimeString()}] Seeder Roles finished — ${allRoles.length} records created.`
  );
}
