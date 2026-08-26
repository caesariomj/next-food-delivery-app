import type { PrismaClient } from "@/generated/prisma/client";
import { hashPassword } from "@/lib/auth/password";
import { ROLES } from "@/lib/constants/roles";

export default async function seedDummyUser(prisma: PrismaClient) {
  const allRoles = Object.values(ROLES);
  const hashedPassword = await hashPassword("Password1!");

  const roleMap = new Map<string, string>();

  for (const roleName of allRoles) {
    const name = roleName.toLowerCase();
    const roleRecord = await prisma.role.findUnique({
      where: { name },
    });

    if (!roleRecord) {
      throw new Error(
        `Role "${name}" not found. Seed your roles table before running this seeder.`
      );
    }
    roleMap.set(name, roleRecord.id);
  }

  for (const roleName of allRoles) {
    const name = roleName.toLowerCase();
    const email = `${name}@email.com`;
    const userId = crypto.randomUUID();

    const user = await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        id: userId,
        email,
        emailVerified: true,
        name,
      },
    });

    await prisma.account.upsert({
      where: { id: `account_${user.id}` },
      update: {},
      create: {
        id: `account_${user.id}`,
        userId: user.id,
        accountId: user.id,
        providerId: "credential",
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    await prisma.userRole.upsert({
      where: {
        userId_roleId: {
          userId: user.id,
          roleId: roleMap.get(name)!,
        },
      },
      create: {
        userId: user.id,
        roleId: roleMap.get(name)!,
      },
      update: {},
    });
  }

  console.log(
    `✅ [${new Date().toLocaleTimeString()}] Seeder Dummy Users finished — ${allRoles.length} records created.`
  );
}
