import dotenv from "dotenv";

dotenv.config();

if (!process.env.JWT_SECRET) {
  throw new Error("Missing JWT_SECRET in .env");
}

if (!process.env.DATABASE_URL) {
  throw new Error("Missing DATABASE_URL in .env");
}

export const JWT_SECRET = process.env.JWT_SECRET;
export const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
export const DATABASE_URL = process.env.DATABASE_URL;
