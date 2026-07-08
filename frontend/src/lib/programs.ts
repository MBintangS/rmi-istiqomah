import { mockPrograms } from "@/data/mock";
import type { Program } from "@/types";

export function getActivePrograms(): Program[] {
  return mockPrograms.filter((program) => program.isActive);
}

export function getProgramBySlug(slug: string): Program | undefined {
  return mockPrograms.find((program) => program.slug === slug && program.isActive);
}

export function getProgramSlugs(): string[] {
  return getActivePrograms().map((program) => program.slug);
}
