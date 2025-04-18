import { Request, Response } from "express";
import {
  registerSchema,
  loginSchema,
  adminCreateUserSchema,
  RegisterInput,
  LoginInput,
  AdminCreateInput,
  UserRole,
} from "../schemas/userSchema";
import { createUser, findUserByEmail } from "../models/userModel";
import { hashPassword, comparePassword } from "../utils/hash";
import { signToken } from "../utils/jwt";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const data: RegisterInput = registerSchema.parse(req.body);

    const existingUser = await findUserByEmail(data.email);
    if (existingUser) {
      return res
        .status(409)
        .json({ status: "error", message: "Email already exists" });
    }

    const hashedPassword = await hashPassword(data.password);
    const user = await createUser({
      ...data,
      password: hashedPassword,
      role: "customer" as UserRole,
    });

    const token = signToken({ userId: user.id, role: user.role });

    return res.status(201).json({
      status: "success",
      data: {
        user: {
          id: user.id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          phone: user.phone,
          role: user.role,
          created_at: user.created_at,
        },
        token,
      },
    });
  } catch (error: any) {
    return res.status(400).json({
      status: "error",
      message: error.message || "Invalid input",
    });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const data: LoginInput = loginSchema.parse(req.body);

    const user = await findUserByEmail(data.email);
    if (!user) {
      return res
        .status(401)
        .json({ status: "error", message: "Invalid email or password" });
    }

    const isMatch = await comparePassword(data.password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ status: "error", message: "Invalid email or password" });
    }

    const token = signToken({ userId: user.id, role: user.role });

    return res.status(200).json({
      status: "success",
      data: {
        user: {
          id: user.id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          phone: user.phone,
          role: user.role,
          created_at: user.created_at,
        },
        token,
      },
    });
  } catch (error: any) {
    return res.status(400).json({
      status: "error",
      message: error.message || "Invalid input",
    });
  }
};

export const createAdminUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const data: AdminCreateInput = adminCreateUserSchema.parse(req.body);

    const existing = await findUserByEmail(data.email);
    if (existing) {
      return res
        .status(409)
        .json({ status: "error", message: "Email already exists" });
    }

    const hashedPassword = await hashPassword(data.password);
    const user = await createUser({ ...data, password: hashedPassword });

    return res.status(201).json({
      status: "success",
      message: "Admin user created",
      data: {
        id: user.id,
        email: user.email,
        role: user.role,
        first_name: user.first_name,
        last_name: user.last_name,
        created_at: user.created_at,
      },
    });
  } catch (error: any) {
    return res.status(400).json({
      status: "error",
      message: error.message || "Invalid input",
    });
  }
};
