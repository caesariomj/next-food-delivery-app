import * as React from "react";

import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils/cn";

const badgeVariants = cva(
  "group/badge inline-flex w-fit shrink-0 items-center justify-center gap-1.5 overflow-hidden rounded-none border-0 px-0 py-0 text-sm font-semibold tracking-tight whitespace-nowrap uppercase transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-0 has-data-[icon=inline-start]:pl-0 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "bg-primary text-foreground [a]:hover:text-foreground/70",
        secondary: "bg-secondary text-background [a]:hover:text-foreground",
        destructive:
          "bg-destructive text-background focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:text-destructive/70",
        success:
          "bg-success text-background focus-visible:ring-success/20 dark:focus-visible:ring-success/40 [a]:hover:text-success/70",
        outline:
          "border-2 border-foreground bg-foreground/10 text-foreground [a]:hover:text-foreground/70",
        "outline-background":
          "border-2 border-background text-background [a]:hover:text-background/70",
        "outline-primary":
          "border-2 border-primary-700 bg-primary-100 text-primary-700 dark:border-primary-400 dark:bg-primary-950/50 dark:text-primary-400 [a]:hover:text-primary/70",
        "outline-secondary":
          "border-2 border-secondary-700 bg-secondary-100 text-secondary-700 dark:border-secondary-400 dark:bg-secondary-950/50 dark:text-secondary-400 [a]:hover:text-foreground",
        "outline-destructive":
          "border-2 border-error-700 bg-error-100 text-error-700 focus-visible:ring-destructive/20 dark:border-error-400 dark:bg-error-950/50 dark:text-error-400 dark:focus-visible:ring-destructive/40 [a]:hover:text-destructive/70",
        "outline-success":
          "border-2 border-success-700 bg-success-100 text-success-700 focus-visible:ring-success/20 dark:border-success-400 dark:bg-success-950/50 dark:text-success-400 dark:focus-visible:ring-success/40 [a]:hover:text-success/70",
        ghost: "text-muted-foreground hover:text-foreground",
        link: "text-foreground underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

type BadgeProps = React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean };

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: BadgeProps) {
  const Comp = asChild ? Slot.Root : "span";

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
