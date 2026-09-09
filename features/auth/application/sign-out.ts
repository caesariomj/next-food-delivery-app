import { signOut as betterAuthSignOut } from "../infrastructure/better-auth-client";

export async function signOut() {
  return betterAuthSignOut();
}
