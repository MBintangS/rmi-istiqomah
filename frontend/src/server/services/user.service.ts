import { AppError } from "@/server/errors";
import { User } from "@/server/models";
import type { CreateUserInput, UpdateUserInput } from "@/server/schemas/user.schema";
import type { AuthUser } from "@/server/auth";

function formatUser(user: {
  _id: { toString(): string };
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  avatar?: string;
  createdAt?: Date;
  updatedAt?: Date;
}) {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    isActive: user.isActive,
    avatar: user.avatar ?? null,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

async function countActiveSuperadmins(excludeId?: string) {
  const filter: Record<string, unknown> = { role: "superadmin", isActive: true };
  if (excludeId) {
    filter._id = { $ne: excludeId };
  }
  return User.countDocuments(filter);
}

export async function listUsers() {
  const users = await User.find().sort({ createdAt: -1 });
  return users.map(formatUser);
}

export async function createUser(data: CreateUserInput) {
  const email = data.email.trim().toLowerCase();
  const existing = await User.findOne({ email }).select("_id");
  if (existing) {
    throw new AppError(400, "VALIDATION_ERROR", "Email sudah terdaftar");
  }
  const user = await User.create({
    name: data.name,
    email,
    password: data.password,
    role: data.role,
    isActive: data.isActive ?? true,
  });
  return formatUser(user);
}

export async function updateUser(id: string, data: UpdateUserInput, actor?: AuthUser) {
  const user = await User.findById(id).select("+password");
  if (!user) {
    throw new AppError(404, "NOT_FOUND", "Pengguna tidak ditemukan");
  }

  const isSelf = actor?.id === user._id.toString();
  if (isSelf && data.isActive === false) {
    throw new AppError(400, "VALIDATION_ERROR", "Tidak dapat menonaktifkan akun sendiri");
  }
  if (isSelf && data.role && data.role !== user.role) {
    throw new AppError(400, "VALIDATION_ERROR", "Tidak dapat mengubah role akun sendiri");
  }

  const wouldLoseSuperadmin =
    user.role === "superadmin" &&
    user.isActive &&
    ((data.role !== undefined && data.role !== "superadmin") || data.isActive === false);

  if (wouldLoseSuperadmin) {
    const remaining = await countActiveSuperadmins(user._id.toString());
    if (remaining < 1) {
      throw new AppError(400, "VALIDATION_ERROR", "Minimal harus ada satu superadmin aktif");
    }
  }

  if (data.email !== undefined) {
    const email = data.email.trim().toLowerCase();
    const existing = await User.findOne({ email, _id: { $ne: user._id } }).select("_id");
    if (existing) {
      throw new AppError(400, "VALIDATION_ERROR", "Email sudah terdaftar");
    }
    user.email = email;
  }

  if (data.name !== undefined) user.name = data.name;
  if (data.role !== undefined) user.role = data.role;
  if (data.isActive !== undefined) user.isActive = data.isActive;
  if (data.password !== undefined) user.password = data.password;
  await user.save();
  return formatUser(user);
}

export async function deleteUser(id: string, actor?: AuthUser) {
  const user = await User.findById(id);
  if (!user) {
    throw new AppError(404, "NOT_FOUND", "Pengguna tidak ditemukan");
  }
  if (actor?.id === user._id.toString()) {
    throw new AppError(400, "VALIDATION_ERROR", "Tidak dapat menghapus akun sendiri");
  }
  if (user.role === "superadmin" && user.isActive) {
    const remaining = await countActiveSuperadmins(user._id.toString());
    if (remaining < 1) {
      throw new AppError(400, "VALIDATION_ERROR", "Minimal harus ada satu superadmin aktif");
    }
  }
  await user.deleteOne();
  return { id: user._id.toString() };
}
