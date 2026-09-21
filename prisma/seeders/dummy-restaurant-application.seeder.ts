import {
  type PrismaClient,
  RestaurantApplicationStatus,
} from "@/generated/prisma/client";

import { restaurantApplications } from "./data/restaurant-application.data";

async function findAdminByEmailOrThrow(prisma: PrismaClient, email: string) {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new Error(
      `Admin with email "${email}" not found. Seed your users table before running this seeder.`
    );
  }

  return user;
}

export default async function seedDummyRestaurantApplication(
  prisma: PrismaClient
) {
  const admin = await findAdminByEmailOrThrow(prisma, "admin@email.com");

  for (const data of restaurantApplications) {
    const statusHistoryCreate = Array.isArray(data.statusHistory?.create)
      ? data.statusHistory.create
      : data.statusHistory?.create
        ? [data.statusHistory.create]
        : [];

    await prisma.restaurantApplication.upsert({
      where: { publicId: data.publicId },
      update: {},
      create: {
        ...data,
        statusHistory: {
          create: statusHistoryCreate.map((history) => ({
            ...history,
            reviewedById:
              history.status === RestaurantApplicationStatus.DRAFT ||
              history.status === RestaurantApplicationStatus.SUBMITTED ||
              history.status === RestaurantApplicationStatus.RESUBMITTED
                ? null
                : admin.id,
          })),
        },
      },
    });
  }

  console.log(
    `✅ [${new Date().toLocaleTimeString()}] Seeder Restaurant Applications finished — ${restaurantApplications.length} records created.`
  );
}
