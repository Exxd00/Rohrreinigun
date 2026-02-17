"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gallery } from "@/data/company";
import { Button } from "@/components/ui/button";

export default function Gallery() {
  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
          <div>
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary font-semibold text-sm rounded-full mb-4">
              Referenzen
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Unsere Arbeiten
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl">
              Einblicke in unsere professionellen Einsätze
            </p>
          </div>
          <Link href="/arbeiten">
            <Button variant="outline" className="group">
              Alle ansehen
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {gallery.map((item, index) => (
            <Link
              key={item.id}
              href={`/service/${item.serviceSlug}`}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer hover-lift block ${
                index === 0 ? "md:col-span-2 md:row-span-2" : ""
              }`}
            >
              {/* Real image */}
              <div className={`relative aspect-square md:aspect-auto ${index === 0 ? "md:h-full md:min-h-[400px]" : "h-48 md:h-56"}`}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                {/* Dark overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
                  <h3 className={`font-bold mb-1 ${index === 0 ? "text-xl md:text-2xl" : "text-sm md:text-base"}`}>
                    {item.title}
                  </h3>
                  <p className={`opacity-80 ${index === 0 ? "text-sm md:text-base" : "text-xs"}`}>
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg transform scale-50 group-hover:scale-100 transition-transform">
                  <ArrowRight className="w-5 h-5 text-gray-900" />
                </div>
              </div>

              {/* Category badge */}
              <div className="absolute top-3 left-3">
                <span className="px-3 py-1 bg-white/90 dark:bg-gray-900/90 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300 backdrop-blur-sm">
                  {item.category}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
