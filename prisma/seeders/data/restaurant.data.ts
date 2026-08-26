import { DayOfWeek, RestaurantStatus } from "@/generated/prisma/enums";

export const restaurants = [
  {
    name: "Burger and Co.",
    description:
      "Classic American smash burgers, crispy onion rings, and thick milkshakes.",
    logoUrl: "https://picsum.photos/200",
    coverImageUrl: "https://picsum.photos/200",
    phone: "+15550139485",
    email: "contact@burgerco.com",
    address: "528 Alpine Drive, Denver, CO 80202",
    latitude: 39.7392,
    longitude: -104.9903,
    status: RestaurantStatus.ONBOARDING,
    owners: [
      {
        email: "merchant@email.com",
        name: "merchant",
      },
    ],
    cuisines: ["burgers"],
    operatingHours: [
      {
        dayOfWeek: DayOfWeek.MONDAY,
        openTime: new Date("1970-01-01T08:00:00Z"),
        closeTime: new Date("1970-01-01T22:00:00Z"),
      },
      {
        dayOfWeek: DayOfWeek.TUESDAY,
        openTime: new Date("1970-01-01T08:00:00Z"),
        closeTime: new Date("1970-01-01T22:00:00Z"),
      },
      {
        dayOfWeek: DayOfWeek.WEDNESDAY,
        openTime: new Date("1970-01-01T08:00:00Z"),
        closeTime: new Date("1970-01-01T22:00:00Z"),
      },
      {
        dayOfWeek: DayOfWeek.THURSDAY,
        openTime: new Date("1970-01-01T11:00:00Z"),
        closeTime: new Date("1970-01-01T23:00:00Z"),
      },
      {
        dayOfWeek: DayOfWeek.FRIDAY,
        openTime: new Date("1970-01-01T11:00:00Z"),
        closeTime: new Date("1970-01-01T23:30:00Z"),
      },
      {
        dayOfWeek: DayOfWeek.SATURDAY,
        openTime: null,
        closeTime: null,
      },
      {
        dayOfWeek: DayOfWeek.SUNDAY,
        openTime: new Date("1970-01-01T09:00:00Z"),
        closeTime: new Date("1970-01-01T21:00:00Z"),
      },
    ],
  },
  {
    name: "Tokyo Bites",
    description:
      "Authentic Japanese ramen, fresh sashimi, and premium matcha desserts.",
    logoUrl: "https://picsum.photos/200",
    coverImageUrl: "https://picsum.photos/200",
    phone: "+15550192834",
    email: "hello@tokyobites.com",
    address: "742 Evergreen Terrace, Springfield, OR 97477",
    latitude: 44.0462,
    longitude: -123.022,
    status: RestaurantStatus.ACTIVE,
    owners: [
      {
        email: "merchant@email.com",
        name: "merchant",
      },
    ],
    cuisines: ["japanese food"],
    operatingHours: [
      {
        dayOfWeek: DayOfWeek.MONDAY,
        openTime: new Date("1970-01-01T00:00:00Z"),
        closeTime: new Date("1970-01-01T23:59:59Z"),
      },
      {
        dayOfWeek: DayOfWeek.TUESDAY,
        openTime: new Date("1970-01-01T00:00:00Z"),
        closeTime: new Date("1970-01-01T23:59:59Z"),
      },
      {
        dayOfWeek: DayOfWeek.WEDNESDAY,
        openTime: new Date("1970-01-01T00:00:00Z"),
        closeTime: new Date("1970-01-01T23:59:59Z"),
      },
      {
        dayOfWeek: DayOfWeek.THURSDAY,
        openTime: new Date("1970-01-01T00:00:00Z"),
        closeTime: new Date("1970-01-01T23:59:59Z"),
      },
      {
        dayOfWeek: DayOfWeek.FRIDAY,
        openTime: new Date("1970-01-01T00:00:00Z"),
        closeTime: new Date("1970-01-01T23:59:59Z"),
      },
      {
        dayOfWeek: DayOfWeek.SATURDAY,
        openTime: new Date("1970-01-01T00:00:00Z"),
        closeTime: new Date("1970-01-01T23:59:59Z"),
      },
      {
        dayOfWeek: DayOfWeek.SUNDAY,
        openTime: new Date("1970-01-01T00:00:00Z"),
        closeTime: new Date("1970-01-01T23:59:59Z"),
      },
    ],
  },
  {
    name: "The Golden Wok",
    description:
      "Traditional Chinese dim sum, savory stir-fries, and Beijing roasted duck.",
    logoUrl: null,
    coverImageUrl: "https://picsum.photos/200",
    phone: "+15550163849",
    email: "info@thegoldenwok.com",
    address: "404 Cyberpunk Way, Austin, TX 78701",
    latitude: 30.2672,
    longitude: -97.7431,
    status: RestaurantStatus.SUSPENDED,
    owners: [
      {
        email: "merchant@email.com",
        name: "merchant",
      },
    ],
    cuisines: ["chinese food"],
    operatingHours: [
      {
        dayOfWeek: DayOfWeek.MONDAY,
        openTime: null,
        closeTime: null,
      },
      {
        dayOfWeek: DayOfWeek.TUESDAY,
        openTime: null,
        closeTime: null,
      },
      {
        dayOfWeek: DayOfWeek.WEDNESDAY,
        openTime: new Date("1970-01-01T16:00:00Z"),
        closeTime: new Date("1970-01-01T23:00:00Z"),
      },
      {
        dayOfWeek: DayOfWeek.THURSDAY,
        openTime: new Date("1970-01-01T16:00:00Z"),
        closeTime: new Date("1970-01-01T23:00:00Z"),
      },
      {
        dayOfWeek: DayOfWeek.FRIDAY,
        openTime: new Date("1970-01-01T16:00:00Z"),
        closeTime: new Date("1970-01-01T02:00:00Z"),
      },
      {
        dayOfWeek: DayOfWeek.SATURDAY,
        openTime: new Date("1970-01-01T12:00:00Z"),
        closeTime: new Date("1970-01-01T02:00:00Z"),
      },
      {
        dayOfWeek: DayOfWeek.SUNDAY,
        openTime: new Date("1970-01-01T12:00:00Z"),
        closeTime: new Date("1970-01-01T21:00:00Z"),
      },
    ],
  },
  {
    name: "Sizzle & Steam",
    description:
      "A fusion of gourmet smash burgers and classic hot pot specialties.",
    logoUrl: "https://picsum.photos/200",
    coverImageUrl: null,
    phone: "+15550147291",
    email: "support@sizzleandsteam.com",
    address: "1012 Market Street, San Francisco, CA 94102",
    latitude: 37.7818,
    longitude: -122.4112,
    status: RestaurantStatus.CLOSED,
    owners: [
      {
        email: "merchant@email.com",
        name: "merchant",
      },
    ],
    cuisines: ["burgers", "chinese food"],
    operatingHours: [
      {
        dayOfWeek: DayOfWeek.MONDAY,
        openTime: new Date("1970-01-01T06:30:00Z"),
        closeTime: new Date("1970-01-01T15:00:00Z"),
      },
      {
        dayOfWeek: DayOfWeek.TUESDAY,
        openTime: new Date("1970-01-01T06:30:00Z"),
        closeTime: new Date("1970-01-01T15:00:00Z"),
      },
      {
        dayOfWeek: DayOfWeek.WEDNESDAY,
        openTime: new Date("1970-01-01T06:30:00Z"),
        closeTime: new Date("1970-01-01T15:00:00Z"),
      },
      {
        dayOfWeek: DayOfWeek.THURSDAY,
        openTime: new Date("1970-01-01T06:30:00Z"),
        closeTime: new Date("1970-01-01T15:00:00Z"),
      },
      {
        dayOfWeek: DayOfWeek.FRIDAY,
        openTime: new Date("1970-01-01T06:30:00Z"),
        closeTime: new Date("1970-01-01T16:00:00Z"),
      },
      {
        dayOfWeek: DayOfWeek.SATURDAY,
        openTime: new Date("1970-01-01T07:30:00Z"),
        closeTime: new Date("1970-01-01T16:00:00Z"),
      },
      {
        dayOfWeek: DayOfWeek.SUNDAY,
        openTime: new Date("1970-01-01T08:00:00Z"),
        closeTime: new Date("1970-01-01T14:00:00Z"),
      },
    ],
  },
] as const;
