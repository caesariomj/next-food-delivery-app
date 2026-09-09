"use client";

import type { Dispatch, SetStateAction } from "react";

import { RiDeleteBinLine } from "@remixicon/react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Spinner } from "../../ui/spinner";

type ConfirmationDialogProps<T> = {
  action: "delete";
  title: string;
  selectedItems: T[] | null;
  isOpen: boolean;
  setIsOpenAction: Dispatch<SetStateAction<boolean>>;
  onConfirmedAction: () => void;
  pending: boolean;
};

export default function ConfirmationDialog<T>({
  action,
  title,
  selectedItems,
  isOpen,
  setIsOpenAction,
  onConfirmedAction,
  pending,
}: ConfirmationDialogProps<T>) {
  const itemCount = selectedItems?.length ?? 0;
  const itemLabel =
    itemCount > 1
      ? `${action} these ${itemCount} items`
      : `${action} this item`;
  const actionLabel = itemCount > 1 ? `Yes, ${action} ${itemCount}` : action;
  let actionPendingLabel;

  switch (action) {
    case "delete":
      actionPendingLabel = "Deleting...";
      break;

    default:
      actionPendingLabel = "Processing...";
      break;
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpenAction}>
      <AlertDialogContent>
        <AlertDialogHeader className="h-72">
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogMedia>
            <RiDeleteBinLine className="size-16 text-destructive dark:text-destructive" />
          </AlertDialogMedia>
          <AlertDialogDescription className="text-center">
            Are you sure you want to {itemLabel}? This action can&apos;t be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="">
          <AlertDialogCancel asChild>
            <button
              className="w-full cursor-pointer bg-background px-8 py-4 text-lg font-semibold text-foreground transition-colors duration-200 ease-in-out hover:bg-foreground/10 focus:bg-foreground/10 focus:outline-none"
              disabled={pending}
            >
              Cancel
            </button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <button
              className="w-full cursor-pointer bg-destructive px-8 py-4 text-lg font-semibold text-background capitalize transition-colors duration-200 ease-in-out hover:bg-error-600 focus:bg-error-600 focus:outline-none"
              onClick={onConfirmedAction}
              disabled={pending}
            >
              {pending ? (
                <>
                  <Spinner />
                  <span>{actionPendingLabel}</span>
                </>
              ) : (
                actionLabel
              )}
            </button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
