import { NextRequest, NextResponse } from "next/server";

import { getUserWithPermissions } from "@/lib/auth/session";
import type { UserWithPermissions } from "@/types/user";

async function handleAuthRoute(
  user: UserWithPermissions | null,
  request: NextRequest
) {
  if (user) return NextResponse.redirect(new URL("/", request.url));
  return NextResponse.next();
}

async function handleProtectedRoute(
  user: UserWithPermissions | null,
  request: NextRequest
) {
  if (!user)
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));

  return NextResponse.next();
}

export async function proxy(request: NextRequest) {
  const user = await getUserWithPermissions();

  const isAuthRoute = request.nextUrl.pathname.startsWith("/auth");

  return isAuthRoute
    ? handleAuthRoute(user, request)
    : handleProtectedRoute(user, request);
}

export const config = {
  matcher: ["/dashboard", "/auth/:path*"],
};
