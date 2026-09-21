import type { Prisma } from "@/generated/prisma/client";
import { RestaurantApplicationStatus } from "@/generated/prisma/enums";

export const restaurantApplications: Prisma.RestaurantApplicationCreateInput[] =
  [
    {
      publicId: "019213ec-4400-7a32-841f-13d8d67a13d1",
      status: RestaurantApplicationStatus.DRAFT,
      businessName: "Burger Junction",
      businessPhone: "5550192",
      businessEmail: "contact@burgerjunction.com",
      businessDescription:
        "Classic American burger joint serving smashed patties, hand-cut fries, and thick milkshakes.",
      countryCode: "US",
      administrativeArea: "California",
      locality: "San Francisco",
      address: "123 Main Street Suite A New York NY 10001",
      latitude: "40.712800",
      longitude: "-74.006000",
      businessLicense: null,
      applicant: {
        connect: {
          email: "merchant@email.com",
        },
      },
      restaurantApplicationCuisines: {
        create: {
          cuisine: {
            connect: {
              slug: "burgers",
            },
          },
        },
      },
      statusHistory: {
        create: [
          {
            status: RestaurantApplicationStatus.DRAFT,
            createdAt: new Date("2026-09-15T09:00:00.000Z"),
          },
        ],
      },
    },
    {
      publicId: "019213ec-4401-72e9-9188-4f811cb20f28",
      status: RestaurantApplicationStatus.SUBMITTED,
      businessName: "Sakura Sushi Bar",
      businessPhone: "5550143",
      businessEmail: "info@sakurasushibar.com",
      businessDescription:
        "Authentic Japanese dining experience featuring fresh sashimi, specialty rolls, and premium sake.",
      address: "456 Oak Avenue Los Angeles CA 90001",
      latitude: "34.052200",
      longitude: "-118.243700",
      businessLicense: "LIC987654321",
      applicant: {
        connect: {
          email: "merchant@email.com",
        },
      },
      restaurantApplicationCuisines: {
        create: {
          cuisine: {
            connect: {
              slug: "japanese-food",
            },
          },
        },
      },
      statusHistory: {
        create: [
          {
            status: RestaurantApplicationStatus.DRAFT,
            createdAt: new Date("2026-09-15T09:00:00.000Z"),
          },
          {
            status: RestaurantApplicationStatus.SUBMITTED,
            createdAt: new Date("2026-09-17T13:30:00.000Z"),
          },
        ],
      },
    },
    {
      publicId: "019213ec-4402-71a5-b1a9-399db2aa5f17",
      status: RestaurantApplicationStatus.UNDER_REVIEW,
      businessName: "The Golden Wok",
      businessPhone: "5550188",
      businessEmail: "management@thegoldenwok.com",
      businessDescription:
        "Traditional and modern Chinese dishes prepared over high-heat woks with fresh regional ingredients.",
      address: "789 Pine Road Chicago IL 60601",
      latitude: "41.878100",
      longitude: "-87.629800",
      businessLicense: "LIC123456789",
      applicant: {
        connect: {
          email: "merchant@email.com",
        },
      },
      restaurantApplicationCuisines: {
        create: {
          cuisine: {
            connect: {
              slug: "chinese-food",
            },
          },
        },
      },
      statusHistory: {
        create: [
          {
            status: RestaurantApplicationStatus.DRAFT,
            createdAt: new Date("2026-09-15T09:00:00.000Z"),
          },
          {
            status: RestaurantApplicationStatus.SUBMITTED,
            createdAt: new Date("2026-09-17T13:30:00.000Z"),
          },
          {
            status: RestaurantApplicationStatus.UNDER_REVIEW,
            createdAt: new Date("2026-09-18T08:15:00.000Z"),
          },
        ],
      },
    },
    {
      publicId: "019213ec-4403-75b2-a720-d39cb2a98f74",
      status: RestaurantApplicationStatus.REVISION_REQUIRED,
      businessName: "Tokyo Smash Burgers",
      businessPhone: "5550112",
      businessEmail: "hello@tokyosmash.com",
      businessDescription:
        "Innovative fusion eatery combining Japanese umami flavors with classic American smash burgers.",
      address: "101 Maple Boulevard Houston TX 77001",
      latitude: "29.760400",
      longitude: "-95.369800",
      businessLicense: "LIC555666777",
      applicant: {
        connect: {
          email: "merchant@email.com",
        },
      },
      restaurantApplicationCuisines: {
        create: [
          {
            cuisine: {
              connect: {
                slug: "burgers",
              },
            },
          },
          {
            cuisine: {
              connect: {
                slug: "japanese-food",
              },
            },
          },
        ],
      },
      statusHistory: {
        create: [
          {
            status: RestaurantApplicationStatus.DRAFT,
            createdAt: new Date("2026-09-15T09:00:00.000Z"),
          },
          {
            status: RestaurantApplicationStatus.SUBMITTED,
            createdAt: new Date("2026-09-17T13:30:00.000Z"),
          },
          {
            status: RestaurantApplicationStatus.UNDER_REVIEW,
            createdAt: new Date("2026-09-18T08:15:00.000Z"),
          },
          {
            status: RestaurantApplicationStatus.REVISION_REQUIRED,
            note: "Please re-upload a higher resolution copy of your proof of address or government-issued ID. The text on the provided document is blurry and unreadable. Additionally, ensure the document is dated within the last 90 days.",
            createdAt: new Date("2026-09-21T11:00:00.000Z"),
          },
        ],
      },
    },
    {
      publicId: "019213ec-4404-7622-be12-680c2f829f0a",
      status: RestaurantApplicationStatus.RESUBMITTED,
      businessName: "Dragon Burger and Dim Sum",
      businessPhone: "5550167",
      businessEmail: "owner@dragonburger.com",
      businessDescription:
        "A unique casual dining spot offering gourmet craft burgers alongside handmade Cantonese dim sum.",
      address: "202 Birch Lane Phoenix AZ 85001",
      latitude: "33.448400",
      longitude: "-112.074000",
      businessLicense: "LIC444555666",
      applicant: {
        connect: {
          email: "merchant@email.com",
        },
      },
      restaurantApplicationCuisines: {
        create: [
          {
            cuisine: {
              connect: {
                slug: "burgers",
              },
            },
          },
          {
            cuisine: {
              connect: {
                slug: "chinese-food",
              },
            },
          },
        ],
      },
      statusHistory: {
        create: [
          {
            status: RestaurantApplicationStatus.DRAFT,
            createdAt: new Date("2026-09-15T09:00:00.000Z"),
          },
          {
            status: RestaurantApplicationStatus.SUBMITTED,
            createdAt: new Date("2026-09-17T13:30:00.000Z"),
          },
          {
            status: RestaurantApplicationStatus.UNDER_REVIEW,
            createdAt: new Date("2026-09-18T08:15:00.000Z"),
          },
          {
            status: RestaurantApplicationStatus.REVISION_REQUIRED,
            note: "Property description is missing required details regarding HOA guidelines and parking allocation. Please update section 3.2 with the complete property specifications before we can proceed with the final review.",
            createdAt: new Date("2026-09-21T11:00:00.000Z"),
          },
          {
            status: RestaurantApplicationStatus.RESUBMITTED,
            createdAt: new Date("2026-09-23T14:45:00.000Z"),
          },
        ],
      },
    },
    {
      publicId: "019213ec-4405-7798-842e-2e55bd902a63",
      status: RestaurantApplicationStatus.APPROVED,
      businessName: "Zen Asian Grill",
      businessPhone: "5550155",
      businessEmail: "support@zenasiangrill.com",
      businessDescription:
        "Contemporary Asian grill featuring a diverse menu of pan-Asian favorites and custom stir-fry options.",
      address: "303 Cedar Court Philadelphia PA 19101",
      latitude: "39.952600",
      longitude: "-75.165200",
      businessLicense: "LIC777888999",
      applicant: {
        connect: {
          email: "merchant@email.com",
        },
      },
      restaurantApplicationCuisines: {
        create: [
          {
            cuisine: {
              connect: {
                slug: "japanese-food",
              },
            },
          },
          {
            cuisine: {
              connect: {
                slug: "chinese-food",
              },
            },
          },
        ],
      },
      statusHistory: {
        create: [
          {
            status: RestaurantApplicationStatus.DRAFT,
            createdAt: new Date("2026-09-15T09:00:00.000Z"),
          },
          {
            status: RestaurantApplicationStatus.SUBMITTED,
            createdAt: new Date("2026-09-17T13:30:00.000Z"),
          },
          {
            status: RestaurantApplicationStatus.UNDER_REVIEW,
            createdAt: new Date("2026-09-18T08:15:00.000Z"),
          },
          {
            status: RestaurantApplicationStatus.APPROVED,
            createdAt: new Date("2026-09-24T16:20:00.000Z"),
          },
        ],
      },
    },
    {
      publicId: "019213ec-4406-7b4d-9104-e215fa1d102c",
      status: RestaurantApplicationStatus.REJECTED,
      businessName: "Mega Fusion Hub",
      businessPhone: "5550123",
      businessEmail: "legal@megafusionhub.com",
      businessDescription:
        "An all-in-one culinary destination merging fast food staples with traditional Asian delicacies.",
      address: "404 Elm Street San Antonio TX 78201",
      latitude: "29.424100",
      longitude: "-98.493600",
      businessLicense: "LIC000111222",
      applicant: {
        connect: {
          email: "merchant@email.com",
        },
      },
      restaurantApplicationCuisines: {
        create: [
          {
            cuisine: {
              connect: {
                slug: "burgers",
              },
            },
          },
          {
            cuisine: {
              connect: {
                slug: "japanese-food",
              },
            },
          },
          {
            cuisine: {
              connect: {
                slug: "chinese-food",
              },
            },
          },
        ],
      },
      statusHistory: {
        create: [
          {
            status: RestaurantApplicationStatus.DRAFT,
            createdAt: new Date("2026-09-15T09:00:00.000Z"),
          },
          {
            status: RestaurantApplicationStatus.SUBMITTED,
            createdAt: new Date("2026-09-17T13:30:00.000Z"),
          },
          {
            status: RestaurantApplicationStatus.UNDER_REVIEW,
            createdAt: new Date("2026-09-18T08:15:00.000Z"),
          },
          {
            status: RestaurantApplicationStatus.REJECTED,
            note: "Thank you for submitting your application. After careful review, we regret to inform you that your application has been declined because it does not meet our minimum eligibility criteria (unverified ownership documentation). You are welcome to submit a new application once the required requirements are fulfilled.",
            createdAt: new Date("2026-09-24T16:20:00.000Z"),
          },
        ],
      },
    },
  ];
