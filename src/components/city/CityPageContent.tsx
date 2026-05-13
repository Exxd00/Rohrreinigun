"use client";

import { useState } from "react";
import Link from "next/link";
import { Phone, Clock, ArrowRight, CheckCircle, Zap, Users, Shield, Star, AlertTriangle, Wrench, MapPin, Quote, ChevronDown, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { company } from "@/data/company";
import CallConfirmModal from "@/components/layout/CallConfirmModal";
import type { EnhancedCityContent } from "@/data/cityContent";

interface City {
  slug: string;
  name: string;
  region: string;
}

interface Service {
  slug: string;
  name: string;
  shortDescription: string;
}

interface CityPageContentProps {
  city: City;
  mainServices: Service[];
  nearbyCities: City[];
  enhancedContent: EnhancedCityContent | null;
}

export default function CityPageContent({ city, mainServices, nearbyCities, enhancedContent }: CityPageContentProps) {
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);

  const commonProblems = [
    "Toilette verstopft",
    "Abfluss läuft nicht ab",
    "Dusche verstopft",
    "Waschbecken blockiert",
    "Küchenabfluss verstopft",
    "Geruch aus dem Abfluss",
  ];

  return (
    <>
      {/* Call Confirmation Modal */}
      <CallConfirmModal
        isOpen={isCallModalOpen}
        onClose={() => setIsCallModalOpen(false)}
        source={`city_page_${city.slug}`}
      />

      {/* Hero Section - Emergency Style */}
      <section className="relative pt-24 md:pt-28 pb-10 md:pb-14 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-primary to-red-500" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-2 text-sm text-white/60 mb-4">
              <Link href="/" className="hover:text-primary transition-colors">Startseite</Link>
              <span>/</span>
              <span className="text-primary font-medium">{city.name}</span>
            </div>

            {/* Urgency Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-full mb-4">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <span className="text-sm font-semibold text-red-300">Notfall in {city.name}? Sofort-Hilfe!</span>
            </div>

            {/* Availability Badge */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-5">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/20 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-sm font-medium text-green-400">
                  Techniker in {city.name} verfügbar
                </span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight">
              <span className="text-white">Rohrreinigung</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">
                {city.name}
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-white/90 mb-6 font-medium">
              In <span className="text-primary font-bold">{company.urgency.responseTime} Min</span> bei Ihnen •{" "}
              <span className="text-green-400">Festpreis vorab</span> • 24/7
            </p>

            {/* MAIN CTA - Phone */}
            <div className="max-w-md mx-auto mb-6">
              <button
                onClick={() => setIsCallModalOpen(true)}
                className="w-full group relative"
              >
                <div className="absolute inset-0 bg-primary blur-xl opacity-40 group-hover:opacity-60 transition-opacity" />
                <div className="relative bg-gradient-to-r from-primary to-cyan-500 rounded-2xl px-6 py-5 flex items-center justify-center gap-4 transition-transform group-hover:scale-[1.02] shadow-2xl">
                  <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                    <Phone className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-white/90 text-sm font-medium">Jetzt kostenlos anrufen</p>
                    <p className="text-white text-2xl md:text-3xl font-black">
                      {company.contact.phoneDisplay}
                    </p>
                  </div>
                </div>
              </button>

              <Link href="/kontakt" className="block mt-3">
                <div className="w-full h-12 bg-white/10 hover:bg-white/20 text-white border border-white/30 font-semibold rounded-xl backdrop-blur-sm flex items-center justify-center gap-2 transition-all">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  Rückruf in {company.urgency.callbackTime} Min
                </div>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm">
              <div className="flex items-center gap-2 text-white/80">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Diagnose gratis</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Shield className="w-4 h-4 text-primary" />
                <span>Festpreis-Garantie</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Star className="w-4 h-4 text-amber-400" />
                <span>{company.rating.displayText} Google</span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 30L60 27C120 24 240 18 360 18C480 18 600 24 720 30C840 36 960 42 1080 39C1200 36 1320 24 1380 18L1440 12V60H0V30Z" fill="white" className="dark:fill-gray-900"/>
          </svg>
        </div>
      </section>

      {/* Quick Problem Selector */}
      <section className="py-8 md:py-10 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
            Was ist Ihr Problem?
          </h2>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {commonProblems.map((problem) => (
              <button
                key={problem}
                onClick={() => setIsCallModalOpen(true)}
                className="px-4 py-2.5 bg-gray-100 dark:bg-gray-800 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-primary hover:text-white transition-all flex items-center gap-2"
              >
                <Wrench className="w-4 h-4" />
                {problem}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-10 md:py-14 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Unsere Leistungen in {city.name}
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {mainServices.map((service) => {
              const priceKey = service.slug === "rohrreinigung" ? "rohrreinigung"
                : service.slug === "kanalreinigung" ? "kanalreinigung"
                : service.slug === "abflussreinigung" ? "abflussreinigung"
                : "notdienst";
              const price = company.pricing.services[priceKey as keyof typeof company.pricing.services];

              return (
                <Link
                  key={service.slug}
                  href={`/${city.slug}/${service.slug}`}
                  className="group bg-white dark:bg-gray-900 rounded-xl p-4 hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700 hover:border-primary/30"
                >
                  <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                    {service.shortDescription}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-primary font-bold text-lg">ab {price.from}€</span>
                    <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-10 md:py-14 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Warum {company.name} in {city.name}?
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-xl text-center">
                <div className="w-14 h-14 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                  <Clock className="w-7 h-7 text-primary" />
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{company.urgency.responseTime} Min</p>
                <p className="text-sm text-gray-500">Anfahrt</p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-xl text-center">
                <div className="w-14 h-14 mx-auto rounded-xl bg-green-500/10 flex items-center justify-center mb-3">
                  <Shield className="w-7 h-7 text-green-500" />
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">Festpreis</p>
                <p className="text-sm text-gray-500">Garantie</p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-xl text-center">
                <div className="w-14 h-14 mx-auto rounded-xl bg-amber-500/10 flex items-center justify-center mb-3">
                  <Star className="w-7 h-7 text-amber-500" />
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{company.rating.score}</p>
                <p className="text-sm text-gray-500">Google Rating</p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-xl text-center">
                <div className="w-14 h-14 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                  <Users className="w-7 h-7 text-primary" />
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{company.stats.projectsCompleted}</p>
                <p className="text-sm text-gray-500">Kunden</p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 md:p-8">
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                Als Ihr lokaler Rohrreinigungsdienst in <strong>{city.name}</strong> sind wir rund um die Uhr für Sie da.
                Egal ob verstopfte Toilette, blockierter Abfluss oder Kanalprobleme – unser erfahrenes Team löst Ihr Problem schnell und zuverlässig.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                  <span>Kostenlose Diagnose vor Ort – Sie entscheiden erst danach</span>
                </li>
                <li className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                  <span>Festpreis vor Arbeitsbeginn – keine Überraschungen</span>
                </li>
                <li className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                  <span>Modernste Hochdruck- und Kameratechnik</span>
                </li>
                <li className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                  <span>24/7 Notdienst – auch nachts und am Wochenende</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Content - Local Expertise */}
      {enhancedContent && (
        <>
          {/* Local Expertise */}
          <section className="py-10 md:py-14 bg-emerald-50 dark:bg-emerald-900/10">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    {enhancedContent.localExpertise.title}
                  </h2>
                </div>
                <ul className="grid md:grid-cols-2 gap-3">
                  {enhancedContent.localExpertise.points.map((point, index) => (
                    <li key={index} className="flex items-start gap-3 bg-white dark:bg-gray-800 p-4 rounded-xl">
                      <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">{point}</span>
                    </li>
                  ))}
                </ul>

                {/* Response Time Info */}
                <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl p-6 border border-emerald-200 dark:border-emerald-900/30">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    Anfahrtszeit nach {city.name}
                  </h3>
                  <div className="grid sm:grid-cols-3 gap-4 text-center">
                    <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                      <p className="text-2xl font-bold text-primary">{enhancedContent.responseInfo.typical}</p>
                      <p className="text-xs text-gray-500">Typisch</p>
                    </div>
                    <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl">
                      <p className="text-2xl font-bold text-emerald-600">{enhancedContent.responseInfo.fastest}</p>
                      <p className="text-xs text-gray-500">Am schnellsten</p>
                    </div>
                    <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl flex items-center justify-center">
                      <p className="text-sm text-gray-600 dark:text-gray-400">{enhancedContent.responseInfo.note}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Neighborhoods */}
          <section className="py-10 md:py-14 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                  Stadtteile in {city.name}
                </h2>
                <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
                  Wir kennen alle Stadtteile und ihre Besonderheiten.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {enhancedContent.neighborhoods.map((neighborhood) => (
                    <div key={neighborhood.name} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 hover:shadow-md transition-shadow">
                      <p className="font-semibold text-gray-900 dark:text-white">{neighborhood.name}</p>
                      {neighborhood.description && (
                        <p className="text-xs text-gray-500 mt-1">{neighborhood.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Local Problems */}
          <section className="py-10 md:py-14 bg-gray-50 dark:bg-gray-800/50">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                  {enhancedContent.localProblems.title}
                </h2>
                <div className="space-y-4">
                  {enhancedContent.localProblems.problems.map((item, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700">
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900 dark:text-white">{item.problem}</p>
                          <p className="text-sm text-gray-500 mt-1">Betrifft: {item.areas}</p>
                        </div>
                        <div className="md:text-right">
                          <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                            {item.solution}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Local Testimonial */}
          <section className="py-10 md:py-14 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto text-center">
                <Quote className="w-12 h-12 text-primary mx-auto mb-4 opacity-50" />
                <blockquote className="text-lg md:text-xl text-gray-700 dark:text-gray-300 italic mb-6">
                  "{enhancedContent.localTestimonial.text}"
                </blockquote>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {enhancedContent.localTestimonial.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {enhancedContent.localTestimonial.neighborhood} • {enhancedContent.localTestimonial.service}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* City-Specific FAQ */}
          <section className="py-10 md:py-14 bg-gray-50 dark:bg-gray-800/50">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <div className="flex items-center justify-center gap-3 mb-8">
                  <HelpCircle className="w-8 h-8 text-primary" />
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    Häufige Fragen zu {city.name}
                  </h2>
                </div>
                <div className="space-y-4">
                  {enhancedContent.faq.map((faq, index) => (
                    <details key={index} className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                      <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors list-none">
                        <h3 className="font-semibold text-gray-900 dark:text-white pr-4">{faq.question}</h3>
                        <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform shrink-0" />
                      </summary>
                      <div className="px-5 pb-5 pt-2">
                        <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Nearby Cities */}
      {nearbyCities.length > 0 && (
        <section className="py-8 md:py-12 bg-gray-50 dark:bg-gray-800/50">
          <div className="container mx-auto px-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Auch in der Nähe von {city.name}
            </h2>
            <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
              {nearbyCities.map((nearbyCity) => (
                <Link
                  key={nearbyCity.slug}
                  href={`/${nearbyCity.slug}`}
                  className="px-4 py-2 bg-white dark:bg-gray-900 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-primary hover:text-white transition-colors border border-gray-200 dark:border-gray-700"
                >
                  {nearbyCity.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA Section */}
      <section className="py-10 md:py-14 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Verstopfung in {city.name}?
          </h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">
            Wir sind in {company.urgency.responseTime} Minuten bei Ihnen. Kostenlose Diagnose, Festpreis vorab.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <button
              onClick={() => setIsCallModalOpen(true)}
              className="flex-1 h-14 bg-primary hover:bg-primary/90 text-white font-bold text-lg rounded-xl flex items-center justify-center gap-2 transition-all"
            >
              <Phone className="w-5 h-5" />
              Jetzt anrufen
            </button>
            <Link href="/kontakt" className="flex-1">
              <button className="w-full h-14 border-2 border-white/40 text-white hover:bg-white/10 font-semibold rounded-xl flex items-center justify-center gap-2 transition-all">
                <Zap className="w-5 h-5 text-yellow-400" />
                Rückruf anfordern
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
