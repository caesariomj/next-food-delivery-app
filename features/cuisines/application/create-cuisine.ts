import { toSlug, toTitleCase } from "@/lib/utils/string";

import {
  insertCuisine,
  isCuisineNameTaken,
} from "../infrastructure/cuisine-repository";
import { CuisineMutationError } from "./cuisine-mutation-error";
import type { CreateCuisineResult } from "./cuisine-types";

export async function createCuisine(
  name: string,
  isActive: boolean,
  description?: string,
  icon?: string
): Promise<CreateCuisineResult> {
  const formattedName = toTitleCase(name);

  const isCuisineDuplicated = await isCuisineNameTaken(formattedName);

  if (isCuisineDuplicated) {
    return {
      success: false,
      reason: "NAME_EXISTS",
    };
  }

  const slug = toSlug(formattedName);

  try {
    const cuisine = await insertCuisine({
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
      "create",
      "Failed to create cuisine",
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
