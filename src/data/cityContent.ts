/**
 * Enhanced city content for local SEO and AEO optimization
 * Adds local depth to city pages with:
 * - Neighborhoods (Stadtteile)
 * - Local problems and specialties
 * - Response time specifics
 * - Local testimonial
 * - FAQ specific to the city
 */

export interface CityNeighborhood {
  name: string;
  description?: string;
  commonProblems?: string[];
}

export interface EnhancedCityContent {
  slug: string;
  headline: string;
  subheadline: string;
  localExpertise: {
    title: string;
    points: string[];
  };
  neighborhoods: CityNeighborhood[];
  localProblems: {
    title: string;
    problems: { problem: string; areas: string; solution: string }[];
  };
  responseInfo: {
    typical: string;
    fastest: string;
    note: string;
  };
  localTestimonial: {
    text: string;
    name: string;
    neighborhood: string;
    service: string;
  };
  faq: { question: string; answer: string }[];
}

export const enhancedCityContent: Record<string, EnhancedCityContent> = {
  "nuernberg": {
    slug: "nuernberg",
    headline: "Rohrreinigung Nürnberg",
    subheadline: "Ihr lokaler Partner in Nürnberg-Glockenhof – schnell in allen Stadtteilen",
    localExpertise: {
      title: "Warum wir Nürnberg kennen",
      points: [
        "Unser Firmensitz ist in Nürnberg-Glockenhof (Ehemannstr. 9)",
        "Seit 2014 in Nürnberg aktiv – über 1.200 Einsätze",
        "Wir kennen die Altbau-Systeme in der Südstadt und Gostenhof",
        "Kurze Wege in die Altstadt, Langwasser, Mögeldorf und alle Stadtteile",
        "Erfahrung mit den typischen Nürnberger Rohrproblemen",
      ]
    },
    neighborhoods: [
      { name: "Südstadt", description: "Altbauten mit historischen Rohrsystemen", commonProblems: ["Alte Gussrohre", "Enge Fallrohre"] },
      { name: "Gostenhof", description: "Gründerzeit-Viertel mit typischen Altbau-Problemen", commonProblems: ["Kalk in alten Leitungen"] },
      { name: "St. Johannis", description: "Gemischte Bebauung", commonProblems: ["Wurzeleinwuchs in Gärten"] },
      { name: "Langwasser", description: "Nachkriegs-Siedlung", commonProblems: ["Veraltete Kanalisation"] },
      { name: "Mögeldorf", description: "Villen und Einfamilienhäuser", commonProblems: ["Lange Grundleitungen"] },
      { name: "Erlenstegen", description: "Gehobene Wohngegend", commonProblems: ["Wurzeln von alten Bäumen"] },
      { name: "Zerzabelshof", description: "Ruhige Wohngegend", commonProblems: ["Fettablagerungen"] },
      { name: "Gleißhammer", description: "Industrie- und Wohnmix", commonProblems: ["Gewerbeabwässer"] },
      { name: "Altstadt/St. Sebald", description: "Historisches Zentrum", commonProblems: ["Sehr alte Systeme"] },
      { name: "Wöhrd", description: "Innenstadtnah", commonProblems: ["Dichte Bebauung, enge Schächte"] },
    ],
    localProblems: {
      title: "Typische Rohrprobleme in Nürnberg",
      problems: [
        { problem: "Alte Gussrohre in Altbauten", areas: "Südstadt, Gostenhof, St. Johannis", solution: "Schonende Reinigung + Inspektion" },
        { problem: "Wurzeleinwuchs durch Stadtbäume", areas: "Mögeldorf, Erlenstegen, Ziegelstein", solution: "Wurzelfräse + präventive Wartung" },
        { problem: "Fettablagerungen (Gastronomie)", areas: "Altstadt, Nordstadt", solution: "Hochdruck + regelmäßige Wartung" },
        { problem: "Rückstau bei Starkregen", areas: "Langwasser, Gibitzenhof", solution: "Kanalreinigung + Rückstauklappe" },
      ]
    },
    responseInfo: {
      typical: "20-40 Minuten",
      fastest: "15 Minuten (von unserem Standort Glockenhof)",
      note: "In Nürnberg sind wir am schnellsten – wir wohnen hier."
    },
    localTestimonial: {
      text: "Ehrlich gesagt hätte ich nicht gedacht, dass ein Rohrreinger aus dem eigenen Viertel kommt. 25 Minuten nach dem Anruf stand er vor der Tür, hat gezeigt was verstopft war, Preis genannt – fertig. Genau so soll es sein.",
      name: "M. Hoffmann",
      neighborhood: "Südstadt",
      service: "Toilette verstopft"
    },
    faq: [
      {
        question: "Wie schnell sind Sie in der Nürnberger Altstadt?",
        answer: "Von unserem Standort in Glockenhof sind wir meist in 15-25 Minuten in der Altstadt. Bei Notfällen oft noch schneller."
      },
      {
        question: "Kennen Sie sich mit Altbau-Rohrsystemen aus?",
        answer: "Ja, wir haben jahrelange Erfahrung mit den typischen Guss- und Steinzeugrohren der Nürnberger Altbauten in Südstadt, Gostenhof und anderen Vierteln."
      },
      {
        question: "Reinigen Sie auch in Mehrfamilienhäusern?",
        answer: "Ja, wir arbeiten regelmäßig mit Hausverwaltungen in ganz Nürnberg zusammen. Koordinierte Termine für mehrere Wohnungen sind möglich."
      },
    ]
  },

  "fuerth": {
    slug: "fuerth",
    headline: "Rohrreinigung Fürth",
    subheadline: "Direkt von Nürnberg – schnell in ganz Fürth",
    localExpertise: {
      title: "Warum wir Fürth kennen",
      points: [
        "Nur 7 km von unserem Standort in Nürnberg-Glockenhof",
        "Regelmäßige Einsätze in der Fürther Innenstadt und Umgebung",
        "Erfahrung mit den Altbauten in der Südstadt",
        "Zusammenarbeit mit Fürther Hausverwaltungen",
        "Kurze Anfahrt über die Fürther Straße",
      ]
    },
    neighborhoods: [
      { name: "Innenstadt", description: "Historisches Zentrum mit Altbauten", commonProblems: ["Alte Rohrsysteme", "Enge Schächte"] },
      { name: "Südstadt", description: "Gründerzeit-Architektur", commonProblems: ["Kalk und Ablagerungen"] },
      { name: "Hardhöhe", description: "Nachkriegs-Siedlung", commonProblems: ["Veraltete Kanalisation"] },
      { name: "Poppenreuth", description: "Gemischte Bebauung", commonProblems: ["Wurzelprobleme"] },
      { name: "Burgfarrnbach", description: "Einfamilienhäuser", commonProblems: ["Lange Grundleitungen"] },
      { name: "Dambach", description: "Ruhige Wohngegend", commonProblems: ["Fettablagerungen"] },
      { name: "Stadeln", description: "Am Stadtrand", commonProblems: ["Ältere Kanalisation"] },
    ],
    localProblems: {
      title: "Typische Rohrprobleme in Fürth",
      problems: [
        { problem: "Gründerzeit-Altbauten", areas: "Südstadt, Innenstadt", solution: "Schonende Spiralreinigung" },
        { problem: "Gastronomie-Abwässer", areas: "Gustavstraße, Innenstadt", solution: "Fettlöser + Hochdruck" },
        { problem: "Wurzeln in Gartensiedlungen", areas: "Burgfarrnbach, Vach", solution: "Wurzelfräse + Kamera" },
      ]
    },
    responseInfo: {
      typical: "25-45 Minuten",
      fastest: "20 Minuten (bei freier Strecke)",
      note: "Schnelle Verbindung über Fürther Straße und U-Bahn-Trasse."
    },
    localTestimonial: {
      text: "Sonntagmorgen, Toilette zu – Panik. Angerufen, 30 Minuten später waren sie da. Der Techniker hat mir sogar gezeigt, woran es lag. Nächstes Mal weiß ich Bescheid.",
      name: "K. Weber",
      neighborhood: "Südstadt",
      service: "Toilette verstopft"
    },
    faq: [
      {
        question: "Wie lange brauchen Sie nach Fürth?",
        answer: "Von Nürnberg-Glockenhof sind wir in 25-45 Minuten in allen Fürther Stadtteilen. Bei guter Verkehrslage auch schneller."
      },
      {
        question: "Arbeiten Sie auch in der Fürther Altstadt?",
        answer: "Ja, wir kennen die engen Gassen und alten Gebäude in der Fürther Innenstadt. Zugang und Parken sind manchmal eine Herausforderung – wir finden immer eine Lösung."
      },
      {
        question: "Haben Sie Erfahrung mit Fürther Hausverwaltungen?",
        answer: "Ja, wir arbeiten mit mehreren Hausverwaltungen in Fürth zusammen und bieten Rahmenverträge an."
      },
    ]
  },

  "erlangen": {
    slug: "erlangen",
    headline: "Rohrreinigung Erlangen",
    subheadline: "Schneller Service für Universität, Siemens und alle Erlanger",
    localExpertise: {
      title: "Warum wir Erlangen kennen",
      points: [
        "Regelmäßige Einsätze an der Universität und im Siemens-Campus",
        "Erfahrung mit Studentenwohnheimen und WGs",
        "Zusammenarbeit mit Erlanger Hausverwaltungen",
        "Kenntnis der unterschiedlichen Bauperioden",
        "Schnelle Anfahrt über die A73",
      ]
    },
    neighborhoods: [
      { name: "Innenstadt/Altstadt", description: "Historisches Zentrum", commonProblems: ["Alte Rohrsysteme"] },
      { name: "Röthelheimpark", description: "Neubaugebiet auf ehemaligem Siemens-Gelände", commonProblems: ["Moderne Systeme, selten Probleme"] },
      { name: "Büchenbach", description: "Wohnsiedlung", commonProblems: ["Ältere Kanalisation"] },
      { name: "Tennenlohe", description: "Nähe Siemens-Campus", commonProblems: ["Gewerbliche Nutzung"] },
      { name: "Eltersdorf", description: "Am Stadtrand", commonProblems: ["Lange Grundleitungen"] },
      { name: "Dechsendorf", description: "Einfamilienhäuser", commonProblems: ["Wurzelprobleme"] },
      { name: "Sieglitzhof", description: "Studentisch geprägt", commonProblems: ["Hohe Nutzung"] },
    ],
    localProblems: {
      title: "Typische Rohrprobleme in Erlangen",
      problems: [
        { problem: "Studentenwohnheime mit hoher Nutzung", areas: "Sieglitzhof, Innenstadt", solution: "Regelmäßige Wartung empfohlen" },
        { problem: "Gewerbeabwässer (Siemens-Umfeld)", areas: "Tennenlohe, Frauenaurach", solution: "Industrielle Reinigung" },
        { problem: "Altbau-Systeme in der Innenstadt", areas: "Altstadt", solution: "Schonende Methoden" },
      ]
    },
    responseInfo: {
      typical: "30-50 Minuten",
      fastest: "25 Minuten (über A73)",
      note: "Über die Autobahn sind wir schnell in Erlangen."
    },
    localTestimonial: {
      text: "Unser WG-Abfluss war komplett zu. Der Techniker war freundlich, hat erklärt was er macht, und der Preis war fair. Für Studenten wichtig!",
      name: "T. Schneider",
      neighborhood: "Sieglitzhof",
      service: "Abflussreinigung"
    },
    faq: [
      {
        question: "Reinigen Sie auch in Studentenwohnheimen?",
        answer: "Ja, wir haben Erfahrung mit Studentenwohnheimen und WGs. Wir wissen, dass Budget wichtig ist – darum kostenlose Diagnose und Festpreis."
      },
      {
        question: "Arbeiten Sie für die Universität?",
        answer: "Wir arbeiten mit verschiedenen Einrichtungen in Erlangen zusammen. Für größere Aufträge bieten wir Rahmenverträge an."
      },
      {
        question: "Wie schnell kommen Sie nach Erlangen?",
        answer: "Über die A73 sind wir meist in 30-50 Minuten in Erlangen. Bei Notfällen auch schneller."
      },
    ]
  },

  "schwabach": {
    slug: "schwabach",
    headline: "Rohrreinigung Schwabach",
    subheadline: "Schnelle Hilfe in der Goldschlägerstadt",
    localExpertise: {
      title: "Unser Service in Schwabach",
      points: [
        "15 km südlich von Nürnberg – kurze Anfahrt",
        "Erfahrung mit der historischen Altstadt",
        "Regelmäßige Einsätze in Schwabach und Umgebung",
        "Zusammenarbeit mit lokalen Hausverwaltungen",
      ]
    },
    neighborhoods: [
      { name: "Altstadt", description: "Historisches Zentrum", commonProblems: ["Alte Rohrsysteme"] },
      { name: "Limbach", description: "Wohnsiedlung", commonProblems: ["Standard-Probleme"] },
      { name: "Wolkersdorf", description: "Am Stadtrand", commonProblems: ["Längere Grundleitungen"] },
    ],
    localProblems: {
      title: "Typische Probleme in Schwabach",
      problems: [
        { problem: "Altbau-Rohre in der Innenstadt", areas: "Altstadt", solution: "Schonende Reinigung" },
        { problem: "Fettablagerungen (Gastronomie)", areas: "Innenstadt", solution: "Hochdruck + Fettlöser" },
      ]
    },
    responseInfo: {
      typical: "25-40 Minuten",
      fastest: "20 Minuten",
      note: "Kurze Verbindung über die B2."
    },
    localTestimonial: {
      text: "Schnell, unkompliziert, fairer Preis. Was will man mehr?",
      name: "H. Müller",
      neighborhood: "Altstadt",
      service: "Kanalreinigung"
    },
    faq: [
      {
        question: "Wie schnell sind Sie in Schwabach?",
        answer: "Meist in 25-40 Minuten. Über die B2 sind wir schnell da."
      },
      {
        question: "Reinigen Sie auch in Limbach und Wolkersdorf?",
        answer: "Ja, wir bedienen ganz Schwabach und alle Ortsteile."
      },
    ]
  },
};

// Helper function to get enhanced city content
export function getEnhancedCityContent(slug: string): EnhancedCityContent | null {
  return enhancedCityContent[slug] || null;
}

// Get all slugs that have enhanced content
export function getEnhancedCitySlugs(): string[] {
  return Object.keys(enhancedCityContent);
}
