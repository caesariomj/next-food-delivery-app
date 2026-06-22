import { RiLoader3Line } from "@remixicon/react";

import { cn } from "@/lib/utils/cn";

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <RiLoader3Line
      data-slot="spinner"
      role="status"
      aria-label="Loading"
      className={cn("size-6 animate-spin", className)}
      {...props}
    />
  );
}

export { Spinner };
