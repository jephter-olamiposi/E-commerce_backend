import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

import { UserPayload } from "../types/user";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Unauthorized: Token required" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token) as UserPayload;

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
