export const PERMISSIONS = {
  admin: [
    "dashboard.access",
    "cuisines.view",
    "cuisines.create",
    "cuisines.update",
    "cuisines.delete",
  ],
  merchant: ["dashboard.access"],
  customer: [],
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS][number];
