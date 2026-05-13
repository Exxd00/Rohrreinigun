// =====================================================
// ROHRREINIGUNG KRAFT - GOOGLE SHEETS COMPLETE HANDLER
// Version 4.0 - With Google Ads Call Sync
// =====================================================
// Farben: #3AB0FF (Primär/Blau) | #1E3A8A (Dunkel) | #F8FBFF (Hell)
// Website: rohrreinigung-kraft.de | Nürnberg & Umgebung
// =====================================================
//
// هذا السكريبت يجمع 3 أنواع من الأحداث:
// 1. 📝 Formular - نماذج من الموقع
// 2. 📞 Anruf (Website) - مكالمات من الموقع
// 3. 📱 Anruf (Google Ads) - مكالمات مباشرة من الإعلان
//
// =====================================================

// ==================== الإعدادات ====================

// رابط الـ Google Ads Script (اختياري - للمزامنة التلقائية)
var GOOGLE_ADS_SYNC_ENABLED = true;

// =====================================================
// دالة استقبال البيانات من الموقع
// =====================================================

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    ensureHeaders(sheet);

    // تحديد نوع الحدث
    var eventType = data.eventType === "call" ? "📞 Anruf (Website)" : "📝 Formular";

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
      "",  // Anrufdauer - فارغ للفورم
      "",  // Anrufstatus - فارغ للفورم
      getSourceInfo(data),
      data.campaign || "",
      data.gclid || "",
      ""   // Bewertung - للإدخال يدوياً
    ];

    sheet.appendRow(row);
    var lastRow = sheet.getLastRow();

    addStatusDropdown(sheet, lastRow);
    addRatingDropdown(sheet, lastRow);
    highlightNewRow(sheet, lastRow, data.eventType);
    formatCells(sheet, lastRow, data);

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
// مزامنة المكالمات من Google Ads
// =====================================================

/**
 * هذه الدالة تُستدعى من Google Ads Script
 * أو يمكن تشغيلها يدوياً لاستيراد المكالمات
 */
function syncGoogleAdsCalls(callsData) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  ensureHeaders(sheet);

  var existingCalls = getExistingCallIds(sheet);
  var newCallsCount = 0;

  for (var i = 0; i < callsData.length; i++) {
    var call = callsData[i];
    var callId = call.startTime + "_" + call.duration;

    if (!existingCalls[callId]) {
      var row = [
        formatGoogleAdsDateTime(call.startTime),
        "🆕 Neu",
        "📱 Anruf (Google Ads)",
        "",  // Name - غير متاح
        formatPhoneFromAds(call.callerCountryCode, call.callerAreaCode),
        "",  // Email - غير متاح
        "",  // Ort - غير متاح
        "📞 Telefonischer Kontakt",
        "🟡 Hoch",
        "Direkter Anruf aus Google Ads Anzeige",
        0,   // Bilder
        formatDuration(call.duration),
        translateCallStatus(call.status),
        "🔵 Google Ads (Call)",
        call.campaign || "",
        call.gclid || "",
        ""   // Bewertung
      ];

      sheet.appendRow(row);
      var lastRow = sheet.getLastRow();

      addStatusDropdown(sheet, lastRow);
      addRatingDropdown(sheet, lastRow);
      highlightGoogleAdsCall(sheet, lastRow);
      formatGoogleAdsCallCells(sheet, lastRow, call);

      newCallsCount++;
    }
  }

  return newCallsCount;
}

/**
 * دالة لاستيراد المكالمات يدوياً من CSV
 */
