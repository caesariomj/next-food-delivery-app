import { reportError } from "@/lib/monitoring/sentry";

import { isKnownAuthError } from "../application/auth-error";

type AuthErrorContext =
  | "oauth_callback"
  | "google_sign_in"
  | "credentials_sign_in"
  | "sign_up";

type ReportAuthErrorParams = {
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
}: ReportAuthErrorParams) {
  const known = isKnownAuthError(errorCode);

  reportError({
    context: `auth.${context}`,
    error,
    errorCode,
    metadata,
    statusCode,
    level: known ? "error" : "warning",
  });
}
