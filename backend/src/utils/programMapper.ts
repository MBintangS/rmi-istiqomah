import type { Types } from "mongoose";
import type { IProgram } from "../models/Program.model";

type ProgramLike = IProgram & { _id: Types.ObjectId };

export function formatProgram(program: ProgramLike, options?: { includeContent?: boolean }) {
  const base = {
    id: program._id.toString(),
    name: program.name,
    slug: program.slug,
    description: program.description ?? null,
    image: program.image ?? null,
    icon: program.icon ?? null,
    isActive: program.isActive,
    createdAt: program.createdAt,
    updatedAt: program.updatedAt,
  };

  if (options?.includeContent) {
    return { ...base, content: program.content ?? null };
  }

  return base;
}
