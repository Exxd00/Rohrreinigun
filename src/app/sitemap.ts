import type { MetadataRoute } from "next";
import { cities, getAllCitySlugs } from "@/data/cities";
import { services, getAllServiceSlugs } from "@/data/services";

const baseUrl = "https://rohrreinigung-kraft.de";

export default function sitemap(): MetadataRoute.Sitemap {
  const citySlugs = getAllCitySlugs();
  const serviceSlugs = getAllServiceSlugs();

  // صفحات ثابتة
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/leistungen`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/staedte`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/arbeiten`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kontakt`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/impressum`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/datenschutz`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/thank-you`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.1,
    },
  ];

  // صفحات المدن
  const cityPages: MetadataRoute.Sitemap = citySlugs.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // صفحات الخدمات
  const servicePages: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${baseUrl}/service/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // صفحات المدينة + الخدمة
  const cityServicePages: MetadataRoute.Sitemap = [];
  for (const citySlug of citySlugs) {
    for (const serviceSlug of serviceSlugs) {
      cityServicePages.push({
        url: `${baseUrl}/${citySlug}/${serviceSlug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      });
    }
  }

  return [...staticPages, ...cityPages, ...servicePages, ...cityServicePages];
}
