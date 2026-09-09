import type { Dispatch, ReactNode, SetStateAction } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils/cn";

type DetailDialogProps = {
  className?: string;
  title: string;
  description: string;
  children: ReactNode;
  isOpen: boolean;
  setIsOpenAction: Dispatch<SetStateAction<boolean>>;
};

export default function DetailDialog({
  title,
  description,
  children,
  isOpen,
  setIsOpenAction,
  className,
}: DetailDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpenAction}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="uppercase">
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className={cn("px-6 pb-6", className)}>{children}</div>
      </DialogContent>
    </Dialog>
  );
}
