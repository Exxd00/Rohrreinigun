// =====================================================
// ROHRREINIGUNG KRAFT - GOOGLE SHEETS FORM HANDLER
// Version 3.0 - With Call Events & Customer Rating
// =====================================================
// Farben: #3AB0FF (Primär/Blau) | #1E3A8A (Dunkel) | #F8FBFF (Hell)
// Website: rohrreinigung-kraft.de | Nürnberg & Umgebung
// =====================================================
//
// EXPECTED PAYLOAD FROM WEBSITE:
// {
//   timestamp: string (ISO),
//   name: string,
//   phone: string,
//   email: string,
//   city: string,
//   service: string,
//   message: string,
//   images: number (count),
//   source: string (Google Ads / Website / Google (Organic) / etc),
//   referrer: string,
//   gclid: string | null (Google Click ID for conversion tracking),
//   medium: string | null (cpc / organic / etc),
//   campaign: string | null,
//   landingPage: string | null,
//   currentPage: string | null,
//   eventType: string | null (form / call)
// }
// =====================================================

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    ensureHeaders(sheet);

    // Determine event type
    var eventType = data.eventType === "call" ? "📞 Anruf" : "📝 Formular";

    var row = [
      Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "dd.MM.yyyy HH:mm:ss"),
      "🆕 Neu",
      eventType,
      data.name || "",
      data.phone || "",
      data.email || "",
      data.city || "",
      getServiceIcon(data.service),
      getUrgencyLevel(data.service),
      data.message || "",
      data.images || 0,
      getSourceInfo(data),
      data.gclid || "",
      "" // Rating column - to be filled manually
    ];

    sheet.appendRow(row);
    var lastRow = sheet.getLastRow();

    addStatusDropdown(sheet, lastRow);
    addRatingDropdown(sheet, lastRow);
    highlightNewRow(sheet, lastRow, data.eventType);
    formatUrgencyCell(sheet, lastRow);
    formatSourceCell(sheet, lastRow, data);
    formatEventTypeCell(sheet, lastRow, data.eventType);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, row: lastRow }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function ensureHeaders(sheet) {
  var a1 = sheet.getRange("A1").getValue();
  var c1 = sheet.getRange("C1").getValue();

  if (a1 !== "Datum" || c1 !== "Typ") {
    sheet.clear();
    createHeaders(sheet);
  }
}

function createHeaders(sheet) {
  var headers = [
    ["Datum",           "📅 Eingangsdatum"],
    ["Status",          "📊 Bearbeitungsstatus"],
    ["Typ",             "📱 Kontaktart"],
    ["Name",            "👤 Kundenname"],
    ["Telefon",         "📱 Telefonnummer"],
    ["E-Mail",          "✉️ E-Mail-Adresse"],
    ["Ort",             "📍 Stadt/Ort"],
    ["Dienstleistung",  "🔧 Gewünschte Leistung"],
    ["Dringlichkeit",   "⚡ Priorität"],
    ["Nachricht",       "💬 Problembeschreibung"],
    ["Bilder",          "📷 Anzahl Fotos"],
    ["Quelle",          "🌐 Herkunft"],
    ["GCLID",           "📊 Google Click ID"],
    ["Bewertung",       "⭐ Kundenbewertung"]
  ];

  var headerRow1 = headers.map(function(h) { return h[0]; });
  sheet.getRange(1, 1, 1, headers.length).setValues([headerRow1]);

  var headerRow2 = headers.map(function(h) { return h[1]; });
  sheet.getRange(2, 1, 1, headers.length).setValues([headerRow2]);

  var range1 = sheet.getRange(1, 1, 1, headers.length);
  range1.setBackground("#3AB0FF");
  range1.setFontColor("#FFFFFF");
  range1.setFontWeight("bold");
  range1.setFontSize(11);
  range1.setHorizontalAlignment("center");
  range1.setVerticalAlignment("middle");

  var range2 = sheet.getRange(2, 1, 1, headers.length);
  range2.setBackground("#1E3A8A");
  range2.setFontColor("#FFFFFF");
  range2.setFontSize(9);
  range2.setHorizontalAlignment("center");
  range2.setVerticalAlignment("middle");

  sheet.setFrozenRows(2);

  // Column widths
  sheet.setColumnWidth(1, 160);  // Datum
  sheet.setColumnWidth(2, 140);  // Status
  sheet.setColumnWidth(3, 100);  // Typ
  sheet.setColumnWidth(4, 180);  // Name
  sheet.setColumnWidth(5, 150);  // Telefon
  sheet.setColumnWidth(6, 220);  // E-Mail
  sheet.setColumnWidth(7, 130);  // Ort
  sheet.setColumnWidth(8, 200);  // Dienstleistung
  sheet.setColumnWidth(9, 130);  // Dringlichkeit
  sheet.setColumnWidth(10, 350); // Nachricht
  sheet.setColumnWidth(11, 80);  // Bilder
  sheet.setColumnWidth(12, 140); // Quelle
  sheet.setColumnWidth(13, 200); // GCLID
  sheet.setColumnWidth(14, 150); // Bewertung

  sheet.setRowHeight(1, 35);
  sheet.setRowHeight(2, 30);
}

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