function importCallsFromCSV() {
  var ui = SpreadsheetApp.getUi();
  var response = ui.prompt(
    '📱 Import Google Ads Calls',
    'Paste the call data (one call per line, format: DateTime,Duration,AreaCode,Status,Campaign):',
    ui.ButtonSet.OK_CANCEL
  );

  if (response.getSelectedButton() == ui.Button.OK) {
    var lines = response.getResponseText().split('\n');
    var calls = [];

    for (var i = 0; i < lines.length; i++) {
      var parts = lines[i].split(',');
      if (parts.length >= 4) {
        calls.push({
          startTime: parts[0].trim(),
          duration: parseInt(parts[1].trim()) || 0,
          callerAreaCode: parts[2].trim(),
          status: parts[3].trim(),
          campaign: parts[4] ? parts[4].trim() : '',
          callerCountryCode: '49'
        });
      }
    }

    var count = syncGoogleAdsCalls(calls);
    ui.alert('✅ Fertig!', count + ' neue Anrufe wurden importiert.', ui.ButtonSet.OK);
  }
}

/**
 * الحصول على IDs المكالمات الموجودة
 */
function getExistingCallIds(sheet) {
  var data = sheet.getDataRange().getValues();
  var ids = {};

  for (var i = 2; i < data.length; i++) {
    var dateTime = data[i][0];
    var duration = data[i][11];
    if (dateTime && data[i][2].includes("Google Ads")) {
      ids[dateTime + "_" + duration] = true;
    }
  }

  return ids;
}

// =====================================================
// إنشاء الهيكل والعناوين
// =====================================================

function ensureHeaders(sheet) {
  var a1 = sheet.getRange("A1").getValue();
  var currentCols = sheet.getLastColumn();

  // تحقق من أن العناوين محدثة
  if (a1 !== "Datum" || currentCols < 17) {
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
    ["Anrufdauer",      "⏱️ Dauer (Sekunden)"],
    ["Anrufstatus",     "📶 Verbindungsstatus"],
    ["Quelle",          "🌐 Herkunft"],
    ["Kampagne",        "📢 Google Ads Kampagne"],
    ["GCLID",           "📊 Google Click ID"],
    ["Bewertung",       "⭐ Kundenbewertung"]
  ];

  var headerRow1 = headers.map(function(h) { return h[0]; });
  sheet.getRange(1, 1, 1, headers.length).setValues([headerRow1]);

  var headerRow2 = headers.map(function(h) { return h[1]; });
  sheet.getRange(2, 1, 1, headers.length).setValues([headerRow2]);

  // تنسيق الصف الأول
  var range1 = sheet.getRange(1, 1, 1, headers.length);
  range1.setBackground("#3AB0FF");
  range1.setFontColor("#FFFFFF");
  range1.setFontWeight("bold");
  range1.setFontSize(11);
  range1.setHorizontalAlignment("center");
  range1.setVerticalAlignment("middle");

  // تنسيق الصف الثاني
  var range2 = sheet.getRange(2, 1, 1, headers.length);
  range2.setBackground("#1E3A8A");
  range2.setFontColor("#FFFFFF");
  range2.setFontSize(9);
  range2.setHorizontalAlignment("center");
  range2.setVerticalAlignment("middle");

  sheet.setFrozenRows(2);

  // عرض الأعمدة
  sheet.setColumnWidth(1, 160);  // Datum
  sheet.setColumnWidth(2, 140);  // Status
  sheet.setColumnWidth(3, 160);  // Typ
  sheet.setColumnWidth(4, 160);  // Name
  sheet.setColumnWidth(5, 150);  // Telefon
  sheet.setColumnWidth(6, 200);  // E-Mail
  sheet.setColumnWidth(7, 120);  // Ort
  sheet.setColumnWidth(8, 180);  // Dienstleistung
  sheet.setColumnWidth(9, 120);  // Dringlichkeit
  sheet.setColumnWidth(10, 300); // Nachricht
  sheet.setColumnWidth(11, 80);  // Bilder
  sheet.setColumnWidth(12, 120); // Anrufdauer
  sheet.setColumnWidth(13, 130); // Anrufstatus
  sheet.setColumnWidth(14, 160); // Quelle
  sheet.setColumnWidth(15, 200); // Kampagne
  sheet.setColumnWidth(16, 180); // GCLID
  sheet.setColumnWidth(17, 150); // Bewertung

  sheet.setRowHeight(1, 35);
  sheet.setRowHeight(2, 30);
}

// =====================================================
// القوائم المنسدلة
// =====================================================

