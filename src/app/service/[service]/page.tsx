import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Phone, ArrowRight, CheckCircle, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { services, getServiceBySlug, getAllServiceSlugs, getServicesByCategory } from "@/data/services";
import { cities, getNearbyCities } from "@/data/cities";
import { company } from "@/data/company";

interface ServicePageProps {
  params: Promise<{ service: string }>;
}

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({
    service: slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { service: serviceSlug } = await params;
  const service = getServiceBySlug(serviceSlug);

  if (!service) {
    return {
      title: "Leistung nicht gefunden",
    };
  }

  return {
    title: `${service.name} | 24/7 Notdienst Nürnberg | Rohrreinigung Kraft`,
    description: `${service.longDescription} 24/7 Notdienst in Nürnberg und Umgebung. Jetzt anrufen: ${company.contact.phoneDisplay}`,
    openGraph: {
      title: `${service.name} | Rohrreinigung Kraft`,
      description: service.shortDescription,
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { service: serviceSlug } = await params;
  const service = getServiceBySlug(serviceSlug);

  if (!service) {
    notFound();
  }

  const relatedServices = getServicesByCategory(service.category)
    .filter((s) => s.slug !== service.slug)
    .slice(0, 4);

  const mainCities = getNearbyCities(50).slice(0, 8);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.longDescription,
    provider: {
      "@type": "LocalBusiness",
      name: company.name,
      telephone: company.contact.phone,
    },
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 49.4521,
        longitude: 11.0767,
      },
      geoRadius: "100000",
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
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {service.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              <span className="text-gradient">{service.name}</span>
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              {service.shortDescription}
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
                <Shield className="w-5 h-5 text-primary" />
                <span>Professionelle Ausrüstung</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                {service.name} - Unser Service
              </h2>
              <div className="prose prose-lg dark:prose-invert">
                <p>{service.longDescription}</p>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Ihre Vorteile:
                </h3>
                <ul className="space-y-3">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              {/* Quick Contact Card */}
              <div className="bg-gradient-to-br from-primary to-accent rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Sofort-Hilfe</h3>
                <p className="opacity-90 mb-6">
                  Brauchen Sie schnelle Hilfe? Rufen Sie uns an - wir sind 24/7 für Sie da!
                </p>
                <Link href={`tel:${company.contact.phone}`}>
                  <Button size="lg" className="w-full bg-white text-secondary hover:bg-gray-100 h-14">
                    <Phone className="w-5 h-5 mr-2" />
                    {company.contact.phoneDisplay}
                  </Button>
                </Link>
              </div>

              {/* Service in Cities */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">
                  {service.name} in Ihrer Stadt:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {mainCities.map((city) => (
                    <Link
                      key={city.slug}
                      href={`/${city.slug}/${service.slug}`}
                      className="px-3 py-1.5 bg-white dark:bg-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
                    >
                      {city.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Weitere Leistungen in diesem Bereich
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {relatedServices.map((relatedService) => (
                <Link
                  key={relatedService.slug}
                  href={`/service/${relatedService.slug}`}
                  className="group bg-white dark:bg-gray-800 rounded-xl p-5 hover:shadow-lg transition-all border border-gray-100 dark:border-gray-700"
                >
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                    {relatedService.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {relatedService.shortDescription}
                  </p>
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
            {service.name} benötigt?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Kontaktieren Sie uns jetzt für schnelle und professionelle Hilfe!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`tel:${company.contact.phone}`}>
              <Button size="lg" className="bg-white text-secondary hover:bg-gray-100 h-14 px-8">
                <Phone className="w-5 h-5 mr-2" />
                {company.contact.phoneDisplay}
              </Button>
            </Link>
            <Link href="/kontakt">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 h-14 px-8">
                Kontaktformular
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
