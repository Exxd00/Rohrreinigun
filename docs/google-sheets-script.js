// =====================================================
// ROHRREINIGUNG KRAFT - GOOGLE SHEETS FORM HANDLER
// Farben: #3AB0FF (Primär/Blau) | #1E3A8A (Dunkel) | #F8FBFF (Hell)
// Website: rohrreinigungkraft.de | Nürnberg & Umgebung
// =====================================================

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    // Sicherstellen, dass Header existieren
    ensureHeaders(sheet);

    // Datenzeile erstellen
    var row = [
      Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "dd.MM.yyyy HH:mm:ss"), // Datum
      "🆕 Neu",                              // Status
      data.name || "",                       // Name
      data.phone || "",                      // Telefon
      data.email || "",                      // E-Mail
      data.city || "",                       // Ort
      getServiceIcon(data.service),          // Dienstleistung
      getUrgencyLevel(data.service),         // Dringlichkeit
      data.message || "",                    // Nachricht
      data.images?.length || 0,              // Anzahl Bilder
      getSourceInfo(data)                    // Quelle
    ];

    // Zeile nach den Headern hinzufügen
    sheet.appendRow(row);
    var lastRow = sheet.getLastRow();

    // Dropdown für Status hinzufügen
    addStatusDropdown(sheet, lastRow);

    // Neue Zeile hervorheben
    highlightNewRow(sheet, lastRow);

    // Dringlichkeit-Formatierung
    formatUrgencyCell(sheet, lastRow);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, row: lastRow }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// =====================================================
// Header-Prüfung und Erstellung
// =====================================================
function ensureHeaders(sheet) {
  var a1 = sheet.getRange("A1").getValue();
  var b1 = sheet.getRange("B1").getValue();

  if (a1 !== "Datum" || b1 !== "Status") {
    sheet.clear();
    createHeaders(sheet);
  }
}

// =====================================================
// Header mit Rohrreinigung Kraft Branding erstellen
// =====================================================
function createHeaders(sheet) {
  var headers = [
    ["Datum",           "📅 Eingangsdatum"],
    ["Status",          "📊 Bearbeitungsstatus"],
    ["Name",            "👤 Kundenname"],
    ["Telefon",         "📱 Telefonnummer"],
    ["E-Mail",          "✉️ E-Mail-Adresse"],
    ["Ort",             "📍 Stadt/Ort"],
    ["Dienstleistung",  "🔧 Gewünschte Leistung"],
    ["Dringlichkeit",   "⚡ Priorität"],
    ["Nachricht",       "💬 Problembeschreibung"],
    ["Bilder",          "📷 Anzahl Fotos"],
    ["Quelle",          "🌐 Herkunft"]
  ];

  // Zeile 1: Deutsche Header
  var headerRow1 = headers.map(function(h) { return h[0]; });
  sheet.getRange(1, 1, 1, headers.length).setValues([headerRow1]);

  // Zeile 2: Beschreibung mit Icons
  var headerRow2 = headers.map(function(h) { return h[1]; });
  sheet.getRange(2, 1, 1, headers.length).setValues([headerRow2]);

  // Zeile 1 formatieren - Primärfarbe #3AB0FF
  var range1 = sheet.getRange(1, 1, 1, headers.length);
  range1.setBackground("#3AB0FF");
  range1.setFontColor("#FFFFFF");
  range1.setFontWeight("bold");
  range1.setFontSize(11);
  range1.setHorizontalAlignment("center");
  range1.setVerticalAlignment("middle");

  // Zeile 2 formatieren - Sekundärfarbe #1E3A8A
  var range2 = sheet.getRange(2, 1, 1, headers.length);
  range2.setBackground("#1E3A8A");
  range2.setFontColor("#FFFFFF");
  range2.setFontSize(9);
  range2.setHorizontalAlignment("center");
  range2.setVerticalAlignment("middle");

  // Erste zwei Zeilen einfrieren
  sheet.setFrozenRows(2);

  // Spaltenbreiten optimieren
  sheet.setColumnWidth(1, 160);   // Datum
  sheet.setColumnWidth(2, 140);   // Status
  sheet.setColumnWidth(3, 180);   // Name
  sheet.setColumnWidth(4, 150);   // Telefon
  sheet.setColumnWidth(5, 220);   // E-Mail
  sheet.setColumnWidth(6, 130);   // Ort
  sheet.setColumnWidth(7, 200);   // Dienstleistung
  sheet.setColumnWidth(8, 130);   // Dringlichkeit
  sheet.setColumnWidth(9, 350);   // Nachricht
  sheet.setColumnWidth(10, 80);   // Bilder
  sheet.setColumnWidth(11, 120);  // Quelle

  // Zeilenhöhe für Header
  sheet.setRowHeight(1, 35);
  sheet.setRowHeight(2, 30);
}

