/**
 * =============================================================================
 * Google Ads Script: Call Details to Google Sheets
 * =============================================================================
 *
 * هذا السكريبت يصدّر بيانات المكالمات من Google Ads إلى Google Sheets تلقائياً
 *
 * الإعداد:
 * 1. أنشئ Google Sheet جديد
 * 2. انسخ رابط الـ Sheet
 * 3. ضع الرابط في SPREADSHEET_URL أدناه
 * 4. شغّل السكريبت مرة يدوياً للتأكد
 * 5. جدوله ليعمل كل ساعة أو يومياً
 *
 * =============================================================================
 */

// ==================== الإعدادات ====================

// ضع رابط Google Sheet هنا
var SPREADSHEET_URL = 'YOUR_GOOGLE_SHEET_URL_HERE';

// اسم الورقة (Sheet) داخل الملف
var SHEET_NAME = 'Call Details';

// كم يوم للخلف نجلب البيانات؟
var DAYS_BACK = 30;

// ==================== السكريبت الرئيسي ====================

function main() {
  // فتح Google Sheet
  var spreadsheet = SpreadsheetApp.openByUrl(SPREADSHEET_URL);
  var sheet = spreadsheet.getSheetByName(SHEET_NAME);

  // إذا لم تكن الورقة موجودة، أنشئها
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    // إضافة العناوين
    addHeaders(sheet);
  }

  // جلب بيانات المكالمات
  var callData = getCallDetails();

  // إضافة البيانات الجديدة
  if (callData.length > 0) {
    appendCallData(sheet, callData);
    Logger.log('تم إضافة ' + callData.length + ' مكالمة جديدة');
  } else {
    Logger.log('لا توجد مكالمات جديدة');
  }
}

// ==================== الدوال المساعدة ====================

/**
 * إضافة عناوين الأعمدة
 */
function addHeaders(sheet) {
  var headers = [
    'التاريخ والوقت',
    'Date/Time',
    'مدة المكالمة (ثواني)',
    'Duration (sec)',
    'رقم المتصل',
    'Caller Phone',
    'كود المنطقة',
    'Area Code',
    'الحالة',
    'Status',
    'مصدر المكالمة',
    'Call Source',
    'نوع المكالمة',
    'Call Type',
    'الحملة',
    'Campaign',
    'المجموعة الإعلانية',
    'Ad Group',
    'تم التحويل؟',
    'Converted?',
    'ملاحظات',
    'Notes'
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  sheet.getRange(1, 1, 1, headers.length).setBackground('#4285f4');
  sheet.getRange(1, 1, 1, headers.length).setFontColor('#ffffff');
  sheet.setFrozenRows(1);
}

/**
 * جلب بيانات المكالمات من Google Ads
 */
function getCallDetails() {
  var calls = [];

  // حساب التاريخ
  var today = new Date();
  var startDate = new Date(today.getTime() - (DAYS_BACK * 24 * 60 * 60 * 1000));

  var dateRange = formatDate(startDate) + ',' + formatDate(today);

  // استعلام GAQL لجلب بيانات المكالمات
  var query = `
    SELECT
      call_view.call_duration_seconds,
      call_view.call_status,
      call_view.call_tracking_display_location,
      call_view.caller_area_code,
      call_view.caller_country_code,
      call_view.start_call_date_time,
      call_view.end_call_date_time,
      call_view.call_type,
      campaign.name,
      ad_group.name
    FROM call_view
    WHERE segments.date DURING LAST_30_DAYS
    ORDER BY call_view.start_call_date_time DESC
  `;

  try {
    var report = AdsApp.report(query);
    var rows = report.rows();

    while (rows.hasNext()) {
      var row = rows.next();

      calls.push({
        startTime: row['call_view.start_call_date_time'] || '',
        duration: row['call_view.call_duration_seconds'] || 0,
        callerAreaCode: row['call_view.caller_area_code'] || '',
        callerCountryCode: row['call_view.caller_country_code'] || '',
        status: row['call_view.call_status'] || '',
        callType: row['call_view.call_type'] || '',
        campaign: row['campaign.name'] || '',
        adGroup: row['ad_group.name'] || ''
      });
    }
  } catch (e) {
    Logger.log('خطأ في جلب البيانات: ' + e.message);

    // طريقة بديلة باستخدام Report القديم
    calls = getCallDetailsLegacy();
  }

  return calls;
}

/**
 * طريقة بديلة لجلب المكالمات (للحسابات القديمة)
 */
function getCallDetailsLegacy() {
  var calls = [];

  var report = AdsApp.report(
    'SELECT ' +
    'CallStartTime, ' +
    'CallEndTime, ' +
    'CallDurationSeconds, ' +
    'CallerCountryCallingCode, ' +
    'CallerNationalDesignatedCode, ' +
    'CallStatus, ' +
    'CallType, ' +
    'CampaignName, ' +
    'AdGroupName ' +
    'FROM CALL_METRICS_CALL_DETAILS_REPORT ' +
    'DURING LAST_30_DAYS'
  );

  var rows = report.rows();

  while (rows.hasNext()) {
    var row = rows.next();

    calls.push({
      startTime: row['CallStartTime'] || '',
      duration: row['CallDurationSeconds'] || 0,
      callerAreaCode: row['CallerNationalDesignatedCode'] || '',
      callerCountryCode: row['CallerCountryCallingCode'] || '',
      status: row['CallStatus'] || '',
      callType: row['CallType'] || '',
      campaign: row['CampaignName'] || '',
      adGroup: row['AdGroupName'] || ''
    });
  }

  return calls;
}

/**
 * إضافة بيانات المكالمات للـ Sheet
 */
function appendCallData(sheet, callData) {
  // جلب المكالمات الموجودة لتجنب التكرار
  var existingData = sheet.getDataRange().getValues();
  var existingCalls = {};

  for (var i = 1; i < existingData.length; i++) {
    var key = existingData[i][1] + '_' + existingData[i][3]; // DateTime + Duration
    existingCalls[key] = true;
  }

  // إضافة المكالمات الجديدة فقط
  var newRows = [];

  for (var j = 0; j < callData.length; j++) {
    var call = callData[j];
    var key = call.startTime + '_' + call.duration;

    if (!existingCalls[key]) {
      newRows.push([
        formatDateTime(call.startTime),  // التاريخ بالعربي
        call.startTime,                   // التاريخ الأصلي
        call.duration,                    // المدة بالعربي
        call.duration,                    // المدة الأصلية
        formatPhoneNumber(call.callerCountryCode, call.callerAreaCode),
        '+' + call.callerCountryCode + ' ' + call.callerAreaCode,
        call.callerAreaCode,
        call.callerAreaCode,
        translateStatus(call.status),
        call.status,
        translateCallSource(call.callType),
        call.callType,
        translateCallType(call.callType),
        call.callType,
        call.campaign,
        call.campaign,
        call.adGroup,
        call.adGroup,
        '',  // تم التحويل؟
        ''   // ملاحظات
      ]);
    }
  }

  if (newRows.length > 0) {
    var lastRow = sheet.getLastRow();
    sheet.getRange(lastRow + 1, 1, newRows.length, newRows[0].length).setValues(newRows);
  }
}

/**
 * تنسيق التاريخ
 */
function formatDate(date) {
  var year = date.getFullYear();
  var month = ('0' + (date.getMonth() + 1)).slice(-2);
  var day = ('0' + date.getDate()).slice(-2);
  return year + month + day;
}

/**
 * تنسيق التاريخ والوقت
 */
function formatDateTime(dateTimeStr) {
  if (!dateTimeStr) return '';

  try {
    var date = new Date(dateTimeStr);
    var options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Europe/Berlin'
    };
    return date.toLocaleString('de-DE', options);
  } catch (e) {
    return dateTimeStr;
  }
}