function addRatingDropdown(sheet, row) {
  var ratingCell = sheet.getRange(row, 14); // Column N

  var rule = SpreadsheetApp.newDataValidation()
    .requireValueInList([
      "⭐ Gut",
      "⭐⭐ Sehr Gut",
      "⭐⭐⭐ Ausgezeichnet",
      "❌ Nicht erreicht",
      "🚫 Abgelehnt"
    ], true)
    .setAllowInvalid(true)
    .build();

  ratingCell.setDataValidation(rule);
}

function highlightNewRow(sheet, row, eventType) {
  var range = sheet.getRange(row, 1, 1, sheet.getLastColumn());

  // Different colors for calls vs forms
  if (eventType === "call") {
    range.setBackground("#FEF3C7"); // Yellow for calls
  } else {
    range.setBackground("#E8F4FD"); // Blue for forms
  }

  range.setVerticalAlignment("middle");
}

function formatEventTypeCell(sheet, row, eventType) {
  var typeCell = sheet.getRange(row, 3);

  if (eventType === "call") {
    typeCell.setBackground("#FEF3C7");
    typeCell.setFontColor("#D97706");
    typeCell.setFontWeight("bold");
  } else {
    typeCell.setBackground("#DBEAFE");
    typeCell.setFontColor("#1D4ED8");
    typeCell.setFontWeight("bold");
  }
}

function formatUrgencyCell(sheet, row) {
  var urgencyCell = sheet.getRange(row, 9);
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

function formatSourceCell(sheet, row, data) {
  var sourceCell = sheet.getRange(row, 12);
  var source = sourceCell.getValue();

  // Highlight Google Ads leads
  if (data.gclid || source.includes("Google Ads")) {
    sourceCell.setBackground("#DBEAFE");
    sourceCell.setFontColor("#1D4ED8");
    sourceCell.setFontWeight("bold");
  } else if (source.includes("Organic")) {
    sourceCell.setBackground("#D1FAE5");
    sourceCell.setFontColor("#059669");
  }
}

function onEdit(e) {
  var sheet = e.source.getActiveSheet();
  var range = e.range;

  // Handle Status column changes
  if (range.getColumn() === 2 && range.getRow() > 2) {
    var status = range.getValue();
    var rowRange = sheet.getRange(range.getRow(), 1, 1, sheet.getLastColumn());

    switch (status) {
      case "🆕 Neu":
        rowRange.setBackground("#E8F4FD");
        break;
      case "📞 Angerufen":
        rowRange.setBackground("#DBEAFE");
        break;
      case "🚗 Unterwegs":
        rowRange.setBackground("#FEF3C7");
        break;
      case "🔧 Vor Ort":
        rowRange.setBackground("#FDE68A");
        break;
      case "✅ Erledigt":
        rowRange.setBackground("#D1FAE5");
        break;
      case "📅 Termin":
        rowRange.setBackground("#E0E7FF");
        break;
      case "⏳ Wartet":
        rowRange.setBackground("#F3F4F6");
        break;
      case "❌ Storniert":
        rowRange.setBackground("#FEE2E2");
        break;
      default:
        rowRange.setBackground("#FFFFFF");
    }
  }

  // Handle Rating column changes
  if (range.getColumn() === 14 && range.getRow() > 2) {
    var rating = range.getValue();
    var ratingCell = sheet.getRange(range.getRow(), 14);

    if (rating.includes("Ausgezeichnet")) {
      ratingCell.setBackground("#D1FAE5");
      ratingCell.setFontColor("#059669");
      ratingCell.setFontWeight("bold");
    } else if (rating.includes("Sehr Gut")) {
      ratingCell.setBackground("#DBEAFE");
      ratingCell.setFontColor("#1D4ED8");
    } else if (rating.includes("Gut")) {
      ratingCell.setBackground("#FEF3C7");
      ratingCell.setFontColor("#D97706");
    } else if (rating.includes("Abgelehnt") || rating.includes("Nicht erreicht")) {
      ratingCell.setBackground("#FEE2E2");
      ratingCell.setFontColor("#DC2626");
    }
  }
}

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
    "Telefonischer Kontakt":"📞 Telefonischer Kontakt",
    "Sonstiges":            "📝 Sonstiges"
  };
  return serviceMap[service] || "❓ " + (service || "Nicht angegeben");
}

function getUrgencyLevel(service) {
  var urgentServices = ["Notdienst 24/7", "Toilette verstopft", "Telefonischer Kontakt"];
  var highPriorityServices = ["Rohrreinigung", "Abflussreinigung", "Dusche verstopft", "Waschbecken verstopft"];

  if (urgentServices.includes(service)) {
    return "🔴 NOTFALL";
  } else if (highPriorityServices.includes(service)) {
    return "🟡 Hoch";
  } else {
    return "🟢 Normal";
  }
}

