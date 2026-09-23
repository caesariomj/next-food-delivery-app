"use client";

import { type ComponentProps, useState } from "react";
import { useRouter } from "next/navigation";

import { RiLogoutBoxLine } from "@remixicon/react";
import { toast } from "sonner";

import { GENERIC_ERROR_MESSAGE } from "@/lib/constants/validation";
import { cn } from "@/lib/utils/cn";

import { signOut } from "../application/sign-out";
import { reportAuthError } from "../infrastructure/auth-error-monitoring";

export default function SignOutButton({
  className,
  ...props
}: ComponentProps<"button">) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSignOut(): Promise<void> {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const { error } = await signOut();

      if (error) {
        reportAuthError({
          context: "sign_out",
          errorCode: error.code,
          error,
        });

        toast.error(error.message ?? "Failed to sign out.");
        return;
      }

      router.replace("/");
    } catch (error) {
      reportAuthError({
        context: "sign_out",
        error,
      });

      toast.error(GENERIC_ERROR_MESSAGE);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      className={cn(className)}
      {...props}
      onClick={handleSignOut}
      disabled={isLoading}
    >
      <RiLogoutBoxLine />
      {isLoading ? "Signing Out..." : "Sign Out"}
    </button>
  );
}
