"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Phone,
  CheckCircle,
  Star,
  MapPin,
  Shield,
  Clock,
  AlertTriangle,
  Droplets,
  Home,
  Wrench,
  Building2,
  Camera,
  ArrowRight,
  Zap
} from "lucide-react";
import { company } from "@/data/company";
import CallConfirmModal from "@/components/layout/CallConfirmModal";

const problemCards = [
  {
    icon: Droplets,
    title: "Toilette verstopft",
    href: "/service/toilette-verstopft",
    urgent: true
  },
  {
    icon: Droplets,
    title: "Dusche/Bad verstopft",
    href: "/service/dusche-verstopft",
    urgent: false
  },
  {
    icon: Wrench,
    title: "Küche verstopft",
    href: "/service/kueche-abfluss-verstopft",
    urgent: false
  },
  {
    icon: Home,
    title: "Keller/Bodenablauf",
    href: "/service/bodenablauf-verstopft",
    urgent: false
  },
  {
    icon: Camera,
    title: "Wiederkehrende Verstopfung",
    href: "/service/kamera-inspektion",
    urgent: false
  },
  {
    icon: AlertTriangle,
    title: "Notfall/Überlauf",
    href: "/service/rohrreinigung-notdienst",
    urgent: true
  },
  {
    icon: Building2,
    title: "Hausverwaltung/Gewerbe",
    href: "/hausverwaltung",
    urgent: false
  },
];

