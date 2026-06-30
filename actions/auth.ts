"use server";

import { headers } from "next/headers";
import { isAPIError } from "better-auth/api";
import * as Sentry from "@sentry/nextjs";
import { z } from "zod";

import { auth } from "@/lib/auth/server";
import { signInSchema, signUpSchema } from "@/lib/validations/user";

type FieldError = {
  message: string;
};

export type SignInState = {
  success: boolean;
  errors?: {
    email?: FieldError[];
    password?: FieldError[];
    rememberMe?: FieldError[];
  };
  message?: string;
  data?: { user: { name: string } } | null;
};

export type SignUpState = {
  success: boolean;
  errors?: {
    name?: FieldError[];
    email?: FieldError[];
    password?: FieldError[];
    confirmPassword?: FieldError[];
    acceptTermsAndConditions?: FieldError[];
  };
  message?: string;
  data?: { user: { name: string } } | null;
};

export async function signInAction(
  _: SignInState,
  formData: FormData
): Promise<SignInState> {
  const rawData = {
    email: formData.get("email"),
    password: formData.get("password"),
    rememberMe: formData.get("rememberMe") === "on",
  };

  const validated = signInSchema.safeParse(rawData);

  if (!validated.success) {
    const fieldErrors = z.flattenError(validated.error).fieldErrors;

    return {
      success: false,
      errors: {
        email: fieldErrors.email?.map((message) => ({ message })),
        password: fieldErrors.password?.map((message) => ({ message })),
        rememberMe: fieldErrors.rememberMe?.map((message) => ({ message })),
      },
    };
  }

  try {
    const { email, password, rememberMe } = validated.data;

    const result = await auth.api.signInEmail({
      body: {
        email,
        password,
        rememberMe,
      },
      headers: await headers(),
    });

    return {
      success: true,
      data: {
        user: {
          name: result.user.name,
        },
      },
    };
  } catch (error) {
    if (isAPIError(error)) {
      Sentry.captureException(error, {
        tags: { action: "signIn", statusCode: error.statusCode },
        extra: { status: error.status },
      });
      return { success: false, message: error.message };
    }

    Sentry.captureException(error);
    return {
      success: false,
      message: "Something went wrong on our end. Please try again later.",
    };
  }
}

export async function signUpAction(
  _: SignUpState,
  formData: FormData
): Promise<SignUpState> {
  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    acceptTermsAndConditions: formData.get("acceptTermsAndConditions") === "on",
  };

  const validated = signUpSchema.safeParse(rawData);

  if (!validated.success) {
    const fieldErrors = z.flattenError(validated.error).fieldErrors;

    return {
      success: false,
      errors: {
        name: fieldErrors.name?.map((message) => ({ message })),
        email: fieldErrors.email?.map((message) => ({ message })),
        password: fieldErrors.password?.map((message) => ({ message })),
        confirmPassword: fieldErrors.confirmPassword?.map((message) => ({
          message,
        })),
        acceptTermsAndConditions: fieldErrors.acceptTermsAndConditions?.map(
          (message) => ({ message })
        ),
      },
    };
  }

  try {
    const { name, email, password } = validated.data;

    const result = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
      headers: await headers(),
    });

    return {
      success: true,
      data: {
        user: {
          name: result.user.name,
        },
      },
    };
  } catch (error) {
    if (isAPIError(error)) {
      if (error.statusCode === 422 && error.status === "UNPROCESSABLE_ENTITY") {
        return {
          success: false,
          errors: { email: [{ message: "Email already exists!" }] },
        };
      }

      Sentry.captureException(error, {
        tags: { action: "signUp", statusCode: error.statusCode },
      });
      return { success: false, message: error.message };
    }

    Sentry.captureException(error);
    return {
      success: false,
      message: "Something went wrong on our end. Please try again later.",
    };
  }
}
