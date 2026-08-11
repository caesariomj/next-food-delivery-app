"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";
import { RiGoogleFill } from "@remixicon/react";

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

import { type SignInState, signInAction } from "./actions";
import { signInWithGoogle } from "../application/sign-in-with-google";
import { reportAuthError } from "../infrastructure/auth-error-monitoring";

const initialState: SignInState = {
  success: false,
  errors: undefined,
  message: undefined,
  data: undefined,
};

export default function SignInForm() {
  const [state, formAction, pending] = useActionState(
    signInAction,
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

    toast.success(`Welcome Back ${state.data?.user?.name}!`, {
      description: "Good food waits for no one. Let's fix that.",
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
    <form action={formAction} className="mb-16 space-y-8">
      <FieldGroup>
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

        <div className="relative flex items-center pt-4">
          <div className="grow border-t-3 border-t-foreground/80" />
          <span className="mx-4 shrink text-base font-bold text-foreground/80">
            OR
          </span>
          <div className="grow border-t-3 border-t-foreground/80" />
        </div>
      </FieldGroup>
      <FieldGroup>
        <FieldSet>
          <FieldGroup>
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
                aria-invalid={state.errors?.email ? "true" : "false"}
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
                autoComplete="current-password"
                required
                aria-invalid={state.errors?.password ? "true" : "false"}
              />
              <FieldError errors={state.errors?.password} />
            </Field>
            <Field orientation="vertical">
              <div className="inline-flex items-center gap-4">
                <Checkbox
                  id="rememberMe"
                  name="rememberMe"
                  aria-invalid={state.errors?.rememberMe ? "true" : "false"}
                />
                <FieldLabel
                  htmlFor="rememberMe"
                  className={`text-base! font-semibold! tracking-tight! ${
                    state.errors?.rememberMe?.length
                      ? "text-error!"
                      : "text-foreground"
                  }`}
                >
                  Remember Me
                </FieldLabel>
              </div>
              <FieldError errors={state.errors?.rememberMe} />
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
                    <span>Signing In...</span>
                  </>
                ) : (
                  <span>Sign In</span>
                )}
              </Button>
            </Field>
          </FieldGroup>
        </FieldSet>
      </FieldGroup>
    </form>
  );
}
