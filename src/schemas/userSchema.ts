import { z } from "zod";

export const roleEnum = z.enum(["admin", "customer"]);
export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  first_name: z.string(),
  last_name: z.string(),
  phone: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const adminCreateUserSchema = registerSchema.extend({
  role: roleEnum,
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type UserRole = z.infer<typeof roleEnum>;
export type AdminCreateInput = z.infer<typeof adminCreateUserSchema>;
