import { Request, Response, NextFunction } from "express";

export const requireAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const user = req.user;

  if (!user || user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  next();
};