// =====================================================
// Status-Dropdown hinzufügen
// =====================================================
function addStatusDropdown(sheet, row) {
  var statusCell = sheet.getRange(row, 2);

  var rule = SpreadsheetApp.newDataValidation()
    .requireValueInList([
      "🆕 Neu",
      "📞 Angerufen",
      "🚗 Unterwegs",
      "🔧 Vor Ort",
      "✅ Erledigt",
      "📅 Termin",
      "⏳ Wartet",
      "❌ Storniert"
    ], true)
    .setAllowInvalid(false)
    .build();

  statusCell.setDataValidation(rule);
}

// =====================================================
// Neue Zeile hervorheben - Hellblau #E8F4FD
// =====================================================
function highlightNewRow(sheet, row) {
  var range = sheet.getRange(row, 1, 1, sheet.getLastColumn());
  range.setBackground("#E8F4FD");
  range.setVerticalAlignment("middle");
}

// =====================================================
// Dringlichkeit-Zelle formatieren
// =====================================================
function formatUrgencyCell(sheet, row) {
  var urgencyCell = sheet.getRange(row, 8);
  var urgency = urgencyCell.getValue();

  if (urgency.includes("NOTFALL")) {
    urgencyCell.setBackground("#FEE2E2");
    urgencyCell.setFontColor("#DC2626");
    urgencyCell.setFontWeight("bold");
  } else if (urgency.includes("Hoch")) {
    urgencyCell.setBackground("#FEF3C7");
    urgencyCell.setFontColor("#D97706");
    urgencyCell.setFontWeight("bold");
  } else {
    urgencyCell.setBackground("#D1FAE5");
    urgencyCell.setFontColor("#059669");
  }
}

// =====================================================
// Automatische Farbänderung bei Statusänderung
// =====================================================
function onEdit(e) {
  var sheet = e.source.getActiveSheet();
  var range = e.range;

  // Nur Status-Spalte und nach Header-Zeilen
  if (range.getColumn() !== 2 || range.getRow() <= 2) return;

  var status = range.getValue();
  var rowRange = sheet.getRange(range.getRow(), 1, 1, sheet.getLastColumn());

  // Rohrreinigung Kraft Farbschema
  switch (status) {
    case "🆕 Neu":
      rowRange.setBackground("#E8F4FD");       // Hellblau
      break;
    case "📞 Angerufen":
      rowRange.setBackground("#DBEAFE");       // Blau-Tönung
      break;
    case "🚗 Unterwegs":
      rowRange.setBackground("#FEF3C7");       // Gelb - In Arbeit
      break;
    case "🔧 Vor Ort":
      rowRange.setBackground("#FDE68A");       // Intensiveres Gelb
      break;
    case "✅ Erledigt":
      rowRange.setBackground("#D1FAE5");       // Grün - Erfolg
      break;
    case "📅 Termin":
      rowRange.setBackground("#E0E7FF");       // Indigo - Geplant
      break;
    case "⏳ Wartet":
      rowRange.setBackground("#F3F4F6");       // Grau - Wartend
      break;
    case "❌ Storniert":
      rowRange.setBackground("#FEE2E2");       // Rot - Abgebrochen
      break;
    default:
      rowRange.setBackground("#FFFFFF");
  }
}

// =====================================================
// Service mit passendem Icon versehen
// =====================================================
function getServiceIcon(service) {
  var serviceMap = {
    "Rohrreinigung":        "🔧 Rohrreinigung",
    "Kanalreinigung":       "🚰 Kanalreinigung",
    "Abflussreinigung":     "🚿 Abflussreinigung",
    "Notdienst 24/7":       "🚨 NOTDIENST 24/7",
    "Kamera-Inspektion":    "📹 Kamera-Inspektion",
    "Rohrsanierung":        "🛠️ Rohrsanierung",
    "Toilette verstopft":   "🚽 Toilette verstopft",
    "Waschbecken verstopft":"🪥 Waschbecken verstopft",
    "Dusche verstopft":     "🚿 Dusche verstopft",
    "Sonstiges":            "📝 Sonstiges"
  };
  return serviceMap[service] || "❓ " + (service || "Nicht angegeben");
}

// =====================================================
// Dringlichkeit basierend auf Service bestimmen
// =====================================================
function getUrgencyLevel(service) {
  var urgentServices = [
    "Notdienst 24/7",
    "Toilette verstopft"
  ];

  var highPriorityServices = [
    "Rohrreinigung",
    "Abflussreinigung",
    "Dusche verstopft",
    "Waschbecken verstopft"
  ];

  if (urgentServices.includes(service)) {
    return "🔴 NOTFALL";
  } else if (highPriorityServices.includes(service)) {
    return "🟡 Hoch";
  } else {
    return "🟢 Normal";
  }
}

