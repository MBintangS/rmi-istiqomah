import { createHash, randomBytes } from "crypto";
import { AppError } from "@/server/errors";
import { User } from "@/server/models";
import type {
  ActivateInvitationInput,
  CreateUserInput,
  UpdateUserInput,
} from "@/server/schemas/user.schema";
import type { AuthUser } from "@/server/auth";
import { normalizeRole } from "@/lib/roles";
import { sendInvitationEmail } from "@/server/email/invitation";

function invitationExpiresInHours() {
  const configured = Number(process.env.INVITATION_EXPIRES_HOURS ?? 24);
  return Number.isFinite(configured) && configured >= 1 && configured <= 168 ? configured : 24;
}

function createInvitation() {
  const token = randomBytes(32).toString("hex");
  const tokenHash = createHash("sha256").update(token).digest("hex");
  const expiresInHours = invitationExpiresInHours();
  const expiresAt = new Date(Date.now() + expiresInHours * 60 * 60 * 1000);
  return { token, tokenHash, expiresAt, expiresInHours };
}

function formatUser(user: {
  _id: { toString(): string };
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  avatar?: string;
  invitationStatus?: string;
  createdAt?: Date;
  updatedAt?: Date;
}) {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: normalizeRole(user.role),
    isActive: user.isActive,
    avatar: user.avatar ?? null,
    invitationStatus: user.invitationStatus === "pending" ? "pending" : "accepted",
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

  const invitation = createInvitation();
  const user = await User.create({
    name: data.name,
    email,
    role: data.role,
    isActive: true,
    invitationStatus: "pending",
    invitationTokenHash: invitation.tokenHash,
    invitationExpiresAt: invitation.expiresAt,
  });

  try {
    await sendInvitationEmail({
      name: user.name,
      email: user.email,
      token: invitation.token,
      expiresInHours: invitation.expiresInHours,
    });
  } catch (error) {
    console.error(error);
    throw new AppError(
      502,
      "EMAIL_DELIVERY_ERROR",
      "Akun dibuat, tetapi email undangan gagal dikirim. Gunakan aksi kirim ulang undangan.",
    );
  }

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

  let replacementInvitation: ReturnType<typeof createInvitation> | undefined;
  if (data.email !== undefined) {
    const email = data.email.trim().toLowerCase();
    const existing = await User.findOne({ email, _id: { $ne: user._id } }).select("_id");
    if (existing) {
      throw new AppError(400, "VALIDATION_ERROR", "Email sudah terdaftar");
    }
    if (email !== user.email && user.invitationStatus === "pending") {
      replacementInvitation = createInvitation();
      user.invitationTokenHash = replacementInvitation.tokenHash;
      user.invitationExpiresAt = replacementInvitation.expiresAt;
    }
    user.email = email;
  }

  if (data.name !== undefined) user.name = data.name;
  if (data.role !== undefined) user.role = data.role;
  if (data.isActive !== undefined) user.isActive = data.isActive;
  await user.save();

  if (replacementInvitation) {
    try {
      await sendInvitationEmail({
        name: user.name,
        email: user.email,
        token: replacementInvitation.token,
        expiresInHours: replacementInvitation.expiresInHours,
      });
    } catch (error) {
      console.error(error);
      throw new AppError(
        502,
        "EMAIL_DELIVERY_ERROR",
        "Data tersimpan, tetapi email undangan baru gagal dikirim. Gunakan aksi kirim ulang undangan.",
      );
    }
  }

  return formatUser(user);
}

export async function resendInvitation(id: string) {
  const user = await User.findById(id);
  if (!user) {
    throw new AppError(404, "NOT_FOUND", "Pengguna tidak ditemukan");
  }
  if (user.invitationStatus !== "pending") {
    throw new AppError(400, "VALIDATION_ERROR", "Akun ini sudah diaktifkan");
  }

  const invitation = createInvitation();
  user.invitationTokenHash = invitation.tokenHash;
  user.invitationExpiresAt = invitation.expiresAt;
  await user.save();

  try {
    await sendInvitationEmail({
      name: user.name,
      email: user.email,
      token: invitation.token,
      expiresInHours: invitation.expiresInHours,
    });
  } catch (error) {
    console.error(error);
    throw new AppError(502, "EMAIL_DELIVERY_ERROR", "Email undangan gagal dikirim");
  }

  return formatUser(user);
}

export async function activateInvitation(data: ActivateInvitationInput) {
  const tokenHash = createHash("sha256").update(data.token).digest("hex");
  const user = await User.findOne({
    invitationStatus: "pending",
    invitationTokenHash: tokenHash,
    invitationExpiresAt: { $gt: new Date() },
  }).select("+invitationTokenHash +invitationExpiresAt");

  if (!user) {
    throw new AppError(
      400,
      "INVALID_INVITATION",
      "Tautan aktivasi tidak valid, sudah digunakan, atau telah kedaluwarsa",
    );
  }
  if (!user.isActive) {
    throw new AppError(403, "ACCOUNT_INACTIVE", "Akun ini telah dinonaktifkan");
  }

  user.password = data.password;
  user.invitationStatus = "accepted";
  user.invitationTokenHash = undefined;
  user.invitationExpiresAt = undefined;
  await user.save();

  return { email: user.email };
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
