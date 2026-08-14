import { headers } from "next/headers";

import { auth } from "@/lib/auth/server";

export async function getSession() {
  return auth.api.getSession({
    headers: await headers(),
  });
}

export async function signInWithEmailProvider(
  email: string,
  password: string,
  rememberMe: boolean
) {
  return auth.api.signInEmail({
    body: {
      email,
      password,
      rememberMe,
    },
    headers: await headers(),
  });
}

export async function signUpWithEmailProvider(
  name: string,
  email: string,
  password: string
) {
  return auth.api.signUpEmail({
    body: {
      name,
      email,
      password,
    },
    headers: await headers(),
  });
}
