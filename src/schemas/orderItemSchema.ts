import { z } from "zod";

export const orderIdParamSchema = z.object({
  id: z.string().regex(/^\d+$/, "Order ID must be a number"),
});

export type OrderIdParams = z.infer<typeof orderIdParamSchema>;
