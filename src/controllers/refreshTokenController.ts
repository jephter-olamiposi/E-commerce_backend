import { Request, Response } from "express";
import crypto from "crypto";
import { loginSchema } from "../schemas/userSchema";
import { refreshTokenSchema } from "../schemas/refreshTokenSchema";
import {
  createRefreshToken,
  findRefreshToken,
  revokeRefreshToken,
  deleteExpiredTokens,
} from "../models/refreshTokenModel";
import { findUserByEmail, findUserById } from "../models/userModel";
import { comparePassword } from "../utils/hash";
import { signToken } from "../utils/jwt";

const ACCESS_TOKEN_LIFESPAN = 10 * 60 * 1000;
const REFRESH_TOKEN_LIFESPAN = 7 * 24 * 60 * 60 * 1000;

export const handleLogin = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid credentials",
      });
    }

    const isValid = await comparePassword(password, user.password);
    if (!isValid) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid credentials",
      });
    }

    await deleteExpiredTokens();

    const accessToken = signToken({ userId: user.id, role: user.role }, "10m");
    const refreshToken = crypto.randomBytes(64).toString("hex");
    const accessTokenExpiresAt = new Date(Date.now() + ACCESS_TOKEN_LIFESPAN);
    const refreshTokenExpiresAt = new Date(Date.now() + REFRESH_TOKEN_LIFESPAN);
    await createRefreshToken(user.id, refreshToken, refreshTokenExpiresAt);

    return res.status(200).json({
      status: "success",
      data: {
        accessToken,
        accessTokenExpiresAt,
        refreshToken,
        refreshTokenExpiresAt,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "An error occurred during login",
    });
  }
};

export const handleRefresh = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { token } = refreshTokenSchema.parse(req.body);

    await deleteExpiredTokens();

    const record = await findRefreshToken(token);
    if (!record) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid or expired refresh token",
      });
    }

    await revokeRefreshToken(token);
    const user = await findUserById(record.user_id);
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    const accessToken = signToken({ userId: user.id, role: user.role }, "10m");
    const newRefreshToken = crypto.randomBytes(64).toString("hex");
    const accessTokenExpiresAt = new Date(Date.now() + ACCESS_TOKEN_LIFESPAN);
    const refreshTokenExpiresAt = new Date(Date.now() + REFRESH_TOKEN_LIFESPAN);
    await createRefreshToken(user.id, newRefreshToken, refreshTokenExpiresAt);

    return res.status(200).json({
      status: "success",
      data: {
        accessToken,
        accessTokenExpiresAt,
        refreshToken: newRefreshToken,
        refreshTokenExpiresAt,
      },
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      message: "Could not refresh token",
    });
  }
};

export const handleLogout = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { token } = refreshTokenSchema.parse(req.body);
    await revokeRefreshToken(token);

    return res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "An error occurred",
    });
  }
};
