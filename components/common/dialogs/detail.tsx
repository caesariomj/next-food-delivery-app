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
  title: string;
  description: string;
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  className?: string;
};

export default function DetailDialog({
  title,
  description,
  children,
  isOpen,
  setIsOpen,
  className,
}: DetailDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="uppercase">
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className={cn("max-h-[80vh] overflow-y-auto p-6", className)}>
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}
