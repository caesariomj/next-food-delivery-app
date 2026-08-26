import { config } from "dotenv";
import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "@/generated/prisma/client";

import seedDummyCuisine from "./seeders/dummy-cuisine.seeder";
import seedDummyRestaurant from "./seeders/dummy-restaurant.seeder";
import seedDummyRestaurantApplication from "./seeders/dummy-restaurant-application.seeder";
import seedDummyUser from "./seeders/dummy-user.seeder";
import seedPermissions from "./seeders/permission.seeder";
import seedRoles from "./seeders/role.seeder";
import seedRolePermissions from "./seeders/role-permission.seeder";

const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";

config({ path: envFile });

const connectionString = process.env.DATABASE_URL!;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  await seedRoles(prisma);
  await seedPermissions(prisma);
  await seedRolePermissions(prisma);

  if (process.env.NODE_ENV === "development") {
    await seedDummyUser(prisma);
    await seedDummyCuisine(prisma);
    await seedDummyRestaurant(prisma);
    await seedDummyRestaurantApplication(prisma);
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
