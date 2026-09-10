import bcrypt from "bcryptjs";
import mongoose, { Schema, model, models, type Document, type Model } from "mongoose";

export type UserRole = "pengurus" | "superadmin";
export type StoredUserRole = UserRole | "admin";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: StoredUserRole;
  isActive: boolean;
  avatar?: string;
}

export interface IUserMethods {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export type UserDocument = Document & IUser & IUserMethods;

export type UserModel = Model<IUser, object, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    name: {
      type: String,
      required: [true, "Nama wajib diisi"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email wajib diisi"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password wajib diisi"],
      minlength: 8,
      select: false,
    },
    role: {
      type: String,
      enum: ["superadmin", "pengurus", "admin"],
      required: [true, "Role wajib diisi"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    avatar: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

if (models.User) {
  const roleEnum = (models.User.schema.path("role") as { options?: { enum?: string[] } } | undefined)
    ?.options?.enum;
  const missingAvatar = !models.User.schema.path("avatar");
  const missingPengurus = Array.isArray(roleEnum) && !roleEnum.includes("pengurus");
  if (missingAvatar || missingPengurus) {
    mongoose.deleteModel("User");
  }
}

export const User = (models.User as UserModel) || model<IUser, UserModel>("User", userSchema);
