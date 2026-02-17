// جميع المدن ضمن 100 كم من نورنبرغ - قائمة موسعة 300+ مدينة
export interface City {
  name: string;
  slug: string;
  region: string;
  distance: number; // بالكيلومترات من نورنبرغ
  population?: number;
  description: string;
  postalCodes?: string[];
}

// Generator function to create cities
const createCity = (
  name: string,
  slug: string,
  region: string,
  distance: number,
  population?: number,
  description?: string
): City => ({
  name,
  slug,
  region,
  distance,
  population,
  description: description || `Professionelle Rohrreinigung und Kanalreinigung in ${name}. 24/7 Notdienst mit schneller Anfahrt.`,
});

export const cities: City[] = [
  // === NÜRNBERG UND DIREKTES UMLAND (0-15 km) ===
  createCity("Nürnberg", "nuernberg", "Mittelfranken", 0, 518370, "Zweitgrößte Stadt Bayerns und unser Hauptstandort für Rohrreinigung und Kanalreinigung."),
  createCity("Fürth", "fuerth", "Mittelfranken", 7, 132000, "Direkte Nachbarstadt von Nürnberg. Schnelle Anfahrt für alle Rohrreinigungsarbeiten."),
  createCity("Stein", "stein", "Mittelfranken", 8, 14000),
  createCity("Oberasbach", "oberasbach", "Mittelfranken", 10, 18000),
  createCity("Zirndorf", "zirndorf", "Mittelfranken", 12, 26000),
  createCity("Feucht", "feucht", "Mittelfranken", 12, 14000),
  createCity("Wendelstein", "wendelstein", "Mittelfranken", 14, 16000),
  createCity("Heroldsberg", "heroldsberg", "Mittelfranken", 12, 9000),
  createCity("Buckenhof", "buckenhof", "Mittelfranken", 14, 4000),
  createCity("Uttenreuth", "uttenreuth", "Mittelfranken", 15, 5500),
  createCity("Winkelhaid", "winkelhaid", "Mittelfranken", 14, 5000),
  createCity("Schwarzenbruck", "schwarzenbruck", "Mittelfranken", 15, 9000),
  createCity("Ottensoos", "ottensoos", "Mittelfranken", 15, 3500),
  createCity("Kornburg", "kornburg", "Mittelfranken", 10, 5000),
  createCity("Eibach", "eibach", "Mittelfranken", 8, 25000),
  createCity("Röthenbach an der Pegnitz", "roethenbach-an-der-pegnitz", "Mittelfranken", 14, 12000),
  createCity("Langwasser", "langwasser", "Mittelfranken", 7, 35000),
  createCity("Mögeldorf", "moegeldorf", "Mittelfranken", 5, 20000),

  // === ERLANGEN UND UMGEBUNG (15-25 km) ===
  createCity("Erlangen", "erlangen", "Mittelfranken", 18, 113000, "Universitätsstadt mit moderner Infrastruktur. Wir sind schnell vor Ort."),
  createCity("Herzogenaurach", "herzogenaurach", "Mittelfranken", 22, 25000),
  createCity("Eckental", "eckental", "Mittelfranken", 16, 14000),
  createCity("Spardorf", "spardorf", "Mittelfranken", 15, 5000),
  createCity("Möhrendorf", "moehrendorf", "Mittelfranken", 18, 5500),
  createCity("Baiersdorf", "baiersdorf", "Mittelfranken", 20, 8000),
  createCity("Bubenreuth", "bubenreuth", "Mittelfranken", 17, 4500),
  createCity("Marloffstein", "marloffstein", "Mittelfranken", 18, 2500),
  createCity("Neunkirchen am Sand", "neunkirchen-am-sand", "Mittelfranken", 18, 8500),
  createCity("Kalchreuth", "kalchreuth", "Mittelfranken", 15, 5000),

  // === SCHWABACH UND SÜDLICHES UMLAND (15-30 km) ===
  createCity("Schwabach", "schwabach", "Mittelfranken", 15, 40000, "Goldschlägerstadt südlich von Nürnberg. Schnelle Soforthilfe bei Verstopfungen."),
  createCity("Lauf an der Pegnitz", "lauf-an-der-pegnitz", "Mittelfranken", 18, 26000),
  createCity("Altdorf bei Nürnberg", "altdorf-bei-nuernberg", "Mittelfranken", 20, 16000),
  createCity("Burgthann", "burgthann", "Mittelfranken", 18, 12000),
  createCity("Roth", "roth", "Mittelfranken", 28, 25000),
  createCity("Georgensgmünd", "georgensgemuend", "Mittelfranken", 30, 7000),
  createCity("Rednitzhembach", "rednitzhembach", "Mittelfranken", 22, 7500),
  createCity("Schwanstetten", "schwanstetten", "Mittelfranken", 20, 7000),
  createCity("Rohr", "rohr", "Mittelfranken", 25, 4000),
  createCity("Büchenbach", "buechenbach", "Mittelfranken", 26, 6000),
  createCity("Allersberg", "allersberg", "Mittelfranken", 32, 9000),
  createCity("Heideck", "heideck", "Mittelfranken", 35, 5000),
  createCity("Hilpoltstein", "hilpoltstein", "Mittelfranken", 35, 14000),

  // === NÜRNBERGER LAND (20-40 km) ===
  createCity("Hersbruck", "hersbruck", "Mittelfranken", 28, 13000),
  createCity("Schnaittach", "schnaittach", "Mittelfranken", 25, 8000),
  createCity("Simmelsdorf", "simmelsdorf", "Mittelfranken", 30, 3000),
  createCity("Happurg", "happurg", "Mittelfranken", 32, 4000),
  createCity("Velden", "velden", "Mittelfranken", 35, 2000),
  createCity("Königstein", "koenigstein", "Mittelfranken", 38, 2000),
  createCity("Betzenstein", "betzenstein", "Mittelfranken", 42, 2500),
  createCity("Plech", "plech", "Mittelfranken", 45, 1500),
  createCity("Pommelsbrunn", "pommelsbrunn", "Mittelfranken", 30, 6000),
  createCity("Reichenschwand", "reichenschwand", "Mittelfranken", 26, 3000),
  createCity("Hartenstein", "hartenstein", "Mittelfranken", 35, 2500),
  createCity("Vorra", "vorra", "Mittelfranken", 28, 1500),
  createCity("Offenhausen", "offenhausen", "Mittelfranken", 30, 2000),
  createCity("Engelthal", "engelthal", "Mittelfranken", 28, 2000),

  // === ANSBACH UND WESTLICHES MITTELFRANKEN (40-60 km) ===
  createCity("Ansbach", "ansbach", "Mittelfranken", 52, 42000, "Regierungssitz von Mittelfranken. Zuverlässiger Rohrreinigungsservice."),
  createCity("Cadolzburg", "cadolzburg", "Mittelfranken", 18, 11000),
  createCity("Langenzenn", "langenzenn", "Mittelfranken", 22, 10000),
  createCity("Wilhermsdorf", "wilhermsdorf", "Mittelfranken", 28, 5000),
  createCity("Heilsbronn", "heilsbronn", "Mittelfranken", 30, 9000),
  createCity("Windsbach", "windsbach", "Mittelfranken", 35, 6000),
  createCity("Lichtenau", "lichtenau", "Mittelfranken", 50, 4000),
  createCity("Sachsen bei Ansbach", "sachsen-bei-ansbach", "Mittelfranken", 48, 3500),
  createCity("Petersaurach", "petersaurach", "Mittelfranken", 40, 3000),
  createCity("Dietenhofen", "dietenhofen", "Mittelfranken", 38, 4500),
  createCity("Neuendettelsau", "neuendettelsau", "Mittelfranken", 42, 8000),
  createCity("Herrieden", "herrieden", "Mittelfranken", 58, 8000),
  createCity("Bechhofen", "bechhofen", "Mittelfranken", 60, 6000),
  createCity("Burgoberbach", "burgoberbach", "Mittelfranken", 55, 4000),
  createCity("Merkendorf", "merkendorf", "Mittelfranken", 50, 3000),
  createCity("Wolframs-Eschenbach", "wolframs-eschenbach", "Mittelfranken", 48, 3000),

  // === NEUSTADT AN DER AISCH - BAD WINDSHEIM (40-60 km) ===
  createCity("Neustadt an der Aisch", "neustadt-an-der-aisch", "Mittelfranken", 42, 13000),
  createCity("Bad Windsheim", "bad-windsheim", "Mittelfranken", 50, 12000),
  createCity("Höchstadt an der Aisch", "hoechstadt-an-der-aisch", "Mittelfranken", 35, 14000),
  createCity("Uffenheim", "uffenheim", "Mittelfranken", 62, 6000),
  createCity("Markt Bibart", "markt-bibart", "Mittelfranken", 48, 2500),
  createCity("Scheinfeld", "scheinfeld", "Mittelfranken", 52, 5000),
  createCity("Markt Erlbach", "markt-erlbach", "Mittelfranken", 35, 6000),
  createCity("Emskirchen", "emskirchen", "Mittelfranken", 32, 6500),
  createCity("Diespeck", "diespeck", "Mittelfranken", 38, 4000),
  createCity("Lonnerstadt", "lonnerstadt", "Mittelfranken", 30, 2500),
  createCity("Mühlhausen", "muehlhausen", "Mittelfranken", 33, 3000),
  createCity("Dachsbach", "dachsbach", "Mittelfranken", 40, 3500),
  createCity("Ipsheim", "ipsheim", "Mittelfranken", 55, 3000),

  // === WEISSENBURG-GUNZENHAUSEN (50-70 km) ===
  createCity("Weißenburg in Bayern", "weissenburg-in-bayern", "Mittelfranken", 55, 18000),
  createCity("Gunzenhausen", "gunzenhausen", "Mittelfranken", 60, 17000),
  createCity("Treuchtlingen", "treuchtlingen", "Mittelfranken", 58, 13000),
  createCity("Pappenheim", "pappenheim", "Mittelfranken", 62, 4000),
  createCity("Solnhofen", "solnhofen", "Mittelfranken", 65, 2000),
  createCity("Ellingen", "ellingen", "Mittelfranken", 52, 4000),
  createCity("Pleinfeld", "pleinfeld", "Mittelfranken", 48, 8000),
  createCity("Thalmässing", "thalmaessing", "Mittelfranken", 45, 5000),
  createCity("Greding", "greding", "Mittelfranken", 42, 7000),
  createCity("Absberg", "absberg", "Mittelfranken", 55, 2000),
  createCity("Haundorf", "haundorf", "Mittelfranken", 50, 3000),
  createCity("Muhr am See", "muhr-am-see", "Mittelfranken", 55, 3500),
  createCity("Alesheim", "alesheim", "Mittelfranken", 58, 1500),
  createCity("Markt Berolzheim", "markt-berolzheim", "Mittelfranken", 60, 2500),

  // === ROTHENBURG - DINKELSBÜHL (70-90 km) ===
  createCity("Rothenburg ob der Tauber", "rothenburg-ob-der-tauber", "Mittelfranken", 80, 11000),
  createCity("Dinkelsbühl", "dinkelsbuehl", "Mittelfranken", 85, 12000),
  createCity("Feuchtwangen", "feuchtwangen", "Mittelfranken", 75, 12000),
  createCity("Schillingsfürst", "schillingsfuerst", "Mittelfranken", 72, 3000),
  createCity("Dombühl", "dombuehl", "Mittelfranken", 70, 2000),
  createCity("Wörnitz", "woernitz", "Mittelfranken", 78, 1500),
  createCity("Wassertrüdingen", "wassertruedingen", "Mittelfranken", 70, 6000),
  createCity("Oettingen in Bayern", "oettingen-in-bayern", "Schwaben", 85, 5000),

  // === FORCHHEIM UND FRÄNKISCHE SCHWEIZ (30-55 km) ===
  createCity("Forchheim", "forchheim", "Oberfranken", 32, 32000),
  createCity("Ebermannstadt", "ebermannstadt", "Oberfranken", 42, 7000),
  createCity("Gräfenberg", "graefenberg", "Oberfranken", 35, 4000),
  createCity("Pottenstein", "pottenstein", "Oberfranken", 50, 5000),
  createCity("Gößweinstein", "goessweinstein", "Oberfranken", 48, 4000),
  createCity("Waischenfeld", "waischenfeld", "Oberfranken", 50, 3000),
  createCity("Hollfeld", "hollfeld", "Oberfranken", 55, 5000),
  createCity("Egloffstein", "egloffstein", "Oberfranken", 40, 2000),
  createCity("Obertrubach", "obertrubach", "Oberfranken", 45, 2500),
  createCity("Pretzfeld", "pretzfeld", "Oberfranken", 38, 3000),
  createCity("Kirchehrenbach", "kirchehrenbach", "Oberfranken", 36, 2500),
  createCity("Wiesenttal", "wiesenttal", "Oberfranken", 42, 2500),
  createCity("Weilersbach", "weilersbach", "Oberfranken", 34, 2000),
  createCity("Kunreuth", "kunreuth", "Oberfranken", 36, 2000),
  createCity("Pinzberg", "pinzberg", "Oberfranken", 35, 2500),
  createCity("Hallerndorf", "hallerndorf", "Oberfranken", 30, 4000),
  createCity("Heroldsbach", "heroldsbach", "Oberfranken", 28, 5500),
  createCity("Hausen", "hausen", "Oberfranken", 30, 3500),

  // === BAMBERG UND UMGEBUNG (55-75 km) ===
  createCity("Bamberg", "bamberg", "Oberfranken", 63, 77000, "UNESCO-Weltkulturerbe. Spezialisierte Rohrreinigung für historische Gebäude."),
  createCity("Hirschaid", "hirschaid", "Oberfranken", 50, 12000),
  createCity("Hallstadt", "hallstadt", "Oberfranken", 60, 9000),
  createCity("Scheßlitz", "schesslitz", "Oberfranken", 58, 7000),
  createCity("Burgebrach", "burgebrach", "Oberfranken", 52, 7000),
  createCity("Strullendorf", "strullendorf", "Oberfranken", 55, 8000),
  createCity("Frensdorf", "frensdorf", "Oberfranken", 55, 5000),
  createCity("Pommersfelden", "pommersfelden", "Oberfranken", 48, 3000),
  createCity("Stegaurach", "stegaurach", "Oberfranken", 58, 7000),
  createCity("Bischberg", "bischberg", "Oberfranken", 62, 6000),
  createCity("Memmelsdorf", "memmelsdorf", "Oberfranken", 60, 9000),
  createCity("Litzendorf", "litzendorf", "Oberfranken", 62, 6500),
  createCity("Pettstadt", "pettstadt", "Oberfranken", 52, 2500),
  createCity("Buttenheim", "buttenheim", "Oberfranken", 48, 4000),
  createCity("Altendorf", "altendorf", "Oberfranken", 50, 2000),
  createCity("Eggolsheim", "eggolsheim", "Oberfranken", 45, 7000),

  // === PEGNITZ - BAYREUTH (50-90 km) ===
  createCity("Pegnitz", "pegnitz", "Oberfranken", 55, 14000),
  createCity("Bayreuth", "bayreuth", "Oberfranken", 85, 75000, "Festspielstadt mit Wagner-Tradition. Zuverlässige Kanalreinigung."),
  createCity("Creußen", "creussen", "Oberfranken", 75, 5000),
  createCity("Auerbach in der Oberpfalz", "auerbach-in-der-oberpfalz", "Oberpfalz", 60, 9000),
  createCity("Eschenbach in der Oberpfalz", "eschenbach-in-der-oberpfalz", "Oberpfalz", 65, 4000),
  createCity("Grafenwöhr", "grafenwoehr", "Oberpfalz", 75, 6500),
  createCity("Pressath", "pressath", "Oberpfalz", 70, 4000),
  createCity("Kirchenthumbach", "kirchenthumbach", "Oberpfalz", 58, 3000),
  createCity("Speichersdorf", "speichersdorf", "Oberfranken", 72, 7000),
  createCity("Bindlach", "bindlach", "Oberfranken", 80, 7500),
  createCity("Eckersdorf", "eckersdorf", "Oberfranken", 82, 4000),
  createCity("Mistelgau", "mistelgau", "Oberfranken", 78, 4500),
  createCity("Hummeltal", "hummeltal", "Oberfranken", 75, 2000),
  createCity("Gesees", "gesees", "Oberfranken", 76, 1500),
  createCity("Glashütten", "glashuetten", "Oberfranken", 78, 1500),
  createCity("Aufseß", "aufsess", "Oberfranken", 62, 1500),

  // === KULMBACH - LICHTENFELS (70-90 km) ===
  createCity("Kulmbach", "kulmbach", "Oberfranken", 75, 26000),
  createCity("Lichtenfels", "lichtenfels", "Oberfranken", 72, 20000),
  createCity("Kronach", "kronach", "Oberfranken", 88, 17000),
  createCity("Burgkunstadt", "burgkunstadt", "Oberfranken", 70, 7000),
  createCity("Weismain", "weismain", "Oberfranken", 68, 5000),
  createCity("Ebensfeld", "ebensfeld", "Oberfranken", 65, 5000),
  createCity("Bad Staffelstein", "bad-staffelstein", "Oberfranken", 68, 11000),
  createCity("Michelau in Oberfranken", "michelau-in-oberfranken", "Oberfranken", 72, 7000),
  createCity("Marktzeuln", "marktzeuln", "Oberfranken", 74, 2500),
  createCity("Hochstadt am Main", "hochstadt-am-main", "Oberfranken", 70, 2500),
  createCity("Redwitz an der Rodach", "redwitz-an-der-rodach", "Oberfranken", 78, 4000),
  createCity("Marktrodach", "marktrodach", "Oberfranken", 82, 4000),
  createCity("Küps", "kueps", "Oberfranken", 80, 8000),
  createCity("Mainleus", "mainleus", "Oberfranken", 76, 7000),
  createCity("Neudrossenfeld", "neudrossenfeld", "Oberfranken", 78, 4500),
  createCity("Thurnau", "thurnau", "Oberfranken", 72, 4500),
  createCity("Kasendorf", "kasendorf", "Oberfranken", 68, 2500),
  createCity("Trebgast", "trebgast", "Oberfranken", 76, 2500),
  createCity("Wirsberg", "wirsberg", "Oberfranken", 78, 2000),
  createCity("Himmelkron", "himmelkron", "Oberfranken", 74, 3500),
  createCity("Marktschorgast", "marktschorgast", "Oberfranken", 76, 2500),

  // === COBURG REGION (90-100 km) ===
  createCity("Coburg", "coburg", "Oberfranken", 95, 41000),
  createCity("Neustadt bei Coburg", "neustadt-bei-coburg", "Oberfranken", 98, 15000),
  createCity("Bad Rodach", "bad-rodach", "Oberfranken", 100, 6500),
  createCity("Rödental", "roedental", "Oberfranken", 95, 13000),
  createCity("Ebersdorf bei Coburg", "ebersdorf-bei-coburg", "Oberfranken", 96, 6000),
  createCity("Dörfles-Esbach", "doerfles-esbach", "Oberfranken", 94, 4500),
  createCity("Untersiemau", "untersiemau", "Oberfranken", 92, 4000),
  createCity("Lautertal", "lautertal", "Oberfranken", 90, 3500),
  createCity("Meeder", "meeder", "Oberfranken", 96, 4000),
  createCity("Grub am Forst", "grub-am-forst", "Oberfranken", 92, 3000),
  createCity("Weitramsdorf", "weitramsdorf", "Oberfranken", 94, 2500),
  createCity("Seßlach", "sesslach", "Oberfranken", 88, 4000),
  createCity("Sonnefeld", "sonnefeld", "Oberfranken", 88, 5500),
  createCity("Weidhausen bei Coburg", "weidhausen-bei-coburg", "Oberfranken", 86, 3000),
  createCity("Großheirath", "grossheirath", "Oberfranken", 90, 3000),
  createCity("Itzgrund", "itzgrund", "Oberfranken", 85, 3000),

  // === NEUMARKT UND OBERPFALZ (40-65 km) ===
  createCity("Neumarkt in der Oberpfalz", "neumarkt-in-der-oberpfalz", "Oberpfalz", 40, 41000),
  createCity("Freystadt", "freystadt", "Oberpfalz", 48, 9000),
  createCity("Berngau", "berngau", "Oberpfalz", 42, 4000),
  createCity("Postbauer-Heng", "postbauer-heng", "Oberpfalz", 38, 8000),
  createCity("Pyrbaum", "pyrbaum", "Oberpfalz", 35, 6000),
  createCity("Berg bei Neumarkt", "berg-bei-neumarkt", "Oberpfalz", 42, 8000),
  createCity("Lauterhofen", "lauterhofen", "Oberpfalz", 48, 4000),
  createCity("Sengenthal", "sengenthal", "Oberpfalz", 42, 4000),
  createCity("Mühlhausen", "muehlhausen-oberpfalz", "Oberpfalz", 44, 3500),
  createCity("Velburg", "velburg", "Oberpfalz", 55, 5000),
  createCity("Parsberg", "parsberg", "Oberpfalz", 60, 7000),
  createCity("Berching", "berching", "Oberpfalz", 52, 9000),
  createCity("Deining", "deining", "Oberpfalz", 48, 4500),
  createCity("Pilsach", "pilsach", "Oberpfalz", 45, 3500),
  createCity("Dietfurt an der Altmühl", "dietfurt-an-der-altmuehl", "Oberpfalz", 65, 6000),
  createCity("Beilngries", "beilngries", "Oberbayern", 60, 10000),

  // === AMBERG UND ÖSTLICHE OBERPFALZ (55-100 km) ===
  createCity("Amberg", "amberg", "Oberpfalz", 65, 42000),
  createCity("Sulzbach-Rosenberg", "sulzbach-rosenberg", "Oberpfalz", 55, 20000),
  createCity("Vilseck", "vilseck", "Oberpfalz", 68, 7000),
  createCity("Hahnbach", "hahnbach", "Oberpfalz", 60, 6000),
  createCity("Hirschau", "hirschau", "Oberpfalz", 58, 6000),
  createCity("Schnaittenbach", "schnaittenbach", "Oberpfalz", 62, 4000),
  createCity("Freihung", "freihung", "Oberpfalz", 64, 2500),
  createCity("Kümmersbruck", "kuemmersbruck", "Oberpfalz", 62, 10000),
  createCity("Ursensollen", "ursensollen", "Oberpfalz", 58, 4000),
  createCity("Ensdorf", "ensdorf", "Oberpfalz", 56, 2500),
  createCity("Rieden", "rieden", "Oberpfalz", 60, 3000),
  createCity("Gebenbach", "gebenbach", "Oberpfalz", 62, 2500),
  createCity("Edelsfeld", "edelsfeld", "Oberpfalz", 54, 2500),
  createCity("Neukirchen bei Sulzbach-Rosenberg", "neukirchen-bei-sulzbach-rosenberg", "Oberpfalz", 52, 2500),
  createCity("Königstein", "koenigstein-oberpfalz", "Oberpfalz", 50, 2000),
  createCity("Weiden in der Oberpfalz", "weiden-in-der-oberpfalz", "Oberpfalz", 100, 43000),

  // === UNTERFRANKEN GRENZREGION (70-100 km) ===
  createCity("Würzburg", "wuerzburg", "Unterfranken", 100, 128000),
  createCity("Kitzingen", "kitzingen", "Unterfranken", 80, 22000),
  createCity("Volkach", "volkach", "Unterfranken", 75, 9000),
  createCity("Gerolzhofen", "gerolzhofen", "Unterfranken", 85, 7000),
  createCity("Haßfurt", "hassfurt", "Unterfranken", 82, 14000),
  createCity("Eltmann", "eltmann", "Unterfranken", 78, 5000),
  createCity("Ebern", "ebern", "Unterfranken", 88, 7000),
  createCity("Zeil am Main", "zeil-am-main", "Unterfranken", 80, 6000),
  createCity("Oberaurach", "oberaurach", "Unterfranken", 78, 4000),
  createCity("Knetzgau", "knetzgau", "Unterfranken", 80, 6000),
  createCity("Wonfurt", "wonfurt", "Unterfranken", 82, 2500),
  createCity("Theres", "theres", "Unterfranken", 84, 3000),
  createCity("Gädheim", "gaedheim", "Unterfranken", 85, 1500),
  createCity("Königsberg in Bayern", "koenigsberg-in-bayern", "Unterfranken", 85, 4000),
  createCity("Hofheim in Unterfranken", "hofheim-in-unterfranken", "Unterfranken", 90, 5000),
  createCity("Maroldsweisach", "maroldsweisach", "Unterfranken", 92, 3500),
  createCity("Pfarrweisach", "pfarrweisach", "Unterfranken", 88, 2000),
  createCity("Rentweinsdorf", "rentweinsdorf", "Unterfranken", 86, 2000),
  createCity("Untermerzbach", "untermerzbach", "Unterfranken", 88, 2500),
  createCity("Burgpreppach", "burgpreppach", "Unterfranken", 90, 3000),
  createCity("Iphofen", "iphofen", "Unterfranken", 75, 5000),
  createCity("Dettelbach", "dettelbach", "Unterfranken", 78, 7000),
  createCity("Schwarzach am Main", "schwarzach-am-main", "Unterfranken", 76, 3500),
  createCity("Prichsenstadt", "prichsenstadt", "Unterfranken", 72, 3000),
  createCity("Wiesentheid", "wiesentheid", "Unterfranken", 74, 5000),
  createCity("Castell", "castell", "Unterfranken", 72, 1000),
  createCity("Rüdenhausen", "ruedenhausen", "Unterfranken", 70, 1200),
  createCity("Abtswind", "abtswind", "Unterfranken", 68, 1000),
  createCity("Markt Einersheim", "markt-einersheim", "Unterfranken", 70, 1500),

  // === SCHWABEN GRENZREGION (85-100 km) ===
  createCity("Nördlingen", "noerdlingen", "Schwaben", 90, 21000),
  createCity("Donauwörth", "donauwoerth", "Schwaben", 95, 20000),
  createCity("Harburg", "harburg", "Schwaben", 88, 6000),
  createCity("Wemding", "wemding", "Schwaben", 85, 6000),
  createCity("Monheim", "monheim", "Schwaben", 82, 5000),
  createCity("Kaisheim", "kaisheim", "Schwaben", 90, 4000),
  createCity("Rain", "rain", "Schwaben", 95, 9000),
  createCity("Mertingen", "mertingen", "Schwaben", 98, 4500),
  createCity("Asbach-Bäumenheim", "asbach-baeumenheim", "Schwaben", 96, 5500),
  createCity("Genderkingen", "genderkingen", "Schwaben", 94, 2000),
  createCity("Daiting", "daiting", "Schwaben", 78, 1500),
  createCity("Tagmersheim", "tagmersheim", "Schwaben", 80, 2000),
  createCity("Rögling", "roegling", "Schwaben", 82, 1500),
  createCity("Mönchsdeggingen", "moenchsdeggingen", "Schwaben", 88, 2000),
  createCity("Alerheim", "alerheim", "Schwaben", 90, 3000),
  createCity("Ederheim", "ederheim", "Schwaben", 92, 2000),
  createCity("Reimlingen", "reimlingen", "Schwaben", 88, 2000),
  createCity("Wallerstein", "wallerstein", "Schwaben", 86, 3500),
  createCity("Maihingen", "maihingen", "Schwaben", 84, 2000),
  createCity("Marktoffingen", "marktoffingen", "Schwaben", 82, 1500),

  // === WEITERE ORTE ERLANGEN-HÖCHSTADT ===
  createCity("Adelsdorf", "adelsdorf", "Mittelfranken", 28, 8500),
  createCity("Großenseebach", "grossenseebach", "Mittelfranken", 25, 3500),
  createCity("Aurachtal", "aurachtal", "Mittelfranken", 26, 3000),
  createCity("Vestenbergsgreuth", "vestenbergsgreuth", "Mittelfranken", 32, 2500),
  createCity("Wachenroth", "wachenroth", "Mittelfranken", 36, 2500),
  createCity("Hemhofen", "hemhofen", "Mittelfranken", 22, 5000),
  createCity("Röttenbach", "roettenbach", "Mittelfranken", 24, 4500),
  createCity("Weisendorf", "weisendorf", "Mittelfranken", 28, 7000),
  createCity("Heßdorf", "hessdorf", "Mittelfranken", 25, 4500),
  createCity("Hannberg", "hannberg", "Mittelfranken", 24, 2000),
  createCity("Gremsdorf", "gremsdorf", "Mittelfranken", 30, 2000),
  createCity("Uehlfeld", "uehlfeld", "Mittelfranken", 35, 3500),

  // === LANDKREIS FÜRTH ===
  createCity("Veitsbronn", "veitsbronn", "Mittelfranken", 15, 7500),
  createCity("Puschendorf", "puschendorf", "Mittelfranken", 20, 2500),
  createCity("Seukendorf", "seukendorf", "Mittelfranken", 18, 3000),
  createCity("Obermichelbach", "obermichelbach", "Mittelfranken", 16, 2500),
  createCity("Tuchenbach", "tuchenbach", "Mittelfranken", 17, 1500),
  createCity("Großhabersdorf", "grosshabersdorf", "Mittelfranken", 22, 4500),
  createCity("Ammerndorf", "ammerndorf", "Mittelfranken", 20, 2500),
  createCity("Roßtal", "rosstal", "Mittelfranken", 18, 10000),

  // === WEITERE OBERPFALZ ORTE ===
  createCity("Hohenfels", "hohenfels", "Oberpfalz", 72, 2500),
  createCity("Lupburg", "lupburg", "Oberpfalz", 62, 2500),
  createCity("Seubersdorf", "seubersdorf", "Oberpfalz", 55, 4000),
  createCity("Breitenbrunn", "breitenbrunn", "Oberpfalz", 58, 3500),
  createCity("Hohenburg", "hohenburg", "Oberpfalz", 60, 2000),
  createCity("Kastl", "kastl", "Oberpfalz", 55, 2500),
  createCity("Ursensollen", "ursensollen-oberpfalz", "Oberpfalz", 58, 4000),
  createCity("Illschwang", "illschwang", "Oberpfalz", 52, 3000),
  createCity("Birgland", "birgland", "Oberpfalz", 50, 2000),
  createCity("Weigendorf", "weigendorf", "Oberpfalz", 48, 2500),

  // === ZUSÄTZLICHE MITTELFRANKEN ORTE ===
  createCity("Ornbau", "ornbau", "Mittelfranken", 55, 2000),
  createCity("Arberg", "arberg", "Mittelfranken", 58, 2500),
  createCity("Mitteleschenbach", "mitteleschenbach", "Mittelfranken", 52, 2000),
  createCity("Haundorf", "haundorf-mittelfranken", "Mittelfranken", 50, 3000),
  createCity("Absberg", "absberg-mittelfranken", "Mittelfranken", 55, 2000),
  createCity("Pfofeld", "pfofeld", "Mittelfranken", 52, 2500),
  createCity("Theilenhofen", "theilenhofen", "Mittelfranken", 54, 2000),
  createCity("Alesheim", "alesheim-mittelfranken", "Mittelfranken", 58, 1500),
  createCity("Polsingen", "polsingen", "Mittelfranken", 68, 1800),
  createCity("Westheim", "westheim", "Mittelfranken", 56, 1500),
  createCity("Heidenheim", "heidenheim", "Mittelfranken", 72, 2500),
  createCity("Döckingen", "doeckingen", "Mittelfranken", 65, 1200),
  createCity("Höttingen", "hoettingen", "Mittelfranken", 60, 1500),
  createCity("Meinheim", "meinheim", "Mittelfranken", 62, 1200),
  createCity("Markt Nordheim", "markt-nordheim", "Mittelfranken", 55, 1000),
  createCity("Oberdachstetten", "oberdachstetten", "Mittelfranken", 48, 1800),
  createCity("Flachslanden", "flachslanden", "Mittelfranken", 45, 3000),
  createCity("Rügland", "ruegland", "Mittelfranken", 50, 1500),
  createCity("Aurach", "aurach", "Mittelfranken", 62, 3000),
  createCity("Burk", "burk", "Mittelfranken", 60, 2500),
  createCity("Weihenzell", "weihenzell", "Mittelfranken", 55, 3500),
  createCity("Lehrberg", "lehrberg", "Mittelfranken", 52, 4000),
  createCity("Röttenbach", "roettenbach-ansbach", "Mittelfranken", 50, 3000),
  createCity("Bruckberg", "bruckberg", "Mittelfranken", 55, 3000),
  createCity("Dentlein am Forst", "dentlein-am-forst", "Mittelfranken", 60, 2500),
  createCity("Weidenbach", "weidenbach", "Mittelfranken", 55, 2500),
  createCity("Unterschwaningen", "unterschwaningen", "Mittelfranken", 58, 1500),
  createCity("Ehingen", "ehingen", "Mittelfranken", 66, 1800),
  createCity("Gerolfingen", "gerolfingen", "Mittelfranken", 68, 1000),
];

export const regions = [
  "Mittelfranken",
  "Oberfranken",
  "Oberpfalz",
  "Unterfranken",
  "Schwaben",
  "Oberbayern",
];

export function getCityBySlug(slug: string): City | undefined {
  return cities.find((city) => city.slug === slug);
}

export function getCitiesByRegion(region: string): City[] {
  return cities.filter((city) => city.region === region);
}

export function getNearbyCities(distance: number = 30): City[] {
  return cities.filter((city) => city.distance <= distance);
}

export function getAllCitySlugs(): string[] {
  return cities.map((city) => city.slug);
}

export function searchCities(query: string): City[] {
  const searchTerm = query.toLowerCase();
  return cities.filter(
    (city) =>
      city.name.toLowerCase().includes(searchTerm) ||
      city.slug.toLowerCase().includes(searchTerm) ||
      city.region.toLowerCase().includes(searchTerm)
  );
}

export function getCitiesSortedByDistance(): City[] {
  return [...cities].sort((a, b) => a.distance - b.distance);
}

export function getCitiesSortedByName(): City[] {
  return [...cities].sort((a, b) => a.name.localeCompare(b.name, 'de'));
}

// إجمالي المدن
export const totalCities = cities.length;