function addStatusDropdown(sheet, row) {
  var statusCell = sheet.getRange(row, 2);

  var rule = SpreadsheetApp.newDataValidation()
    .requireValueInList([
      "🆕 Neu",
      "📞 Angerufen",
      "📞 Rückruf nötig",
      "🚗 Unterwegs",
      "🔧 Vor Ort",
      "✅ Erledigt",
      "💰 Bezahlt",
      "📅 Termin vereinbart",
      "⏳ Wartet auf Rückmeldung",
      "❌ Storniert",
      "🚫 Nicht erreicht"
    ], true)
    .setAllowInvalid(false)
    .build();

  statusCell.setDataValidation(rule);
}

function addRatingDropdown(sheet, row) {
  var ratingCell = sheet.getRange(row, 17);

  var rule = SpreadsheetApp.newDataValidation()
    .requireValueInList([
      "⭐⭐⭐ Ausgezeichnet",
      "⭐⭐ Sehr Gut",
      "⭐ Gut",
      "➖ Neutral",
      "👎 Nicht zufrieden",
      "❌ Nicht erreicht",
      "🚫 Abgelehnt",
      "📵 Falsche Nummer"
    ], true)
    .setAllowInvalid(true)
    .build();

  ratingCell.setDataValidation(rule);
}

// =====================================================
// التنسيق
// =====================================================

function highlightNewRow(sheet, row, eventType) {
  var range = sheet.getRange(row, 1, 1, sheet.getLastColumn());

  if (eventType === "call") {
    range.setBackground("#FEF3C7");
  } else {
    range.setBackground("#E8F4FD");
  }

  range.setVerticalAlignment("middle");
}

function highlightGoogleAdsCall(sheet, row) {
  var range = sheet.getRange(row, 1, 1, sheet.getLastColumn());
  range.setBackground("#EDE9FE"); // Purple tint for Google Ads calls
  range.setVerticalAlignment("middle");
}

function formatCells(sheet, row, data) {
  formatEventTypeCell(sheet, row, data.eventType);
  formatUrgencyCell(sheet, row);
  formatSourceCell(sheet, row, data);
}

function formatGoogleAdsCallCells(sheet, row, call) {
  // تنسيق نوع الحدث
  var typeCell = sheet.getRange(row, 3);
  typeCell.setBackground("#EDE9FE");
  typeCell.setFontColor("#7C3AED");
  typeCell.setFontWeight("bold");

  // تنسيق المصدر
  var sourceCell = sheet.getRange(row, 14);
  sourceCell.setBackground("#DBEAFE");
  sourceCell.setFontColor("#1D4ED8");
  sourceCell.setFontWeight("bold");

  // تنسيق حالة الاتصال
  var statusCell = sheet.getRange(row, 13);
  if (call.status === "RECEIVED" || call.status === "Received") {
    statusCell.setBackground("#D1FAE5");
    statusCell.setFontColor("#059669");
  } else {
    statusCell.setBackground("#FEE2E2");
    statusCell.setFontColor("#DC2626");
  }

  // تنسيق مدة المكالمة
  var durationCell = sheet.getRange(row, 12);
  var duration = parseInt(call.duration) || 0;
  if (duration >= 60) {
    durationCell.setBackground("#D1FAE5"); // أخضر - مكالمة طويلة جيدة
    durationCell.setFontWeight("bold");
  } else if (duration >= 30) {
    durationCell.setBackground("#FEF3C7"); // أصفر - متوسطة
  } else if (duration > 0) {
    durationCell.setBackground("#FEE2E2"); // أحمر - قصيرة جداً
  }
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
  var sourceCell = sheet.getRange(row, 14);
  var source = sourceCell.getValue();

  if (data.gclid || source.includes("Google Ads")) {
    sourceCell.setBackground("#DBEAFE");
    sourceCell.setFontColor("#1D4ED8");
    sourceCell.setFontWeight("bold");
  } else if (source.includes("Organic")) {
    sourceCell.setBackground("#D1FAE5");
    sourceCell.setFontColor("#059669");
  }
}

