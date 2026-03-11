/**
 * Company data and content for Rohrreinigung Kraft
 */

// بيانات الشركة الأساسية
export const company = {
  name: "Rohrreinigung Kraft",
  tagline: "Ihr Experte für Rohrreinigung & Kanalreinigung in Nürnberg",
  mainCity: "Nürnberg",
  serviceRadius: 65, // كم

  contact: {
    phone: "+49 176 55668109",
    phoneDisplay: "0176 55668109",
    email: "Info@rohrreinigungkraft.de",
    whatsapp: "+49 176 55668109",
  },

  address: {
    street: "", // يمكن إضافته لاحقاً
    city: "Nürnberg",
    zip: "",
    region: "Bayern",
    country: "Deutschland",
  },

  hours: {
    regular: "24/7 Notdienst",
    emergency: true,
    emergencyText: "Rund um die Uhr erreichbar",
  },

  pricing: {
    type: "quote", // لا يوجد أسعار ثابتة
    text: "Keine Festpreise – Angebot nach Besichtigung",
    transparent: true,
  },

  stats: {
    yearsExperience: "10+",
    projectsCompleted: "2000+",
    satisfactionRate: "98%",
    responseTime: "30-60 Min",
  },

  features: [
    {
      title: "24/7 Soforthilfe",
      description: "Rund um die Uhr für Sie erreichbar",
      icon: "clock"
    },
    {
      title: "Schnelle Anfahrt",
      description: "Im 65km Umkreis um Nürnberg",
      icon: "truck"
    },
    {
      title: "Moderne Technik",
      description: "Ohne Schäden an Ihren Rohren",
      icon: "wrench"
    },
    {
      title: "Transparente Beratung",
      description: "Ehrliche Einschätzung vor Ort",
      icon: "chat"
    },
    {
      title: "Keine versteckten Kosten",
      description: "Faire Preise nach Besichtigung",
      icon: "euro"
    },
    {
      title: "Lokaler Fachbetrieb",
      description: "Ihr Partner aus Nürnberg",
      icon: "home"
    },
  ],

  trustFactors: [
    "Über 10 Jahre Erfahrung",
    "Mehr als 2000 erfolgreiche Einsätze",
    "Lokaler Fachbetrieb",
    "Professionelle Ausrüstung"
  ],

  socialLinks: {
    facebook: "",
    instagram: "",
    google: "",
  },

  seo: {
    defaultTitle: "Rohrreinigung Kraft | Rohrreinigung & Kanalreinigung Nürnberg",
    defaultDescription: "Professionelle Rohrreinigung & Kanalreinigung in Nürnberg und Umgebung. 24/7 Notdienst ✓ Schnelle Anfahrt ✓ Faire Preise ✓ Jetzt anrufen!",
    keywords: [
      "Rohrreinigung",
      "Kanalreinigung",
      "Abflussreinigung",
      "Notdienst",
      "Nürnberg",
      "Bayern",
      "Verstopfung",
      "Rohr verstopft"
    ]
  }
};

// Testimonials
export const testimonials = [
  {
    name: "Thomas M.",
    location: "Nürnberg",
    rating: 5,
    text: "Schnelle Hilfe am Sonntagmorgen! Die Toilette war komplett verstopft und innerhalb von 45 Minuten war das Team vor Ort. Sehr professionell und faire Preise.",
    date: "2024"
  },
  {
    name: "Sandra K.",
    location: "Fürth",
    rating: 5,
    text: "Nach einem Rohrbruch im Keller waren sie blitzschnell da. Die Mitarbeiter waren freundlich, kompetent und haben alles sauber hinterlassen. Klare Empfehlung!",
    date: "2024"
  },
  {
    name: "Michael B.",
    location: "Erlangen",
    rating: 5,
    text: "Unser Küchenabfluss war seit Wochen problematisch. Die Rohrreinigung Kraft hat das Problem schnell gefunden und nachhaltig beseitigt. Top Service!",
    date: "2024"
  }
];

