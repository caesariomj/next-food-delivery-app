"use client";

import type { Dispatch, SetStateAction } from "react";
import { useActionState, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { RiCloseLine, RiSaveFill } from "@remixicon/react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  EmojiPicker,
  EmojiPickerContent,
  EmojiPickerFooter,
  EmojiPickerSearch,
} from "@/components/ui/emoji-picker";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils/cn";
import { toSlug, toTitleCase } from "@/lib/utils/string";

import type { DashboardPageCuisine } from "../application/cuisine-types";
import {
  CUISINE_DESCRIPTION_MAX_LENGTH,
  CUISINE_DESCRIPTION_MIN_LENGTH,
  CUISINE_NAME_MAX_LENGTH,
  CUISINE_NAME_MIN_LENGTH,
  CUISINE_SLUG_MAX_LENGTH,
  CUISINE_SLUG_MIN_LENGTH,
} from "../domain/cuisine-constant";
import {
  type CuisineActionState,
  createCuisineAction,
  editCuisineAction,
} from "./actions";

const initialState: CuisineActionState = {
  success: false,
  errors: undefined,
  message: undefined,
  data: undefined,
};

type CuisineFormSheetProps = {
  isOpen: boolean;
  setIsOpenAction: Dispatch<SetStateAction<boolean>>;
  selectedCuisine: DashboardPageCuisine | null;
};

