import type { Types } from "mongoose";
import type { ITestimoni } from "../models/Testimoni.model";

type TestimoniLike = ITestimoni & { _id: Types.ObjectId };

export function formatTestimoni(testimoni: TestimoniLike) {
  return {
    id: testimoni._id.toString(),
    name: testimoni.name,
    content: testimoni.content,
    role: testimoni.role ?? null,
    photo: testimoni.photo ?? null,
    order: testimoni.order,
    isActive: testimoni.isActive,
    createdAt: testimoni.createdAt,
  };
}
