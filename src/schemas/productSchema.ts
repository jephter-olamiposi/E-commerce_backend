import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().optional(),
  price: z.number().positive("Price must be greater than 0"),
  image_url: z.string().url("Image URL must be valid").optional(),
  category_id: z.number().int("Category ID must be an integer"),
});

export const updateProductSchema = createProductSchema.partial();

export const idParamSchema = z.object({
  id: z.string().regex(/^\d+$/, "Product ID must be a valid number"),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
