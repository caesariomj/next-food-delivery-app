"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { RiHome5Fill } from "@remixicon/react";
import * as Sentry from "@sentry/nextjs";

import { Button } from "@/components/ui/button";

type AuthErrorPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

type ErrorInfo = { title: string; message: string };

const errorMessages: Record<string, ErrorInfo> = {
  invalid_callback_request: {
    title: "Invalid Request",
    message: "Invalid authentication request. Please try again.",
  },
  invalid_code: {
    title: "Authentication Failed",
    message: "Authentication failed. Please try again.",
  },
  state_mismatch: {
    title: "Security Check Failed",
    message: "Security check failed. Please try again.",
  },
  state_not_found: {
    title: "Session Expired",
    message: "Session expired. Please try again.",
  },
  state_invalid: {
    title: "Invalid Session",
    message: "Invalid session. Please try again.",
  },
  email_not_found: {
    title: "Email Not Found",
    message: "No email address found in your account.",
  },
  email_does_not_match: {
    title: "Email Doesn't Match",
    message: "Email doesn't match your account.",
  },
  oauth_provider_not_found: {
    title: "Authentication Provider Not Found",
    message: "Authentication provider not found.",
  },
  unable_to_get_user_info: {
    title: "Failed To Retrieve Account Information",
    message: "Failed to retrieve account information.",
  },
  unable_to_link_account: {
    title: "Linking Failed",
    message: "We couldn't link this account to your profile. Please try again.",
  },
  unable_to_create_user: {
    title: "Failed To Create Account",
    message: "Failed to create account.",
  },
  unable_to_create_session: {
    title: "Failed To Create Session",
    message: "Failed to create session.",
  },
  account_not_linked: {
    title: "Account Not Linked To Your User",
    message: "Account not linked to your user.",
  },
  account_already_linked_to_different_user: {
    title: "Account Already Linked To Different User",
    message: "This account is already linked to another user.",
  },
  signup_disabled: {
    title: "Sign Up Disabled",
    message: "Sign up is currently disabled.",
  },
  internal_server_error: {
    title: "Server Error",
    message: "Server error. Please try again later.",
  },
};

export default function AuthErrorPage({ searchParams }: AuthErrorPageProps) {
  const resolvedSearchParams = React.use(searchParams);
  const errorCode = resolvedSearchParams.error as string | undefined;

  const { title, message } = errorMessages[
    errorCode as keyof typeof errorMessages
  ] ?? {
    title: "Unexpected Error",
    message: "Something went wrong.",
  };

  useEffect(() => {
    if (!errorCode) return;

    const isUnmapped = !errorMessages[errorCode as keyof typeof errorMessages];

    Sentry.captureException(new Error(`OAuth error: ${errorCode}`), {
      level: isUnmapped ? "warning" : "error",
      tags: { unmapped: isUnmapped },
      extra: { errorCode, allParams: resolvedSearchParams },
    });
  }, [errorCode, resolvedSearchParams]);

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
        {message}
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
