import { toSlug, toTitleCase } from "@/lib/utils/string";

import {
  isCuisineNameTaken,
  updateCuisine,
  updateCuisines,
} from "../infrastructure/cuisine-repository";
import { CuisineMutationError } from "./cuisine-mutation-error";
import type {
  BulkActionCuisineResult,
  UpdateCuisineResult,
} from "./cuisine-types";

export async function editCuisine(
  publicId: string,
  name: string,
  isActive: boolean,
  description?: string,
  icon?: string
): Promise<UpdateCuisineResult> {
  const formattedName = toTitleCase(name);

  const isCuisineDuplicated = await isCuisineNameTaken(formattedName, publicId);

  if (isCuisineDuplicated) {
    return {
      success: false,
      reason: "NAME_EXISTS",
    };
  }

  const slug = toSlug(formattedName);

  try {
    const cuisine = await updateCuisine({
      where: { publicId },
      data: { name: formattedName, slug, description, icon, isActive },
    });

    return {
      success: true,
      cuisine: {
        name: cuisine.name,
      },
    };
  } catch (error) {
    throw new CuisineMutationError(
      "update",
      `Failed to update ${formattedName} cuisine`,
      {
        name: formattedName,
        slug,
        isActive,
      },
      {
        cause: error,
      }
    );
  }
}

export async function editCuisinesStatus(
  publicIds: string[],
  status: boolean
): Promise<BulkActionCuisineResult> {
  if (publicIds.length <= 0) {
    return {
      success: false,
      reason: "CUISINE_NONEXISTENT",
    };
  }

  try {
    const { count } = await updateCuisines({
      where: {
        publicId: {
          in: publicIds,
        },
      },
      data: {
        isActive: status,
      },
    });

    if (count === 0) {
      return {
        success: false,
        reason: "CUISINE_NONEXISTENT",
      };
    }

    return {
      success: true,
      data: {
        affected: count,
      },
    };
  } catch (error) {
    throw new CuisineMutationError(
      "update",
      `Failed to update status for cuisines with public ids: ${publicIds.join(", ")}`,
      { publicIds },
      { cause: error }
    );
  }
}
