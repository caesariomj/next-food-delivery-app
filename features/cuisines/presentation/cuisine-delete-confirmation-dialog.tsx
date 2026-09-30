"use client";

import type { Dispatch, SetStateAction } from "react";
import { useActionState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

import ConfirmationDialog from "@/components/common/dialogs/confirmation";

import type { DashboardPageCuisine } from "../application/cuisine-types";
import { type CuisineActionState, bulkDeleteCuisinesAction } from "./actions";

const initialState: CuisineActionState = {
  success: false,
  errors: undefined,
  message: undefined,
  data: undefined,
};

type CuisineDeleteConfirmationDialogProps = {
  selectedCuisines: DashboardPageCuisine[];
  setSelectedCuisines: Dispatch<SetStateAction<DashboardPageCuisine[]>>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export default function CuisineDeleteConfirmationDialog({
  selectedCuisines,
  setSelectedCuisines,
  isOpen,
  setIsOpen,
}: CuisineDeleteConfirmationDialogProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const [state, formAction, pending] = useActionState(
    bulkDeleteCuisinesAction,
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
      state.data.action !== "delete"
    )
      return;

    toast.success("Success!", {
      description: `${state.data.affected > 1 ? `${state.data.affected} cuisines` : "1 cuisine"} deleted successfully.`,
    });

    setSelectedCuisines([]);
    setIsOpen(false);

    router.refresh();
  }, [router, setIsOpen, setSelectedCuisines, state.data, state.success]);

  return (
    <>
      <ConfirmationDialog
        action="delete"
        title={
          selectedCuisines.length > 1 ? "Delete Cuisines" : "Delete Cuisine"
        }
        selectedItems={selectedCuisines}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onConfirmed={() => formRef.current?.requestSubmit()}
        isPending={pending}
      />
      <form ref={formRef} action={formAction}>
        {selectedCuisines.map((cuisine) => (
          <input
            key={cuisine.publicId}
            type="hidden"
            name="publicIds"
            value={cuisine.publicId}
          />
        ))}
      </form>
    </>
  );
}
