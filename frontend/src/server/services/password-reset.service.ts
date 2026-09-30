import { createHash, randomBytes } from "crypto";
import { AppError } from "@/server/errors";
import { sendPasswordResetEmail } from "@/server/email/password-reset";
import { User } from "@/server/models";
import type { ResetPasswordInput } from "@/server/schemas/user.schema";

function resetExpiresInMinutes() {
  const configured = Number(process.env.PASSWORD_RESET_EXPIRES_MINUTES ?? 60);
  return Number.isFinite(configured) && configured >= 15 && configured <= 180 ? configured : 60;
}

export async function requestPasswordReset(email: string) {
  const normalized = email.trim().toLowerCase();
  const user = await User.findOne({
    email: normalized,
    isActive: true,
    invitationStatus: { $ne: "pending" },
    password: { $exists: true, $nin: [null, ""] },
  });

  if (!user) {
    return;
  }

  const token = randomBytes(32).toString("hex");
  const expiresInMinutes = resetExpiresInMinutes();
  user.resetTokenHash = createHash("sha256").update(token).digest("hex");
  user.resetExpiresAt = new Date(Date.now() + expiresInMinutes * 60 * 1000);
  await user.save();

  try {
    await sendPasswordResetEmail({
      name: user.name,
      email: user.email,
      token,
      expiresInMinutes,
    });
  } catch (error) {
    console.error(error);
  }
}

export async function resetPassword(data: ResetPasswordInput) {
  const tokenHash = createHash("sha256").update(data.token).digest("hex");
  const user = await User.findOne({
    resetTokenHash: tokenHash,
    resetExpiresAt: { $gt: new Date() },
  }).select("+resetTokenHash +resetExpiresAt");

  if (!user || user.invitationStatus === "pending") {
    throw new AppError(
      400,
      "INVALID_RESET_TOKEN",
      "Tautan reset tidak valid, sudah digunakan, atau telah kedaluwarsa",
    );
  }
  if (!user.isActive) {
    throw new AppError(403, "ACCOUNT_INACTIVE", "Akun ini telah dinonaktifkan");
  }

  user.password = data.password;
  user.resetTokenHash = undefined;
  user.resetExpiresAt = undefined;
  await user.save();
  await User.updateOne(
    { _id: user._id },
    { $unset: { resetTokenHash: 1, resetExpiresAt: 1 } },
  );

  return { email: user.email };
}
