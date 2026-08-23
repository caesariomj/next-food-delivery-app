import { config } from "dotenv";
import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "@/generated/prisma/client";
import seedRoles from "@/prisma/seeders/role.seeder";
import seedPermissions from "@/prisma/seeders/permission.seeder";
import seedRolePermissions from "@/prisma/seeders/role-permission.seeder";
import seedDummyUser from "@/prisma/seeders/dummy-user.seeder";

const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";

config({ path: envFile });

const connectionString = process.env.DATABASE_URL!;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log(process.env.NODE_ENV);

  await seedRoles(prisma);
  await seedPermissions(prisma);
  await seedRolePermissions(prisma);

  if (process.env.NODE_ENV === "development") {
    await seedDummyUser(prisma);
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