// =====================================================
// Quelleninformation
// =====================================================
function getSourceInfo(data) {
  if (data.source) return data.source;
  if (data.referrer && data.referrer.includes("google")) return "Google Ads";
  return "Website";
}

// =====================================================
// GET-Request für Statusprüfung
// =====================================================
function doGet(e) {
  return ContentService
    .createTextOutput("✅ Rohrreinigung Kraft API läuft! 🔧\n24/7 Notdienst Nürnberg")
    .setMimeType(ContentService.MimeType.TEXT);
}

// =====================================================
// Manuelle Einrichtung (einmal ausführen)
// =====================================================
function setupSheet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.clear();
  createHeaders(sheet);

  // Sheet umbenennen
  sheet.setName("📞 Anfragen");

  // Bedingte Formatierung für Notdienst hinzufügen
  addConditionalFormatting(sheet);
}

// =====================================================
// Bedingte Formatierung für automatische Hervorhebung
// =====================================================
function addConditionalFormatting(sheet) {
  // Notfall-Hervorhebung
  var notfallRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextContains("NOTFALL")
    .setBackground("#FEE2E2")
    .setFontColor("#DC2626")
    .setBold(true)
    .setRanges([sheet.getRange("H:H")])
    .build();

  // Notdienst 24/7 Hervorhebung
  var notdienstRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextContains("NOTDIENST")
    .setBackground("#FEE2E2")
    .setFontColor("#DC2626")
    .setBold(true)
    .setRanges([sheet.getRange("G:G")])
    .build();

  var rules = sheet.getConditionalFormatRules();
  rules.push(notfallRule);
  rules.push(notdienstRule);
  sheet.setConditionalFormatRules(rules);
}

// =====================================================
// Header zurücksetzen
// =====================================================
function resetHeaders() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.clear();
  createHeaders(sheet);
  addConditionalFormatting(sheet);
}

// =====================================================
// Statistiken erstellen (optional)
// =====================================================
function createStats() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var dataSheet = ss.getSheetByName("📞 Anfragen");
  var statsSheet = ss.getSheetByName("📊 Statistiken") || ss.insertSheet("📊 Statistiken");

  statsSheet.clear();

  // Header
  statsSheet.getRange("A1").setValue("📊 Rohrreinigung Kraft - Statistiken");
  statsSheet.getRange("A1").setFontSize(16).setFontWeight("bold").setBackground("#3AB0FF").setFontColor("#FFFFFF");
  statsSheet.getRange("A1:D1").merge();

  // Datum
  statsSheet.getRange("A3").setValue("Stand: " + Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "dd.MM.yyyy HH:mm"));

  // Gesamtanzahl
  var totalRows = dataSheet.getLastRow() - 2; // Minus Header
  statsSheet.getRange("A5").setValue("Gesamt Anfragen:");
  statsSheet.getRange("B5").setValue(totalRows > 0 ? totalRows : 0);

  // Nach Status zählen
  var statusCounts = {
    "🆕 Neu": 0,
    "📞 Angerufen": 0,
    "✅ Erledigt": 0,
    "❌ Storniert": 0
  };

  if (totalRows > 0) {
    var statusColumn = dataSheet.getRange(3, 2, totalRows, 1).getValues();
    statusColumn.forEach(function(row) {
      var status = row[0];
      if (statusCounts.hasOwnProperty(status)) {
        statusCounts[status]++;
      }
    });
  }

  var row = 7;
  for (var status in statusCounts) {
    statsSheet.getRange("A" + row).setValue(status);
    statsSheet.getRange("B" + row).setValue(statusCounts[status]);
    row++;
  }

  // Formatierung
  statsSheet.setColumnWidth(1, 180);
  statsSheet.setColumnWidth(2, 80);
}

// =====================================================
// Tägliche Erinnerung für offene Anfragen (Trigger)
// =====================================================
function sendDailyReminder() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("📞 Anfragen");
  if (!sheet) return;

  var lastRow = sheet.getLastRow();
  if (lastRow <= 2) return;

  var data = sheet.getRange(3, 1, lastRow - 2, 2).getValues();
  var openCount = 0;

  data.forEach(function(row) {
    if (row[1] === "🆕 Neu" || row[1] === "📞 Angerufen") {
      openCount++;
    }
  });

  if (openCount > 0) {
    Logger.log("⚠️ " + openCount + " offene Anfragen!");
    // Hier könnte eine E-Mail-Benachrichtigung eingebaut werden
  }
}
