"use client";

import { useState, useRef, useEffect } from "react";
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
  Zap,
  VolumeX,
  Volume2,
  Maximize2,
  X,
} from "lucide-react";
import { company, workVideos } from "@/data/company";
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
  const [soundOn, setSoundOn] = useState(false);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const heroVideo = workVideos.find((v) => v.featured) ?? workVideos[0];
  const reels = workVideos.filter((v) => !v.featured);
  const [lightboxId, setLightboxId] = useState<string | null>(null);
  const activeVideo = workVideos.find((v) => v.id === lightboxId) ?? null;

  const toggleSound = () => {
    const v = heroVideoRef.current;
    if (!v) return;
    const next = !soundOn;
    v.muted = !next;
    v.play().catch(() => {});
    setSoundOn(next);
  };

  // Escape closes the reel lightbox + lock scroll while open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxId(null);
    };
    if (lightboxId) {
      window.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxId]);

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
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">

            {/* CONTENT COLUMN (H1 first in DOM for SEO) */}
            <div className="order-2 lg:order-1 text-center lg:text-left">
              {/* Availability Badge */}
              <div className="flex justify-center lg:justify-start mb-4">
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
              <div className="mb-6">
                {/* Location Badge - Prominent Nürnberg */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 bg-white/10 border border-white/20 rounded-full">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-sm md:text-base font-semibold text-white">
                    Rohrreinigung <span className="text-primary">Nürnberg</span> & Mittelfranken
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 leading-tight">
                  <span className="text-white">Festpreis </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">
                    VOR
                  </span>
                  <span className="text-white"> dem ersten Handgriff.</span>
                </h1>
                <p className="text-lg md:text-2xl text-white/90 font-medium mb-2">
                  Ihr Rohrreiniger in Nürnberg – Klarheit, bevor Sie zahlen.
                </p>
                <p className="text-sm md:text-base text-white/70 max-w-2xl mx-auto lg:mx-0">
                  Wir kommen, schauen, erklären und nennen den Preis.
                  Dann entscheiden <strong className="text-white">SIE</strong>. Kein Druck. Keine Überraschungen.
                </p>
              </div>

              {/* TRUST GUARANTEES BAR */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 md:gap-6 mb-6">
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
              <div className="max-w-md mx-auto lg:mx-0 mb-8">
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
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 md:gap-8">
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
                <div className="flex items-center gap-2 text-white/80">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span className="text-white/80 text-sm">In {company.urgency.responseTime} Min vor Ort</span>
                </div>
              </div>
            </div>

            {/* VIDEO COLUMN (first visually on mobile) */}
            <div className="order-1 lg:order-2 space-y-3 md:space-y-4">
              <div className="group relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10 bg-black">
                <div className="relative aspect-video">
                  <video
                    ref={heroVideoRef}
                    src={heroVideo.src}
                    poster={heroVideo.poster}
                    autoPlay
                    muted={!soundOn}
                    loop={!soundOn}
                    controls={soundOn}
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover"
                    onEnded={() => setSoundOn(false)}
                  />

                  {!soundOn && (
                    <button
                      type="button"
                      onClick={toggleSound}
                      aria-label="Ton einschalten"
                      className="group/sound absolute inset-0 flex items-end justify-center pb-4 md:pb-5 bg-gradient-to-t from-black/60 via-transparent to-black/10"
                    >
                      <span className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/95 text-gray-900 text-xs md:text-sm font-bold shadow-2xl group-hover/sound:scale-105 group-hover/sound:bg-white transition-all">
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
                        </span>
                        <VolumeX className="w-4 h-4" />
                        Tippen für Ton
                      </span>
                    </button>
                  )}

                  {!soundOn && (
                    <>
                      {/* REC badge */}
                      <div className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm text-white text-xs font-semibold tracking-wide pointer-events-none">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        REC · Live-Kamera
                      </div>
                      {/* Duration */}
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-sm text-white text-xs font-mono pointer-events-none">
                        {heroVideo.duration}
                      </div>
                    </>
                  )}
                </div>

                {/* Caption */}
                <div className="p-4 bg-gradient-to-b from-gray-900 to-gray-950 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <Camera className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-white text-sm font-medium truncate">
                      Echte Kamerabefahrung – live aus der Leitung
                    </span>
                  </div>
                </div>
              </div>

              {/* Other clips — portrait reels, tap to enlarge */}
              {reels.length > 0 && (
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  {reels.map((reel) => (
                    <button
                      key={reel.id}
                      type="button"
                      onClick={() => setLightboxId(reel.id)}
                      className="group/reel relative rounded-xl md:rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-xl bg-black text-left"
                    >
                      <div className="relative aspect-[9/16]">
                        <video
                          src={reel.src}
                          poster={reel.poster}
                          muted
                          loop
                          autoPlay
                          playsInline
                          preload="metadata"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/20" />

                        {/* sound hint */}
                        <div className="absolute top-2 right-2">
                          <span className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
                            <Volume2 className="w-3.5 h-3.5 text-white" />
                          </span>
                        </div>

                        {/* label */}
                        <div className="absolute bottom-2 left-2 right-2">
                          <span className="inline-block px-1.5 py-0.5 mb-1 rounded bg-primary text-white text-[9px] font-bold uppercase tracking-wide">
                            {reel.category}
                          </span>
                          <p className="text-white text-xs font-semibold leading-tight">
                            {reel.shortTitle}
                          </p>
                        </div>

                        {/* hover expand */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/reel:opacity-100 transition-opacity">
                          <span className="w-11 h-11 rounded-full bg-white/90 flex items-center justify-center shadow-xl">
                            <Maximize2 className="w-4 h-4 text-gray-900" />
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Link to all work */}
              <Link
                href="/arbeiten"
                className="flex items-center justify-center gap-2 text-white/80 hover:text-white text-sm font-medium transition-colors pt-1"
              >
                Alle Arbeiten ansehen
                <ArrowRight className="w-4 h-4" />
              </Link>
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

      {/* Video Lightbox (for portrait reels) */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightboxId(null)}
        >
          <button
            type="button"
            onClick={() => setLightboxId(null)}
            aria-label="Schließen"
            className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div
            className="relative flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              key={activeVideo.id}
              src={activeVideo.src}
              poster={activeVideo.poster}
              controls
              autoPlay
              playsInline
              className={
                activeVideo.orientation === "portrait"
                  ? "rounded-2xl shadow-2xl max-h-[82vh] w-auto"
                  : "rounded-2xl shadow-2xl max-w-[92vw] max-h-[82vh]"
              }
            />
            <div className="mt-4 text-center max-w-md">
              <h3 className="text-white font-bold text-lg">{activeVideo.title}</h3>
              <p className="text-gray-400 text-sm mt-1">{activeVideo.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
