/**
 * Priority cities in Mittelfranken for focused SEO and Google Ads
 * Focus: Nürnberg + 60km Umkreis
 * These cities will be included in the sitemap
 */

export interface PriorityCity {
  name: string;
  slug: string;
  priority: 1 | 2 | 3; // 1 = highest (Nürnberg, Fürth, Erlangen)
  responseTime: string;
  distance: number; // km from Nürnberg
}

// Priority 1: Main cities - highest focus (0-10 km)
export const priorityOneCities: PriorityCity[] = [
  { name: "Nürnberg", slug: "nuernberg", priority: 1, responseTime: "20-40 Min", distance: 0 },
  { name: "Fürth", slug: "fuerth", priority: 1, responseTime: "25-45 Min", distance: 7 },
  { name: "Erlangen", slug: "erlangen", priority: 1, responseTime: "30-50 Min", distance: 18 },
];

// Priority 2: Close suburbs - good focus (10-30 km)
export const priorityTwoCities: PriorityCity[] = [
  { name: "Schwabach", slug: "schwabach", priority: 2, responseTime: "30-50 Min", distance: 15 },
  { name: "Zirndorf", slug: "zirndorf", priority: 2, responseTime: "25-45 Min", distance: 12 },
  { name: "Oberasbach", slug: "oberasbach", priority: 2, responseTime: "25-45 Min", distance: 10 },
  { name: "Stein", slug: "stein", priority: 2, responseTime: "25-45 Min", distance: 8 },
  { name: "Herzogenaurach", slug: "herzogenaurach", priority: 2, responseTime: "35-55 Min", distance: 22 },
  { name: "Lauf an der Pegnitz", slug: "lauf-an-der-pegnitz", priority: 2, responseTime: "30-50 Min", distance: 18 },
  { name: "Wendelstein", slug: "wendelstein", priority: 2, responseTime: "30-50 Min", distance: 14 },
  { name: "Röthenbach an der Pegnitz", slug: "roethenbach-an-der-pegnitz", priority: 2, responseTime: "30-50 Min", distance: 14 },
  { name: "Feucht", slug: "feucht", priority: 2, responseTime: "25-45 Min", distance: 12 },
  { name: "Eckental", slug: "eckental", priority: 2, responseTime: "30-50 Min", distance: 16 },
  { name: "Heroldsberg", slug: "heroldsberg", priority: 2, responseTime: "25-45 Min", distance: 12 },
  { name: "Cadolzburg", slug: "cadolzburg", priority: 2, responseTime: "30-50 Min", distance: 18 },
  { name: "Langenzenn", slug: "langenzenn", priority: 2, responseTime: "35-55 Min", distance: 22 },
  { name: "Roßtal", slug: "rosstal", priority: 2, responseTime: "30-50 Min", distance: 18 },
  { name: "Veitsbronn", slug: "veitsbronn", priority: 2, responseTime: "25-45 Min", distance: 15 },
  { name: "Schwarzenbruck", slug: "schwarzenbruck", priority: 2, responseTime: "30-50 Min", distance: 15 },
  { name: "Altdorf bei Nürnberg", slug: "altdorf-bei-nuernberg", priority: 2, responseTime: "35-55 Min", distance: 20 },
  { name: "Burgthann", slug: "burgthann", priority: 2, responseTime: "30-50 Min", distance: 18 },
];

