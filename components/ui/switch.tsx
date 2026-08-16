"use client";

import * as React from "react";

import { Switch as SwitchPrimitive } from "radix-ui";

import { cn } from "@/lib/utils/cn";

function Switch({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: "sm" | "default";
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "peer group/switch relative inline-flex shrink-0 cursor-pointer items-center rounded-none border-4 transition-all outline-none after:absolute after:-inset-x-3 after:-inset-y-2 aria-invalid:border-destructive data-[size=default]:h-4.5 data-[size=default]:w-8.25 data-[size=sm]:h-2 data-[size=sm]:w-6.25 dark:aria-invalid:border-destructive/50 data-checked:border-primary data-checked:bg-primary data-checked:aria-invalid:bg-destructive data-unchecked:border-foreground data-unchecked:bg-foreground data-unchecked:aria-invalid:bg-destructive data-disabled:cursor-not-allowed data-disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none block bg-background ring-0 transition-transform group-data-[size=default]/switch:size-2 group-data-[size=sm]/switch:size-2 data-checked:translate-x-[calc(100%+10px)] dark:data-checked:bg-primary-foreground data-unchecked:translate-x-px dark:data-unchecked:bg-foreground"
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
