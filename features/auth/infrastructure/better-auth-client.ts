import { authClient } from "@/lib/auth/client";

export function signInWithGoogleProvider() {
  return authClient.signIn.social({
    provider: "google",
    callbackURL: "/",
    newUserCallbackURL: "/",
    errorCallbackURL: "/auth/error",
  });
}
