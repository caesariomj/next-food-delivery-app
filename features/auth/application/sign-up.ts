import { signUpWithEmailProvider } from "../infrastructure/better-auth-server";

export function signUp(name: string, email: string, password: string) {
  return signUpWithEmailProvider(name, email, password);
}
