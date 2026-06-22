"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";
import {
  RiCheckboxCircleLine,
  RiInformationLine,
  RiErrorWarningLine,
  RiCloseCircleLine,
  RiLoader3Line,
} from "@remixicon/react";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <RiCheckboxCircleLine className="size-5" />,
        info: <RiInformationLine className="size-5" />,
        warning: <RiErrorWarningLine className="size-5" />,
        error: <RiCloseCircleLine className="size-5" />,
        loading: <RiLoader3Line className="size-5 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
