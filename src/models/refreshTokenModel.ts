import db from "../config/knex";

export interface RefreshTokenRecord {
  id: number;
  user_id: number;
  token: string;
  revoked: boolean;
  expires_at: Date;
  created_at: Date;
}

export const createRefreshToken = async (
  userId: number,
  token: string,
  expiresAt: Date
): Promise<RefreshTokenRecord> => {
  const [record] = await db<RefreshTokenRecord>("refresh_tokens")
    .insert({ user_id: userId, token, expires_at: expiresAt })
    .returning("*");
  return record;
};

export const findRefreshToken = async (
  token: string
): Promise<RefreshTokenRecord | undefined> => {
  return db<RefreshTokenRecord>("refresh_tokens")
    .where({ token, revoked: false })
    .andWhere("expires_at", ">", new Date())
    .first();
};

export const revokeRefreshToken = async (token: string): Promise<number> => {
  return db("refresh_tokens").where({ token }).update({ revoked: true });
};

export const deleteExpiredTokens = async (): Promise<number> => {
  return db("refresh_tokens").where("expires_at", "<", new Date()).del();
};
