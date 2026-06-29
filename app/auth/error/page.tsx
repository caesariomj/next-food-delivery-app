"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { RiHome5Fill } from "@remixicon/react";

import { Button } from "@/components/ui/button";

type AuthErrorPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const appName = process.env.NEXT_PUBLIC_APP_NAME ?? "My App";

export default function AuthErrorPage({ searchParams }: AuthErrorPageProps) {
  const resolvedSearchParams = React.use(searchParams);

  let title = "";
  let description = "";

  switch (resolvedSearchParams.error) {
    case "email_not_found":
      title = "Email Not Available";
      description =
        "We couldn't get your email address from Google. Please choose another sign-in method or use a different Google account.";
      break;

    case "account_already_linked_to_different_user":
      title = "Account Already Linked";
      description = `This Google account is already linked to another ${appName} account. Try signing in with a different account.`;
      break;

    case "state_mismatch":
      title = "Couldn't Verify Your Sign-In";
      description =
        "Your sign-in session couldn't be verified. Please try signing in again.";
      break;

    case "state_invalid":
      title = "Couldn't Verify Your Sign-In";
      description =
        "Your sign-in session couldn't be verified. Please try signing in again.";
      break;

    case "state_not_found":
      title = "Couldn't Verify Your Sign-In";
      description =
        "Your sign-in session couldn't be verified. Please try signing in again.";
      break;

    case "invalid_code":
      title = "Sign-In Session Expired";
      description =
        "Your Google sign-in request has expired or is no longer valid. Please try again.";
      break;

    case "signup_disabled":
      title = "Sign Up Unavailable";
      description =
        "Creating new accounts with Google is currently disabled. Please use another sign-up method or try again later.";
      break;

    default:
      title = "Something Went Wrong";
      description =
        "We couldn't complete your Google sign-in. Please try again in a moment.";
      break;
  }

  return (
    <section className="flex h-full min-h-screen w-full flex-col items-center justify-center gap-y-8 p-8 md:p-16">
      <Image
        src="/images/illustrations/error-illustration.svg"
        alt="Error"
        loading="eager"
        width={750}
        height={750}
      />
      <h1 className="text-center font-display text-7xl font-black tracking-wide md:text-8xl">
        {title}
      </h1>
      <p className="text-center text-lg font-semibold tracking-tight md:text-xl">
        {description}
      </p>
      <Button variant="default" size="xl" className="mt-8" asChild>
        <Link href="/">
          <RiHome5Fill />
          Back to Home
        </Link>
      </Button>
    </section>
  );
}
