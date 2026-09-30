"use server";

import { z } from "zod";

import { GENERIC_ERROR_MESSAGE } from "@/lib/constants/validation";
import type { FieldError } from "@/types/form";

import { createCuisine } from "../application/create-cuisine";
import { CuisineMutationError } from "../application/cuisine-mutation-error";
import { deleteCuisines } from "../application/delete-cuisine";
import { editCuisine, editCuisinesStatus } from "../application/edit-cuisine";
import {
  cuisineBulkActionSchema,
  cuisineBulkStatusSchema,
  cuisineCreateSchema,
  cuisineEditSchema,
} from "../domain/cuisine-schema";
import { reportCuisineError } from "../infrastructure/cuisine-error-monitoring";

export type CuisineActionState = {
  success: boolean;
  errors?: {
    name?: FieldError[];
    slug?: FieldError[];
    icon?: FieldError[];
    description?: FieldError[];
    isActive?: FieldError[];
  };
  message?: string;
  data?:
    | {
        type: "upsert";
        cuisine: {
          name: string;
        };
      }
    | {
        type: "bulk";
        action: "delete" | "updateStatus";
        affected: number;
      }
    | null;
};

function getRawData(formData: FormData) {
  return {
    publicId: formData.get("publicId"),
    name: formData.get("name"),
    description: formData.get("description") || undefined,
    icon: formData.get("icon") || "🍽️",
    isActive: formData.get("isActive") === "true",
  };
}

// TODO: Make this into global validation util
function mapFieldErrors(
  errors: Partial<
    Record<"name" | "description" | "icon" | "isActive", string[]>
  >
): CuisineActionState["errors"] {
  return {
    name: errors.name?.map((message) => ({ message })),
    description: errors.description?.map((message) => ({ message })),
    icon: errors.icon?.map((message) => ({ message })),
    isActive: errors.isActive?.map((message) => ({ message })),
  };
}

export async function createCuisineAction(
  _: CuisineActionState,
  formData: FormData
): Promise<CuisineActionState> {
  const rawData = getRawData(formData);

  const validated = cuisineCreateSchema.safeParse(rawData);

  if (!validated.success) {
    const errors = z.flattenError(validated.error).fieldErrors;

    return {
      success: false,
      errors: mapFieldErrors(errors),
    };
  }

  try {
    const { name, description, icon, isActive } = validated.data;

    const result = await createCuisine(name, isActive, description, icon);

    if (!result.success) {
      switch (result.reason) {
        case "NAME_EXISTS":
          return {
            success: false,
            errors: {
              name: [{ message: "Cuisine with this name already exists!" }],
            },
          };
        default:
          return {
            success: false,
            message: GENERIC_ERROR_MESSAGE,
          };
      }
    }

    return {
      success: true,
      data: {
        type: "upsert",
        cuisine: {
          name: result.cuisine.name,
        },
      },
    };
  } catch (error) {
    reportCuisineError({
      context: "create",
      error,
      metadata:
        error instanceof CuisineMutationError ? error.metadata : undefined,
    });

    return {
      success: false,
      message: GENERIC_ERROR_MESSAGE,
    };
  }
}

export async function editCuisineAction(
  _: CuisineActionState,
  formData: FormData
): Promise<CuisineActionState> {
  const rawData = getRawData(formData);

  const validated = cuisineEditSchema.safeParse(rawData);

  if (!validated.success) {
    const errors = z.flattenError(validated.error).fieldErrors;

    if (errors.publicId) {
      return {
        success: false,
        message: "Invalid public ID provided.",
      };
    }

    return {
      success: false,
      errors: mapFieldErrors(errors),
    };
  }

  try {
    const { publicId, name, description, icon, isActive } = validated.data;

    const result = await editCuisine(
      publicId,
      name,
      isActive,
      description,
      icon
    );

    if (!result.success) {
      switch (result.reason) {
        case "NAME_EXISTS":
          return {
            success: false,
            errors: {
              name: [{ message: "Cuisine with this name already exists!" }],
            },
          };
        default:
          return {
            success: false,
            message: GENERIC_ERROR_MESSAGE,
          };
      }
    }

    return {
      success: true,
      data: {
        type: "upsert",
        cuisine: {
          name: result.cuisine.name,
        },
      },
    };
  } catch (error) {
    reportCuisineError({
      context: "edit",
      error,
      metadata:
        error instanceof CuisineMutationError ? error.metadata : undefined,
    });

    return {
      success: false,
      message: GENERIC_ERROR_MESSAGE,
    };
  }
}

export async function bulkDeleteCuisinesAction(
  _: CuisineActionState,
  formData: FormData
): Promise<CuisineActionState> {
  const publicIds = formData.getAll("publicIds");

  const validated = cuisineBulkActionSchema.safeParse({
    publicIds,
  });

  if (!validated.success) {
    return {
      success: false,
      message: "Invalid public IDs provided.",
    };
  }

  try {
    const validatedPublicIds = validated.data.publicIds;

    const result = await deleteCuisines(validatedPublicIds);

    if (!result.success) {
      switch (result.reason) {
        case "CUISINE_NONEXISTENT":
          return {
            success: false,
            message: GENERIC_ERROR_MESSAGE,
          };
        default:
          return {
            success: false,
            message: GENERIC_ERROR_MESSAGE,
          };
      }
    }

    return {
      success: true,
      data: {
        type: "bulk",
        action: "delete",
        affected: result.data.affected,
      },
    };
  } catch (error) {
    reportCuisineError({
      context: "delete",
      error,
      metadata:
        error instanceof CuisineMutationError ? error.metadata : undefined,
    });

    return {
      success: false,
      message: GENERIC_ERROR_MESSAGE,
    };
  }
}

export async function bulkUpdateCuisineStatusAction(
  _: CuisineActionState,
  formData: FormData
): Promise<CuisineActionState> {
  const publicIds = formData.getAll("publicIds");
  const status = formData.get("status");

  const validated = cuisineBulkStatusSchema.safeParse({
    publicIds,
    isActive: status,
  });

  if (!validated.success) {
    const errors = z.flattenError(validated.error).fieldErrors;

    if (errors.isActive) {
      return {
        success: false,
        message: "Status must be either 'active' or 'inactive'.",
      };
    }

    return {
      success: false,
      message: "Invalid public IDs provided.",
    };
  }

  try {
    const { publicIds, isActive } = validated.data;

    const result = await editCuisinesStatus(publicIds, isActive === "active");

    if (!result.success) {
      switch (result.reason) {
        case "CUISINE_NONEXISTENT":
          return {
            success: false,
            message: GENERIC_ERROR_MESSAGE,
          };
        default:
          return {
            success: false,
            message: GENERIC_ERROR_MESSAGE,
          };
      }
    }

    return {
      success: true,
      data: {
        type: "bulk",
        action: "updateStatus",
        affected: result.data.affected,
      },
    };
  } catch (error) {
    reportCuisineError({
      context: "edit",
      error,
      metadata:
        error instanceof CuisineMutationError ? error.metadata : undefined,
    });

    return {
      success: false,
      message: GENERIC_ERROR_MESSAGE,
    };
  }
}
