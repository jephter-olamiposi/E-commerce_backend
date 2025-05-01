import { z } from "zod";
import { createAddressSchema } from "./addressSchema";

export const orderItemSchema = z.object({
  product_id: z.number().int(),
  quantity: z.number().int().positive(),
});

export const createOrderSchema = z.object({
  address: createAddressSchema, // Use imported schema
  items: z.array(orderItemSchema).min(1, "At least one item is required"),
});

export const idParamSchema = z.object({
  id: z.string().regex(/^\d+$/, "Product ID must be a valid number"),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
