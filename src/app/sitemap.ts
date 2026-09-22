import type { MetadataRoute } from "next";

const BASE_URL = "https://www.thelaundryproject.ph";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: `${BASE_URL}/`,                 lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE_URL}/services`,         lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/pricing`,          lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/locations`,        lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/contact`,          lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/privacy-policy`,   lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${BASE_URL}/terms-of-service`, lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${BASE_URL}/refund-policy`,    lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${BASE_URL}/data-deletion`,    lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
  ];
}
