import { betterAuth } from "better-auth/minimal";
import { nextCookies } from "better-auth/next-js";
import { prismaAdapter } from "better-auth/adapters/prisma";

import prisma from "@/lib/prisma";
import { hashPassword, verifyPassword } from "@/lib/auth/password";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    password: {
      hash: async (password) => {
        return await hashPassword(password);
      },
      verify: async ({ hash, password }) => {
        return await verifyPassword(password, hash);
      },
    },
  },
  socialProviders: {
    google: {
      clientId: (process.env.GOOGLE_CLIENT_ID as string) ?? "",
      clientSecret: (process.env.GOOGLE_CLIENT_SECRET as string) ?? "",
      redirectURI: `${process.env.BETTER_AUTH_URL}/api/auth/callback/google`,
    },
  },
  user: {
    additionalFields: {
      phone: {
        type: "string",
        required: false,
      },
      deletedAt: {
        type: "date",
        required: false,
      },
    },
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          const role = await prisma.role.findUnique({
            where: { name: "customer" },
          });

          if (role) {
            await prisma.userRole.create({
              data: { userId: user.id, roleId: role.id },
            });
          }
        },
      },
    },
  },
  plugins: [nextCookies()],
  trustedOrigins: [process.env.BETTER_AUTH_URL as string],
});
