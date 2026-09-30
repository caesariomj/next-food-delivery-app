"use client";

import type { ReactNode } from "react";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import {
  bulkUpdateCuisineStatusAction,
  type CuisineActionState,
} from "./actions";

const initialState: CuisineActionState = {
  success: false,
  errors: undefined,
  message: undefined,
  data: undefined,
};

type CuisineStatusActionButtonProps = {
  publicIds: string[];
  status: "active" | "inactive";
  children: ReactNode;
  onSuccessAction: () => void;
};

export default function CuisineStatusActionButton({
  publicIds,
  status,
  children,
  onSuccessAction,
}: CuisineStatusActionButtonProps) {
  const router = useRouter();

  const [state, formAction, pending] = useActionState(
    bulkUpdateCuisineStatusAction,
    initialState
  );

  useEffect(() => {
    if (!state.message) return;

    toast.error(state.message);
  }, [state.message]);

  useEffect(() => {
    if (
      !state.success ||
      !state.data ||
      state.data.type !== "bulk" ||
      state.data.action !== "updateStatus"
    )
      return;

    toast.success("Success", {
      description: `${state.data.affected > 1 ? `${state.data.affected} cuisines` : "1 cuisine"} status updated to ${status}.`,
    });

    onSuccessAction();

    router.refresh();
  }, [router, state.data, state.success, status, onSuccessAction]);

  return (
    <form action={formAction}>
      <input type="hidden" name="status" value={status} />
      {publicIds.map((publicId) => (
        <input key={publicId} type="hidden" name="publicIds" value={publicId} />
      ))}
      <Button
        type="submit"
        variant="outline"
        size="lg"
        className="w-1/2 px-6 lg:w-fit lg:px-8"
      >
        {pending ? "Loading..." : children}
      </Button>
    </form>
  );
}
