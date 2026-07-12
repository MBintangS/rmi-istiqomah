export interface SocialMedia {
  instagram?: string;
  facebook?: string;
  youtube?: string;
  tiktok?: string;
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
