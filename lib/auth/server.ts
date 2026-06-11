import { betterAuth } from "better-auth/minimal";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "../prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: (process.env.GOOGLE_CLIENT_ID as string) ?? "",
      clientSecret: (process.env.GOOGLE_CLIENT_SECRET as string) ?? "",
      redirectURI: `${process.env.BETTER_AUTH_URL}/api/auth/callback/google`,
    },
  },
  trustedOrigins: [process.env.BETTER_AUTH_URL as string],
  advanced: {
    database: {
      generateId: (options) => {
        if (options.model === "user" || options.model === "users") {
          return false;
        }

        return crypto.randomUUID();
      },
    },
  },
});
