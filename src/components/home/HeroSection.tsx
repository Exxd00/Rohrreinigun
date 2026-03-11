"use client";

import Link from "next/link";
import { Phone, ArrowRight, Shield, Clock, Wrench, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { company } from "@/data/company";
import AnimatedServiceIcon from "./AnimatedServiceIcon";

const heroServices = [
  {
    name: "Rohrreinigung",
    description: "Schnelle Beseitigung aller Verstopfungen",
    href: "/service/rohrreinigung",
    icon: "pipe",
    image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400&h=300&fit=crop"
  },
  {
    name: "Kanalreinigung",
    description: "Professionelle Kanalreinigung mit HD-Technik",
    href: "/service/kanalreinigung",
    icon: "canal",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop"
  },
  {
    name: "Notdienst 24/7",
    description: "Rund um die Uhr für Sie erreichbar",
    href: "/service/rohrreinigung-notdienst",
    icon: "emergency",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop"
  },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F8FBFF] via-white to-[#E8F4FF] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />

      {/* Background hero image - only visible on large screens, limited height */}
      <div className="hidden lg:block absolute right-0 top-0 h-[70vh] w-1/2 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-[#F8FBFF] via-[#F8FBFF]/95 to-[#F8FBFF]/30 dark:from-gray-900 dark:via-gray-900/95 dark:to-gray-900/30 z-10" />
        <img
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&h=1000&fit=crop"
          alt="Professionelle Rohrreinigung"
          className="w-full h-full object-cover opacity-30 dark:opacity-15"
        />
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Water drops */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-primary/20 rounded-full animate-drip" style={{ animationDelay: "0s" }} />
        <div className="absolute top-32 left-1/4 w-3 h-3 bg-primary/30 rounded-full animate-drip" style={{ animationDelay: "0.5s" }} />
        <div className="absolute top-40 right-1/3 w-5 h-5 bg-primary/20 rounded-full animate-drip" style={{ animationDelay: "1s" }} />
        <div className="absolute top-24 right-20 w-4 h-4 bg-primary/25 rounded-full animate-drip" style={{ animationDelay: "1.5s" }} />

        {/* Pipe pattern */}
        <svg className="absolute bottom-0 left-0 w-full h-32 opacity-10 dark:opacity-5" viewBox="0 0 1440 120" fill="none">
          <path d="M0 60h200v20H0V60zM200 40h20v60h-20V40zM220 40h200v20H220V40zM420 40h20v80H420V40zM440 100h200v20H440v-20z" fill="currentColor" className="text-primary" />
          <path d="M700 20h200v20H700V20zM900 20h20v60H900V20zM920 60h200v20H920V60zM1120 60h20v40h-20V60zM1140 80h300v20h-300V80z" fill="currentColor" className="text-primary" />
        </svg>

        {/* Gradient orbs */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 py-12 md:py-20 z-10">
        <div className="max-w-5xl mx-auto lg:max-w-none lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
          {/* Left side - Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6 animate-fade-in-up">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                24/7 Notdienst verfügbar
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in-up delay-100">
              Rohrverstopfung?{" "}
              <span className="text-gradient">Wir helfen sofort!</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl lg:max-w-xl animate-fade-in-up delay-200">
              Professionelle Rohrreinigung & Kanalreinigung in{" "}
              <strong className="text-primary">Nürnberg</strong> und{" "}
              <strong className="text-primary">65km Umkreis</strong>.
              Schnelle Anfahrt, faire Preise, moderne Technik.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8 animate-fade-in-up delay-300">
              <Link href={`tel:${company.contact.phone}`}>
                <Button
                  size="lg"
                  className="gradient-primary text-white hover:opacity-90 btn-shimmer h-14 px-8 text-lg font-semibold shadow-xl shadow-primary/30 w-full sm:w-auto"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Jetzt anrufen
                </Button>
              </Link>
              <Link href="/kontakt">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 px-8 text-lg font-semibold border-2 border-gray-300 dark:border-gray-600 hover:border-primary hover:text-primary w-full sm:w-auto"
                >
                  Kontaktformular
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-12 animate-fade-in-up delay-400">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Lokaler Fachbetrieb</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">30-60 Min Anfahrt</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Wrench className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Moderne Technik</span>
              </div>
            </div>
          </div>

          {/* Right side - Hero image (desktop only) */}
          <div className="hidden lg:block relative animate-fade-in-up delay-500">
            <div className="relative">
              {/* Main image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&h=500&fit=crop"
                  alt="Rohrreinigung Fachmann bei der Arbeit"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                {/* Floating badge */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white">2000+ Einsätze</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Zufriedene Kunden in der Region</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/20 rounded-full blur-2xl" />
            </div>
          </div>
        </div>

        {/* Service Cards - Below content on all screens */}
        <div className="mt-12 lg:mt-16">
          <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 animate-fade-in-up delay-500 max-w-5xl mx-auto">
            {heroServices.map((service, index) => (
              <Link
                key={service.name}
                href={service.href}
                className="group relative bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover-lift border border-gray-100 dark:border-gray-700"
              >
                {/* Service image */}
                <div className="relative h-20 sm:h-28 md:h-36 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-gray-800 via-transparent to-transparent" />
                </div>

                <div className="p-3 sm:p-4 md:p-5">
                  <div className="flex flex-col items-center text-center">
                    <h3 className="text-xs sm:text-sm md:text-lg font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {service.name}
                    </h3>
                    <p className="hidden sm:block text-xs md:text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Hover arrow - only on desktop */}
                <div className="hidden md:block absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-8 h-8 rounded-full bg-white/90 shadow flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-primary" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>


    </section>
  );
}
