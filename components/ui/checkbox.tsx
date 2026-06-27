"use client";

import * as React from "react";
import { Checkbox as CheckboxPrimitive } from "radix-ui";
import { RiCheckLine } from "@remixicon/react";

import { cn } from "@/lib/utils/cn";

type CheckboxProps = React.ComponentProps<typeof CheckboxPrimitive.Root> & {
  hasError?: boolean;
};

function Checkbox({ className, hasError, ...props }: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer relative flex size-5 shrink-0 items-center justify-center rounded-none border-4 bg-background transition-all duration-200 ease-in-out outline-none group-has-disabled/field:opacity-50 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-primary focus-visible:shadow-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:bg-primary data-checked:text-foreground data-checked:shadow-none dark:data-checked:bg-primary",
        hasError
          ? "border-destructive neo-shadow-sm-destructive"
          : "border-foreground neo-shadow-sm",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none [&>svg]:size-3.5"
      >
        <RiCheckLine />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
