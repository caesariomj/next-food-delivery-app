export type NavItem = {
  title: string;
  href: string;
  icon: string;
  permissions: string[];
  badge?: number;
};

export type NavLink = {
  title: string;
  href: string;
};

export type NavGroup = {
  label: string;
  items: NavItem[];
};
