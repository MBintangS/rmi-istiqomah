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

export interface KegiatanWritePayload {
  title: string;
  description: string;
  dateStart: string;
  dateEnd?: string | null;
  time?: string;
  location?: string;
  locationMap?: string;
  category: string;
  thumbnail?: string;
  status?: "upcoming" | "ongoing" | "completed";
  isPublished?: boolean;
}

export interface EventRef {
  id: string;
  title: string;
  slug: string;
}

export interface AgendaListItem {
  id: string;
  title: string;
  date: string;
  time: string | null;
  location: string | null;
  description: string | null;
  isPublished: boolean;
  event: EventRef | null;
  createdAt: string;
  updatedAt: string;
}

export interface AgendaListParams {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
}

export interface AgendaListResult {
  items: AgendaListItem[];
  pagination?: PaginationMeta;
}

export interface AgendaWritePayload {
  title: string;
  date: string;
  time?: string;
  location?: string;
  description?: string;
  eventId?: string;
  isPublished?: boolean;
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

export interface DokumenListItem {
  id: string;
  name: string;
  fileUrl: string;
  fileSize: number | null;
  fileType: string | null;
  category: string | null;
  description: string | null;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DokumenListParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
}

export interface DokumenListResult {
  items: DokumenListItem[];
  pagination?: PaginationMeta;
}

export interface ContactSubmitData {
  id: string;
  name: string;
  email: string;
  subject: string;
  createdAt: string;
}

export type AuthRole = "admin" | "superadmin";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: AuthRole;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResult {
  token: string;
  user: AuthUser;
}

export interface DashboardStats {
  totalArtikel: number;
  publishedArtikel: number;
  draftArtikel: number;
  totalKegiatan: number;
  publishedKegiatan: number;
  totalGaleri: number;
  totalPengurus: number;
  totalProgram: number;
  totalDokumen: number;
  totalMessages: number;
}

export interface KategoriItem {
  id: string;
  name: string;
  slug: string;
  type: "artikel" | "kegiatan" | "galeri";
}

export interface ArtikelWritePayload {
  title: string;
  content: string;
  category: string;
  thumbnail?: string;
  status?: "draft" | "published";
  excerpt?: string;
  metaTitle?: string;
  metaDescription?: string;
}

export interface UploadResult {
  url: string;
  publicId: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
}
