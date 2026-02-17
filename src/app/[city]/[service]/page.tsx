import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Phone, MapPin, ArrowRight, CheckCircle, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cities, getCityBySlug, getAllCitySlugs } from "@/data/cities";
import { services, getServiceBySlug, getAllServiceSlugs, getServicesByCategory } from "@/data/services";
import { company } from "@/data/company";

interface CityServicePageProps {
  params: Promise<{ city: string; service: string }>;
}

export async function generateStaticParams() {
  const citySlugs = getAllCitySlugs();
  const serviceSlugs = getAllServiceSlugs();

  const params: { city: string; service: string }[] = [];

  for (const citySlug of citySlugs) {
    for (const serviceSlug of serviceSlugs) {
      params.push({
        city: citySlug,
        service: serviceSlug,
      });
    }
  }

  return params;
}

export async function generateMetadata({ params }: CityServicePageProps): Promise<Metadata> {
  const { city: citySlug, service: serviceSlug } = await params;
  const city = getCityBySlug(citySlug);
  const service = getServiceBySlug(serviceSlug);

  if (!city || !service) {
    return {
      title: "Seite nicht gefunden",
    };
  }

  return {
    title: `${service.name} ${city.name} | 24/7 Notdienst | Rohrreinigung Kraft`,
    description: `${service.name} in ${city.name}. ${service.shortDescription} 24/7 Notdienst, schnelle Anfahrt. Jetzt anrufen: ${company.contact.phoneDisplay}`,
    openGraph: {
      title: `${service.name} ${city.name} | Rohrreinigung Kraft`,
      description: `Professionelle ${service.name} in ${city.name}. Schnelle Hilfe bei Rohrverstopfungen.`,
    },
  };
}

export default async function CityServicePage({ params }: CityServicePageProps) {
  const { city: citySlug, service: serviceSlug } = await params;
  const city = getCityBySlug(citySlug);
  const service = getServiceBySlug(serviceSlug);

  if (!city || !service) {
    notFound();
  }

  const relatedServices = getServicesByCategory(service.category)
    .filter((s) => s.slug !== service.slug)
    .slice(0, 3);

  const nearbyCities = cities
    .filter((c) => c.slug !== city.slug && Math.abs(c.distance - city.distance) < 30)
    .slice(0, 5);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${service.name} ${city.name}`,
    description: `${service.name} in ${city.name}. ${service.longDescription}`,
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
            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
              <Link href="/" className="hover:text-primary">Startseite</Link>
              <span>/</span>
              <Link href={`/${city.slug}`} className="hover:text-primary">{city.name}</Link>
              <span>/</span>
              <span className="text-primary">{service.name}</span>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {city.name}, {city.region}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              <span className="text-gradient">{service.name}</span> in {city.name}
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              {service.shortDescription} Wir sind in {city.distance === 0 ? "kürzester Zeit" : `ca. ${city.distance} Minuten`} bei Ihnen in {city.name} vor Ort.
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
                  Anfrage senden
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
                <Shield className="w-5 h-5 text-primary" />
                <span>Professionelle Ausrüstung</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span>Faire Preise</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {service.name} in {city.name} - Ihr lokaler Experte
              </h2>

              <div className="prose prose-lg dark:prose-invert mb-8">
                <p>
                  {service.longDescription}
                </p>
                <p>
                  Als Ihr lokaler Fachbetrieb für {service.name} in {city.name} und der Region {city.region} sind wir
                  schnell bei Ihnen vor Ort. Unser erfahrenes Team verfügt über modernste Ausrüstung und löst Ihr
                  Problem professionell und nachhaltig.
                </p>
              </div>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Ihre Vorteile bei {service.name} in {city.name}:
              </h3>
              <ul className="space-y-3 mb-8">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-gray-600 dark:text-gray-300">
                    Schnelle Anfahrt nach {city.name} in ca. {city.distance === 0 ? "wenigen" : city.distance} Minuten
                  </span>
                </li>
              </ul>

              {/* Related Services */}
              {relatedServices.length > 0 && (
                <div className="mt-12">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Weitere Leistungen in {city.name}:
                  </h3>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {relatedServices.map((relatedService) => (
                      <Link
                        key={relatedService.slug}
                        href={`/${city.slug}/${relatedService.slug}`}
                        className="group bg-gray-50 dark:bg-gray-800 rounded-xl p-4 hover:shadow-md transition-all"
                      >
                        <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary transition-colors text-sm">
                          {relatedService.name}
                        </h4>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Contact */}
              <div className="bg-gradient-to-br from-primary to-accent rounded-2xl p-6 text-white sticky top-24">
                <h3 className="text-xl font-bold mb-3">Sofort-Hilfe in {city.name}</h3>
                <p className="opacity-90 text-sm mb-4">
                  Brauchen Sie {service.name} in {city.name}? Rufen Sie uns an!
                </p>
                <Link href={`tel:${company.contact.phone}`}>
                  <Button className="w-full bg-white text-secondary hover:bg-gray-100 h-12">
                    <Phone className="w-5 h-5 mr-2" />
                    {company.contact.phoneDisplay}
                  </Button>
                </Link>
                <p className="text-center text-sm opacity-80 mt-3">
                  24/7 erreichbar
                </p>
              </div>

              {/* Nearby Cities */}
              {nearbyCities.length > 0 && (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-4">
                    {service.name} auch in:
                  </h3>
                  <div className="space-y-2">
                    {nearbyCities.map((nearbyCity) => (
                      <Link
                        key={nearbyCity.slug}
                        href={`/${nearbyCity.slug}/${service.slug}`}
                        className="block px-3 py-2 bg-white dark:bg-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
                      >
                        {nearbyCity.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 gradient-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {service.name} in {city.name} benötigt?
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Wir sind schnell bei Ihnen - rufen Sie jetzt an!
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
