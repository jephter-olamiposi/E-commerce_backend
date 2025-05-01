import { z } from "zod";

export const refreshTokenSchema = z.object({
  token: z.string().nonempty("Refresh token is required"),
});

export type RefreshTokenInput = z.infer<typeof refreshTokenSchema>;
