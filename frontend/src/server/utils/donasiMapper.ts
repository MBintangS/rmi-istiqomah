import type { Types } from "mongoose";
import type { IDonasi } from "../models/Donasi.model";

type DonasiLike = IDonasi & { _id: Types.ObjectId };

export function formatDonasi(donasi: DonasiLike) {
  return {
    id: donasi._id.toString(),
    bank: donasi.bank,
    accountNumber: donasi.accountNumber,
    accountName: donasi.accountName,
    order: donasi.order,
    isActive: donasi.isActive,
    createdAt: donasi.createdAt,
    updatedAt: donasi.updatedAt,
  };
}
