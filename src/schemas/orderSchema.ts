import { z } from "zod";

export const createAddressSchema = z.object({
  street: z.string(),
  city: z.string(),
  state: z.string(),
  zip_code: z.string(),
  country: z.string(),
});

export const orderItemSchema = z.object({
  product_id: z.number().int(),
  quantity: z.number().int().positive(),
});

export const createOrderSchema = z.object({
  address: createAddressSchema,
  items: z.array(orderItemSchema).min(1, "At least one item is required"),
});

export const idParamSchema = z.object({
  id: z.string().refine((val) => /^\d+$/.test(val), {
    message: "ID must be a valid number",
  }),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
