import type { Types } from "mongoose";
import type { IPengurus } from "../models/Pengurus.model";

type PengurusLike = IPengurus & { _id: Types.ObjectId };

export function formatPengurus(pengurus: PengurusLike) {
  return {
    id: pengurus._id.toString(),
    name: pengurus.name,
    position: pengurus.position,
    photo: pengurus.photo ?? null,
    period: pengurus.period ?? null,
    order: pengurus.order,
    isActive: pengurus.isActive,
    createdAt: pengurus.createdAt,
    updatedAt: pengurus.updatedAt,
  };
}
