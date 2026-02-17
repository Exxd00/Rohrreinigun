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

// Work gallery with real images
export const gallery = [
  {
    id: 1,
    title: "Kanalreinigung mit Hochdruck",
    description: "Professionelle Hochdruckreinigung einer verstopften Kanalleitung",
    category: "Kanalreinigung",
    serviceSlug: "kanalreinigung",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop"
  },
  {
    id: 2,
    title: "Kamerainspektion",
    description: "TV-Inspektion zur Schadensanalyse",
    category: "Inspektion",
    serviceSlug: "kamera-inspektion",
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800&h=600&fit=crop"
  },
  {
    id: 3,
    title: "Rohrreinigung Badezimmer",
    description: "Beseitigung einer hartnäckigen Verstopfung",
    category: "Rohrreinigung",
    serviceSlug: "rohrreinigung",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=600&fit=crop"
  },
  {
    id: 4,
    title: "Notdienst Einsatz",
    description: "Schnelle Hilfe bei Wassernotfall",
    category: "Notdienst",
    serviceSlug: "rohrreinigung-notdienst",
    image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=800&h=600&fit=crop"
  },
  {
    id: 5,
    title: "Professionelle Ausrüstung",
    description: "Moderne Technik für effektive Rohrreinigung",
    category: "Kanalreinigung",
    serviceSlug: "kanalreinigung",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&h=600&fit=crop"
  },
  {
    id: 6,
    title: "Sanitärtechnik",
    description: "Fachgerechte Arbeiten am Rohrsystem",
    category: "Sanierung",
    serviceSlug: "rohrsanierung",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop"
  }
];

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
