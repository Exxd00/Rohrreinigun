import { NextRequest, NextResponse } from "next/server";
import {
  getCampaigns,
  createCampaign,
  currencyToMicros,
  GoogleAdsConfig,
} from "@/lib/google-ads";

function getConfig(): GoogleAdsConfig {
  return {
    developerToken: process.env.GOOGLE_ADS_DEVELOPER_TOKEN || "",
    clientId: process.env.GOOGLE_ADS_CLIENT_ID || "",
    clientSecret: process.env.GOOGLE_ADS_CLIENT_SECRET || "",
    refreshToken: process.env.GOOGLE_ADS_REFRESH_TOKEN || "",
    customerId: process.env.GOOGLE_ADS_CUSTOMER_ID || "", // Client account (789-424-2096)
    loginCustomerId: process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID || "", // MCC account (476-210-5656)
  };
}

// Predefined templates for Rohrreinigung campaigns
const CAMPAIGN_TEMPLATES = {
  rohrreinigung: {
    keywords: [
      "rohrreinigung {city}",
      "rohr verstopft {city}",
      "abfluss verstopft {city}",
      "abflussreinigung {city}",
      "klempner {city}",
      "sanitär notdienst {city}",
      "rohr reinigen {city}",
      "verstopfung {city}",
      "abfluss frei machen {city}",
      "rohrreinigung notdienst {city}",
    ],
    negativeKeywords: [
      "selber machen",
      "hausmittel",
      "tipps",
      "anleitung",
      "youtube",
      "video",
      "kostenlos",
      "gratis",
    ],
    headlines: [
      "Rohrreinigung {city}",
      "24/7 Notdienst Verfügbar",
      "Schnelle Hilfe in 30 Min",
      "Festpreis Garantie",
      "Keine Anfahrtskosten",
      "Professionelle Rohrreinigung",
      "Sofort Termin Möglich",
      "Abfluss Verstopft? Wir Helfen!",
      "Faire Preise Ab €59",
      "Zufriedenheitsgarantie",
      "Lokaler Fachbetrieb",
      "Über 1000 Zufriedene Kunden",
      "Modernste Technik",
      "Rohrreinigung vom Profi",
      "Jetzt Anrufen",
    ],
    descriptions: [
      "Professionelle Rohrreinigung in {city}. 24/7 Notdienst, faire Festpreise. Jetzt anrufen!",
      "Abfluss verstopft? Schnelle Hilfe in 30 Minuten. Keine versteckten Kosten. Rufen Sie jetzt an!",
      "Rohrreinigung zum Festpreis. Modernste Technik & erfahrene Techniker. Kostenlose Beratung.",
      "Ihr lokaler Experte für Rohrreinigung in {city}. Schnell, zuverlässig, günstig. 24/7 erreichbar.",
    ],
  },
  notdienst: {
    keywords: [
      "rohrreinigung notdienst {city}",
      "sanitär notdienst {city}",
      "klempner notdienst {city}",
      "abfluss notdienst {city}",
      "rohr verstopft notdienst {city}",
      "wc verstopft notdienst {city}",
      "toilette verstopft notdienst {city}",
      "24h rohrreinigung {city}",
      "rohrreinigung nachts {city}",
      "rohrreinigung wochenende {city}",
    ],
    negativeKeywords: [
      "selber machen",
      "hausmittel",
      "tipps",
    ],
    headlines: [
      "24/7 Notdienst {city}",
      "Sofort Hilfe - Tag & Nacht",
      "Notdienst in 30 Minuten",
      "Auch Am Wochenende",
      "Jetzt Sofort Anrufen",
      "Keine Wartezeit",
      "Notfall Rohrreinigung",
      "Schnelle Notfall Hilfe",
      "24 Stunden Erreichbar",
      "Sofort Verfügbar",
    ],
    descriptions: [
      "24/7 Notdienst Rohrreinigung in {city}. Wir sind in 30 Minuten bei Ihnen. Jetzt anrufen!",
      "Rohr verstopft? Sofort Hilfe - Tag & Nacht, 365 Tage im Jahr. Festpreis, keine versteckten Kosten.",
    ],
  },
  kanalreinigung: {
    keywords: [
      "kanalreinigung {city}",
      "kanal verstopft {city}",
      "kanalreinigung firma {city}",
      "kanal reinigen {city}",
      "abwasserkanal verstopft {city}",
      "kanalspülung {city}",
      "hochdruckreinigung kanal {city}",
      "kanalinspektion {city}",
    ],
    negativeKeywords: [
      "selber machen",
      "hausmittel",
    ],
    headlines: [
      "Kanalreinigung {city}",
      "Professionelle Kanalspülung",
      "Hochdruckreinigung",
      "Kanalinspektion mit Kamera",
      "Festpreis Kanalreinigung",
      "Schnelle Kanalreinigung",
      "Kanal Verstopft?",
      "Erfahrene Fachleute",
    ],
    descriptions: [
      "Professionelle Kanalreinigung in {city}. Hochdruckreinigung & TV-Inspektion. Festpreis Garantie.",
      "Kanal verstopft? Wir lösen das Problem schnell & zuverlässig. Jetzt kostenlos beraten lassen!",
    ],
  },
};

