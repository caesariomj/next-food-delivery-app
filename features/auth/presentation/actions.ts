"use server";

import { isAPIError } from "better-auth/api";
import { z } from "zod";

import type { FieldError } from "@/types/form";

import { signInWithEmail } from "../application/sign-in-with-email";
import { signUp } from "../application/sign-up";
import { reportAuthError } from "../infrastructure/auth-error-monitoring";
import { signInSchema, signUpSchema } from "../validation/auth-schema";

export type SignInState = {
  success: boolean;
  errors?: {
    email?: FieldError[];
    password?: FieldError[];
    rememberMe?: FieldError[];
  };
  message?: string;
  data?: {
    user: {
      name: string;
    };
  } | null;
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
  data?: {
    user: {
      name: string;
    };
  } | null;
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
    const errors = z.flattenError(validated.error).fieldErrors;

    return {
      success: false,
      errors: {
        email: errors.email?.map((message) => ({
          message,
        })),
        password: errors.password?.map((message) => ({
          message,
        })),
        rememberMe: errors.rememberMe?.map((message) => ({
          message,
        })),
      },
    };
  }

  try {
    const result = await signInWithEmail(
      validated.data.email,
      validated.data.password,
      validated.data.rememberMe ?? false
    );

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
      reportAuthError({
        context: "credentials_sign_in",
        statusCode: error.statusCode,
        error,
      });

      return {
        success: false,
        message: error.message,
      };
    }

    reportAuthError({
      context: "credentials_sign_in",
      error,
    });

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
          (message) => ({
            message,
          })
        ),
      },
    };
  }

  try {
    const { name, email, password } = validated.data;

    const result = await signUp(name, email, password);

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
          errors: {
            email: [
              {
                message: "Email already exists!",
              },
            ],
          },
        };
      }

      reportAuthError({
        context: "sign_up",
        statusCode: error.statusCode,
        error,
      });

      return {
        success: false,
        message: error.message,
      };
    }

    reportAuthError({
      context: "sign_up",
      error,
    });

    return {
      success: false,
      message: "Something went wrong on our end. Please try again later.",
    };
  }
}
