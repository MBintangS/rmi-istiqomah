export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
  pagination?: PaginationMeta;
}

export interface ApiErrorBody {
  code: string;
  message: string;
  details?: unknown;
}

export interface ApiErrorResponse {
  success: false;
  error: ApiErrorBody;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export interface HealthData {
  status: string;
}

export interface ArtikelCategoryRef {
  id: string;
  name: string;
  slug: string;
}

export interface ArtikelAuthorRef {
  id: string;
  name: string;
}

export interface ArtikelListItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  thumbnail: string | null;
  status: "draft" | "published";
  category: ArtikelCategoryRef | null;
  author: ArtikelAuthorRef | null;
  metaTitle: string | null;
  metaDescription: string | null;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ArtikelDetail extends ArtikelListItem {
  content: string;
}

export interface ArtikelListParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  status?: "draft" | "published";
  sort?: string;
}

export interface ArtikelListResult {
  items: ArtikelListItem[];
  pagination?: PaginationMeta;
}

export interface ProgramListItem {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  icon: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProgramDetail extends ProgramListItem {
  content: string | null;
}
