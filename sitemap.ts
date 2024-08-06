import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://operantpharmacy.com",
      lastModified: new Date(),
    },
    {
      url: "https://operantpharmacy.com/about",
      lastModified: new Date(),
    },
    // Add more URLs
  ];
}