// =====================================================
// تغييرات تفاعلية عند التعديل
// =====================================================

function onEdit(e) {
  var sheet = e.source.getActiveSheet();
  var range = e.range;
  var row = range.getRow();
  var col = range.getColumn();

  if (row <= 2) return; // تجاهل صفوف العناوين

  // تغيير لون الصف حسب الحالة
  if (col === 2) {
    handleStatusChange(sheet, row, range.getValue());
  }

  // تغيير لون خلية التقييم
  if (col === 17) {
    handleRatingChange(sheet, row, range.getValue());
  }
}

function handleStatusChange(sheet, row, status) {
  var rowRange = sheet.getRange(row, 1, 1, sheet.getLastColumn());

  var statusColors = {
    "🆕 Neu":                    "#E8F4FD",
    "📞 Angerufen":              "#DBEAFE",
    "📞 Rückruf nötig":          "#FEF3C7",
    "🚗 Unterwegs":              "#FDE68A",
    "🔧 Vor Ort":                "#FCD34D",
    "✅ Erledigt":               "#D1FAE5",
    "💰 Bezahlt":                "#A7F3D0",
    "📅 Termin vereinbart":      "#E0E7FF",
    "⏳ Wartet auf Rückmeldung": "#F3F4F6",
    "❌ Storniert":              "#FEE2E2",
    "🚫 Nicht erreicht":         "#FECACA"
  };

  rowRange.setBackground(statusColors[status] || "#FFFFFF");
}

function handleRatingChange(sheet, row, rating) {
  var ratingCell = sheet.getRange(row, 17);

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
  } else if (rating.includes("Neutral")) {
    ratingCell.setBackground("#F3F4F6");
    ratingCell.setFontColor("#6B7280");
  } else if (rating.includes("Abgelehnt") || rating.includes("Nicht") || rating.includes("Falsche")) {
    ratingCell.setBackground("#FEE2E2");
    ratingCell.setFontColor("#DC2626");
  }
}

// =====================================================
// الدوال المساعدة
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
  if (data.source) return data.source;
  if (data.gclid) return "🔵 Google Ads";
  if (data.referrer && data.referrer.includes("google")) return "🟢 Google (Organic)";
  if (data.referrer && data.referrer !== "direct") return "🔗 Referral";
  return "🌐 Website (Direct)";
}

function formatGoogleAdsDateTime(dateTimeStr) {
  if (!dateTimeStr) return "";

  try {
    var date = new Date(dateTimeStr);
    return Utilities.formatDate(date, Session.getScriptTimeZone(), "dd.MM.yyyy HH:mm:ss");
  } catch (e) {
    return dateTimeStr;
  }
}

function formatPhoneFromAds(countryCode, areaCode) {
  if (!countryCode && !areaCode) return "";
  return "+49 " + (areaCode || "???") + " ****";
}

function formatDuration(seconds) {
  if (!seconds || seconds === 0) return "0 Sek";

  var mins = Math.floor(seconds / 60);
  var secs = seconds % 60;

  if (mins > 0) {
    return mins + " Min " + secs + " Sek";
  }
  return secs + " Sek";
}

function translateCallStatus(status) {
  var statusMap = {
    "RECEIVED": "✅ Angenommen",
    "Received": "✅ Angenommen",
    "MISSED": "❌ Verpasst",
    "Missed": "❌ Verpasst",
    "UNKNOWN": "❓ Unbekannt"
  };
  return statusMap[status] || status;
}

// =====================================================
// API Endpoint
// =====================================================

function doGet(e) {
  return ContentService
    .createTextOutput("✅ Rohrreinigung Kraft API v4.0 läuft!\n🔧 24/7 Notdienst Nürnberg\n📱 Mit Google Ads Call Sync")
    .setMimeType(ContentService.MimeType.TEXT);
}

// =====================================================
// إعداد الـ Sheet
// =====================================================

function setupSheet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.clear();
  createHeaders(sheet);
  sheet.setName("📞 Alle Anfragen");
  addConditionalFormatting(sheet);

  SpreadsheetApp.getUi().alert('✅ Setup abgeschlossen!', 'Die Tabelle wurde erfolgreich eingerichtet.', SpreadsheetApp.getUi().ButtonSet.OK);
}

