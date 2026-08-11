import * as React from "react";

import { Checkbox as CheckboxPrimitive } from "radix-ui";
import { RiCheckLine } from "@remixicon/react";

import { cn } from "@/lib/utils/cn";

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer aria-invalid:aria-checked:border-destructuve dark:aria-invalid:aria-checked:border-destructuve relative flex size-5 shrink-0 items-center justify-center rounded-none border-4 border-foreground bg-background neo-shadow-sm transition-all duration-200 ease-in-out outline-none group-has-disabled/field:opacity-50 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-primary focus-visible:shadow-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:neo-shadow-sm-destructive dark:aria-invalid:border-destructive dark:aria-invalid:neo-shadow-sm-destructive data-checked:bg-primary data-checked:text-foreground data-checked:shadow-none dark:data-checked:bg-primary",
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
