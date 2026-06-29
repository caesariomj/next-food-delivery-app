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

import { authClient } from "@/lib/auth/client";
import { SignInState, signInAction } from "@/actions/auth";

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

  const signInWithGoogle = async () => {
    try {
      setIsGoogleLoading(true);

      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
        newUserCallbackURL: "/",
        errorCallbackURL: "/auth/error",
      });
    } catch (error) {
      toast.error("Something went wrong on our end. Please try again later.");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <form action={formAction} className="mb-16 space-y-8">
      <FieldGroup>
        <Button
          type="button"
          className="w-full"
          variant="outline"
          size="lg"
          onClick={signInWithGoogle}
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
          <div className="grow border-t-3 border-t-foreground/80"></div>
          <span className="mx-4 shrink text-base font-bold text-foreground/80">
            OR
          </span>
          <div className="grow border-t-3 border-t-foreground/80"></div>
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
                autoComplete="current-password"
                required
                hasError={!!state.errors?.password?.length}
              />
              <FieldError errors={state.errors?.password} />
            </Field>
            <Field orientation="vertical">
              <div className="inline-flex items-center gap-4">
                <Checkbox
                  id="rememberMe"
                  name="rememberMe"
                  hasError={!!state.errors?.rememberMe?.length}
                />
                <FieldLabel
                  htmlFor="rememberMe"
                  className={`text-base! font-semibold! tracking-tight! ${
                    !!state.errors?.rememberMe?.length
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
