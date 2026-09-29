import type { Types } from "mongoose";

export type PendaftaranStatus = "draft" | "scheduled" | "open" | "closed";

export function resolvePendaftaranStatus(
  item: { isPublished: boolean; opensAt: Date; closesAt: Date },
  now = new Date(),
): PendaftaranStatus {
  if (!item.isPublished) return "draft";
  if (now < item.opensAt) return "scheduled";
  if (now > item.closesAt) return "closed";
  return "open";
}

export function normalizeWhatsapp(value: string): string {
  return value.replace(/\D/g, "");
}

type ProgramRef = {
  _id: Types.ObjectId;
  name: string;
  slug: string;
};

export function isPopulatedProgram(value: unknown): value is ProgramRef {
  return Boolean(value && typeof value === "object" && "name" in value && "slug" in value && "_id" in value);
}

export function formatPendaftaran(
  doc: {
    _id: { toString(): string };
    title: string;
    slug: string;
    description?: string | null;
    opensAt: Date;
    closesAt: Date;
    isPublished: boolean;
    program: unknown;
    createdAt?: Date;
    updatedAt?: Date;
  },
  options?: { pesertaCount?: number },
) {
  const program = isPopulatedProgram(doc.program)
    ? {
        id: doc.program._id.toString(),
        name: doc.program.name,
        slug: doc.program.slug,
      }
    : null;

  return {
    id: doc._id.toString(),
    title: doc.title,
    slug: doc.slug,
    description: doc.description || null,
    opensAt: doc.opensAt.toISOString(),
    closesAt: doc.closesAt.toISOString(),
    isPublished: doc.isPublished,
    status: resolvePendaftaranStatus(doc),
    program,
    ...(options?.pesertaCount !== undefined ? { pesertaCount: options.pesertaCount } : {}),
    createdAt: doc.createdAt?.toISOString() ?? new Date().toISOString(),
    updatedAt: doc.updatedAt?.toISOString() ?? new Date().toISOString(),
  };
}

export function formatPeserta(doc: {
  _id: { toString(): string };
  name: string;
  whatsapp: string;
  age?: number | null;
  address?: string | null;
  email?: string | null;
  notes?: string | null;
  createdAt?: Date;
}) {
  return {
    id: doc._id.toString(),
    name: doc.name,
    whatsapp: doc.whatsapp,
    age: doc.age ?? null,
    address: doc.address || null,
    email: doc.email || null,
    notes: doc.notes || null,
    createdAt: doc.createdAt?.toISOString() ?? new Date().toISOString(),
  };
}
