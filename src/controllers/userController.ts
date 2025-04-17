import { Request, Response } from "express";
import { registerSchema, loginSchema } from "../schemas/userSchema";
import { createUser, findUserByEmail } from "../models/userModel";
import { hashPassword, comparePassword } from "../utils/hash";
import { signToken } from "../utils/jwt";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const data = registerSchema.parse(req.body);

    const existingUser = await findUserByEmail(data.email);
    if (existingUser) {
      return res.status(409).json({
        status: "error",
        message: "Email already exists",
      });
    }

    const hashedPassword = await hashPassword(data.password);
    const user = await createUser({
      ...data,
      password: hashedPassword,
      role: "customer",
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
    const data = loginSchema.parse(req.body);

    const user = await findUserByEmail(data.email);
    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "Invalid email or password",
      });
    }

    const isMatch = await comparePassword(data.password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        status: "error",
        message: "Invalid email or password",
      });
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
