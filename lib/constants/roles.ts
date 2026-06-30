export const ROLES = ["admin", "customer", "merchant"] as const;

export type Role = (typeof ROLES)[number];
