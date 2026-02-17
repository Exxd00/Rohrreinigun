import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Phone, MapPin, Clock, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cities, getCityBySlug, getAllCitySlugs } from "@/data/cities";
import { services, getMainServices } from "@/data/services";
import { company } from "@/data/company";

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
    title: `Rohrreinigung ${city.name} | 24/7 Notdienst | Rohrreinigung Kraft`,
    description: `Professionelle Rohrreinigung in ${city.name}. 24/7 Notdienst, schnelle Anfahrt, faire Preise. Jetzt anrufen: ${company.contact.phoneDisplay}`,
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
    .filter((c) => c.slug !== city.slug && Math.abs(c.distance - city.distance) < 30)
    .slice(0, 6);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Rohrreinigung ${city.name}`,
    description: `Professionelle Rohrreinigung und Kanalreinigung in ${city.name}`,
    provider: {
      "@type": "LocalBusiness",
      name: company.name,
      telephone: company.contact.phone,
    },
    areaServed: {
      "@type": "City",
      name: city.name,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-[#F8FBFF] via-white to-[#E8F4FF] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {city.region}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Rohrreinigung in{" "}
              <span className="text-gradient">{city.name}</span>
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              {city.description} Wir sind in nur{" "}
              <strong className="text-primary">{city.distance === 0 ? "kürzester Zeit" : `${city.distance} Minuten`}</strong> bei Ihnen vor Ort.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href={`tel:${company.contact.phone}`}>
                <Button size="lg" className="gradient-primary text-white btn-shimmer h-14 px-8">
                  <Phone className="w-5 h-5 mr-2" />
                  Jetzt anrufen
                </Button>
              </Link>
              <Link href="/kontakt">
                <Button size="lg" variant="outline" className="h-14 px-8">
                  Kontaktformular
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Clock className="w-5 h-5 text-primary" />
                <span>24/7 Notdienst</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span>Schnelle Anfahrt</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span>Faire Preise</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Unsere Leistungen in {city.name}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {mainServices.map((service) => (
              <Link
                key={service.slug}
                href={`/${city.slug}/${service.slug}`}
                className="group bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 hover:shadow-lg transition-all hover-lift border border-gray-100 dark:border-gray-700"
              >
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                  {service.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {service.shortDescription}
                </p>
                <span className="text-primary text-sm font-medium flex items-center gap-1">
                  Mehr erfahren
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Rohrreinigung & Kanalreinigung in {city.name}
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                Als lokaler Fachbetrieb für Rohrreinigung sind wir Ihr zuverlässiger Partner in {city.name} und der gesamten Region {city.region}.
                Mit modernster Technik und langjähriger Erfahrung lösen wir jede Verstopfung schnell und effektiv.
              </p>
              <p>
                Ob verstopfte Toilette, blockierter Abfluss oder komplette Kanalreinigung - unser Notdienst ist 24 Stunden am Tag,
                7 Tage die Woche für Sie erreichbar. Die Anfahrt nach {city.name} dauert ca. {city.distance === 0 ? "wenige" : city.distance} Minuten.
              </p>
              <h3>Unsere Vorteile in {city.name}:</h3>
              <ul>
                <li>24/7 Notdienst - auch an Wochenenden und Feiertagen</li>
                <li>Schnelle Anfahrt in {city.distance === 0 ? "kürzester Zeit" : `ca. ${city.distance} Minuten`}</li>
                <li>Moderne Hochdrucktechnik und Kamerainspektion</li>
                <li>Transparente Preise ohne versteckte Kosten</li>
                <li>Erfahrene Fachkräfte mit professioneller Ausrüstung</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Nearby Cities */}
      {nearbyCities.length > 0 && (
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Weitere Einsatzgebiete in der Nähe
            </h2>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {nearbyCities.map((nearbyCity) => (
                <Link
                  key={nearbyCity.slug}
                  href={`/${nearbyCity.slug}`}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  {nearbyCity.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 gradient-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Rohrverstopfung in {city.name}?
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Rufen Sie uns jetzt an - wir sind sofort für Sie da!
          </p>
          <Link href={`tel:${company.contact.phone}`}>
            <Button size="lg" className="bg-white text-secondary hover:bg-gray-100 h-14 px-8">
              <Phone className="w-5 h-5 mr-2" />
              {company.contact.phoneDisplay}
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
