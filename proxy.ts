import { NextRequest, NextResponse } from "next/server";

import { getSessionWithRoles } from "@/lib/auth/session";
import { auth } from "@/lib/auth/server";

type Session = typeof auth.$Infer.Session;

async function handleAuthRoute(session: Session | null, request: NextRequest) {
  if (session) return NextResponse.redirect(new URL("/", request.url));
  return NextResponse.next();
}

async function handleProtectedRoute(
  session: Session | null,
  request: NextRequest
) {
  if (!session)
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));

  return NextResponse.next();
}

export async function proxy(request: NextRequest) {
  const session = await getSessionWithRoles();

  const isAuthRoute = request.nextUrl.pathname.startsWith("/auth");

  return isAuthRoute
    ? handleAuthRoute(session, request)
    : handleProtectedRoute(session, request);
}

export const config = {
  matcher: ["/dashboard", "/auth/:path*"],
};
