import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { config } from "../config/env";

const secret: Secret = config.JWT_SECRET;

export const signToken = (
  payload: object,
  expiresIn: SignOptions["expiresIn"] = "10m"
): string => {
  return jwt.sign(payload, secret, { expiresIn });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, secret);
};
