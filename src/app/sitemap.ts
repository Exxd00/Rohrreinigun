import type { MetadataRoute } from "next";
import { getMittelfrankenCitySlugs, priorityOneCities, priorityTwoCities } from "@/data/mittelfranken-cities";

const baseUrl = "https://rohrreinigung-kraft.de";

// Important services to include in sitemap (high-traffic keywords)
const importantServices = [
  // Hauptkategorien
  { slug: "rohrreinigung", priority: 0.9 },
  { slug: "kanalreinigung", priority: 0.9 },
  { slug: "abflussreinigung", priority: 0.9 },
  { slug: "rohrreinigung-notdienst", priority: 0.95 }, // High priority - emergency

  // Häufige Probleme
  { slug: "toilette-verstopft", priority: 0.9 },
  { slug: "waschbecken-verstopft", priority: 0.8 },
  { slug: "dusche-verstopft", priority: 0.8 },
  { slug: "badewanne-verstopft", priority: 0.75 },
  { slug: "kueche-abfluss-verstopft", priority: 0.8 },
  { slug: "bodenablauf-verstopft", priority: 0.7 },

  // Diagnose & Inspektion
  { slug: "kamera-inspektion", priority: 0.85 },
  { slug: "dichtheitspruefung", priority: 0.7 },
  { slug: "leckortung", priority: 0.7 },

  // Notfälle
  { slug: "toilette-laeuft-ueber", priority: 0.85 },
  { slug: "keller-ueberflutet", priority: 0.8 },
  { slug: "rueckstau-notdienst", priority: 0.8 },
  { slug: "rohrbruch-notdienst", priority: 0.8 },

  // Kanal
  { slug: "wurzelentfernung", priority: 0.75 },
  { slug: "kanalspuelung", priority: 0.7 },
  { slug: "grundleitung-verstopft", priority: 0.75 },

  // Gewerbe
  { slug: "fettabscheider-reinigung", priority: 0.7 },
  { slug: "gastronomie-reinigung", priority: 0.65 },

  // Wartung
  { slug: "wartungsvertrag", priority: 0.7 },
  { slug: "rohrreinigung-wartung", priority: 0.65 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const allCitySlugs = getMittelfrankenCitySlugs();

  // Priority cities for city+service combinations
  const topCitySlugs = [...priorityOneCities, ...priorityTwoCities.slice(0, 5)].map(c => c.slug);

  // صفحات ثابتة
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/preise`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/leistungen`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/hausverwaltung`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/staedte`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
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
  ];

  // صفحات المدن - All Mittelfranken cities
  const cityPages: MetadataRoute.Sitemap = allCitySlugs.map((slug) => {
    // Priority 1 cities get higher priority
    const isTopCity = topCitySlugs.includes(slug);
    return {
      url: `${baseUrl}/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: isTopCity ? 0.9 : 0.7,
    };
  });

  // صفحات الخدمات المهمة
  const servicePages: MetadataRoute.Sitemap = importantServices.map((service) => ({
    url: `${baseUrl}/service/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: service.priority,
  }));

  return [...staticPages, ...cityPages, ...servicePages];
}
