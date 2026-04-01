"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ZoomIn } from "lucide-react";
import { beforeAfterGallery } from "@/data/company";
import { Button } from "@/components/ui/button";
import BeforeAfterSlider from "./BeforeAfterSlider";

export default function Gallery() {
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const openSlider = (index: number) => {
    setSelectedIndex(index);
    setIsSliderOpen(true);
  };

  return (
    <>
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
            <div>
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary font-semibold text-sm rounded-full mb-4">
                Vorher / Nachher
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                Unsere Arbeiten
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-xl">
                Echte Ergebnisse unserer professionellen Reinigungsarbeiten
              </p>
            </div>
            <Link href="/arbeiten">
              <Button variant="outline" className="group">
                Alle ansehen
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {beforeAfterGallery.map((item, index) => (
              <div
                key={item.id}
                onClick={() => openSlider(index)}
                className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer hover:-translate-y-1"
              >
                {/* Before/After Images */}
                <div className="relative">
                  <div className="grid grid-cols-2">
                    {/* Before Image */}
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={item.beforeImage}
                        alt={`${item.title} - Vorher`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-2 left-2">
                        <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded shadow-lg">
                          VORHER
                        </span>
                      </div>
                    </div>

                    {/* After Image */}
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={item.afterImage}
                        alt={`${item.title} - Nachher`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-2 right-2">
                        <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded shadow-lg">
                          NACHHER
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Divider line */}
                  <div className="absolute inset-y-0 left-1/2 w-0.5 bg-white dark:bg-gray-800 transform -translate-x-1/2" />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all">
                      <ZoomIn className="w-6 h-6 text-gray-900" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                  <p className="text-xs text-primary mt-2 font-medium group-hover:underline">
                    Klicken zum Vergleichen →
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Slider Modal */}
      <BeforeAfterSlider
        isOpen={isSliderOpen}
        onClose={() => setIsSliderOpen(false)}
        initialIndex={selectedIndex}
      />
    </>
  );
}