function addConditionalFormatting(sheet) {
  var rules = [];

  // قاعدة NOTFALL
  rules.push(SpreadsheetApp.newConditionalFormatRule()
    .whenTextContains("NOTFALL")
    .setBackground("#FEE2E2")
    .setFontColor("#DC2626")
    .setBold(true)
    .setRanges([sheet.getRange("I:I")])
    .build());

  // قاعدة NOTDIENST
  rules.push(SpreadsheetApp.newConditionalFormatRule()
    .whenTextContains("NOTDIENST")
    .setBackground("#FEE2E2")
    .setFontColor("#DC2626")
    .setBold(true)
    .setRanges([sheet.getRange("H:H")])
    .build());

  // قاعدة Google Ads
  rules.push(SpreadsheetApp.newConditionalFormatRule()
    .whenTextContains("Google Ads")
    .setBackground("#DBEAFE")
    .setFontColor("#1D4ED8")
    .setBold(true)
    .setRanges([sheet.getRange("N:N")])
    .build());

  // قاعدة مكالمات Google Ads
  rules.push(SpreadsheetApp.newConditionalFormatRule()
    .whenTextContains("📱 Anruf (Google Ads)")
    .setBackground("#EDE9FE")
    .setFontColor("#7C3AED")
    .setBold(true)
    .setRanges([sheet.getRange("C:C")])
    .build());

  // قاعدة مكالمات Website
  rules.push(SpreadsheetApp.newConditionalFormatRule()
    .whenTextContains("📞 Anruf (Website)")
    .setBackground("#FEF3C7")
    .setFontColor("#D97706")
    .setBold(true)
    .setRanges([sheet.getRange("C:C")])
    .build());

  // قاعدة Formular
  rules.push(SpreadsheetApp.newConditionalFormatRule()
    .whenTextContains("📝 Formular")
    .setBackground("#DBEAFE")
    .setFontColor("#1D4ED8")
    .setBold(true)
    .setRanges([sheet.getRange("C:C")])
    .build());

  // قاعدة المكالمات المستلمة
  rules.push(SpreadsheetApp.newConditionalFormatRule()
    .whenTextContains("✅ Angenommen")
    .setBackground("#D1FAE5")
    .setFontColor("#059669")
    .setRanges([sheet.getRange("M:M")])
    .build());

  // قاعدة المكالمات الفائتة
  rules.push(SpreadsheetApp.newConditionalFormatRule()
    .whenTextContains("❌ Verpasst")
    .setBackground("#FEE2E2")
    .setFontColor("#DC2626")
    .setRanges([sheet.getRange("M:M")])
    .build());

  sheet.setConditionalFormatRules(rules);
}

// =====================================================
// تصدير البيانات
// =====================================================

function exportForGoogleAds() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();
  var exportData = [["Google Click ID", "Conversion Name", "Conversion Time", "Conversion Value", "Conversion Currency"]];

  for (var i = 2; i < data.length; i++) {
    var gclid = data[i][15]; // GCLID column
    var eventType = data[i][2]; // Typ column
    var status = data[i][1]; // Status column

    // فقط تصدير المكتملة
    if (gclid && gclid !== "" && status.includes("Erledigt")) {
      var timestamp = data[i][0];
      var conversionName = "Lead";
      var conversionValue = 50;

      if (eventType.includes("Google Ads")) {
        conversionName = "Phone Call (Google Ads)";
        conversionValue = 30;
      } else if (eventType.includes("Anruf")) {
        conversionName = "Phone Call (Website)";
        conversionValue = 25;
      } else {
        conversionName = "Lead Form";
        conversionValue = 50;
      }

      exportData.push([
        gclid,
        conversionName,
        Utilities.formatDate(new Date(timestamp), Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm:ss"),
        conversionValue,
        "EUR"
      ]);
    }
  }

  var exportSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Google Ads Export");
  if (!exportSheet) {
    exportSheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet("Google Ads Export");
  } else {
    exportSheet.clear();
  }

  exportSheet.getRange(1, 1, exportData.length, 5).setValues(exportData);

  // تنسيق
  exportSheet.getRange(1, 1, 1, 5).setFontWeight("bold").setBackground("#4285f4").setFontColor("white");

  SpreadsheetApp.getUi().alert('✅ Export abgeschlossen!', (exportData.length - 1) + ' Conversions wurden exportiert.', SpreadsheetApp.getUi().ButtonSet.OK);

  return exportData.length - 1;
}

