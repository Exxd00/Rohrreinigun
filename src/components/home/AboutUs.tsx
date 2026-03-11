"use client";

import { Users, Clock, Award, Shield } from "lucide-react";
import { company, teamMembers, teamImages } from "@/data/company";

export default function AboutUs() {
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary font-semibold text-sm rounded-full mb-4">
            Über Uns
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Ihr lokaler Partner für Rohrreinigung
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Seit über {company.stats.yearsExperience} Jahren sind wir Ihr zuverlässiger Ansprechpartner
            für alle Rohr- und Kanalreinigungsarbeiten in {company.mainCity} und Umgebung.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12">
          {/* Left - Image Grid */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {/* Main large image */}
              <div className="col-span-2 relative rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={teamImages.group}
                  alt="Unser Team"
                  className="w-full h-56 md:h-72 object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="font-bold text-lg">Unser Team</p>
                  <p className="text-sm opacity-90">Professionell & Zuverlässig</p>
                </div>
              </div>

              {/* Team member images */}
              {teamMembers.slice(0, 2).map((member, index) => (
                <div key={member.id} className="relative rounded-xl overflow-hidden shadow-lg group">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-40 md:h-48 object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-2 left-2 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="font-semibold text-sm">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>


          </div>

          {/* Right - Content */}
          <div className="lg:pl-6">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Qualität aus {company.mainCity}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              Als lokaler Fachbetrieb kennen wir die Besonderheiten der Region und sind schnell bei Ihnen vor Ort.
              Unser erfahrenes Team setzt auf modernste Technik und faire Preise – ohne versteckte Kosten.
            </p>

            {/* Features List */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">24/7 Erreichbar</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Notdienst rund um die Uhr, auch an Feiertagen</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Über {company.stats.yearsExperience} Erfahrung</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Langjährige Expertise in allen Bereichen</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Faire Preise</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Transparente Kostenaufstellung ohne Überraschungen</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{company.stats.satisfactionRate} Zufriedenheit</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Unsere Kunden empfehlen uns weiter</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Service Image */}
        <div className="relative rounded-2xl overflow-hidden shadow-xl">
          <img
            src={teamImages.service}
            alt="Professionelle Rohrreinigung im Einsatz"
            className="w-full h-56 md:h-72 object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent flex items-center">
            <div className="p-6 md:p-10 max-w-lg">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                Modernste Technik für beste Ergebnisse
              </h3>
              <p className="text-white/90 text-sm md:text-base">
                Wir setzen auf hochmoderne Geräte und bewährte Methoden für eine schnelle und gründliche Reinigung.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
