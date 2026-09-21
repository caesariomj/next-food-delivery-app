import type { Prisma } from "@/generated/prisma/client";

export const cuisines: Prisma.CuisineCreateInput[] = [
  { name: "Burgers", slug: "burgers", icon: "🍔", isActive: true },
  { name: "Japanese Food", slug: "japanese-food", icon: "🍣", isActive: false },
  { name: "Chinese Food", slug: "chinese-food", icon: "🥡", isActive: true },
];
