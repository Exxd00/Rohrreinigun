import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cities, getCityBySlug, getAllCitySlugs } from "@/data/cities";
import { getMainServices } from "@/data/services";
import { company } from "@/data/company";
import { getEnhancedCityContent } from "@/data/cityContent";
import CityPageContent from "@/components/city/CityPageContent";

interface CityPageProps {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  return getAllCitySlugs().map((slug) => ({
    city: slug,
  }));
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);

  if (!city) {
    return {
      title: "Stadt nicht gefunden",
    };
  }

  return {
    title: `Rohrreinigung ${city.name} | 24/7 Notdienst ab ${company.pricing.services.rohrreinigung.from}€ | Rohrreinigung Kraft`,
    description: `Rohrreinigung in ${city.name} ✓ ${company.urgency.responseTime} Min Anfahrt ✓ 24/7 Notdienst ✓ Ab ${company.pricing.services.rohrreinigung.from}€ ✓ Rückruf in ${company.urgency.callbackTime} Min. Jetzt anrufen: ${company.contact.phoneDisplay}`,
    openGraph: {
      title: `Rohrreinigung ${city.name} | Rohrreinigung Kraft`,
      description: `Ihr Experte für Rohrreinigung & Kanalreinigung in ${city.name}. 24/7 Notdienst verfügbar.`,
    },
  };
}

export default async function CityPage({ params }: CityPageProps) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);

  if (!city) {
    notFound();
  }

  const mainServices = getMainServices();
  const nearbyCities = cities
    .filter((c) => c.slug !== city.slug && c.region === city.region)
    .slice(0, 6);

  // JSON-LD Schema - Enhanced for Local SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `https://rohrreinigung-kraft.de/${city.slug}`,
    name: `Rohrreinigung ${city.name}`,
    description: `Professionelle Rohrreinigung und Kanalreinigung in ${city.name}. 24/7 Notdienst, meist 30-60 Min vor Ort. Kostenlose Diagnose & Festpreis vorab.`,
    url: `https://rohrreinigung-kraft.de/${city.slug}`,
    provider: {
      "@type": "Plumber",
      "@id": "https://rohrreinigung-kraft.de/#organization",
      name: company.name,
      telephone: company.contact.phone,
      email: company.contact.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Ehemannstr. 9",
        addressLocality: "Nürnberg",
        postalCode: "90478",
        addressRegion: "Bayern",
        addressCountry: "DE"
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 49.4521,
        longitude: 11.0767
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5.0",
        bestRating: "5",
        worstRating: "1",
        ratingCount: "129"
      },
      priceRange: "€€",
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00",
        closes: "23:59"
      }
    },
    areaServed: {
      "@type": "City",
      name: city.name,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Mittelfranken"
      }
    },
    serviceType: ["Rohrreinigung", "Kanalreinigung", "Abflussreinigung", "Notdienst"],
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "EUR",
      lowPrice: "69",
      highPrice: "299",
      offerCount: "6"
    },
    hoursAvailable: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59"
    }
  };

  const enhancedContent = getEnhancedCityContent(citySlug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CityPageContent
        city={city}
        mainServices={mainServices}
        nearbyCities={nearbyCities}
        enhancedContent={enhancedContent}
      />
    </>
  );
}
