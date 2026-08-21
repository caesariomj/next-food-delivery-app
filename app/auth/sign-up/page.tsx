import type { Metadata } from "next";
import Link from "next/link";

import SignUpForm from "@/features/auth/presentation/sign-up-form";

const appName = process.env.NEXT_PUBLIC_APP_NAME ?? "My App";

export const metadata: Metadata = {
  title: "Create Account",
  description: `Join ${appName} to save your favorites, track every order, and get great food faster.`,
};

export default function SignUp() {
  return (
    <>
      <h1 className="mb-4 text-6xl leading-none font-black tracking-tight uppercase md:text-7xl">
        Let&apos;s Get You In
      </h1>
      <p className="mb-8 text-lg font-semibold tracking-tight text-foreground/80 sm:mb-16">
        Create your {appName + " "} account — it&apos;s free.
      </p>
      <SignUpForm />
      <p className="mt-8 text-center text-lg font-medium tracking-tight text-foreground/80 sm:mt-16">
        Already have an account?{" "}
        <Link
          href="/auth/sign-in"
          className="font-bold text-secondary-700 underline underline-offset-2 transition-colors duration-200 ease-in-out hover:text-secondary-900 focus:text-secondary-900 focus:outline-none"
        >
          Sign in
        </Link>
      </p>
    </>
  );
}