function getSourceInfo(data) {
  // Use the pre-formatted source from the website
  if (data.source) return data.source;

  // Fallback logic
  if (data.gclid) return "Google Ads";
  if (data.referrer && data.referrer.includes("google")) return "Google (Organic)";
  if (data.referrer && data.referrer !== "direct") return "Referral";
  return "Website (Direct)";
}

function doGet(e) {
  return ContentService
    .createTextOutput("✅ Rohrreinigung Kraft API läuft! 🔧\n24/7 Notdienst Nürnberg\nVersion 3.0 - Mit Anruf-Tracking & Bewertung")
    .setMimeType(ContentService.MimeType.TEXT);
}

function setupSheet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.clear();
  createHeaders(sheet);
  sheet.setName("📞 Anfragen");
  addConditionalFormatting(sheet);
}

function addConditionalFormatting(sheet) {
  var notfallRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextContains("NOTFALL")
    .setBackground("#FEE2E2")
    .setFontColor("#DC2626")
    .setBold(true)
    .setRanges([sheet.getRange("I:I")])
    .build();

  var notdienstRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextContains("NOTDIENST")
    .setBackground("#FEE2E2")
    .setFontColor("#DC2626")
    .setBold(true)
    .setRanges([sheet.getRange("H:H")])
    .build();

  var googleAdsRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextContains("Google Ads")
    .setBackground("#DBEAFE")
    .setFontColor("#1D4ED8")
    .setBold(true)
    .setRanges([sheet.getRange("L:L")])
    .build();

  var callRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextContains("📞 Anruf")
    .setBackground("#FEF3C7")
    .setFontColor("#D97706")
    .setBold(true)
    .setRanges([sheet.getRange("C:C")])
    .build();

  var rules = sheet.getConditionalFormatRules();
  rules.push(notfallRule);
  rules.push(notdienstRule);
  rules.push(googleAdsRule);
  rules.push(callRule);
  sheet.setConditionalFormatRules(rules);
}

function resetHeaders() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.clear();
  createHeaders(sheet);
  addConditionalFormatting(sheet);
}

// =====================================================
// GOOGLE ADS OFFLINE CONVERSION IMPORT
// =====================================================
// Um Offline-Conversions zu Google Ads zu importieren:
// 1. Exportieren Sie Leads mit GCLID
// 2. Fügen Sie Conversion-Wert und Zeit hinzu
// 3. Importieren Sie über Google Ads > Tools > Conversions > Uploads
//
// Format für Google Ads Upload:
// Google Click ID, Conversion Name, Conversion Time, Conversion Value, Conversion Currency
// Beispiel: CjwKCAjw..., Lead Form, 2024-01-15 10:30:00, 50, EUR
// =====================================================

function exportForGoogleAds() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();
  var exportData = [["Google Click ID", "Conversion Name", "Conversion Time", "Conversion Value", "Conversion Currency"]];

  // Skip header rows
  for (var i = 2; i < data.length; i++) {
    var gclid = data[i][12]; // GCLID column (M - now column 13)
    var eventType = data[i][2]; // Typ column (C)

    if (gclid && gclid !== "") {
      var timestamp = data[i][0]; // Datum column (A)
      var conversionName = eventType.includes("Anruf") ? "Phone Call" : "Lead Form Submission";
      var conversionValue = eventType.includes("Anruf") ? 25 : 50;

      exportData.push([
        gclid,
        conversionName,
        Utilities.formatDate(new Date(timestamp), Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm:ss"),
        conversionValue,
        "EUR"
      ]);
    }
  }

  // Create new sheet for export
  var exportSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Google Ads Export");
  if (!exportSheet) {
    exportSheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet("Google Ads Export");
  } else {
    exportSheet.clear();
  }

  exportSheet.getRange(1, 1, exportData.length, 5).setValues(exportData);

  return exportData.length - 1; // Return number of leads exported (minus header)
}

// =====================================================
// STATISTICS FUNCTIONS
// =====================================================

function getLeadStats() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();

  var stats = {
    total: 0,
    forms: 0,
    calls: 0,
    googleAds: 0,
    ratings: {
      excellent: 0,
      veryGood: 0,
      good: 0,
      rejected: 0,
      notReached: 0
    }
  };

  for (var i = 2; i < data.length; i++) {
    stats.total++;

    var eventType = data[i][2];
    if (eventType.includes("Anruf")) {
      stats.calls++;
    } else {
      stats.forms++;
    }

    var source = data[i][11];
    if (source.includes("Google Ads")) {
      stats.googleAds++;
    }

    var rating = data[i][13];
    if (rating.includes("Ausgezeichnet")) stats.ratings.excellent++;
    else if (rating.includes("Sehr Gut")) stats.ratings.veryGood++;
    else if (rating.includes("Gut")) stats.ratings.good++;
    else if (rating.includes("Abgelehnt")) stats.ratings.rejected++;
    else if (rating.includes("Nicht erreicht")) stats.ratings.notReached++;
  }

  return stats;
}
