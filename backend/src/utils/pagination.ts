export interface PaginationParams {
  page: number;
  limit: number;
  skip: number;
}

export function parsePagination(query: Record<string, unknown>): PaginationParams {
  const page = Math.max(1, Number(query.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(query.limit) || 10));
  const skip = (page - 1) * limit;

  return { page, limit, skip };
}

export function buildPaginationMeta(page: number, limit: number, total: number) {
  return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit) || 1,
  };
}

const SORTABLE_FIELDS = new Set(["createdAt", "updatedAt", "publishedAt", "title"]);

export function parseSort(sort?: string): Record<string, 1 | -1> {
  if (!sort) {
    return { createdAt: -1 };
  }

  const field = sort.startsWith("-") ? sort.slice(1) : sort;

  if (!SORTABLE_FIELDS.has(field)) {
    return { createdAt: -1 };
  }

  return { [field]: sort.startsWith("-") ? -1 : 1 };
}
