"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Send, Upload, X, Phone, MapPin, Clock, ImageIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { company } from "@/data/company";
import { compressImage, formatFileSize, type CompressedImage } from "@/lib/imageCompression";
import { trackFormSubmit, trackPhoneClick, trackCTAClick } from "@/lib/tracking";

interface FormData {
  name: string;
  phone: string;
  email: string;
  city: string;
  service: string;
  message: string;
}

const MAX_IMAGES = 3;

export default function ContactForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    city: "",
    service: "",
    message: "",
  });
  const [images, setImages] = useState<CompressedImage[]>([]);
  const [isCompressing, setIsCompressing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Limit to max images
    const remainingSlots = MAX_IMAGES - images.length;
    const filesToProcess = files.slice(0, remainingSlots);

    if (filesToProcess.length === 0) return;

    setIsCompressing(true);

    try {
      const compressedImages: CompressedImage[] = [];
      for (const file of filesToProcess) {
        const compressed = await compressImage(file);
        compressedImages.push(compressed);
      }
      setImages(prev => [...prev, ...compressedImages].slice(0, MAX_IMAGES));
    } catch (error) {
      console.error("Error compressing images:", error);
    } finally {
      setIsCompressing(false);
      // Reset input
      e.target.value = "";
    }
  }, [images.length]);

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Track form submission
    trackFormSubmit({
      service: formData.service,
      city: formData.city,
      has_images: images.length > 0,
      image_count: images.length,
    });

    try {
      // Send form data to API
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          images: images.map(img => img.dataUrl),
        }),
      });

      const result = await response.json();

      if (response.ok) {
        // Redirect to thank you page
        router.push("/thank-you");
      } else {
        console.error("Form submission failed:", result);
        const errorMsg = result.details || result.error || "Unbekannter Fehler";
        alert(`Fehler: ${errorMsg}\n\nBitte rufen Sie uns direkt an: 0176 55668109`);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      alert("Verbindungsfehler. Bitte prüfen Sie Ihre Internetverbindung oder rufen Sie uns an: 0176 55668109");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhoneClick = () => {
    trackPhoneClick("contact_form");
  };

  const services = [
    "Rohrreinigung",
    "Kanalreinigung",
    "Abflussreinigung",
    "Notdienst 24/7",
    "Kamera-Inspektion",
    "Rohrsanierung",
    "Toilette verstopft",
    "Waschbecken verstopft",
    "Dusche verstopft",
    "Sonstiges",
  ];

  return (
    <section id="kontakt" className="py-12 md:py-20 bg-gray-50 dark:bg-gray-800/50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Schnelle Hilfe anfordern
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
              Beschreiben Sie Ihr Problem und wir melden uns schnellstmöglich bei Ihnen.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-6 lg:gap-10">
            {/* Form - Takes 3 columns */}
            <div className="lg:col-span-3 bg-white dark:bg-gray-900 rounded-2xl p-5 md:p-8 shadow-xl border border-gray-100 dark:border-gray-700">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Service Selection - Full Width First */}
                <div className="space-y-2">
                  <Label htmlFor="service" className="text-sm font-medium">
                    Art des Problems *
                  </Label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full h-12 px-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  >
                    <option value="">Bitte wählen...</option>
                    {services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Name & Phone - Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Ihr Name"
                      required
                      className="h-12 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium">Telefon *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="0176..."
                      required
                      className="h-12 rounded-xl"
                    />
                  </div>
                </div>

                {/* Email & City - Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      E-Mail <span className="text-gray-400 text-xs">(optional)</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="email@beispiel.de"
                      className="h-12 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-sm font-medium">Ort *</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="z.B. Nürnberg"
                      required
                      className="h-12 rounded-xl"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-medium">
                    Beschreibung des Problems
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Beschreiben Sie kurz das Problem..."
                    rows={3}
                    className="resize-none rounded-xl"
                  />
                </div>

                {/* Image Upload */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">
                    Fotos hochladen <span className="text-gray-400 text-xs">(optional, max. {MAX_IMAGES})</span>
                  </Label>
                  <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-4 text-center hover:border-primary/50 transition-colors bg-gray-50/50 dark:bg-gray-800/50">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                      disabled={images.length >= MAX_IMAGES || isCompressing}
                    />
                    <label
                      htmlFor="image-upload"
                      className={`cursor-pointer flex flex-col items-center ${images.length >= MAX_IMAGES ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {isCompressing ? (
                        <Loader2 className="w-8 h-8 text-primary animate-spin mb-2" />
                      ) : (
                        <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      )}
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {isCompressing ? 'Bilder werden komprimiert...' : 'Klicken zum Hochladen'}
                      </span>
                      <span className="text-xs text-gray-500 mt-1">
                        Bilder werden automatisch komprimiert
                      </span>
                    </label>
                  </div>

                  {/* Image previews */}
                  {images.length > 0 && (
                    <div className="grid grid-cols-3 gap-3 mt-3">
                      {images.map((image, index) => (
                        <div key={index} className="relative group aspect-square">
                          <img
                            src={image.dataUrl}
                            alt={`Upload ${index + 1}`}
                            className="w-full h-full object-cover rounded-xl border border-gray-200 dark:border-gray-700"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-1 rounded-b-xl text-center">
                            {formatFileSize(image.compressedSize)}
                          </div>
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors"
                            aria-label="Bild entfernen"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting || isCompressing}
                  className="w-full h-14 gradient-primary text-white text-lg font-semibold rounded-xl btn-shimmer"
                  onClick={() => trackCTAClick("contact_form_submit", "contact_form")}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Wird gesendet...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-5 h-5" />
                      Anfrage senden
                    </span>
                  )}
                </Button>

                <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                  Mit dem Absenden stimmen Sie unserer{" "}
                  <Link href="/datenschutz" className="underline hover:text-primary">
                    Datenschutzerklärung
                  </Link>{" "}
                  zu.
                </p>
              </form>
            </div>

            {/* Contact Info - Takes 2 columns */}
            <div className="lg:col-span-2 space-y-4">
              {/* Emergency Call Box */}
              <div className="bg-gradient-to-br from-primary to-accent rounded-2xl p-5 md:p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Sofort-Hilfe</h3>
                <a
                  href={`tel:${company.contact.phone}`}
                  onClick={handlePhoneClick}
                  className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur rounded-xl hover:bg-white/20 transition-colors mb-3"
                >
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm opacity-80">Jetzt anrufen</p>
                    <p className="text-xl font-bold">{company.contact.phoneDisplay}</p>
                  </div>
                </a>
                <p className="text-sm opacity-80">
                  Rund um die Uhr erreichbar - auch an Sonn- und Feiertagen
                </p>
              </div>

              {/* Info Cards - Grid on mobile */}
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
                <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white text-sm">Einsatzgebiet</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Nürnberg & 65km Umkreis
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white text-sm">Erreichbarkeit</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        24/7 Notdienst
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing Info */}
              <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4">
                <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-sm">
                  Faire Preise
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-xs">
                  {company.pricing.text}. Transparente Beratung vor Ort - keine versteckten Kosten.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
