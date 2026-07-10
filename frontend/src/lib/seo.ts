import type { Metadata } from "next";

/** Placeholder production host from PRD until real domain is set. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://rmi-domain.com";

export const SITE_NAME = "Remaja Masjid Istiqomah";

export const DEFAULT_DESCRIPTION =
  "Website resmi Remaja Masjid Istiqomah (RMI). Pusat informasi kegiatan, artikel Islami, program pembinaan remaja, dan kontak jamaah masjid.";

/** Served by `app/opengraph-image.tsx` */
const DEFAULT_OG_IMAGE = `${SITE_URL}/opengraph-image`;

type BuildMetadataInput = {
  title: string | { absolute: string };
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  noIndex?: boolean;
};

export function truncateMetaDescription(text: string, max = 160): string {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (normalized.length <= max) return normalized;
  return `${normalized.slice(0, max - 1).trimEnd()}…`;
}

export function buildPageMetadata({
  title,
  description,
  path = "/",
  image = DEFAULT_OG_IMAGE,
  type = "website",
  noIndex = false,
}: BuildMetadataInput): Metadata {
  const url = `${SITE_URL}${path === "/" ? "" : path}`;
  const plainTitle = typeof title === "string" ? title : title.absolute;
  const ogTitle =
    typeof title === "string" ? `${title} | ${SITE_NAME}` : title.absolute;
  const metaDescription = truncateMetaDescription(description);

  return {
    title,
    description: metaDescription,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: ogTitle,
      description: metaDescription,
      url,
      siteName: SITE_NAME,
      locale: "id_ID",
      type,
      images: [{ url: image, width: 1200, height: 630, alt: plainTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: metaDescription,
      images: [image],
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}

export function organizationJsonLd(options?: {
  phone?: string;
  email?: string;
}) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    description: DEFAULT_DESCRIPTION,
  };

  if (options?.phone || options?.email) {
    data.contactPoint = {
      "@type": "ContactPoint",
      contactType: "customer service",
      ...(options.phone ? { telephone: options.phone } : {}),
      ...(options.email ? { email: options.email } : {}),
    };
  }

  return data;
}

export function articleJsonLd(article: {
  title: string;
  excerpt: string;
  slug: string;
  publishedAt: string;
  thumbnail?: string | null;
  author?: string | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: truncateMetaDescription(article.excerpt),
    datePublished: article.publishedAt,
    author: {
      "@type": article.author ? "Person" : "Organization",
      name: article.author || SITE_NAME,
    },
    image: article.thumbnail || DEFAULT_OG_IMAGE,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/artikel/${article.slug}`,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.svg`,
      },
    },
  };
}