export default function CuisineFormSheet({
  isOpen,
  setIsOpenAction,
  selectedCuisine,
}: CuisineFormSheetProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const mode = selectedCuisine ? "edit" : "create";

  const [state, formAction, pending] = useActionState(
    mode === "create" ? createCuisineAction : editCuisineAction,
    initialState
  );

  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);

  const [name, setName] = useState<string>(selectedCuisine?.name || "");
  const [slug, setSlug] = useState<string>(selectedCuisine?.slug || "");
  const [icon, setIcon] = useState<{ emoji: string; label: string }>({
    emoji: selectedCuisine?.icon || "",
    label: selectedCuisine?.name || "",
  });
  const [isActive, setIsActive] = useState<boolean>(
    selectedCuisine?.isActive ?? true
  );

  function resetForm() {
    setName("");
    setSlug("");
    setIcon({ emoji: "", label: "" });
    setIsActive(true);
  }

  useEffect(() => {
    if (!state.message) return;

    toast.error(state.message);
  }, [state.message]);

  useEffect(() => {
    if (!state.success || !state.data || state.data.type !== "upsert") return;

    toast.success("Success!", {
      description: `${toTitleCase(state.data.cuisine.name)} cuisine ${mode === "create" ? "added" : "updated"} successfully.`,
    });

    if (mode !== "edit") {
      resetForm();
    }

    formRef.current?.reset();
    setIsOpenAction(false);

    router.refresh();
  }, [state.data, state.success, mode, setIsOpenAction, router]);

  return (
    <Sheet
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpenAction(open);

        if (!open && mode !== "edit") {
          resetForm();
        }
      }}
      aria-describedby="cuisine-form-sheet"
    >
      <SheetContent className="w-screen! overflow-y-scroll sm:w-150! sm:max-w-none!">
        <SheetHeader>
          <SheetTitle className="w-full max-w-96 text-6xl tracking-tight sm:max-w-md">
            {mode === "create"
              ? "Add Cuisine"
              : `Edit ${selectedCuisine?.name}`}
          </SheetTitle>
          <SheetDescription id="cuisine-form-sheet">
            Create a new cuisine or update an existing one. Keep your menu fresh
            and organized.
          </SheetDescription>
        </SheetHeader>
        <form
          ref={formRef}
          action={formAction}
          className="flex w-full flex-col gap-4 px-8"
        >
          <FieldSet>
            <FieldGroup>
              {selectedCuisine?.publicId && (
                <input
                  type="hidden"
                  name="publicId"
                  value={selectedCuisine.publicId}
                />
              )}
              <Field>
                <FieldLabel
                  htmlFor="name"
                  className={state.errors?.name ? "text-destructive" : ""}
                >
                  Name <span className="text-sm text-error-500">*</span>
                </FieldLabel>
                <FieldDescription>Enter the cuisine name.</FieldDescription>
                <Input
                  id="name"
                  name="name"
                  placeholder="Chinese Food"
                  minLength={CUISINE_NAME_MIN_LENGTH}
                  maxLength={CUISINE_NAME_MAX_LENGTH}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setSlug(toSlug(e.target.value));
                  }}
                  aria-invalid={state.errors?.name ? "true" : "false"}
                />
                <FieldError errors={state.errors?.name} />
              </Field>
              <Field>
                <FieldLabel
                  htmlFor="slug"
                  className={state.errors?.slug ? "text-destructive" : ""}
                >
                  Slug <span className="text-sm text-error-500">*</span>
                </FieldLabel>
                <FieldDescription>
                  Enter the cuisine slug. (autofilled)
                </FieldDescription>
                <Input
                  id="slug"
                  value={slug}
                  placeholder="chinese-food"
                  minLength={CUISINE_SLUG_MIN_LENGTH}
                  maxLength={CUISINE_SLUG_MAX_LENGTH}
                  disabled
                />
                <FieldError errors={state.errors?.slug} />
              </Field>
              <Field>
                <Label
                  className={cn(
                    "text-lg font-semibold uppercase",
                    state.errors?.icon ? "text-destructive" : "text-foreground"
                  )}
                >
                  Icon<span className="ms-2 text-sm text-error-500">*</span>
                </Label>
                <FieldDescription className="text-left text-sm text-muted-foreground normal-case">
                  Select an icon for the cuisine.
                </FieldDescription>
                <div className="flex flex-row items-center gap-4">
                  <div
                    className={cn(
                      "flex size-14 items-center justify-center border-4 bg-background text-2xl",
                      state.errors?.icon
                        ? "border-destructive neo-shadow-destructive"
                        : "border-foreground neo-shadow"
                    )}
                  >
                    {icon.emoji}
                  </div>
                  <span
                    className={cn(
                      "text-sm font-semibold uppercase",
                      state.errors?.icon
                        ? "text-destructive"
                        : "text-foreground"
                    )}
                  >
                    {icon.label || "No icon selected"}
                  </span>
                </div>
                <Popover
                  open={isEmojiPickerOpen}
                  onOpenChange={setIsEmojiPickerOpen}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      size="lg"
                      className={cn(
                        "w-full",
                        state.errors?.icon
                          ? "border-destructive text-destructive neo-shadow-destructive"
                          : "border-foreground text-foreground neo-shadow"
                      )}
                    >
                      Pick Icon
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    sideOffset={10}
                    className="w-fit rounded-lg p-0"
                  >
                    <EmojiPicker
                      className="h-80 rounded-lg border-4 shadow-md"
                      onEmojiSelect={({ emoji, label }) => {
                        setIcon({ emoji, label });
                        setIsEmojiPickerOpen(false);
                      }}
                    >
                      <EmojiPickerSearch />
                      <EmojiPickerContent />
                      <EmojiPickerFooter />
                    </EmojiPicker>
                  </PopoverContent>
                </Popover>
                <FieldError errors={state.errors?.icon} />
                <input type="hidden" name="icon" value={icon.emoji} />
              </Field>
              <Field>
                <FieldLabel
                  htmlFor="description"
                  className={
                    state.errors?.description ? "text-destructive" : ""
                  }
                >
                  Description
                </FieldLabel>
                <FieldDescription>
                  Enter the cuisine description.
                </FieldDescription>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Bold flavors, fresh stir-fries, and authentic regional spices."
                  className="min-h-24 resize-none"
                  minLength={CUISINE_DESCRIPTION_MIN_LENGTH}
                  maxLength={CUISINE_DESCRIPTION_MAX_LENGTH}
                  defaultValue={selectedCuisine?.description || ""}
                  aria-invalid={state.errors?.description ? "true" : "false"}
                />
                <FieldError errors={state.errors?.description} />
              </Field>
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldLabel
                    htmlFor="isActive"
                    className={state.errors?.isActive ? "text-destructive" : ""}
                  >
                    Status
                  </FieldLabel>
                  <FieldDescription>
                    Activate or deactivate the cuisine. Deactivated cuisines
                    will not be visible to users.
                  </FieldDescription>
                </FieldContent>
                <div className="inline-flex items-center gap-2">
                  <span
                    className={cn(
                      "text-sm",
                      state.errors?.isActive
                        ? "text-destructive"
                        : "text-foreground"
                    )}
                  >
                    Inactive
                  </span>
                  <Switch
                    id="isActive"
                    size="default"
                    checked={isActive}
                    onCheckedChange={() => setIsActive(!isActive)}
                    aria-invalid={state.errors?.isActive ? "true" : "false"}
                  />
                  <span
                    className={cn(
                      "text-sm",
                      state.errors?.isActive
                        ? "text-destructive"
                        : "text-foreground"
                    )}
                  >
                    Active
                  </span>
                </div>
                <FieldError errors={state.errors?.isActive} />
              </Field>
              <input
                type="hidden"
                name="isActive"
                value={isActive.toString()}
              />
            </FieldGroup>
          </FieldSet>
          <div className="my-8 flex w-full flex-col items-center justify-end gap-4 sm:flex-row">
            <Button
              type="reset"
              variant="outline"
              size="lg"
              className="w-full sm:w-fit"
              onClick={() => setIsOpenAction(false)}
              disabled={pending}
            >
              <RiCloseLine />
              Cancel
            </Button>
            <Button
              type="submit"
              size="lg"
              className="w-full sm:w-fit"
              disabled={pending}
            >
              {pending ? (
                <>
                  <Spinner />
                  <span>{mode === "create" ? "Adding..." : "Saving..."}</span>
                </>
              ) : (
                <>
                  <RiSaveFill />
                  Save
                </>
              )}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
