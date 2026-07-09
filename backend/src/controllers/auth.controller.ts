import type { Request, Response } from "express";
import { AppError } from "../middleware/errorHandler";
import { User } from "../models";
import { sendSuccess } from "../utils/response";
import { signToken } from "../utils/jwt";

interface LoginBody {
  email?: string;
  password?: string;
}

export async function login(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body as LoginBody;

  if (!email?.trim() || !password) {
    throw new AppError(400, "VALIDATION_ERROR", "Email dan password wajib diisi");
  }

  const user = await User.findOne({ email: email.trim().toLowerCase() }).select("+password");

  if (!user || !(await user.comparePassword(password))) {
    throw new AppError(401, "INVALID_CREDENTIALS", "Email atau password salah");
  }

  if (!user.isActive) {
    throw new AppError(403, "ACCOUNT_INACTIVE", "Akun admin tidak aktif");
  }

  const token = signToken({
    sub: user._id.toString(),
    email: user.email,
    role: user.role,
  });

  sendSuccess(res, {
    token,
    user: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
}

export async function getMe(req: Request, res: Response): Promise<void> {
  if (!req.user) {
    throw new AppError(401, "UNAUTHORIZED", "Token autentikasi diperlukan");
  }

  const user = await User.findById(req.user.id);

  if (!user || !user.isActive) {
    throw new AppError(401, "UNAUTHORIZED", "User tidak ditemukan atau tidak aktif");
  }

  sendSuccess(res, {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
  });
}
