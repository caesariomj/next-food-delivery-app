import * as Sentry from "@sentry/nextjs";

import { isKnownAuthError } from "../application/auth-error";

type AuthErrorContext =
  | "oauth_callback"
  | "google_sign_in"
  | "credentials_sign_in"
  | "sign_up";

type ReportAuthErrorInput = {
  context: AuthErrorContext;
  errorCode?: string;
  error?: unknown;
  metadata?: Record<string, unknown>;
  statusCode?: number;
};

export function reportAuthError({
  context,
  errorCode,
  error,
  metadata,
  statusCode,
}: ReportAuthErrorInput) {
  const known = isKnownAuthError(errorCode);

  Sentry.captureException(error ?? new Error("Authentication failed"), {
    level: known ? "error" : "warning",
    tags: {
      auth_context: context,
      error_code: errorCode,
      status_code: statusCode,
      unmapped: !known,
    },
    extra: {
      errorCode,
      metadata,
    },
  });
}
