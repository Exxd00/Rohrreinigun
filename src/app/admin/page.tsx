"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Download, Image as ImageIcon, FileText, Palette, Lock, Eye, EyeOff, Map, Upload, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { gallery } from "@/data/company";

const ADMIN_PASSWORD = "Leavemealone2003+";

const brandAssets = [
  { name: "Logo PNG", description: "Standard Logo", url: "/logo.png", type: "PNG" },
  { name: "Logo PNG (Large)", description: "Hochauflösend", url: "/logo-lg.png", type: "PNG" },
  { name: "Logo WebP", description: "Web optimiert", url: "/logo.webp", type: "WebP" },
  { name: "Logo SVG", description: "Vektorgrafik", url: "/logo.svg", type: "SVG" },
  { name: "Favicon ICO", description: "Browser Icon", url: "/favicon.ico", type: "ICO" },
  { name: "Apple Touch Icon", description: "iOS Icon", url: "/apple-touch-icon.png", type: "PNG" },
  { name: "Android Icon 192", description: "Android Icon", url: "/android-chrome-192x192.png", type: "PNG" },
  { name: "Android Icon 512", description: "Android Icon HD", url: "/android-chrome-512x512.png", type: "PNG" },
];

const brandColors = [
  { name: "Primary Green", hex: "#22c55e", rgb: "34, 197, 94", tailwind: "green-500" },
  { name: "Primary Blue", hex: "#3AB0FF", rgb: "58, 176, 255", tailwind: "custom" },
  { name: "Accent Blue", hex: "#2563EB", rgb: "37, 99, 235", tailwind: "blue-600" },
  { name: "Dark Text", hex: "#1f2937", rgb: "31, 41, 55", tailwind: "gray-800" },
  { name: "Light Background", hex: "#F8FBFF", rgb: "248, 251, 255", tailwind: "custom" },
  { name: "Dark Background", hex: "#111827", rgb: "17, 24, 39", tailwind: "gray-900" },
];

const sitemapLinks = [
  { name: "Sitemap XML", url: "/sitemap.xml", description: "Hauptsitemap für Google" },
  { name: "Robots.txt", url: "/robots.txt", description: "Crawler Anweisungen" },
  { name: "Web Manifest", url: "/site.webmanifest", description: "PWA Manifest" },
];

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if already authenticated in this session
    const auth = sessionStorage.getItem("admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem("admin_auth", "true");
      setError("");
    } else {
      setError("Falsches Passwort");
    }
  };

  const downloadAsset = (url: string, filename: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Lock className="w-8 h-8 text-primary" />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-2">
              Admin Bereich
            </h1>
            <p className="text-gray-500 text-center mb-8">
              Passwort eingeben um fortzufahren
            </p>

            <form onSubmit={handleLogin}>
              <div className="relative mb-4">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Passwort"
                  className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {error && (
                <p className="text-red-500 text-sm text-center mb-4">{error}</p>
              )}

              <Button type="submit" className="w-full gradient-primary text-white h-12">
                Anmelden
              </Button>
            </form>
          </div>
        </div>
      </main>
    );
  }

  // Admin Dashboard
  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Admin Dashboard
              </h1>
              <p className="text-gray-500">Rohrreinigung Kraft - Brand Assets</p>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                sessionStorage.removeItem("admin_auth");
                setIsAuthenticated(false);
              }}
            >
              Abmelden
            </Button>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Link
            href="/upload"
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow hover:shadow-lg transition-shadow flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <Upload className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Bilder hochladen</h3>
              <p className="text-sm text-gray-500">Neue Bilder komprimieren</p>
            </div>
          </Link>

          <Link
            href="/"
            target="_blank"
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow hover:shadow-lg transition-shadow flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <ExternalLink className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Website</h3>
              <p className="text-sm text-gray-500">Zur Startseite</p>
            </div>
          </Link>

          <a
            href="/sitemap.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow hover:shadow-lg transition-shadow flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <Map className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Sitemap</h3>
              <p className="text-sm text-gray-500">XML Sitemap ansehen</p>
            </div>
          </a>
        </div>

        {/* Logo & Assets Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Logo & Icons</h2>
          </div>

          {/* Logo Preview */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col items-center">
              <p className="text-sm text-gray-500 mb-3">Heller Hintergrund</p>
              <img src="/logo.png" alt="Logo" className="w-24 h-24 object-contain mb-2" />
              <p className="font-bold text-gray-900">Rohrreinigung <span className="text-primary">Kraft</span></p>
            </div>
            <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 flex flex-col items-center">
              <p className="text-sm text-gray-400 mb-3">Dunkler Hintergrund</p>
              <img src="/logo.png" alt="Logo" className="w-24 h-24 object-contain mb-2" />
              <p className="font-bold text-white">Rohrreinigung <span className="text-primary">Kraft</span></p>
            </div>
          </div>

          {/* Download Grid */}
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
            {brandAssets.map((asset) => (
              <button
                key={asset.name}
                onClick={() => downloadAsset(asset.url, asset.name.toLowerCase().replace(/ /g, "-") + "." + asset.type.toLowerCase())}
                className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-left"
              >
                <Download className="w-4 h-4 text-primary shrink-0" />
                <div className="min-w-0">
                  <p className="font-medium text-gray-900 dark:text-white text-sm truncate">{asset.name}</p>
                  <p className="text-xs text-gray-500">{asset.type}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Colors Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Palette className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Markenfarben</h2>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {brandColors.map((color) => (
              <div
                key={color.name}
                className="bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden"
              >
                <div className="h-16" style={{ backgroundColor: color.hex }} />
                <div className="p-4">
                  <p className="font-medium text-gray-900 dark:text-white mb-2">{color.name}</p>
                  <div className="space-y-1">
                    <button
                      onClick={() => copyToClipboard(color.hex)}
                      className="w-full text-left text-xs font-mono bg-white dark:bg-gray-800 px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    >
                      HEX: {color.hex}
                    </button>
                    <button
                      onClick={() => copyToClipboard(`rgb(${color.rgb})`)}
                      className="w-full text-left text-xs font-mono bg-white dark:bg-gray-800 px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    >
                      RGB: {color.rgb}
                    </button>
                    <p className="text-xs text-gray-400 px-2">Tailwind: {color.tailwind}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sitemap & Files Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Map className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Sitemap & Dateien</h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {sitemapLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <ExternalLink className="w-4 h-4 text-primary shrink-0" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white text-sm">{link.name}</p>
                  <p className="text-xs text-gray-500">{link.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Gallery Images Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <ImageIcon className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Galerie Bilder ({gallery.length})
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {gallery.map((item) => (
              <div key={item.id} className="group relative">
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <a
                  href={item.image}
                  download
                  className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"
                >
                  <Download className="w-6 h-6 text-white" />
                </a>
                <p className="text-xs text-gray-500 mt-1 truncate">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
