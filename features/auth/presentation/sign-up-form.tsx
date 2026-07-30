"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { RiGoogleFill } from "@remixicon/react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

import { type SignUpState, signUpAction } from "./actions";
import { signInWithGoogle } from "../application/sign-in-with-google";
import { reportAuthError } from "../infrastructure/auth-error-monitoring";

const initialState: SignUpState = {
  success: false,
  errors: undefined,
  message: undefined,
  data: undefined,
};

const appName = (process.env.NEXT_PUBLIC_APP_NAME as string) ?? "My App";

export default function SignUpForm() {
  const [state, formAction, pending] = useActionState(
    signUpAction,
    initialState
  );

  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (!state.message) return;

    toast.error(state.message);
  }, [state.message]);

  useEffect(() => {
    if (!state.success) return;

    toast.success(`Welcome to ${appName + " " + state.data?.user?.name}!`, {
      description: "Your next favorite meal is waiting. Let's get started.",
    });

    router.push("/");
  }, [state.success, state.data, router]);

  async function handleGoogleSignIn() {
    if (isGoogleLoading) return;

    setIsGoogleLoading(true);

    try {
      const { error } = await signInWithGoogle();

      if (error) {
        const errorCode = error.code;

        toast.error(error.message);

        reportAuthError({
          context: "google_sign_in",
          errorCode,
          error,
        });
      }
    } catch (error) {
      reportAuthError({
        context: "google_sign_in",
        error,
      });

      toast.error("Something went wrong on our end. Please try again later.");
    } finally {
      setIsGoogleLoading(false);
    }
  }

  return (
    <form action={formAction} className="mb-8 space-y-8">
      <FieldGroup>
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel
                htmlFor="email"
                className={state.errors?.name?.length ? "text-destructive" : ""}
              >
                Name
              </FieldLabel>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                autoComplete="name"
                required
                hasError={!!state.errors?.name?.length}
              />
              <FieldError errors={state.errors?.name} />
            </Field>
            <Field>
              <FieldLabel
                htmlFor="email"
                className={
                  state.errors?.email?.length ? "text-destructive" : ""
                }
              >
                Email
              </FieldLabel>
              <Input
                id="email"
                name="email"
                autoComplete="email"
                inputMode="email"
                spellCheck="false"
                autoCapitalize="none"
                autoCorrect="off"
                placeholder="johndoe@example.com"
                required
                hasError={!!state.errors?.email?.length}
              />
              <FieldError errors={state.errors?.email} />
            </Field>
            <Field>
              <FieldLabel
                htmlFor="password"
                className={
                  state.errors?.password?.length ? "text-destructive" : ""
                }
              >
                Password
              </FieldLabel>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                autoComplete="new-password"
                required
                hasError={!!state.errors?.password?.length}
              />
              <FieldError errors={state.errors?.password} />
            </Field>
            <Field>
              <FieldLabel
                htmlFor="confirmPassword"
                className={
                  state.errors?.confirmPassword?.length
                    ? "text-destructive"
                    : ""
                }
              >
                Confirm Password
              </FieldLabel>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                autoComplete="new-password"
                required
                hasError={!!state.errors?.confirmPassword?.length}
              />
              <FieldError errors={state.errors?.confirmPassword} />
            </Field>
            <Field orientation="vertical">
              <div className="inline-flex items-center gap-4">
                <Checkbox
                  id="acceptTermsAndConditions"
                  name="acceptTermsAndConditions"
                  required
                  hasError={!!state.errors?.acceptTermsAndConditions?.length}
                />
                <p className="text-base font-semibold tracking-tight text-foreground">
                  By creating an account you agree to our{" "}
                  <Link
                    href="/terms-of-service"
                    className="font-bold text-foreground underline underline-offset-2 transition-colors duration-200 ease-in-out hover:text-secondary"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy-policy"
                    className="font-bold text-foreground underline underline-offset-2 transition-colors duration-200 ease-in-out hover:text-secondary"
                  >
                    Privacy Policy
                  </Link>
                  . We&apos;ll never share your data.
                </p>
              </div>
              <FieldError errors={state.errors?.acceptTermsAndConditions} />
            </Field>
            <Field>
              <Button
                type="submit"
                variant="default"
                size="lg"
                disabled={pending}
              >
                {pending ? (
                  <>
                    <Spinner />
                    <span>Signing Up...</span>
                  </>
                ) : (
                  <span>Sign Up</span>
                )}
              </Button>
            </Field>
          </FieldGroup>
        </FieldSet>
      </FieldGroup>
      <FieldGroup>
        <div className="relative flex items-center py-4">
          <div className="grow border-t-3 border-t-foreground/80"></div>
          <span className="mx-4 shrink text-base font-bold text-foreground/80">
            OR
          </span>
          <div className="grow border-t-3 border-t-foreground/80"></div>
        </div>
        <Button
          type="button"
          className="w-full"
          variant="outline"
          size="lg"
          onClick={handleGoogleSignIn}
          disabled={isGoogleLoading}
        >
          {isGoogleLoading ? (
            <>
              <Spinner />
              <span>Connecting to Google...</span>
            </>
          ) : (
            <>
              <RiGoogleFill />
              <span>Continue with Google</span>
            </>
          )}
        </Button>
      </FieldGroup>
    </form>
  );
}
