export const ROLES = {
  ADMIN: "admin",
  CUSTOMER: "customer",
  MERCHANT: "merchant",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];
