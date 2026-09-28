import { z } from "zod";

import {
  CUISINE_DESCRIPTION_MAX_LENGTH,
  CUISINE_DESCRIPTION_MIN_LENGTH,
  CUISINE_NAME_MAX_LENGTH,
  CUISINE_NAME_MIN_LENGTH,
} from "./cuisine-constant";

const publicIdSchema = z.uuidv7({ error: "Invalid public id format!" });

const nameSchema = z
  .string()
  .trim()
  .min(CUISINE_NAME_MIN_LENGTH, {
    error: `Name must be at least ${CUISINE_NAME_MIN_LENGTH} characters long!`,
  })
  .max(CUISINE_NAME_MAX_LENGTH, {
    error: `Name must be at most ${CUISINE_NAME_MAX_LENGTH} characters long!`,
  });

const descriptionSchema = z
  .string()
  .trim()
  .min(CUISINE_DESCRIPTION_MIN_LENGTH, {
    error: `Description must be at least ${CUISINE_DESCRIPTION_MIN_LENGTH} characters long!`,
  })
  .max(CUISINE_DESCRIPTION_MAX_LENGTH, {
    error: `Description must be at most ${CUISINE_DESCRIPTION_MAX_LENGTH} characters long!`,
  })
  .optional();

const iconSchema = z.emoji({ error: "Icon must be an emoji!" }).optional();

const isActiveSchema = z.boolean({
  error: "Status must be checked or unchecked!",
});

export const cuisineCreateSchema = z.object({
  name: nameSchema,
  description: descriptionSchema,
  icon: iconSchema,
  isActive: isActiveSchema,
});

export const cuisineEditSchema = z.object({
  publicId: publicIdSchema,
  name: nameSchema,
  description: descriptionSchema,
  icon: iconSchema,
  isActive: isActiveSchema,
});

export const cuisineBulkActionSchema = z.object({
  publicIds: z.array(publicIdSchema).min(1),
});

export const cuisineBulkStatusSchema = cuisineBulkActionSchema.extend({
  isActive: z.enum(["active", "inactive"]),
});
