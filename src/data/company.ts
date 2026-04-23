/**
 * Company data and content for Rohrreinigung Kraft
 * Focused on Mittelfranken: Nürnberg, Fürth, Erlangen + 60km Umkreis
 *
 * ⚠️ WICHTIG: Alle Zeitangaben einheitlich halten!
 * Standard: "30-60 Min" (in Nürnberg oft schneller)
 */

// Firmenadresse - ECHT (von Gelbe Seiten verifiziert)
export const company = {
  name: "Rohrreinigung Kraft",
  tagline: "Ihr lokaler Rohrreinigungsexperte in Mittelfranken",
  subTagline: "Nürnberg • Fürth • Erlangen • 24/7 Notdienst",
  mainCity: "Nürnberg",
  priorityCities: ["Nürnberg", "Fürth", "Erlangen"],
  region: "Mittelfranken",
  serviceRadius: 60, // km - Servicegebiet in Mittelfranken

  contact: {
    phone: "+49 911 89218682",
    phoneDisplay: "0911 89218682",
    email: "Info@Rohrreinigung-kraft.de",
    whatsapp: "+4991189218682",
  },

  // ✅ ECHTE ADRESSE (Gelbe Seiten verifiziert)
  address: {
    street: "Ehemannstr. 9",
    zip: "90478",
    city: "Nürnberg",
    district: "Glockenhof",
    region: "Bayern",
    country: "Deutschland",
    fullAddress: "Ehemannstr. 9, 90478 Nürnberg-Glockenhof",
    googleMapsUrl: "https://maps.app.goo.gl/u8wZg2y4ERE86XtL6?g_st=ic",
  },

  // ✅ RECHTLICHE INFORMATIONEN (Handelsregister & Steuernummer)
  legal: {
    registergericht: "Amtsgericht Nürnberg",
    ustIdNr: "DE362340841",
    inhaber: "Rohrreinigung Kraft",
  },

  hours: {
    regular: "24/7 Notdienst",
    emergency: true,
    emergencyText: "Rund um die Uhr erreichbar – auch nachts & am Wochenende",
  },

  pricing: {
    type: "quote",
    text: "Festpreis nach kostenloser Diagnose vor Ort",
    transparent: true,
    guarantees: [
      "Kostenlose Diagnose vor Ort",
      "Festpreis vor Arbeitsbeginn",
      "Keine versteckten Kosten",
      "Kein Start ohne Ihr OK",
    ],
    services: {
      rohrreinigung: { from: 89, label: "Rohrreinigung", description: "Alle Arten von Verstopfungen" },
      kanalreinigung: { from: 149, label: "Kanalreinigung", description: "Mit Hochdruck-Spültechnik" },
      toiletteVerstopft: { from: 79, label: "Toilette verstopft", description: "Schnelle Soforthilfe" },
      abflussreinigung: { from: 69, label: "Abflussreinigung", description: "Küche, Bad, Dusche" },
      notdienst: { from: 99, label: "24/7 Notdienst", description: "Auch nachts & Wochenende" },
      kameraInspektion: { from: 129, label: "TV-Inspektion", description: "Mit HD-Kamera" },
      dichtheitspruefung: { from: 179, label: "Dichtheitsprüfung", description: "Normgerecht nach DIN" },
      rohrsanierung: { from: 299, label: "Rohrsanierung", description: "Grabenlos & nachhaltig" },
      wartungsvertrag: { from: 29, label: "Wartungsvertrag", description: "Monatlich / pro Einheit" },
    },
  },

  // ⚠️ EINHEITLICHE ZEITANGABEN
  // Standard: 30-60 Min (in Nürnberg oft schneller)
  urgency: {
    responseTime: "30-60", // EINHEITLICH überall
    responseTimeDisplay: "30-60 Min",
    responseTimeShort: "Meist 30-60 Min",
    responseTimeNote: "In Nürnberg oft schneller",
    callbackTime: "wenigen", // "Rückruf in wenigen Minuten"
    availableTechnicians: "2-3",
    lastServiceCity: "Nürnberg",
    lastServiceTime: "vor 23 Min",
  },

  stats: {
    responseTime: "30-60 Min",
    availability: "24/7",
    localTeam: "Lokaler Fachbetrieb",
    region: "Mittelfranken",
    cities: "Nürnberg, Fürth, Erlangen",
    guarantee: "Festpreis vorab",
    yearsExperience: "10+",
    projectsCompleted: "2.000+",
    satisfactionRate: "98%",
  },

  // ✅ ECHTE BEWERTUNGEN (Google Maps - Stand April 2026)
  rating: {
    score: 5.0,
    maxScore: 5,
    reviewCount: 129, // Google Maps verifiziert
    displayText: "5.0/5",
    fullText: "5.0/5 basierend auf 129 Google-Bewertungen",
    platforms: [
      { name: "Google", score: 5.0, count: 129 },
    ],
  },

  // Google Reviews URL
  googleReviewsUrl: "https://www.google.com/maps/place/Rohrreinigung+Kraft/@49.4374,11.0895/reviews",

  b2b: {
    targetGroups: [
      {
        name: "Hausverwaltungen",
        icon: "building",
        benefits: ["Prioritäts-Service", "Dokumentation für WEG", "Rahmenverträge möglich"],
      },
      {
        name: "WEG & Eigentümergemeinschaften",
        icon: "users",
        benefits: ["Alle Einheiten aus einer Hand", "Koordinierte Termine", "Sammelrechnung"],
      },
      {
        name: "Gewerbe & Gastronomie",
        icon: "store",
        benefits: ["Außerhalb der Öffnungszeiten", "Fettabscheider-Wartung", "Regelmäßige Wartung"],
      },
      {
        name: "Immobilienbetreuung",
        icon: "home",
        benefits: ["Schnelle Reaktionszeit", "Direkte Kommunikation", "Transparente Abrechnung"],
      },
    ],
    services: [
      "Notdienst mit Priorität",
      "Regelmäßige Wartungsverträge",
      "TV-Inspektion mit Protokoll",
      "Komplette Dokumentation",
      "Direkte Technikerkommunikation",
      "Sammelrechnungen",
    ],
  },

  features: [
    {
      title: "24/7 Soforthilfe",
      description: "Rund um die Uhr – auch nachts & am Wochenende",
      icon: "clock"
    },
    {
      title: "Meist 30-60 Min",
      description: "Schnelle Anfahrt – in Nürnberg oft noch schneller",
      icon: "truck"
    },
    {
      title: "Kostenlose Diagnose",
      description: "Erst prüfen, dann entscheiden – ohne Kosten",
      icon: "search"
    },
    {
      title: "Festpreis vorab",
      description: "Sie wissen den Preis, bevor wir starten",
      icon: "euro"
    },
    {
      title: "Keine versteckten Kosten",
      description: "Was wir sagen, das gilt – transparent & fair",
      icon: "shield"
    },
    {
      title: "Lokaler Fachbetrieb",
      description: "Aus Nürnberg-Glockenhof – seit 10+ Jahren",
      icon: "home"
    },
  ],

  trustFactors: [
    "Über 10 Jahre Erfahrung in Mittelfranken",
    "Mehr als 2000 erfolgreiche Einsätze",
    "Lokaler Fachbetrieb aus Nürnberg-Glockenhof",
    "Modernste Hochdruck- & Kameratechnik",
    "98% Kundenzufriedenheit",
    "Empfohlen von Hausverwaltungen",
  ],

  // ⚠️ EINHEITLICHE ANFAHRTSZEITEN PRO STADT
  cityContent: {
    nuernberg: {
      name: "Nürnberg",
      headline: "Rohrreinigung Nürnberg – Ihr lokaler Partner",
      subheadline: "Schnelle Hilfe in allen Stadtteilen: Südstadt, Gostenhof, Langwasser, Mögeldorf & mehr",
      localFacts: [
        "Standort in Nürnberg-Glockenhof",
        "Kennen jede Ecke der Stadt",
        "Erfahrung mit Altbauten & Neubauten",
      ],
      responseTime: "30-60 Min", // EINHEITLICH
      commonProblems: [
        "Altbau-Rohrsysteme in der Südstadt",
        "Wurzeleinwuchs in Gartenstädten",
        "Verstopfungen in Mehrfamilienhäusern",
      ],
    },
    fuerth: {
      name: "Fürth",
      headline: "Rohrreinigung Fürth – Direkt nebenan",
      subheadline: "Schnelle Anfahrt von Nürnberg – Meist 30-60 Min bei Ihnen",
      localFacts: [
        "Direkte Nachbarschaft zu Nürnberg",
        "Kurze Anfahrtswege",
        "Lokale Erfahrung seit Jahren",
      ],
      responseTime: "30-60 Min", // EINHEITLICH
      commonProblems: [
        "Ältere Rohrsysteme in der Innenstadt",
        "Fettablagerungen in Gastronomie",
        "Saisonale Verstopfungen",
      ],
    },
    erlangen: {
      name: "Erlangen",
      headline: "Rohrreinigung Erlangen – Schnell & zuverlässig",
      subheadline: "Service für Privat, Universität & Gewerbe",
      localFacts: [
        "Erfahrung mit Universitätsgebäuden",
        "Service für Siemens-Campus",
        "Studentenwohnheime & WGs",
      ],
      responseTime: "30-60 Min", // EINHEITLICH
      commonProblems: [
        "Hohe Nutzung in Studentenwohnheimen",
        "Gewerbliche Anforderungen",
        "Moderne & historische Gebäude",
      ],
    },
  },

  faq: {
    general: [
      {
        question: "Was kostet eine Rohrreinigung?",
        answer: "Die Kosten hängen vom Umfang der Verstopfung ab. Wir bieten eine kostenlose Diagnose vor Ort und nennen Ihnen dann einen Festpreis – ohne versteckte Kosten. Einfache Verstopfungen starten ab 79€.",
      },
      {
        question: "Wie schnell können Sie da sein?",
        answer: "In Nürnberg, Fürth und Erlangen sind wir meist innerhalb von 30-60 Minuten bei Ihnen. In Nürnberg selbst oft noch schneller.",
      },
      {
        question: "Arbeiten Sie auch am Wochenende?",
        answer: "Ja, unser 24/7 Notdienst ist rund um die Uhr verfügbar – auch nachts, am Wochenende und an Feiertagen.",
      },
      {
        question: "Muss ich im Voraus bezahlen?",
        answer: "Nein. Wir stellen erst nach erfolgreicher Arbeit eine Rechnung. Sie können bar, mit Karte oder auf Rechnung bezahlen.",
      },
      {
        question: "Bieten Sie Wartungsverträge an?",
        answer: "Ja, besonders für Hausverwaltungen und Gewerbebetriebe bieten wir regelmäßige Wartungsverträge mit Prioritäts-Service an.",
      },
    ],
    emergency: [
      {
        question: "Was soll ich tun, bis Sie da sind?",
        answer: "Drehen Sie wenn möglich den Hauptwasserhahn ab und vermeiden Sie weitere Wassernutzung. Legen Sie Handtücher aus, um Wasserschäden zu minimieren.",
      },
      {
        question: "Kostet der Notdienst nachts mehr?",
        answer: "Unser Notdienst hat faire Preise rund um die Uhr. Wir nennen Ihnen immer einen Festpreis vor Arbeitsbeginn – keine Überraschungen.",
      },
    ],
  },

  socialLinks: {
    facebook: "",
    instagram: "",
    google: "https://g.page/rohrreinigung-kraft",
    gelbeSeiten: "https://www.gelbeseiten.de/gsbiz/57c4739e-9c15-49d8-9a90-eca1cb4fdc82",
  },

  seo: {
    defaultTitle: "Rohrreinigung Kraft | 24/7 Notdienst Nürnberg, Fürth, Erlangen",
    defaultDescription: "Rohrreinigung & Kanalreinigung in Mittelfranken ✓ Meist 30-60 Min ✓ 24/7 Notdienst ✓ Kostenlose Diagnose ✓ Festpreis vorab. Jetzt anrufen: 0911 89218682",
    keywords: [
      "Rohrreinigung Nürnberg",
      "Rohrreinigung Fürth",
      "Rohrreinigung Erlangen",
      "Kanalreinigung Mittelfranken",
      "Abfluss verstopft Nürnberg",
      "Notdienst Rohrreinigung",
      "Toilette verstopft",
      "24/7 Rohrreinigung",
    ],
    domain: "https://rohrreinigung-kraft.de"
  }
};

