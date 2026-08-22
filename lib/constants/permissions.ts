export const PERMISSIONS = {
  CUISINES: {
    VIEW: "cuisines.view",
    CREATE: "cuisines.create",
    UPDATE: "cuisines.update",
    DELETE: "cuisines.delete",
  },
  DASHBOARD: {
    ACCESS: "dashboard.access",
  },
  RESTAURANTS: {
    VIEW: "restaurants.view",
    UPDATE: "restaurants.update",
    DELETE: "restaurants.delete",
  },
  RESTAURANT_APPLICATIONS: {
    VIEW: "restaurant-applications.view",
    CREATE: "restaurant-applications.create",
    MANAGE: "restaurant-applications.manage",
  },
} as const;

export type Permission =
  | (typeof PERMISSIONS.CUISINES)[keyof typeof PERMISSIONS.CUISINES]
  | (typeof PERMISSIONS.DASHBOARD)[keyof typeof PERMISSIONS.DASHBOARD]
  | (typeof PERMISSIONS.RESTAURANTS)[keyof typeof PERMISSIONS.RESTAURANTS]
  | (typeof PERMISSIONS.RESTAURANT_APPLICATIONS)[keyof typeof PERMISSIONS.RESTAURANT_APPLICATIONS];
