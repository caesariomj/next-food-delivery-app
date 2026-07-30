import { signInWithEmailProvider } from "../infrastructure/better-auth-server";

export function signInWithEmail(
  email: string,
  password: string,
  rememberMe: boolean
) {
  return signInWithEmailProvider(email, password, rememberMe);
}
