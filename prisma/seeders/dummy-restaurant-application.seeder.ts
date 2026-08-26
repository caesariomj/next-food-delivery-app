import type { PrismaClient } from "@/generated/prisma/client";
import { toSlug, toTitleCase } from "@/lib/utils/string";

import { restaurantApplications } from "./data/restaurant-application.data";

async function findUserByEmailOrThrow(
  prisma: PrismaClient,
  email: string,
  role: "Applicant" | "Reviewer"
) {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new Error(
      `${role} with email "${email}" not found. Seed your users table before running this seeder.`
    );
  }

  return user;
}

export default async function seedDummyRestaurantApplication(
  prisma: PrismaClient
) {
  for (const rawRestaurantApplication of restaurantApplications) {
    const applicant = await findUserByEmailOrThrow(
      prisma,
      rawRestaurantApplication.applicant.email,
      "Applicant"
    );

    const reviewer = rawRestaurantApplication.reviewer
      ? await findUserByEmailOrThrow(
          prisma,
          rawRestaurantApplication.reviewer.email,
          "Reviewer"
        )
      : null;

    const {
      publicId,
      status,
      businessName,
      businessPhone,
      businessEmail,
      businessDescription,
      address,
      latitude,
      longitude,
      businessLicense,
      rejectionReason,
      revisionNotes,
      reviewedById,
      reviewedAt,
      submittedAt,
    } = rawRestaurantApplication;

    const name = toTitleCase(businessName);

    const restaurantApplication = await prisma.restaurantApplication.upsert({
      where: {
        publicId,
      },
      update: {},
      create: {
        publicId,
        applicantId: applicant.id,
        status,
        businessName: name,
        businessPhone,
        businessEmail,
        businessDescription,
        address,
        latitude,
        longitude,
        businessLicense,
        rejectionReason,
        revisionNotes,
        reviewedById: reviewer ? reviewer.id : reviewedById,
        reviewedAt,
        submittedAt,
      },
    });

    for (const restaurantCuisineName of rawRestaurantApplication.cuisines) {
      const cuisine = await prisma.cuisine.findUnique({
        where: {
          slug: toSlug(restaurantCuisineName),
        },
      });

      if (!cuisine) {
        throw new Error(
          `Cuisine "${restaurantCuisineName}" not found. Seed your cuisines table before running this seeder.`
        );
      }

      await prisma.restaurantApplicationCuisine.upsert({
        where: {
          restaurantApplicationId_cuisineId: {
            restaurantApplicationId: restaurantApplication.id,
            cuisineId: cuisine.id,
          },
        },
        update: {},
        create: {
          restaurantApplicationId: restaurantApplication.id,
          cuisineId: cuisine.id,
        },
      });
    }
  }

  console.log(
    `✅ [${new Date().toLocaleTimeString()}] Seeder Restaurant Applications finished — ${restaurantApplications.length} records created.`
  );
}
