import type { ComponentProps, ComponentType } from "react";

import { RiInstagramFill } from "@remixicon/react";

type RemixIcon = ComponentType<ComponentProps<typeof RiInstagramFill>>;

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
  icon: RemixIcon;
};

export type ProfileDropdownMenuItemLink = LinkItem & {
  permissions?: string[];
  separatorBefore?: boolean;
};
