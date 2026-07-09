import type { Metadata } from "next";

/** Placeholder production host from PRD until real domain is set. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://rmi-domain.com";

export const SITE_NAME = "Remaja Masjid Istiqomah";

export const DEFAULT_DESCRIPTION =
  "Website resmi Remaja Masjid Istiqomah (RMI). Pusat informasi kegiatan, artikel Islami, program pembinaan remaja, dan kontak jamaah masjid.";

const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.jpg`;

type BuildMetadataInput = {
  title: string | { absolute: string };
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  noIndex?: boolean;
};

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

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: ogTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: "id_ID",
      type,
      images: [{ url: image, width: 1200, height: 630, alt: plainTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [image],
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description: DEFAULT_DESCRIPTION,
  };
}
