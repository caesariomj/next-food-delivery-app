"use client";

import * as React from "react";

import { RiEyeCloseLine, RiEyeLine } from "@remixicon/react";

import { cn } from "@/lib/utils/cn";

type InputProps = React.ComponentProps<"input"> & {
  hasError?: boolean;
};

function Input({ className, type, hasError, ...props }: InputProps) {
  const [showPassword, setShowPassword] = React.useState(false);

  if (type === "password") {
    return (
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          data-slot="input"
          className={cn(
            "peer h-14 w-full min-w-0 border-4 bg-transparent px-6 py-3 text-base font-semibold transition-all duration-200 ease-in-out outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:font-medium file:text-foreground placeholder:font-semibold placeholder:text-muted-foreground focus-visible:shadow-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-b-destructive dark:aria-invalid:border-b-destructive/50",
            hasError
              ? "border-destructive neo-shadow-destructive placeholder:text-destructive/75 focus-visible:border-destructive"
              : "border-foreground neo-shadow placeholder:text-foreground/75 focus-visible:border-primary",
            className
          )}
          {...props}
        />
        <button
          type="button"
          aria-label={showPassword ? "Hide password" : "Show password"}
          className={cn(
            "absolute top-1/2 right-0 -translate-y-1/2 cursor-pointer border-l-3 p-4 transition-colors duration-200 ease-in-out hover:border-foreground hover:bg-foreground hover:text-background focus:bg-foreground focus:text-background focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            hasError
              ? "border-destructive text-destructive peer-focus:border-destructive"
              : "border-foreground text-foreground peer-focus:border-primary"
          )}
          onClick={() => {
            setShowPassword((prev) => !prev);
          }}
          disabled={props.disabled}
        >
          {!showPassword ? <RiEyeCloseLine /> : <RiEyeLine />}
        </button>
      </div>
    );
  } else {
    return (
      <input
        type={type}
        data-slot="input"
        className={cn(
          "h-14 w-full min-w-0 border-4 bg-transparent px-6 py-3 text-base font-semibold transition-all outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:font-medium file:text-foreground placeholder:font-semibold placeholder:text-muted-foreground focus-visible:shadow-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-b-destructive dark:aria-invalid:border-b-destructive/50",
          hasError
            ? "border-destructive neo-shadow-destructive placeholder:text-destructive/75 focus-visible:border-destructive"
            : "border-foreground neo-shadow placeholder:text-foreground/75 focus-visible:border-primary",
          className
        )}
        {...props}
      />
    );
  }
}

export { Input };
