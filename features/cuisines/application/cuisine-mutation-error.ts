type CuisineMutation =
  | "create"
  | "update"
  | "delete"
  | "activate"
  | "deactivate";

export class CuisineMutationError extends Error {
  constructor(
    public readonly operation: CuisineMutation,
    message: string,
    public readonly metadata: {
      publicId?: string;
      publicIds?: string[];
      name?: string;
      slug?: string;
      isActive?: boolean;
    },
    options?: ErrorOptions
  ) {
    super(message, options);
    this.name = "CuisineMutationError";
  }
}
