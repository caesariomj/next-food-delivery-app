import { signInWithGoogleProvider } from "../infrastructure/better-auth-client";

export async function signInWithGoogle() {
  return signInWithGoogleProvider();
}
