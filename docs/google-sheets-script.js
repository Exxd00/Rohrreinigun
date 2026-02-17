/**
 * Google Sheets Apps Script für Rohrreinigung Kraft
 * Dieses Skript empfängt Formulardaten und speichert sie in Google Sheets
 *
 * ANLEITUNG:
 * 1. Öffnen Sie Google Sheets und erstellen Sie eine neue Tabelle
 * 2. Gehen Sie zu Extensions > Apps Script
 * 3. Kopieren Sie diesen Code in den Editor
 * 4. Speichern Sie das Projekt (Strg+S oder Cmd+S)
 * 5. Klicken Sie auf "Deploy" > "New deployment"
 * 6. Wählen Sie "Web app" als Typ
 * 7. Setzen Sie "Who has access" auf "Anyone"
 * 8. Klicken Sie auf "Deploy" und kopieren Sie die URL
 * 9. Fügen Sie die URL als GOOGLE_SHEETS_WEBHOOK_URL in Vercel Environment Variables ein
 */

// Haupt-Funktion: Empfängt POST-Anfragen
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    // Wenn die Tabelle leer ist, füge Header hinzu
    if (sheet.getLastRow() === 0) {
      setupHeaders(sheet);
    }

    // Füge die neue Zeile hinzu
    var newRow = [
      formatTimestamp(data.timestamp || new Date().toISOString()),
      data.name || '',
      data.phone || '',
      data.email || '',
      data.city || '',
      data.service || '',
      data.message || '',
      'Neu' // Status
    ];

    sheet.appendRow(newRow);

    // Formatiere die neue Zeile
    var lastRow = sheet.getLastRow();
    formatRow(sheet, lastRow);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Einrichten der Header mit blauer Formatierung
function setupHeaders(sheet) {
  var headers = [
    'Datum/Uhrzeit',
    'Name',
    'Telefon',
    'E-Mail',
    'Ort',
    'Service',
    'Nachricht',
    'Status'
  ];

  sheet.appendRow(headers);

  // Header-Formatierung
  var headerRange = sheet.getRange(1, 1, 1, headers.length);

  // Rohrreinigung Kraft Blau: #3AB0FF
  headerRange.setBackground('#3AB0FF');
  headerRange.setFontColor('#FFFFFF');
  headerRange.setFontWeight('bold');
  headerRange.setHorizontalAlignment('center');
  headerRange.setVerticalAlignment('middle');

  // Spaltenbreiten anpassen
  sheet.setColumnWidth(1, 150); // Datum
  sheet.setColumnWidth(2, 150); // Name
  sheet.setColumnWidth(3, 130); // Telefon
  sheet.setColumnWidth(4, 200); // E-Mail
  sheet.setColumnWidth(5, 120); // Ort
  sheet.setColumnWidth(6, 180); // Service
  sheet.setColumnWidth(7, 300); // Nachricht
  sheet.setColumnWidth(8, 100); // Status

  // Header-Zeile fixieren
  sheet.setFrozenRows(1);
}

// Timestamp formatieren
function formatTimestamp(isoString) {
  var date = new Date(isoString);
  var options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return date.toLocaleDateString('de-DE', options);
}

// Zeile formatieren
function formatRow(sheet, rowNumber) {
  var range = sheet.getRange(rowNumber, 1, 1, 8);

  // Alternating row colors für bessere Lesbarkeit
  if (rowNumber % 2 === 0) {
    range.setBackground('#F0F9FF'); // Hellblau
  } else {
    range.setBackground('#FFFFFF'); // Weiß
  }

  range.setVerticalAlignment('middle');

  // Status-Zelle mit Dropdown
  var statusCell = sheet.getRange(rowNumber, 8);
  var rule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Neu', 'In Bearbeitung', 'Abgeschlossen', 'Storniert'])
    .build();
  statusCell.setDataValidation(rule);

  // Status-Farbe
  statusCell.setBackground('#E8F4FF');
  statusCell.setFontWeight('bold');
}

// Test-Funktion für manuelle Tests
function testPost() {
  var testData = {
    postData: {
      contents: JSON.stringify({
        timestamp: new Date().toISOString(),
        name: 'Test Kunde',
        phone: '0176 12345678',
        email: 'test@beispiel.de',
        city: 'Nürnberg',
        service: 'Rohrreinigung',
        message: 'Das ist eine Testnachricht'
      })
    }
  };

  var result = doPost(testData);
  Logger.log(result.getContent());
}

// Funktion für GET-Anfragen (optional - für Health-Check)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'OK',
      message: 'Rohrreinigung Kraft Webhook ist aktiv'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
