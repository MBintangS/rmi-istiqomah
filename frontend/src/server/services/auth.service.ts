import { AppError } from "@/server/errors";
import { signToken } from "@/server/auth";
import { User } from "@/server/models";
import type { UpdateProfileInput } from "@/server/schemas/user.schema";
import { normalizeRole } from "@/lib/roles";
import type { UserRole } from "@/server/models/User.model";

function formatAuthUser(user: {
  _id: { toString(): string };
  name: string;
  email: string;
  role: string;
  avatar?: string | null;
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
  avatar?: string | null;
}) {
  const role: UserRole = normalizeRole(user.role);
  const token = signToken({
    sub: user._id.toString(),
    email: user.email,
    role,
  });

  return {
    token,
    user: formatAuthUser({ ...user, role }),
  };
}

export async function login(email?: string, password?: string) {
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

  return issueSession(user);
}

export async function getMe(userId: string) {
  const user = await User.findById(userId).lean();
  if (!user || !user.isActive) {
    throw new AppError(401, "UNAUTHORIZED", "User tidak ditemukan atau tidak aktif");
  }
  return formatAuthUser(user);
}

export async function updateMe(userId: string, data: UpdateProfileInput) {
  const user = await User.findById(userId).select("+password");
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
  return issueSession(fresh ?? user);
}