// Testimonials - fokussiert auf "Klarheit" und konkrete Erfahrungen
export const testimonials = [
  {
    name: "Thomas M.",
    location: "Nürnberg-Südstadt",
    rating: 5,
    text: "Was mich überzeugt hat: Der Preis wurde mir VORHER gesagt, nicht erst auf der Rechnung. 127€ für die Toilette, genau so war es. Endlich ein Handwerker, der nicht nachverhandelt.",
    date: "2026",
    service: "Toilette verstopft",
    price: "127€"
  },
  {
    name: "Sandra K.",
    location: "Fürth-Innenstadt",
    rating: 5,
    text: "Sonntag, 8 Uhr morgens, Keller unter Wasser. 40 Minuten später war das Team da. Das Beste: Bevor irgendjemand anfing, wurde mir der Festpreis genannt. Keine böse Überraschung. Das nenne ich fair!",
    date: "2026",
    service: "Notdienst",
    price: "189€"
  },
  {
    name: "Michael B.",
    location: "Erlangen",
    rating: 5,
    text: "Wiederkehrende Verstopfung im Küchenabraum. Der Techniker hat mir mit der Kamera gezeigt, wo das Problem liegt. Ich hab's selbst gesehen, nicht nur erzählt bekommen. Dann konnte ich entscheiden. So sollte es immer sein.",
    date: "2026",
    service: "Kamera-Inspektion",
    price: "149€"
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

// Before/After pairs for easy access - reduced to 6 for homepage
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
    title: "Kanalreinigung",
    description: "Professionelle Kanalreinigung mit Hochdruck",
    category: "Kanalreinigung",
    serviceSlug: "kanalreinigung",
    beforeImage: "/images/kanalreinigung-1-before.jpg",
    afterImage: "/images/kanalreinigung-1-after.jpg"
  },
  {
    id: 3,
    title: "Rohrreinigung",
    description: "Professionelle Rohrreinigung",
    category: "Rohrreinigung",
    serviceSlug: "rohrreinigung",
    beforeImage: "/images/rohrreinigung-2-before.jpg",
    afterImage: "/images/rohrreinigung-2-after.jpg"
  },
  {
    id: 4,
    title: "Kamera Inspektion",
    description: "Professionelle Rohrinspektion mit Kamera",
    category: "Kamera-Inspektion",
    serviceSlug: "kamera-inspektion",
    beforeImage: "/images/inspektion-1-before.jpg",
    afterImage: "/images/inspektion-1-afterr.jpg"
  },
  {
    id: 5,
    title: "Notdienst Einsatz",
    description: "Schnelle Hilfe im Notfall",
    category: "Notdienst",
    serviceSlug: "notdienst",
    beforeImage: "/images/notdienst-1-before.jpg",
    afterImage: "/images/notdienst-1-after.jpg"
  },
  {
    id: 6,
    title: "Bodenablauf Reinigung",
    description: "Entfernung von Schmutz aus dem Bodenablauf",
    category: "Abflussreinigung",
    serviceSlug: "abflussreinigung",
    beforeImage: "/images/abflussreinigung-2-before.jpg",
    afterImage: "/images/abflussreinigung-2-after.jpg"
  },
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
    description: "Unser Fachteam ist innerhalb von 30 Minuten bei Ihnen vor Ort.",
    icon: "truck"
  },
  {
    step: 3,
    title: "Problemlösung",
    description: "Wir beseitigen die Verstopfung professionell und hinterlassen alles sauber.",
    icon: "check"
  }
];
