"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Filter, MapPin, ArrowRight, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cities, regions } from "@/data/cities";
import { company } from "@/data/company";

export default function StaedtePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [maxDistance, setMaxDistance] = useState<number | null>(null);

  const filteredCities = useMemo(() => {
    return cities.filter((city) => {
      const matchesSearch = city.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRegion = !selectedRegion || city.region === selectedRegion;
      const matchesDistance = !maxDistance || city.distance <= maxDistance;
      return matchesSearch && matchesRegion && matchesDistance;
    }).sort((a, b) => a.distance - b.distance);
  }, [searchQuery, selectedRegion, maxDistance]);

  const distanceOptions = [
    { label: "Alle", value: null },
    { label: "< 30 km", value: 30 },
    { label: "< 50 km", value: 50 },
    { label: "< 65 km", value: 65 },
  ];

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-[#F8FBFF] via-white to-[#E8F4FF] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Unsere <span className="text-gradient">Einsatzgebiete</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Rohrreinigung in {cities.length}+ Städten im Umkreis von 65km um Nürnberg.
              Finden Sie Ihren Standort!
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 sticky top-16 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between max-w-6xl mx-auto">
            {/* Search */}
            <div className="relative w-full lg:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Stadt suchen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>

            {/* Region Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto">
              <Filter className="w-5 h-5 text-gray-400 shrink-0" />
              <Button
                variant={selectedRegion === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedRegion(null)}
                className="shrink-0"
              >
                Alle Regionen
              </Button>
              {regions.map((region) => (
                <Button
                  key={region}
                  variant={selectedRegion === region ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedRegion(region)}
                  className="shrink-0"
                >
                  {region}
                </Button>
              ))}
            </div>

            {/* Distance Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
              <MapPin className="w-5 h-5 text-gray-400 shrink-0" />
              {distanceOptions.map((option) => (
                <Button
                  key={option.label}
                  variant={maxDistance === option.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setMaxDistance(option.value)}
                  className="shrink-0"
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cities Grid */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Results count */}
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              {filteredCities.length} Städte gefunden
            </p>

            {/* Always horizontal grid - 2 cols on mobile, 3 on tablet, 4 on desktop */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
              {filteredCities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/${city.slug}`}
                  className="group bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 shadow-sm hover:shadow-lg transition-all hover-lift border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex flex-col gap-1 sm:gap-2 mb-2 sm:mb-3">
                    <Badge variant="outline" className="self-start text-xs">
                      {city.distance === 0 ? "Hauptsitz" : `${city.distance} km`}
                    </Badge>
                    <h2 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors line-clamp-1">
                      {city.name}
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                      {city.region}
                    </p>
                  </div>
                  <div className="flex items-center text-primary text-xs sm:text-sm font-medium">
                    <span className="hidden sm:inline">Rohrreinigung</span>
                    <span className="sm:hidden">Mehr</span>
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>

            {filteredCities.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Keine Städte gefunden. Versuchen Sie eine andere Suche.
                </p>
                <Button onClick={() => { setSearchQuery(""); setSelectedRegion(null); setMaxDistance(null); }}>
                  Filter zurücksetzen
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ihre Stadt nicht gefunden?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Wir sind im gesamten 65km Umkreis um Nürnberg tätig.
              Rufen Sie uns an - wir kommen auch zu Ihnen!
            </p>
            <Link href={`tel:${company.contact.phone}`}>
              <Button size="lg" className="gradient-primary text-white h-14 px-8">
                <Phone className="w-5 h-5 mr-2" />
                {company.contact.phoneDisplay}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
