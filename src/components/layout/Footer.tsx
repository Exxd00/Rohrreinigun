"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Clock, ChevronRight } from "lucide-react";
import { company } from "@/data/company";
import AnimatedLogo from "./AnimatedLogo";

const footerLinks = {
  services: [
    { name: "Rohrreinigung", href: "/service/rohrreinigung" },
    { name: "Kanalreinigung", href: "/service/kanalreinigung" },
    { name: "Abflussreinigung", href: "/service/abflussreinigung" },
    { name: "Notdienst 24/7", href: "/service/rohrreinigung-notdienst" },
    { name: "Kamera-Inspektion", href: "/service/kamera-inspektion" },
    { name: "Rohrsanierung", href: "/service/rohrsanierung" },
  ],
  cities: [
    { name: "Nürnberg", href: "/nuernberg" },
    { name: "Fürth", href: "/fuerth" },
    { name: "Erlangen", href: "/erlangen" },
    { name: "Bamberg", href: "/bamberg" },
    { name: "Ansbach", href: "/ansbach" },
    { name: "Alle Städte", href: "/staedte" },
  ],
  legal: [
    { name: "Impressum", href: "/impressum" },
    { name: "Datenschutz", href: "/datenschutz" },
    { name: "AGB", href: "/agb" },
    { name: "Kontakt", href: "/kontakt" },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <AnimatedLogo size="lg" />
              <div>
                <h3 className="text-xl font-bold">Rohrreinigung</h3>
                <p className="text-primary font-semibold">Kraft</p>
              </div>
            </Link>
            <p className="text-gray-400 leading-relaxed">
              Ihr zuverlässiger Partner für Rohrreinigung und Kanalreinigung in Nürnberg und Umgebung.
              24/7 Notdienst - Schnelle Hilfe bei Verstopfungen.
            </p>
            <div className="space-y-3">
              <a
                href={`tel:${company.contact.phone}`}
                className="flex items-center gap-3 text-gray-300 hover:text-primary transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">24/7 Notdienst</p>
                  <p className="font-semibold">{company.contact.phoneDisplay}</p>
                </div>
              </a>
              <a
                href={`mailto:${company.contact.email}`}
                className="flex items-center gap-3 text-gray-300 hover:text-primary transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">E-Mail</p>
                  <p className="font-semibold">{company.contact.email}</p>
                </div>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-primary" />
              Leistungen
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors group"
                  >
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cities */}
          <div>
            <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-primary" />
              Einsatzgebiete
            </h4>
            <ul className="space-y-3">
              {footerLinks.cities.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors group"
                  >
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Info */}
          <div>
            <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-primary" />
              Öffnungszeiten
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">24/7 Notdienst</p>
                  <p className="text-sm text-gray-400">Rund um die Uhr erreichbar</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Nürnberg & Umgebung</p>
                  <p className="text-sm text-gray-400">100km Einsatzradius</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h5 className="font-semibold mb-3">Rechtliches</h5>
              <ul className="space-y-2">
                {footerLinks.legal.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500 text-center md:text-left">
              © {currentYear} {company.name}. Alle Rechte vorbehalten.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">
                Lokaler Fachbetrieb in Nürnberg
              </span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm text-green-500">Online & Erreichbar</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
