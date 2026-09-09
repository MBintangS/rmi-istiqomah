import { AppError } from "@/server/errors";
import { signToken } from "@/server/auth";
import { User } from "@/server/models";

export async function login(email?: string, password?: string) {
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

  return {
    token,
    user: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
}

export async function getMe(userId: string) {
  const user = await User.findById(userId);
  if (!user || !user.isActive) {
    throw new AppError(401, "UNAUTHORIZED", "User tidak ditemukan atau tidak aktif");
  }
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
  };
}
