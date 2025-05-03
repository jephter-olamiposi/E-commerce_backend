import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { UserPayload } from "../types/user";
import jwt from "jsonwebtoken";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Unauthorized: Token is required",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token) as UserPayload;

    req.user = decoded;
    next();
  } catch (error: any) {
    console.log(error);

    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        message: "Unauthorized: Token has expired",
      });
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        message: "Unauthorized: Invalid token",
      });
    }

    return res.status(500).json({
      message: "An error occurred",
    });
  }
};
