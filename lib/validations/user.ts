import { z } from "zod";

const emailSchema = z.preprocess(
  (value) => (typeof value === "string" ? value.trim().toLowerCase() : ""),
  z
    .email({ error: "Invalid email address!" })
    .max(254, { error: "Email must be at most 254 characters long!" })
);

const nameSchema = z
  .string()
  .trim()
  .min(3, { error: "Full name must be at least 3 characters long!" })
  .max(100, { error: "Full name must be at most 100 characters long!" });

const passwordSchema = z
  .string()
  .min(8, { error: "Password must be at least 8 characters long!" })
  .max(128, { error: "Password must be at most 128 characters long!" })
  .regex(/[A-Z]/, {
    error: "Password must contain at least one uppercase letter!",
  })
  .regex(/[a-z]/, {
    error: "Password must contain at least one lowercase letter!",
  })
  .regex(/[0-9]/, { error: "Password must contain at least one number!" })
  .regex(/[^A-Za-z0-9]/, {
    error: "Password must contain at least one special character!",
  })
  .refine((password) => password === password.trim(), {
    error: "Password cannot start or end with spaces!",
  });

const confirmPasswordSchema = z
  .string()
  .min(1, { error: "Confirm password is required!" });

const signInPasswordSchema = z
  .string()
  .min(1, { error: "Password is required!" })
  .max(128, { error: "Password must be at most 128 characters long!" });

export const signInSchema = z.object({
  email: emailSchema,
  password: signInPasswordSchema,
  rememberMe: z
    .boolean({ error: "Remember me must be checked or unchecked!" })
    .optional(),
});

export const signUpSchema = z
  .object({
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: confirmPasswordSchema,
    acceptTermsAndConditions: z.literal(true, {
      error: "Terms and condition must be accepted!",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords do not match!",
    path: ["confirmPassword"],
  });
