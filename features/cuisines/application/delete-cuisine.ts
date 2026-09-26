import { deleteCuisineByPublicIds } from "../infrastructure/cuisine-repository";
import { CuisineMutationError } from "./cuisine-mutation-error";
import type { BulkActionCuisineResult } from "./cuisine-types";

export async function deleteCuisines(
  publicIds: string[]
): Promise<BulkActionCuisineResult> {
  try {
    const { count } = await deleteCuisineByPublicIds({
      where: {
        publicId: {
          in: publicIds,
        },
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
      "delete",
      `Failed to delete cuisines with public ids: ${publicIds.join(", ")}`,
      { publicIds },
      { cause: error }
    );
  }
}
