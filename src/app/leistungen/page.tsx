"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Filter, ArrowRight, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { services, serviceCategories } from "@/data/services";
import { company } from "@/data/company";

export default function LeistungenPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || service.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-[#F8FBFF] via-white to-[#E8F4FF] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Unsere <span className="text-gradient">Leistungen</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Professionelle Rohrreinigung, Kanalreinigung und mehr.
              Finden Sie die passende Lösung für Ihr Problem.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 sticky top-16 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between max-w-6xl mx-auto">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Leistung suchen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
              <Filter className="w-5 h-5 text-gray-400 shrink-0" />
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(null)}
                className="shrink-0"
              >
                Alle
              </Button>
              {serviceCategories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="shrink-0"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Results count */}
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              {filteredServices.length} Leistungen gefunden
            </p>

            {/* Always horizontal grid - 2 cols on mobile, 3 on tablet/desktop */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
              {filteredServices.map((service) => (
                <Link
                  key={service.slug}
                  href={`/service/${service.slug}`}
                  className="group bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-5 lg:p-6 shadow-sm hover:shadow-lg transition-all hover-lift border border-gray-100 dark:border-gray-700"
                >
                  <Badge variant="secondary" className="mb-2 sm:mb-3 md:mb-4 text-xs">
                    {service.category}
                  </Badge>
                  <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 md:mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {service.name}
                  </h2>
                  <p className="hidden sm:block text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-2 sm:mb-3 md:mb-4 line-clamp-2">
                    {service.shortDescription}
                  </p>
                  <div className="flex items-center text-primary text-xs sm:text-sm font-medium">
                    <span className="hidden sm:inline">Mehr erfahren</span>
                    <span className="sm:hidden">Info</span>
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>

            {filteredServices.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Keine Leistungen gefunden. Versuchen Sie eine andere Suche.
                </p>
                <Button onClick={() => { setSearchQuery(""); setSelectedCategory(null); }}>
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
              Nicht sicher, welche Leistung Sie benötigen?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Rufen Sie uns an - wir beraten Sie kostenlos und unverbindlich!
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