// Priority 3: Extended area - 30-60 km radius
export const priorityThreeCities: PriorityCity[] = [
  { name: "Hersbruck", slug: "hersbruck", priority: 3, responseTime: "40-60 Min", distance: 28 },
  { name: "Forchheim", slug: "forchheim", priority: 3, responseTime: "40-60 Min", distance: 32 },
  { name: "Roth", slug: "roth", priority: 3, responseTime: "40-60 Min", distance: 28 },
  { name: "Neumarkt in der Oberpfalz", slug: "neumarkt-in-der-oberpfalz", priority: 3, responseTime: "45-65 Min", distance: 40 },
  { name: "Höchstadt an der Aisch", slug: "hoechstadt-an-der-aisch", priority: 3, responseTime: "45-65 Min", distance: 35 },
  { name: "Heilsbronn", slug: "heilsbronn", priority: 3, responseTime: "40-60 Min", distance: 30 },
  { name: "Windsbach", slug: "windsbach", priority: 3, responseTime: "45-65 Min", distance: 35 },
  { name: "Neustadt an der Aisch", slug: "neustadt-an-der-aisch", priority: 3, responseTime: "50-70 Min", distance: 42 },
  { name: "Ansbach", slug: "ansbach", priority: 3, responseTime: "50-70 Min", distance: 52 },
  { name: "Weißenburg in Bayern", slug: "weissenburg-in-bayern", priority: 3, responseTime: "55-75 Min", distance: 55 },
  { name: "Gunzenhausen", slug: "gunzenhausen", priority: 3, responseTime: "55-75 Min", distance: 60 },
  { name: "Treuchtlingen", slug: "treuchtlingen", priority: 3, responseTime: "55-75 Min", distance: 58 },
  { name: "Pegnitz", slug: "pegnitz", priority: 3, responseTime: "55-75 Min", distance: 55 },
  { name: "Georgensgmünd", slug: "georgensgemuend", priority: 3, responseTime: "40-60 Min", distance: 30 },
  { name: "Rednitzhembach", slug: "rednitzhembach", priority: 3, responseTime: "35-55 Min", distance: 22 },
  { name: "Schwanstetten", slug: "schwanstetten", priority: 3, responseTime: "35-55 Min", distance: 20 },
  { name: "Allersberg", slug: "allersberg", priority: 3, responseTime: "40-60 Min", distance: 32 },
  { name: "Hilpoltstein", slug: "hilpoltstein", priority: 3, responseTime: "45-65 Min", distance: 35 },
  { name: "Ebermannstadt", slug: "ebermannstadt", priority: 3, responseTime: "50-70 Min", distance: 42 },
  { name: "Gräfenberg", slug: "graefenberg", priority: 3, responseTime: "45-65 Min", distance: 35 },
  { name: "Pommelsbrunn", slug: "pommelsbrunn", priority: 3, responseTime: "40-60 Min", distance: 30 },
  { name: "Neunkirchen am Sand", slug: "neunkirchen-am-sand", priority: 3, responseTime: "30-50 Min", distance: 18 },
  { name: "Baiersdorf", slug: "baiersdorf", priority: 3, responseTime: "35-55 Min", distance: 20 },
  { name: "Hirschaid", slug: "hirschaid", priority: 3, responseTime: "50-70 Min", distance: 50 },
  { name: "Neuendettelsau", slug: "neuendettelsau", priority: 3, responseTime: "50-70 Min", distance: 42 },
  { name: "Dietenhofen", slug: "dietenhofen", priority: 3, responseTime: "45-65 Min", distance: 38 },
  { name: "Pleinfeld", slug: "pleinfeld", priority: 3, responseTime: "55-75 Min", distance: 48 },
  { name: "Greding", slug: "greding", priority: 3, responseTime: "50-70 Min", distance: 42 },
  { name: "Thalmässing", slug: "thalmaessing", priority: 3, responseTime: "50-70 Min", distance: 45 },
  { name: "Freystadt", slug: "freystadt", priority: 3, responseTime: "55-75 Min", distance: 48 },
  { name: "Postbauer-Heng", slug: "postbauer-heng", priority: 3, responseTime: "45-65 Min", distance: 38 },
  { name: "Pyrbaum", slug: "pyrbaum", priority: 3, responseTime: "45-65 Min", distance: 35 },
];

// All Mittelfranken cities for sitemap (60km radius)
export const mittelfrankenCities: PriorityCity[] = [
  ...priorityOneCities,
  ...priorityTwoCities,
  ...priorityThreeCities,
];

// Main services for service pages
export const mainServices = [
  { name: "Rohrreinigung", slug: "rohrreinigung" },
  { name: "Kanalreinigung", slug: "kanalreinigung" },
  { name: "Abflussreinigung", slug: "abflussreinigung" },
  { name: "Notdienst", slug: "rohrreinigung-notdienst" },
  { name: "Toilette verstopft", slug: "toilette-verstopft" },
  { name: "TV-Inspektion", slug: "kamera-inspektion" },
];

// Get city slugs for sitemap
export function getMittelfrankenCitySlugs(): string[] {
  return mittelfrankenCities.map(city => city.slug);
}

// Get main service slugs for sitemap
export function getMainServiceSlugs(): string[] {
  return mainServices.map(service => service.slug);
}

// Get priority city by slug
export function getPriorityCityBySlug(slug: string): PriorityCity | undefined {
  return mittelfrankenCities.find(city => city.slug === slug);
}

// Get cities within a specific radius
export function getCitiesWithinRadius(maxDistance: number): PriorityCity[] {
  return mittelfrankenCities.filter(city => city.distance <= maxDistance);
}

// Total count
export const totalMittelfrankenCities = mittelfrankenCities.length;
