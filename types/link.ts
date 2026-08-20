export type LinkGroup = {
  header: string;
  links: readonly {
    label: string;
    href: string;
  }[];
};

export type LinkItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};