// Work gallery with real before/after images
export const gallery = [
  // Abflussreinigung - Before/After
  {
    id: 1,
    title: "Duschablauf Reinigung",
    description: "Verstopfter Duschablauf - Vorher",
    category: "Abflussreinigung",
    serviceSlug: "abflussreinigung",
    image: "/images/abflussreinigung-1-before.jpg",
    type: "before"
  },
  {
    id: 2,
    title: "Duschablauf Reinigung",
    description: "Sauberer Duschablauf - Nachher",
    category: "Abflussreinigung",
    serviceSlug: "abflussreinigung",
    image: "/images/abflussreinigung-1-after.jpg",
    type: "after"
  },
  {
    id: 3,
    title: "Bodenablauf Reinigung",
    description: "Verstopfter Bodenablauf - Vorher",
    category: "Abflussreinigung",
    serviceSlug: "abflussreinigung",
    image: "/images/abflussreinigung-2-before.jpg",
    type: "before"
  },
  {
    id: 4,
    title: "Bodenablauf Reinigung",
    description: "Gereinigter Bodenablauf - Nachher",
    category: "Abflussreinigung",
    serviceSlug: "abflussreinigung",
    image: "/images/abflussreinigung-2-after.jpg",
    type: "after"
  },
  {
    id: 5,
    title: "Badezimmer Ablauf",
    description: "Verschmutzter Ablauf - Vorher",
    category: "Abflussreinigung",
    serviceSlug: "abflussreinigung",
    image: "/images/abflussreinigung-3-before.jpg",
    type: "before"
  },
  {
    id: 6,
    title: "Badezimmer Ablauf",
    description: "Professionell gereinigt - Nachher",
    category: "Abflussreinigung",
    serviceSlug: "abflussreinigung",
    image: "/images/abflussreinigung-3-after.jpg",
    type: "after"
  },
  // Kanalreinigung
  {
    id: 7,
    title: "Kanalreinigung",
    description: "Verstopfter Kanal - Vorher",
    category: "Kanalreinigung",
    serviceSlug: "kanalreinigung",
    image: "/images/kanalreinigung-1-before.jpg",
    type: "before"
  },
  {
    id: 8,
    title: "Kanalreinigung",
    description: "Gereinigter Kanal - Nachher",
    category: "Kanalreinigung",
    serviceSlug: "kanalreinigung",
    image: "/images/kanalreinigung-1-after.jpg",
    type: "after"
  },
  {
    id: 9,
    title: "Kanalreinigung",
    description: "Kanal mit Ablagerungen - Vorher",
    category: "Kanalreinigung",
    serviceSlug: "kanalreinigung",
    image: "/images/kanalreinigung-2-before.jpg",
    type: "before"
  },
  {
    id: 10,
    title: "Kanalreinigung",
    description: "Sauberer Kanal - Nachher",
    category: "Kanalreinigung",
    serviceSlug: "kanalreinigung",
    image: "/images/kanalreinigung-2-after.jpg",
    type: "after"
  },
  {
    id: 11,
    title: "Kanalreinigung",
    description: "Blockierter Kanal - Vorher",
    category: "Kanalreinigung",
    serviceSlug: "kanalreinigung",
    image: "/images/kanalreinigung-3-before.jpg",
    type: "before"
  },
  {
    id: 12,
    title: "Kanalreinigung",
    description: "Freier Kanal - Nachher",
    category: "Kanalreinigung",
    serviceSlug: "kanalreinigung",
    image: "/images/kanalreinigung-3-after.jpg",
    type: "after"
  },
  // Rohrreinigung
  {
    id: 13,
    title: "Rohrreinigung",
    description: "Verstopftes Rohr - Vorher",
    category: "Rohrreinigung",
    serviceSlug: "rohrreinigung",
    image: "/images/rohrreinigung-2-before.jpg",
    type: "before"
  },
  {
    id: 14,
    title: "Rohrreinigung",
    description: "Gereinigtes Rohr - Nachher",
    category: "Rohrreinigung",
    serviceSlug: "rohrreinigung",
    image: "/images/rohrreinigung-2-after.jpg",
    type: "after"
  },
  // Inspektion
  {
    id: 15,
    title: "Kamera Inspektion",
    description: "Rohrinspektion - Vorher",
    category: "Kamera-Inspektion",
    serviceSlug: "kamera-inspektion",
    image: "/images/inspektion-1-before.jpg",
    type: "before"
  },
  {
    id: 16,
    title: "Kamera Inspektion",
    description: "Nach der Inspektion - Nachher",
    category: "Kamera-Inspektion",
    serviceSlug: "kamera-inspektion",
    image: "/images/inspektion-1-afterr.jpg",
    type: "after"
  },
  {
    id: 17,
    title: "Kamera Inspektion",
    description: "Rohrinspektion - Vorher",
    category: "Kamera-Inspektion",
    serviceSlug: "kamera-inspektion",
    image: "/images/inspektion-2-before.jpg",
    type: "before"
  },
  {
    id: 18,
    title: "Kamera Inspektion",
    description: "Nach der Inspektion - Nachher",
    category: "Kamera-Inspektion",
    serviceSlug: "kamera-inspektion",
    image: "/images/inspektion-2-after.jpg",
    type: "after"
  },
  // Notdienst
  {
    id: 19,
    title: "Notdienst Einsatz",
    description: "Notfall - Vorher",
    category: "Notdienst",
    serviceSlug: "notdienst",
    image: "/images/notdienst-1-before.jpg",
    type: "before"
  },
  {
    id: 20,
    title: "Notdienst Einsatz",
    description: "Problem gelöst - Nachher",
    category: "Notdienst",
    serviceSlug: "notdienst",
    image: "/images/notdienst-1-after.jpg",
    type: "after"
  },
  {
    id: 21,
    title: "Notdienst Einsatz",
    description: "Notfall - Vorher",
    category: "Notdienst",
    serviceSlug: "notdienst",
    image: "/images/notdienst-2-before.jpg",
    type: "before"
  },
  {
    id: 22,
    title: "Notdienst Einsatz",
    description: "Problem gelöst - Nachher",
    category: "Notdienst",
    serviceSlug: "notdienst",
    image: "/images/notdienst-2-after.jpg",
    type: "after"
  },
  {
    id: 23,
    title: "Notdienst Einsatz",
    description: "Notfall - Vorher",
    category: "Notdienst",
    serviceSlug: "notdienst",
    image: "/images/notdienst-3-before.jpg",
    type: "before"
  },
  {
    id: 24,
    title: "Notdienst Einsatz",
    description: "Problem gelöst - Nachher",
    category: "Notdienst",
    serviceSlug: "notdienst",
    image: "/images/notdienst-3-after.jpg",
    type: "after"
  }
];