/**
 * تنسيق رقم الهاتف
 */
function formatPhoneNumber(countryCode, areaCode) {
  if (!countryCode && !areaCode) return '';
  return '+' + (countryCode || '') + ' ' + (areaCode || '') + ' ***';
}

/**
 * ترجمة حالة المكالمة
 */
function translateStatus(status) {
  var translations = {
    'RECEIVED': 'مستلمة ✅',
    'MISSED': 'فائتة ❌',
    'UNKNOWN': 'غير معروف'
  };
  return translations[status] || status;
}

/**
 * ترجمة مصدر المكالمة
 */
function translateCallSource(callType) {
  var translations = {
    'MOBILE_CALL_TRACKING': 'من الإعلان مباشرة 📱',
    'WEBSITE_CALL_TRACKING': 'من الموقع 🌐',
    'UNKNOWN': 'غير معروف'
  };
  return translations[callType] || callType;
}

/**
 * ترجمة نوع المكالمة
 */
function translateCallType(callType) {
  var translations = {
    'MOBILE_CALL_TRACKING': 'Mobile click-to-call',
    'WEBSITE_CALL_TRACKING': 'Website call',
    'UNKNOWN': 'Unknown'
  };
  return translations[callType] || callType;
}

// ==================== دوال إضافية ====================

/**
 * إرسال تنبيه بمكالمة جديدة (اختياري)
 */
function sendEmailAlert(callData) {
  var recipient = 'rohrreinigungkraft.de@gmail.com';
  var subject = '📞 مكالمة جديدة من Google Ads!';

  var body = 'تم استلام مكالمة جديدة:\n\n';
  body += 'الوقت: ' + callData.startTime + '\n';
  body += 'المدة: ' + callData.duration + ' ثانية\n';
  body += 'الحملة: ' + callData.campaign + '\n';
  body += 'الحالة: ' + callData.status + '\n';

  MailApp.sendEmail(recipient, subject, body);
}

/**
 * إنشاء ملخص يومي
 */
function createDailySummary() {
  var spreadsheet = SpreadsheetApp.openByUrl(SPREADSHEET_URL);
  var summarySheet = spreadsheet.getSheetByName('Daily Summary');

  if (!summarySheet) {
    summarySheet = spreadsheet.insertSheet('Daily Summary');
  }

  // جلب البيانات من آخر 24 ساعة
  var query = `
    SELECT
      COUNT(*) as total_calls,
      SUM(call_view.call_duration_seconds) as total_duration
    FROM call_view
    WHERE segments.date = TODAY
  `;

  // يمكنك توسيع هذا لإنشاء تقارير يومية
}


// ==================== نسخة مبسطة للاختبار ====================

/**
 * نسخة مبسطة للاختبار - تجلب آخر 7 أيام فقط
 */
function testScript() {
  Logger.log('بدء الاختبار...');

  // التحقق من الاتصال بـ Google Ads
  var account = AdsApp.currentAccount();
  Logger.log('متصل بحساب: ' + account.getName());
  Logger.log('رقم الحساب: ' + account.getCustomerId());

  // محاولة جلب المكالمات
  try {
    var calls = getCallDetails();
    Logger.log('تم العثور على ' + calls.length + ' مكالمة');

    if (calls.length > 0) {
      Logger.log('أول مكالمة:');
      Logger.log(JSON.stringify(calls[0]));
    }
  } catch (e) {
    Logger.log('خطأ: ' + e.message);
  }

  Logger.log('انتهى الاختبار');
}
