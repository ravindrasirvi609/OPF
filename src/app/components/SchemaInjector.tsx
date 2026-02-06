"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { SITE_NAME, absoluteUrl } from "../lib/seo";

function toLabel(segment: string) {
  return segment
    .split("-")
    .map((piece) => piece.charAt(0).toUpperCase() + piece.slice(1))
    .join(" ");
}

export default function SchemaInjector() {
  const pathname = usePathname() || "/";

  const [webPageSchema, breadcrumbListSchema] = useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);

    const webPage = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: `${SITE_NAME} ${pathname === "/" ? "Home" : toLabel(segments[segments.length - 1] || "Page")}`,
      url: absoluteUrl(pathname),
      isPartOf: {
        "@type": "WebSite",
        name: SITE_NAME,
        url: absoluteUrl("/"),
      },
    };

    const breadcrumbItems = [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: absoluteUrl("/"),
      },
      ...segments.map((segment, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: toLabel(segment),
        item: absoluteUrl(`/${segments.slice(0, index + 1).join("/")}`),
      })),
    ];

    const breadcrumbList = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbItems,
    };

    return [webPage, breadcrumbList];
  }, [pathname]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbListSchema) }}
      />
    </>
  );
}
