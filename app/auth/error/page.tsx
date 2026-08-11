"use client";

import React, { useEffect } from "react";

import { getAuthErrorInfo } from "@/features/auth/application/auth-error";
import { reportAuthError } from "@/features/auth/infrastructure/auth-error-monitoring";
import { AuthErrorView } from "@/features/auth/presentation/auth-error-view";

type AuthErrorPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default function AuthErrorPage({ searchParams }: AuthErrorPageProps) {
  const params = React.use(searchParams);

  const errorCode = params.error as string | undefined;

  const { title, message } = getAuthErrorInfo(errorCode);

  useEffect(() => {
    if (!errorCode) return;

    reportAuthError({
      context: "oauth_callback",
      errorCode,
      metadata: params,
    });
  }, [errorCode, params]);

  return <AuthErrorView title={title} message={message} />;
}
