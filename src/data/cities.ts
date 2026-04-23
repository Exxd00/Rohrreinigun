/**
 * Cities in Mittelfranken - Service Area (60km radius from Nürnberg)
 * Focused on Mittelfranken region for Google Ads campaigns
 */

export interface City {
  name: string;
  slug: string;
  region: string;
  distance: number; // km from Nürnberg
  population?: number;
  description: string;
  postalCodes?: string[];
}

// Generator function to create cities
const createCity = (
  name: string,
  slug: string,
  region: string,
  distance: number,
  population?: number,
  description?: string
): City => ({
  name,
  slug,
  region,
  distance,
  population,
  description: description || `Professionelle Rohrreinigung und Kanalreinigung in ${name}. 24/7 Notdienst mit schneller Anfahrt.`,
});

export const cities: City[] = [
  // === PRIORITY 1: HAUPTSTÄDTE (0-10 km) ===
  createCity("Nürnberg", "nuernberg", "Mittelfranken", 0, 518370, "Zweitgrößte Stadt Bayerns und unser Hauptstandort für Rohrreinigung und Kanalreinigung."),
  createCity("Fürth", "fuerth", "Mittelfranken", 7, 132000, "Direkte Nachbarstadt von Nürnberg. Schnelle Anfahrt für alle Rohrreinigungsarbeiten."),
  createCity("Erlangen", "erlangen", "Mittelfranken", 18, 113000, "Universitätsstadt mit moderner Infrastruktur. Wir sind schnell vor Ort."),

  // === PRIORITY 2: NAHES UMLAND (10-30 km) ===
  createCity("Stein", "stein", "Mittelfranken", 8, 14000),
  createCity("Oberasbach", "oberasbach", "Mittelfranken", 10, 18000),
  createCity("Zirndorf", "zirndorf", "Mittelfranken", 12, 26000),
  createCity("Feucht", "feucht", "Mittelfranken", 12, 14000),
  createCity("Wendelstein", "wendelstein", "Mittelfranken", 14, 16000),
  createCity("Heroldsberg", "heroldsberg", "Mittelfranken", 12, 9000),
  createCity("Schwarzenbruck", "schwarzenbruck", "Mittelfranken", 15, 9000),
  createCity("Röthenbach an der Pegnitz", "roethenbach-an-der-pegnitz", "Mittelfranken", 14, 12000),
  createCity("Schwabach", "schwabach", "Mittelfranken", 15, 40000, "Goldschlägerstadt südlich von Nürnberg. Schnelle Soforthilfe bei Verstopfungen."),
  createCity("Veitsbronn", "veitsbronn", "Mittelfranken", 15, 7500),
  createCity("Eckental", "eckental", "Mittelfranken", 16, 14000),
  createCity("Cadolzburg", "cadolzburg", "Mittelfranken", 18, 11000),
  createCity("Lauf an der Pegnitz", "lauf-an-der-pegnitz", "Mittelfranken", 18, 26000),
  createCity("Roßtal", "rosstal", "Mittelfranken", 18, 10000),
  createCity("Burgthann", "burgthann", "Mittelfranken", 18, 12000),
  createCity("Neunkirchen am Sand", "neunkirchen-am-sand", "Mittelfranken", 18, 8500),
  createCity("Altdorf bei Nürnberg", "altdorf-bei-nuernberg", "Mittelfranken", 20, 16000),
  createCity("Baiersdorf", "baiersdorf", "Mittelfranken", 20, 8000),
  createCity("Schwanstetten", "schwanstetten", "Mittelfranken", 20, 7000),
  createCity("Herzogenaurach", "herzogenaurach", "Mittelfranken", 22, 25000),
  createCity("Rednitzhembach", "rednitzhembach", "Mittelfranken", 22, 7500),
  createCity("Langenzenn", "langenzenn", "Mittelfranken", 22, 10000),
  createCity("Hemhofen", "hemhofen", "Mittelfranken", 22, 5000),
  createCity("Röttenbach", "roettenbach", "Mittelfranken", 24, 4500),
  createCity("Heßdorf", "hessdorf", "Mittelfranken", 25, 4500),
  createCity("Schnaittach", "schnaittach", "Mittelfranken", 25, 8000),
  createCity("Hersbruck", "hersbruck", "Mittelfranken", 28, 13000),
  createCity("Roth", "roth", "Mittelfranken", 28, 25000),
  createCity("Adelsdorf", "adelsdorf", "Mittelfranken", 28, 8500),
  createCity("Weisendorf", "weisendorf", "Mittelfranken", 28, 7000),

  // === PRIORITY 3: ERWEITERTES GEBIET (30-60 km) ===
  createCity("Pommelsbrunn", "pommelsbrunn", "Mittelfranken", 30, 6000),
  createCity("Georgensgmünd", "georgensgemuend", "Mittelfranken", 30, 7000),
  createCity("Heilsbronn", "heilsbronn", "Mittelfranken", 30, 9000),
  createCity("Forchheim", "forchheim", "Oberfranken", 32, 32000),
  createCity("Allersberg", "allersberg", "Mittelfranken", 32, 9000),
  createCity("Höchstadt an der Aisch", "hoechstadt-an-der-aisch", "Mittelfranken", 35, 14000),
  createCity("Windsbach", "windsbach", "Mittelfranken", 35, 6000),
  createCity("Hilpoltstein", "hilpoltstein", "Mittelfranken", 35, 14000),
  createCity("Pyrbaum", "pyrbaum", "Oberpfalz", 35, 6000),
  createCity("Gräfenberg", "graefenberg", "Oberfranken", 35, 4000),
  createCity("Postbauer-Heng", "postbauer-heng", "Oberpfalz", 38, 8000),
  createCity("Dietenhofen", "dietenhofen", "Mittelfranken", 38, 4500),
  createCity("Neumarkt in der Oberpfalz", "neumarkt-in-der-oberpfalz", "Oberpfalz", 40, 41000),
  createCity("Ebermannstadt", "ebermannstadt", "Oberfranken", 42, 7000),
  createCity("Neuendettelsau", "neuendettelsau", "Mittelfranken", 42, 8000),
  createCity("Greding", "greding", "Mittelfranken", 42, 7000),
  createCity("Neustadt an der Aisch", "neustadt-an-der-aisch", "Mittelfranken", 42, 13000),
  createCity("Thalmässing", "thalmaessing", "Mittelfranken", 45, 5000),
  createCity("Freystadt", "freystadt", "Oberpfalz", 48, 9000),
  createCity("Pleinfeld", "pleinfeld", "Mittelfranken", 48, 8000),
  createCity("Hirschaid", "hirschaid", "Oberfranken", 50, 12000),
  createCity("Ansbach", "ansbach", "Mittelfranken", 52, 42000, "Regierungssitz von Mittelfranken. Zuverlässiger Rohrreinigungsservice."),
  createCity("Pegnitz", "pegnitz", "Oberfranken", 55, 14000),
  createCity("Weißenburg in Bayern", "weissenburg-in-bayern", "Mittelfranken", 55, 18000),
  createCity("Treuchtlingen", "treuchtlingen", "Mittelfranken", 58, 13000),
  createCity("Gunzenhausen", "gunzenhausen", "Mittelfranken", 60, 17000),
];

export const regions = [
  "Mittelfranken",
  "Oberfranken",
  "Oberpfalz",
];

export function getCityBySlug(slug: string): City | undefined {
  return cities.find((city) => city.slug === slug);
}

export function getCitiesByRegion(region: string): City[] {
  return cities.filter((city) => city.region === region);
}

export function getNearbyCities(distance: number = 30): City[] {
  return cities.filter((city) => city.distance <= distance);
}

export function getAllCitySlugs(): string[] {
  return cities.map((city) => city.slug);
}

export function searchCities(query: string): City[] {
  const searchTerm = query.toLowerCase();
  return cities.filter(
    (city) =>
      city.name.toLowerCase().includes(searchTerm) ||
      city.slug.toLowerCase().includes(searchTerm) ||
      city.region.toLowerCase().includes(searchTerm)
  );
}

export function getCitiesSortedByDistance(): City[] {
  return [...cities].sort((a, b) => a.distance - b.distance);
}

export function getCitiesSortedByName(): City[] {
  return [...cities].sort((a, b) => a.name.localeCompare(b.name, 'de'));
}

// Total cities in service area
export const totalCities = cities.length;