// =====================================================
// إحصائيات
// =====================================================

function showStats() {
  var stats = getLeadStats();
  var ui = SpreadsheetApp.getUi();

  var message = "📊 STATISTIKEN\n\n";
  message += "━━━━━━━━━━━━━━━━━━━━━━━━━\n";
  message += "📈 Gesamt: " + stats.total + " Anfragen\n\n";
  message += "📝 Formulare: " + stats.forms + "\n";
  message += "📞 Anrufe (Website): " + stats.websiteCalls + "\n";
  message += "📱 Anrufe (Google Ads): " + stats.googleAdsCalls + "\n\n";
  message += "━━━━━━━━━━━━━━━━━━━━━━━━━\n";
  message += "🔵 Von Google Ads: " + stats.googleAds + "\n";
  message += "🟢 Organic: " + stats.organic + "\n";
  message += "🌐 Direkt: " + stats.direct + "\n\n";
  message += "━━━━━━━━━━━━━━━━━━━━━━━━━\n";
  message += "✅ Erledigt: " + stats.completed + "\n";
  message += "🆕 Neu: " + stats.new + "\n";
  message += "⏳ In Bearbeitung: " + stats.inProgress + "\n";

  ui.alert('📊 Statistiken', message, ui.ButtonSet.OK);
}

function getLeadStats() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();

  var stats = {
    total: 0,
    forms: 0,
    websiteCalls: 0,
    googleAdsCalls: 0,
    googleAds: 0,
    organic: 0,
    direct: 0,
    completed: 0,
    new: 0,
    inProgress: 0
  };

  for (var i = 2; i < data.length; i++) {
    stats.total++;

    var eventType = data[i][2] || "";
    var source = data[i][13] || "";
    var status = data[i][1] || "";

    // نوع الحدث
    if (eventType.includes("Google Ads")) {
      stats.googleAdsCalls++;
    } else if (eventType.includes("Anruf")) {
      stats.websiteCalls++;
    } else {
      stats.forms++;
    }

    // المصدر
    if (source.includes("Google Ads")) {
      stats.googleAds++;
    } else if (source.includes("Organic")) {
      stats.organic++;
    } else {
      stats.direct++;
    }

    // الحالة
    if (status.includes("Erledigt") || status.includes("Bezahlt")) {
      stats.completed++;
    } else if (status.includes("Neu")) {
      stats.new++;
    } else {
      stats.inProgress++;
    }
  }

  return stats;
}

// =====================================================
// القائمة المخصصة
// =====================================================

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('🔧 Rohrreinigung Kraft')
    .addItem('📊 Statistiken anzeigen', 'showStats')
    .addItem('📱 Google Ads Anrufe importieren', 'importCallsFromCSV')
    .addSeparator()
    .addItem('📤 Für Google Ads exportieren', 'exportForGoogleAds')
    .addSeparator()
    .addItem('🔄 Header aktualisieren', 'setupSheet')
    .addToUi();
}

// =====================================================
// دالة اختبار
// =====================================================

function testAddCall() {
  var testCalls = [
    {
      startTime: new Date().toISOString(),
      duration: 180,
      callerAreaCode: "0176",
      callerCountryCode: "49",
      status: "RECEIVED",
      campaign: "Rohrreinigung Kraft | Nuernberg | Final Attack v5",
      gclid: "test_gclid_12345"
    }
  ];

  var count = syncGoogleAdsCalls(testCalls);
  Logger.log("Added " + count + " test calls");
}
