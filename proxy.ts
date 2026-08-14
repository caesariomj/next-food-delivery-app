import { type NextRequest, NextResponse } from "next/server";

import { getCurrentUserWithPermissions } from "@/features/auth/application/get-current-user";
import type { CurrentUserWithRoleAndPermissions } from "@/features/user/infrastructure/user-type";

async function handleAuthRoute(
  user: CurrentUserWithRoleAndPermissions | null,
  request: NextRequest
) {
  if (user) return NextResponse.redirect(new URL("/", request.url));
  return NextResponse.next();
}

async function handleProtectedRoute(
  user: CurrentUserWithRoleAndPermissions | null,
  request: NextRequest
) {
  if (!user)
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));

  return NextResponse.next();
}

export async function proxy(request: NextRequest) {
  const user = await getCurrentUserWithPermissions();

  const isAuthRoute = request.nextUrl.pathname.startsWith("/auth");

  return isAuthRoute
    ? handleAuthRoute(user, request)
    : handleProtectedRoute(user, request);
}

export const config = {
  matcher: ["/dashboard", "/auth/:path*"],
};
