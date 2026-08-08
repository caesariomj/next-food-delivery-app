import * as Sentry from "@sentry/nextjs";

type ReportErrorParams = {
  context: string;
  error?: unknown;
  errorCode?: string;
  metadata?: Record<string, unknown>;
  statusCode?: number;
  level?: "error" | "warning";
};

export function reportError({
  context,
  error,
  errorCode,
  metadata,
  statusCode,
  level = "error",
}: ReportErrorParams) {
  Sentry.captureException(error ?? new Error("Unexpected error"), {
    level,
    tags: {
      context,
      error_code: errorCode,
      status_code: statusCode,
    },
    extra: {
      metadata,
    },
  });
}
