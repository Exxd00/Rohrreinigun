"use client";

import { Download, Image as ImageIcon, FileText, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { gallery } from "@/data/company";

const brandAssets = [
  {
    name: "Logo SVG",
    description: "Vektorlogo für Web und Print",
    url: "/logo.svg",
    type: "SVG",
  },
  {
    name: "Logo PNG (512x512)",
    description: "Hochauflösendes Logo für Social Media",
    url: "/logo.svg",
    type: "SVG",
  },
  {
    name: "Favicon",
    description: "Browser-Tab Icon",
    url: "/favicon.ico",
    type: "ICO",
  },
];

const brandColors = [
  { name: "Primary Blue", hex: "#3AB0FF", rgb: "58, 176, 255" },
  { name: "Accent Blue", hex: "#2563EB", rgb: "37, 99, 235" },
  { name: "Secondary Navy", hex: "#1E3A8A", rgb: "30, 58, 138" },
  { name: "Background Light", hex: "#F8FBFF", rgb: "248, 251, 255" },
];

export default function AssetsPage() {
  const downloadAsset = (url: string, filename: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
  };

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-[#F8FBFF] via-white to-[#E8F4FF] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Brand <span className="text-gradient">Assets</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Logos, Farben und Bilder für Rohrreinigung Kraft
            </p>
          </div>
        </div>
      </section>

      {/* Logo Section */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Logo & Marke</h2>
            </div>

            {/* Logo Preview */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Light Background */}
              <div className="bg-white border border-gray-200 rounded-2xl p-8 flex flex-col items-center">
                <p className="text-sm text-gray-500 mb-4">Heller Hintergrund</p>
                <div className="w-32 h-32 mb-4">
                  <img src="/logo.svg" alt="Logo" className="w-full h-full" />
                </div>
                <div className="text-center">
                  <p className="font-bold text-gray-900">Rohrreinigung</p>
                  <p className="text-primary font-semibold">Kraft</p>
                </div>
              </div>

              {/* Dark Background */}
              <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 flex flex-col items-center">
                <p className="text-sm text-gray-400 mb-4">Dunkler Hintergrund</p>
                <div className="w-32 h-32 mb-4">
                  <img src="/logo.svg" alt="Logo" className="w-full h-full" />
                </div>
                <div className="text-center">
                  <p className="font-bold text-white">Rohrreinigung</p>
                  <p className="text-primary font-semibold">Kraft</p>
                </div>
              </div>
            </div>

            {/* Download Buttons */}
            <div className="grid sm:grid-cols-3 gap-4">
              {brandAssets.map((asset) => (
                <button
                  key={asset.name}
                  onClick={() => downloadAsset(asset.url, asset.name.toLowerCase().replace(/ /g, "-"))}
                  className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Download className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white text-sm">{asset.name}</p>
                    <p className="text-xs text-gray-500">{asset.type}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Colors Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Palette className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Markenfarben</h2>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              {brandColors.map((color) => (
                <div key={color.name} className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                  <div
                    className="h-24"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div className="p-4">
                    <p className="font-medium text-gray-900 dark:text-white text-sm">{color.name}</p>
                    <p className="text-xs text-gray-500 font-mono">{color.hex}</p>
                    <p className="text-xs text-gray-400 font-mono">RGB: {color.rgb}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Images Section */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <ImageIcon className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Galerie Bilder</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {gallery.map((item) => (
                <div key={item.id} className="group relative">
                  <div className="aspect-square rounded-xl overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="mt-2">
                    <p className="font-medium text-gray-900 dark:text-white text-sm truncate">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.category}</p>
                  </div>
                  <a
                    href={item.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow"
                  >
                    <Download className="w-4 h-4 text-gray-700" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Logo Generator Info */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              WhatsApp Profilbild
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Laden Sie das SVG-Logo herunter und konvertieren Sie es mit einem Online-Tool zu PNG (512x512 px) für WhatsApp.
            </p>
            <div className="flex justify-center gap-4">
              <Button
                onClick={() => downloadAsset("/logo.svg", "rohrreinigung-kraft-logo.svg")}
                className="gradient-primary text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                Logo herunterladen
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
