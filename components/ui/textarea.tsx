"use client";

import * as React from "react";

import { cn } from "@/lib/utils/cn";

function Textarea({
  className,
  defaultValue = "",
  maxLength = 0,
  ...props
}: React.ComponentProps<"textarea">) {
  const [value, setValue] = React.useState(String(defaultValue));

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > maxLength) return;

    setValue(e.target.value);
  };

  return (
    <>
      <textarea
        data-slot="textarea"
        className={cn(
          "flex field-sizing-content min-h-16 w-full resize-none rounded-none border-4 border-foreground bg-transparent px-2 py-3 text-base neo-shadow transition-all duration-200 ease-in-out outline-none placeholder:text-muted-foreground focus-visible:border-primary focus-visible:shadow-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:neo-shadow-destructive aria-invalid:placeholder:text-destructive/75 aria-invalid:focus-visible:shadow-none md:text-sm dark:aria-invalid:border-destructive/50 dark:aria-invalid:neo-shadow-destructive dark:aria-invalid:placeholder:text-destructive/75 dark:aria-invalid:focus-visible:shadow-none",
          className
        )}
        value={value}
        onChange={handleChange}
        {...props}
      />
      {maxLength > 0 && (
        <span
          className={cn(
            "text-end text-sm",
            value.length > maxLength ? "text-destructive" : "text-foreground"
          )}
        >
          {value.length}/{maxLength}
        </span>
      )}
    </>
  );
}

export { Textarea };
