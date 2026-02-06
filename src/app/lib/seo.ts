import type { Metadata } from "next";

export const SITE_URL = "https://opf.org.in";
export const SITE_NAME = "Operant Pharmacy Federation";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/opflogo.png`;

const DEFAULT_DESCRIPTION =
  "Operant Pharmacy Federation advances pharmacy education, research, conferences, and professional development for global healthcare impact.";

const brandKeywords = [
  "Operant Pharmacy Federation",
  "OPF",
  "pharmacy research",
  "pharmaceutical education",
  "pharmacovigilance",
  "clinical research",
  "drug development",
  "pharma conferences",
  "healthcare innovation",
];

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}

export function buildMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  keywords = [],
  type = "website",
  image = DEFAULT_OG_IMAGE,
  noindex = false,
}: {
  title: string;
  description?: string;
  path?: string;
  keywords?: string[];
  type?: "website" | "article";
  image?: string;
  noindex?: boolean;
}): Metadata {
  const canonical = absoluteUrl(path);
  const allKeywords = Array.from(new Set([...brandKeywords, ...keywords]));

  return {
    title,
    description,
    keywords: allKeywords,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      type,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} preview`,
        },
      ],
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@opf_india",
    },
    robots: noindex
      ? {
          index: false,
          follow: false,
          nocache: true,
          googleBot: {
            index: false,
            follow: false,
            noimageindex: true,
          },
        }
      : {
          index: true,
          follow: true,
          nocache: false,
          googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
            "max-image-preview": "large",
            "max-video-preview": -1,
            "max-snippet": -1,
          },
        },
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl("/opflogo.png"),
    email: "contact@opf.org.in",
    telephone: "+91-94609-71652",
    sameAs: [
      "https://www.linkedin.com/",
      "https://x.com/",
      "https://www.facebook.com/",
      "https://www.instagram.com/",
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "en-IN",
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/members?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE_NAME,
    image: absoluteUrl("/opflogo.png"),
    url: SITE_URL,
    telephone: "+91-94609-71652",
    email: "contact@opf.org.in",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Shradhawan Tower, Mayank Nagar",
      addressLocality: "Pali-Marwar",
      addressRegion: "Rajasthan",
      postalCode: "306401",
      addressCountry: "IN",
    },
  };
}

export function pageSchema({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: absoluteUrl(path),
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
