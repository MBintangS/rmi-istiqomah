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

export interface KategoriRef {
  id: string;
  name: string;
  slug: string;
}

export interface KegiatanListItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  dateStart: string;
  dateEnd: string | null;
  time: string | null;
  location: string | null;
  locationMap: string | null;
  thumbnail: string | null;
  status: "upcoming" | "ongoing" | "completed";
  isPublished: boolean;
  category: KategoriRef | null;
  createdAt: string;
  updatedAt: string;
}

export type KegiatanDetail = KegiatanListItem;

export interface KegiatanListParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  status?: "upcoming" | "ongoing" | "completed";
  sort?: string;
}

export interface KegiatanListResult {
  items: KegiatanListItem[];
  pagination?: PaginationMeta;
}

export interface EventRef {
  id: string;
  title: string;
  slug: string;
}

export interface GaleriImageItem {
  url: string;
  publicId: string | null;
  caption: string;
}

export interface GaleriListItem {
  id: string;
  title: string;
  images: GaleriImageItem[];
  videoUrl: string | null;
  category: KategoriRef | null;
  event: EventRef | null;
  order: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GaleriListParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  sort?: string;
}

export interface GaleriListResult {
  items: GaleriListItem[];
  pagination?: PaginationMeta;
}

export interface SettingsStats {
  totalEvents: number;
  totalMembers: number;
  totalPengurus: number;
  establishedYear: number;
}

export interface SettingsSocialMedia {
  instagram: string | null;
  facebook: string | null;
  youtube: string | null;
  tiktok: string | null;
}

export interface SettingsData {
  id: string;
  siteName: string;
  tagline: string;
  about: string;
  vision: string;
  mission: string[];
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  socialMedia: SettingsSocialMedia;
  googleMapsEmbed: string;
  stats: SettingsStats;
  updatedAt: string;
}

export interface BannerListItem {
  id: string;
  title: string;
  image: string;
  link: string | null;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PengurusListItem {
  id: string;
  name: string;
  position: string;
  photo: string | null;
  period: string | null;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TestimoniListItem {
  id: string;
  name: string;
  content: string;
  role: string | null;
  photo: string | null;
  order: number;
  isActive: boolean;
  createdAt: string;
}
