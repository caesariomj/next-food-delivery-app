export const PERMISSIONS = {
  admin: [],
  merchant: [],
  customer: [],
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS][number];
