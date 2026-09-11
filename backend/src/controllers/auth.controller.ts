import type { Request, Response } from "express";
import { AppError } from "../middleware/errorHandler";
import { User } from "../models";
import type { UpdateProfileInput } from "../schemas/user.schema";
import { sendSuccess } from "../utils/response";
import { signToken } from "../utils/jwt";
import { normalizeRole } from "../utils/roles";
import type { UserRole } from "../models/User.model";

interface LoginBody {
  email?: string;
  password?: string;
}

function formatAuthUser(user: {
  _id: { toString(): string };
  name: string;
  email: string;
  role: string;
  avatar?: string;
}) {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: normalizeRole(user.role),
    avatar: user.avatar ?? null,
  };
}

function issueSession(user: {
  _id: { toString(): string };
  name: string;
  email: string;
  role: string;
  avatar?: string;
}) {
  const role: UserRole = normalizeRole(user.role);
  const token = signToken({
    sub: user._id.toString(),
    email: user.email,
    role,
  });

  return {
    token,
    user: formatAuthUser(user),
  };
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
    throw new AppError(403, "ACCOUNT_INACTIVE", "Akun tidak aktif");
  }

  if (user.role === "admin") {
    await User.collection.updateOne({ _id: user._id }, { $set: { role: "pengurus" } });
    user.role = "pengurus";
  }

  sendSuccess(res, issueSession(user));
}

export async function getMe(req: Request, res: Response): Promise<void> {
  if (!req.user) {
    throw new AppError(401, "UNAUTHORIZED", "Token autentikasi diperlukan");
  }

  const user = await User.findById(req.user.id).lean();

  if (!user || !user.isActive) {
    throw new AppError(401, "UNAUTHORIZED", "User tidak ditemukan atau tidak aktif");
  }

  sendSuccess(res, formatAuthUser(user));
}

export async function updateMe(req: Request, res: Response): Promise<void> {
  if (!req.user) {
    throw new AppError(401, "UNAUTHORIZED", "Token autentikasi diperlukan");
  }

  const data = req.body as UpdateProfileInput;
  const user = await User.findById(req.user.id).select("+password");

  if (!user || !user.isActive) {
    throw new AppError(401, "UNAUTHORIZED", "User tidak ditemukan atau tidak aktif");
  }

  const nextEmail = data.email.trim().toLowerCase();
  const emailChanged = nextEmail !== user.email;
  const passwordChanged = Boolean(data.newPassword);

  if (emailChanged || passwordChanged) {
    if (!data.currentPassword) {
      throw new AppError(
        400,
        "VALIDATION_ERROR",
        emailChanged ? "Password saat ini wajib diisi untuk mengubah email" : "Password saat ini wajib diisi",
      );
    }
    const matches = await user.comparePassword(data.currentPassword);
    if (!matches) {
      throw new AppError(400, "VALIDATION_ERROR", "Password saat ini salah");
    }
  }

  if (emailChanged) {
    const existing = await User.findOne({ email: nextEmail, _id: { $ne: user._id } }).select("_id");
    if (existing) {
      throw new AppError(400, "VALIDATION_ERROR", "Email sudah terdaftar");
    }
    user.email = nextEmail;
  }

  user.name = data.name;
  if (data.newPassword) {
    user.password = data.newPassword;
  }

  await user.save();

  if (data.avatar !== undefined) {
    if (data.avatar) {
      await User.collection.updateOne({ _id: user._id }, { $set: { avatar: data.avatar } });
    } else {
      await User.collection.updateOne({ _id: user._id }, { $unset: { avatar: 1 } });
    }
  }

  const fresh = await User.findById(user._id).lean();
  sendSuccess(res, issueSession(fresh ?? user), { message: "Profil berhasil diperbarui" });
}
