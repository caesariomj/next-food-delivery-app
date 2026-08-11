import type { Metadata } from "next";
import Link from "next/link";

import SignInForm from "@/features/auth/presentation/sign-in-form";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to track orders, save favorites, and checkout faster.",
};

export default function SignIn() {
  return (
    <>
      <h1 className="mb-4 text-6xl leading-none font-black tracking-tight uppercase md:text-7xl">
        Good To See You Again
      </h1>
      <p className="mb-16 text-lg font-semibold tracking-tight text-foreground/80">
        Your next delicious meal is just a few clicks away.
      </p>
      <SignInForm />
      <p className="text-center text-lg font-medium tracking-tight text-foreground/80">
        Don&apos;t have an account?{" "}
        <Link
          href="/auth/sign-up"
          className="font-bold text-secondary underline underline-offset-2 transition-colors duration-200 ease-in-out hover:text-secondary-700 focus:text-secondary-700 focus:outline-none"
        >
          Sign up
        </Link>
      </p>
    </>
  );
}
