export interface SocialMedia {
  instagram?: string;
  facebook?: string;
  youtube?: string;
  tiktok?: string;
}

export interface SiteStats {
  totalEvents: number;
  totalMembers: number;
  totalPengurus: number;
  establishedYear: number;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  about: string;
  vision: string;
  mission: string[];
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  socialMedia: SocialMedia;
  googleMapsEmbed: string;
  stats: SiteStats;
}

export interface GaleriImage {
  url: string;
  caption: string;
}

export interface Galeri {
  id: string;
  title: string;
  images: GaleriImage[];
  videoUrl?: string;
  category?: string;
  eventId?: string;
  order: number;
  isPublished: boolean;
}
