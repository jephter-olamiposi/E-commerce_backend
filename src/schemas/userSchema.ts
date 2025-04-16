import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  first_name: z.string(),
  last_name: z.string(),
  phone: z.string().optional(),
  role: z.enum(["admin", "customer"]),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
