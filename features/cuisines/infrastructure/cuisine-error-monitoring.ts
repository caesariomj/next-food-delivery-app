import { reportError } from "@/lib/monitoring/sentry";

type CuisineErrorContext = "create" | "edit" | "delete";

type ReportCuisineErrorParams = {
  context: CuisineErrorContext;
  error?: unknown;
  metadata?: Record<string, unknown>;
};

export function reportCuisineError({
  context,
  error,
  metadata,
}: ReportCuisineErrorParams) {
  reportError({
    context: `cuisine.${context}`,
    error,
    metadata,
  });
}