export default function HeroSection() {
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);

  return (
    <>
      <CallConfirmModal
        isOpen={isCallModalOpen}
        onClose={() => setIsCallModalOpen(false)}
        source="hero"
      />

      {/* HERO SECTION */}
      <section className="relative pt-24 md:pt-28 pb-8 md:pb-16 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />

        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />

        {/* Emergency accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-primary to-emerald-500" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">

            {/* Availability Badge */}
            <div className="flex justify-center mb-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-sm font-medium text-emerald-300">
                  {company.urgency.availableTechnicians} Techniker jetzt verfügbar
                </span>
              </div>
            </div>

            {/* MAIN HEADLINE - Differentiating */}
            <div className="text-center mb-6">
              <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight">
                <span className="text-white">Festpreis </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">
                  VOR
                </span>
                <span className="text-white"> dem ersten Handgriff.</span>
              </h1>
              <p className="text-lg md:text-2xl text-white/90 font-medium mb-2">
                Klarheit, bevor Sie zahlen.
              </p>
              <p className="text-sm md:text-base text-white/70 max-w-2xl mx-auto">
                Wir kommen, schauen, erklären und nennen den Preis.
                Dann entscheiden <strong className="text-white">SIE</strong>. Kein Druck. Keine Überraschungen.
              </p>
            </div>

            {/* TRUST GUARANTEES BAR */}
            <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-6">
              <div className="flex items-center gap-2 text-white/90">
                <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-emerald-400" />
                <span className="text-xs md:text-sm font-medium">Diagnose kostenlos</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Shield className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                <span className="text-xs md:text-sm font-medium">Festpreis vor Arbeit</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-emerald-400" />
                <span className="text-xs md:text-sm font-medium">Kein Start ohne OK</span>
              </div>
            </div>

            {/* MAIN CTA */}
            <div className="max-w-md mx-auto mb-8">
              <button
                onClick={() => setIsCallModalOpen(true)}
                className="w-full bg-gradient-to-r from-primary to-cyan-500 rounded-2xl px-6 py-5 flex items-center justify-center gap-4 shadow-2xl shadow-primary/30 hover:shadow-primary/50 active:scale-[0.98] transition-all group"
              >
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="w-7 h-7 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-white/80 text-sm font-medium">Jetzt kostenlos anrufen</p>
                  <p className="text-white text-2xl md:text-3xl font-black tracking-tight">
                    {company.contact.phoneDisplay}
                  </p>
                </div>
              </button>

              {/* Secondary CTA */}
              <Link href="/kontakt" className="block mt-3">
                <div className="w-full h-12 bg-white/10 text-white border border-white/20 font-semibold rounded-xl flex items-center justify-center gap-2 text-sm hover:bg-white/20 transition-colors">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  Rückruf in 5 Minuten anfordern
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </div>

            {/* TRUST INDICATORS */}
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mb-8">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 md:w-5 md:h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-white font-semibold text-sm md:text-base">
                  {company.rating.displayText}
                </span>
                <span className="text-white/60 text-xs md:text-sm">
                  ({company.rating.reviewCount} Bewertungen)
                </span>
              </div>
              <div className="hidden md:flex items-center gap-2 text-white/80">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm">Nürnberg • Fürth • Erlangen</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <span className="text-white/80 text-sm">In {company.urgency.responseTime} Min vor Ort</span>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 30L60 28C120 26 240 22 360 22C480 22 600 26 720 30C840 34 960 38 1080 36C1200 34 1320 26 1380 22L1440 18V60H0V30Z" fill="white" className="dark:fill-gray-900"/>
          </svg>
        </div>
      </section>

      {/* PROBLEM SELECTION SECTION */}
      <section className="py-8 md:py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl md:text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
              Was ist Ihr Problem?
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {problemCards.map((card) => {
                const Icon = card.icon;
                return (
                  <Link
                    key={card.title}
                    href={card.href}
                    className={`relative group p-4 md:p-5 rounded-xl border-2 transition-all hover:shadow-lg hover:-translate-y-1 ${
                      card.urgent
                        ? 'border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/30 hover:border-red-400'
                        : 'border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 hover:border-primary'
                    }`}
                  >
                    {card.urgent && (
                      <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full">
                        Dringend
                      </span>
                    )}
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center mb-3 ${
                      card.urgent
                        ? 'bg-red-100 dark:bg-red-900/50'
                        : 'bg-primary/10 dark:bg-primary/20'
                    }`}>
                      <Icon className={`w-5 h-5 md:w-6 md:h-6 ${
                        card.urgent ? 'text-red-500' : 'text-primary'
                      }`} />
                    </div>
                    <h3 className="font-semibold text-sm md:text-base text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                      {card.title}
                    </h3>
                    <ArrowRight className="absolute bottom-4 right-4 w-4 h-4 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* HOW WE WORK - TRANSPARENCY SECTION */}
      <section className="py-10 md:py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                So wissen Sie <span className="text-primary">VORHER</span>, was es kostet
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Kein Rätselraten. Keine Überraschungen. So läuft es bei uns.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-4 md:gap-6">
              {/* Step 1 */}
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  1
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Anruf</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Sie schildern das Problem. Wir schätzen grob ein und sagen, wann wir da sind.
                </p>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2 font-medium">
                  → Keine Verpflichtung
                </p>
              </div>

              {/* Step 2 */}
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  2
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <Camera className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Diagnose</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Wir kommen, schauen uns alles an und erklären, was das Problem ist.
                </p>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2 font-medium">
                  → Kostenlos. Immer.
                </p>
              </div>

              {/* Step 3 */}
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  3
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Festpreis</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Wir nennen den genauen Preis. Sie wissen was kommt, bevor wir anfangen.
                </p>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2 font-medium">
                  → Der Preis steht. Punkt.
                </p>
              </div>

              {/* Step 4 */}
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  4
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Entscheidung</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Sie sagen JA → Wir legen los. Sie sagen NEIN → Wir gehen. Keine Kosten.
                </p>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2 font-medium">
                  → Sie haben die Kontrolle.
                </p>
              </div>
            </div>

            {/* CTA after process */}
            <div className="text-center mt-8">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Das klingt gut? Dann rufen Sie jetzt an.
              </p>
              <button
                onClick={() => setIsCallModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30"
              >
                <Phone className="w-5 h-5" />
                {company.contact.phoneDisplay}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
