import dotenv from "dotenv";

dotenv.config();

const requiredEnv = ["JWT_SECRET", "DATABASE_URL"] as const;

for (const key of requiredEnv) {
  if (!process.env[key]) {
    throw new Error(`Missing ${key} in .env`);
  }
}

export const config = {
  JWT_SECRET: process.env.JWT_SECRET as string,
  DATABASE_URL: process.env.DATABASE_URL as string,
  PORT: process.env.PORT ? Number(process.env.PORT) : 4000,
};
