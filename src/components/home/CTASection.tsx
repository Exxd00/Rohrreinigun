"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { company } from "@/data/company";

export default function CTASection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-secondary via-secondary to-primary relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      {/* Animated circles */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1s" }} />

      <div className="container relative mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Rohrverstopfung? Wir sind sofort für Sie da!
          </h2>
          <p className="text-lg md:text-xl opacity-90 mb-10 max-w-2xl mx-auto">
            Rufen Sie uns an und wir kümmern uns um Ihr Problem.
            Schnelle Anfahrt im gesamten Großraum Nürnberg.
          </p>

          {/* Contact Cards */}
          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            <a
              href={`tel:${company.contact.phone}`}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-5 transition-all duration-300 hover-lift border border-white/10"
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-white/20 flex items-center justify-center">
                <Phone className="w-6 h-6" />
              </div>
              <p className="text-sm opacity-80 mb-1">Telefon</p>
              <p className="font-bold text-lg">{company.contact.phoneDisplay}</p>
            </a>

            <a
              href={`mailto:${company.contact.email}`}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-5 transition-all duration-300 hover-lift border border-white/10"
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-white/20 flex items-center justify-center">
                <Mail className="w-6 h-6" />
              </div>
              <p className="text-sm opacity-80 mb-1">E-Mail</p>
              <p className="font-bold text-sm break-all">{company.contact.email}</p>
            </a>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/10">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-white/20 flex items-center justify-center">
                <MapPin className="w-6 h-6" />
              </div>
              <p className="text-sm opacity-80 mb-1">Einsatzgebiet</p>
              <p className="font-bold">Nürnberg + 65km</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`tel:${company.contact.phone}`}>
              <Button
                size="lg"
                className="bg-white text-secondary hover:bg-gray-100 h-14 px-8 text-lg font-semibold w-full sm:w-auto"
              >
                <Phone className="w-5 h-5 mr-2" />
                Jetzt anrufen
              </Button>
            </Link>
            <Link href="/kontakt">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 h-14 px-8 text-lg font-semibold w-full sm:w-auto"
              >
                Kontaktformular
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
