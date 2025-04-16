import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";

const secret: Secret = JWT_SECRET;

export const signToken = (
  payload: object,
  expiresIn: SignOptions["expiresIn"] = "1d"
) => {
  return jwt.sign(payload, secret, { expiresIn });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, secret);
};