// Before/After pairs for easy access
export const beforeAfterGallery = [
  {
    id: 1,
    title: "Duschablauf Reinigung",
    description: "Professionelle Reinigung eines verstopften Duschablaufs",
    category: "Abflussreinigung",
    serviceSlug: "abflussreinigung",
    beforeImage: "/images/abflussreinigung-1-before.jpg",
    afterImage: "/images/abflussreinigung-1-after.jpg"
  },
  {
    id: 2,
    title: "Bodenablauf Reinigung",
    description: "Entfernung von Schmutz aus dem Bodenablauf",
    category: "Abflussreinigung",
    serviceSlug: "abflussreinigung",
    beforeImage: "/images/abflussreinigung-2-before.jpg",
    afterImage: "/images/abflussreinigung-2-after.jpg"
  },
  {
    id: 3,
    title: "Badezimmer Ablauf",
    description: "Gründliche Reinigung des Badezimmer-Ablaufs",
    category: "Abflussreinigung",
    serviceSlug: "abflussreinigung",
    beforeImage: "/images/abflussreinigung-3-before.jpg",
    afterImage: "/images/abflussreinigung-3-after.jpg"
  },
  {
    id: 4,
    title: "Kanalreinigung",
    description: "Professionelle Kanalreinigung mit Hochdruck",
    category: "Kanalreinigung",
    serviceSlug: "kanalreinigung",
    beforeImage: "/images/kanalreinigung-1-before.jpg",
    afterImage: "/images/kanalreinigung-1-after.jpg"
  },
  {
    id: 5,
    title: "Kanalreinigung",
    description: "Beseitigung von Ablagerungen im Kanal",
    category: "Kanalreinigung",
    serviceSlug: "kanalreinigung",
    beforeImage: "/images/kanalreinigung-2-before.jpg",
    afterImage: "/images/kanalreinigung-2-after.jpg"
  },
  {
    id: 6,
    title: "Kanalreinigung",
    description: "Gründliche Kanalreinigung",
    category: "Kanalreinigung",
    serviceSlug: "kanalreinigung",
    beforeImage: "/images/kanalreinigung-3-before.jpg",
    afterImage: "/images/kanalreinigung-3-after.jpg"
  },
  {
    id: 7,
    title: "Rohrreinigung",
    description: "Professionelle Rohrreinigung",
    category: "Rohrreinigung",
    serviceSlug: "rohrreinigung",
    beforeImage: "/images/rohrreinigung-2-before.jpg",
    afterImage: "/images/rohrreinigung-2-after.jpg"
  },
  {
    id: 8,
    title: "Kamera Inspektion",
    description: "Professionelle Rohrinspektion mit Kamera",
    category: "Kamera-Inspektion",
    serviceSlug: "kamera-inspektion",
    beforeImage: "/images/inspektion-1-before.jpg",
    afterImage: "/images/inspektion-1-afterr.jpg"
  },
  {
    id: 9,
    title: "Kamera Inspektion",
    description: "Detaillierte Kanalinspektion",
    category: "Kamera-Inspektion",
    serviceSlug: "kamera-inspektion",
    beforeImage: "/images/inspektion-2-before.jpg",
    afterImage: "/images/inspektion-2-after.jpg"
  },
  {
    id: 10,
    title: "Notdienst Einsatz",
    description: "Schnelle Hilfe im Notfall",
    category: "Notdienst",
    serviceSlug: "notdienst",
    beforeImage: "/images/notdienst-1-before.jpg",
    afterImage: "/images/notdienst-1-after.jpg"
  },
  {
    id: 11,
    title: "Notdienst Einsatz",
    description: "24/7 Notdienst verfügbar",
    category: "Notdienst",
    serviceSlug: "notdienst",
    beforeImage: "/images/notdienst-2-before.jpg",
    afterImage: "/images/notdienst-2-after.jpg"
  },
  {
    id: 12,
    title: "Notdienst Einsatz",
    description: "Professionelle Notfall-Hilfe",
    category: "Notdienst",
    serviceSlug: "notdienst",
    beforeImage: "/images/notdienst-3-before.jpg",
    afterImage: "/images/notdienst-3-after.jpg"
  }
];

// Team members
export const teamMembers = [
  {
    id: 1,
    name: "Team Mitglied 1",
    role: "Facharbeiter",
    image: "/images/team-1.jpg"
  },
  {
    id: 2,
    name: "Team Mitglied 2",
    role: "Facharbeiter",
    image: "/images/team-2.jpg"
  },
  {
    id: 3,
    name: "Team Mitglied 3",
    role: "Facharbeiter",
    image: "/images/team-3.jpg"
  }
];

// Team group and service images
export const teamImages = {
  group: "/images/team-group.jpg",
  service: "/images/team-service.jpg"
};

// How it works steps
export const howItWorks = [
  {
    step: 1,
    title: "Anruf & Beratung",
    description: "Rufen Sie uns an oder schreiben Sie uns. Wir beraten Sie kostenlos und unverbindlich.",
    icon: "phone"
  },
  {
    step: 2,
    title: "Schnelle Anfahrt",
    description: "Unser Fachteam ist innerhalb von 30-60 Minuten bei Ihnen vor Ort.",
    icon: "truck"
  },
  {
    step: 3,
    title: "Problemlösung",
    description: "Wir beseitigen die Verstopfung professionell und hinterlassen alles sauber.",
    icon: "check"
  }
];