// German city location IDs (Mittelfranken area)
const CITY_LOCATION_IDS: Record<string, string> = {
  "nürnberg": "1004730",
  "nuernberg": "1004730",
  "nuremberg": "1004730",
  "fürth": "1004226",
  "fuerth": "1004226",
  "erlangen": "1004163",
  "schwabach": "1004887",
  "ansbach": "1004002",
  "roth": "1004818",
  "zirndorf": "1005133",
  "oberasbach": "1004692",
  "stein": "1004951",
  "herzogenaurach": "1004361",
  "lauf": "1004519",
};

// Get campaigns
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const startDate = searchParams.get("startDate") || getDefaultStartDate();
  const endDate = searchParams.get("endDate") || getDefaultEndDate();

  try {
    const config = getConfig();
    const campaigns = await getCampaigns(config, { startDate, endDate });
    return NextResponse.json({ success: true, data: campaigns });
  } catch (error) {
    console.error("[Campaigns API]", error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}

// Create new campaign
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, ...data } = body;

    const config = getConfig();

    switch (action) {
      case "create-city-campaign": {
        // Create a campaign for a new city using templates
        const cityName = data.city?.toLowerCase() || "";
        const cityNameCapitalized = cityName.charAt(0).toUpperCase() + cityName.slice(1);
        const template = CAMPAIGN_TEMPLATES[data.template as keyof typeof CAMPAIGN_TEMPLATES] || CAMPAIGN_TEMPLATES.rohrreinigung;
        const dailyBudget = data.dailyBudget || 50;

        // Replace {city} placeholder in templates
        const keywords = template.keywords.map(k => k.replace("{city}", cityNameCapitalized));
        const headlines = template.headlines.map(h => h.replace("{city}", cityNameCapitalized));
        const descriptions = template.descriptions.map(d => d.replace("{city}", cityNameCapitalized));

        // Get location ID
        const locationId = CITY_LOCATION_IDS[cityName] || "";

        const result = await createCampaign(config, {
          name: `Rohrreinigung ${cityNameCapitalized}`,
          dailyBudgetMicros: currencyToMicros(dailyBudget),
          targetLocationIds: locationId ? [locationId] : [],
          keywords,
          negativeKeywords: template.negativeKeywords,
          headlines,
          descriptions,
          finalUrl: `https://rohrreinigung-kraft.de/${cityName.toLowerCase().replace("ü", "ue").replace("ä", "ae").replace("ö", "oe")}`,
          phoneNumber: "+4991189218682",
        });

        return NextResponse.json(result);
      }

      case "create-custom": {
        // Create a fully custom campaign
        const result = await createCampaign(config, {
          name: data.name,
          dailyBudgetMicros: currencyToMicros(data.dailyBudget || 50),
          targetLocationIds: data.locationIds || [],
          keywords: data.keywords || [],
          negativeKeywords: data.negativeKeywords || [],
          headlines: data.headlines || [],
          descriptions: data.descriptions || [],
          finalUrl: data.finalUrl,
          phoneNumber: data.phoneNumber || "+4991189218682",
        });

        return NextResponse.json(result);
      }

      case "get-templates": {
        // Return available templates
        return NextResponse.json({
          success: true,
          templates: Object.keys(CAMPAIGN_TEMPLATES),
          templateDetails: CAMPAIGN_TEMPLATES,
        });
      }

      case "get-locations": {
        // Return available location IDs
        return NextResponse.json({
          success: true,
          locations: CITY_LOCATION_IDS,
        });
      }

      case "preview": {
        // Preview what a campaign would look like without creating it
        const cityName = data.city?.toLowerCase() || "";
        const cityNameCapitalized = cityName.charAt(0).toUpperCase() + cityName.slice(1);
        const template = CAMPAIGN_TEMPLATES[data.template as keyof typeof CAMPAIGN_TEMPLATES] || CAMPAIGN_TEMPLATES.rohrreinigung;
        const dailyBudget = data.dailyBudget || 50;

        const keywords = template.keywords.map(k => k.replace("{city}", cityNameCapitalized));
        const headlines = template.headlines.map(h => h.replace("{city}", cityNameCapitalized));
        const descriptions = template.descriptions.map(d => d.replace("{city}", cityNameCapitalized));

        return NextResponse.json({
          success: true,
          preview: {
            campaignName: `Rohrreinigung ${cityNameCapitalized}`,
            dailyBudget: `€${dailyBudget}`,
            targetLocation: cityNameCapitalized,
            locationId: CITY_LOCATION_IDS[cityName] || "Not found",
            keywordCount: keywords.length,
            keywords: keywords.slice(0, 5),
            headlineCount: headlines.length,
            headlines: headlines.slice(0, 5),
            descriptionCount: descriptions.length,
            descriptions: descriptions.slice(0, 2),
            negativeKeywords: template.negativeKeywords,
            finalUrl: `https://rohrreinigung-kraft.de/${cityName.toLowerCase().replace("ü", "ue").replace("ä", "ae").replace("ö", "oe")}`,
          },
        });
      }

      default:
        return NextResponse.json({
          success: false,
          error: "Unknown action. Use: create-city-campaign, create-custom, get-templates, get-locations, preview",
        }, { status: 400 });
    }
  } catch (error) {
    console.error("[Campaigns API]", error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}

function getDefaultStartDate(): string {
  const date = new Date();
  date.setDate(date.getDate() - 30);
  return date.toISOString().split("T")[0];
}

function getDefaultEndDate(): string {
  return new Date().toISOString().split("T")[0];
}
