import type { MetadataRoute } from "next";
import { conferences } from "../../data";
import { absoluteUrl } from "./lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    "",
    "/about",
    "/contact",
    "/faq",
    "/innovations",
    "/collaborations",
    "/impact-stories",
    "/memberships",
    "/membershipForm",
    "/team",
    "/privacy",
    "/terms",
    "/refund",
    "/topics",
    "/topics/pharmacovigilance",
    "/topics/clinical-research",
    "/topics/pharmacy-education",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: absoluteUrl(route),
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));

  const storyEntries: MetadataRoute.Sitemap = conferences.map((conference) => ({
    url: absoluteUrl(`/impact-stories/${conference.id}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.65,
  }));

  return [...staticEntries, ...storyEntries];
}
