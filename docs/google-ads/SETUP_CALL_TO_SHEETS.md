# 📞 إعداد: تسجيل المكالمات تلقائياً في Google Sheets

## الخطوة 1: إنشاء Google Sheet

1. اذهب إلى [sheets.google.com](https://sheets.google.com)
2. أنشئ ملف جديد
3. سمّه: **"Rohrreinigung Kraft - Call Tracking"**
4. **انسخ رابط الملف** (من شريط العنوان)

---

## الخطوة 2: فتح Google Ads Scripts

1. اذهب إلى [Google Ads](https://ads.google.com)
2. في القائمة اليسرى، اضغط على:
   - **Tools & Settings** (أدوات وإعدادات)
   - **Bulk Actions** (إجراءات مجمعة)
   - **Scripts** (السكريبتات)

أو مباشرة: `ads.google.com/aw/bulkactions/scripts`

---

## الخطوة 3: إنشاء سكريبت جديد

1. اضغط على **"+"** لإنشاء سكريبت جديد
2. امسح الكود الموجود
3. الصق الكود التالي:

```javascript
/**
 * Google Ads Script: Call Details to Google Sheets
 * Rohrreinigung Kraft
 */

// ===== الإعدادات =====
var SPREADSHEET_URL = 'YOUR_GOOGLE_SHEET_URL_HERE'; // ← ضع رابط الـ Sheet هنا
var SHEET_NAME = 'Calls';

// ===== السكريبت =====
function main() {
  var ss = SpreadsheetApp.openByUrl(SPREADSHEET_URL);
  var sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow([
      'Date/Time', 'Duration (sec)', 'Caller Area', 'Status',
      'Call Type', 'Campaign', 'Ad Group', 'Converted?', 'Notes'
    ]);
    sheet.getRange(1, 1, 1, 9).setFontWeight('bold').setBackground('#4285f4').setFontColor('white');
  }

  var existingDates = getExistingDates(sheet);
  var newCalls = getNewCalls(existingDates);

  if (newCalls.length > 0) {
    for (var i = 0; i < newCalls.length; i++) {
      sheet.appendRow(newCalls[i]);
    }
    Logger.log('Added ' + newCalls.length + ' new calls');
  } else {
    Logger.log('No new calls found');
  }
}

function getExistingDates(sheet) {
  var data = sheet.getDataRange().getValues();
  var dates = {};
  for (var i = 1; i < data.length; i++) {
    dates[data[i][0]] = true;
  }
  return dates;
}

function getNewCalls(existingDates) {
  var calls = [];

  var report = AdsApp.report(
    'SELECT CallStartTime, CallDurationSeconds, CallerNationalDesignatedCode, ' +
    'CallStatus, CallType, CampaignName, AdGroupName ' +
    'FROM CALL_METRICS_CALL_DETAILS_REPORT ' +
    'DURING LAST_30_DAYS'
  );

  var rows = report.rows();
  while (rows.hasNext()) {
    var row = rows.next();
    var startTime = row['CallStartTime'];

    if (!existingDates[startTime]) {
      calls.push([
        startTime,
        row['CallDurationSeconds'],
        row['CallerNationalDesignatedCode'],
        row['CallStatus'],
        row['CallType'],
        row['CampaignName'],
        row['AdGroupName'],
        '', // Converted?
        ''  // Notes
      ]);
    }
  }

  return calls;
}
```

---

## الخطوة 4: تعديل الرابط

في السطر:
```javascript
var SPREADSHEET_URL = 'YOUR_GOOGLE_SHEET_URL_HERE';
```

استبدل `YOUR_GOOGLE_SHEET_URL_HERE` برابط الـ Google Sheet الذي أنشأته.

**مثال:**
```javascript
var SPREADSHEET_URL = 'https://docs.google.com/spreadsheets/d/1ABC123xyz/edit';
```

---

## الخطوة 5: منح الصلاحيات

1. اضغط **"Preview"** (معاينة)
2. ستظهر نافذة لمنح الصلاحيات
3. اضغط **"Authorize"** واختر حسابك
4. اضغط **"Allow"** للسماح بالوصول إلى Google Sheets

---

## الخطوة 6: اختبار السكريبت

1. اضغط **"Run"** (تشغيل)
2. انتظر حتى ينتهي
3. اذهب إلى Google Sheet وتأكد من ظهور البيانات

---

## الخطوة 7: جدولة السكريبت

1. اضغط **"Schedule"** (جدولة)
2. اختر:
   - **Frequency**: Hourly (كل ساعة) أو Daily (يومياً)
   - **Time of day**: أي وقت تريد
3. اضغط **"Save"**

---

## ✅ النتيجة النهائية

بعد الإعداد، سيحدث التالي تلقائياً:

```
📱 عميل يضغط على رقم الهاتف في الإعلان
              ↓
📞 المكالمة تُسجل في Google Ads
              ↓
⏰ السكريبت يعمل (كل ساعة/يومياً)
              ↓
📊 البيانات تُضاف إلى Google Sheet
              ↓
✅ ترى كل المكالمات في مكان واحد
```

---

## 📋 الأعمدة في الـ Sheet

| العمود | الوصف |
|--------|-------|
| Date/Time | وقت المكالمة |
| Duration (sec) | مدة المكالمة بالثواني |
| Caller Area | كود المنطقة (مثل 0176) |
| Status | Received أو Missed |
| Call Type | Mobile click-to-call |
| Campaign | اسم الحملة |
| Ad Group | اسم المجموعة الإعلانية |
| Converted? | للإدخال يدوياً ✅/❌ |
| Notes | ملاحظات إضافية |

---

## ⚠️ ملاحظات مهمة

1. **الجدولة**: اختر "Hourly" إذا تريد تحديث سريع، أو "Daily" لتوفير الموارد

2. **رقم الهاتف الكامل**: Google Ads لا يعطي رقم الهاتف الكامل للخصوصية، فقط كود المنطقة

3. **التكرار**: السكريبت يتجنب إضافة نفس المكالمة مرتين

4. **الصلاحيات**: يحتاج صلاحية الوصول للـ Sheet مرة واحدة فقط

---

## 🔧 استكشاف الأخطاء

### "No calls found"
- تأكد أن هناك مكالمات في آخر 30 يوم
- تأكد أن Call Extensions مفعّلة

### "Cannot access spreadsheet"
- تأكد من صحة الرابط
- تأكد أن الـ Sheet مشترك مع حساب Google Ads

### "Script timeout"
- قلل DURING LAST_30_DAYS إلى LAST_7_DAYS

---

## 📞 الخطوة التالية

بعد الإعداد، يمكنك:
1. إضافة عمود "Converted?" وتعبئته يدوياً
2. إنشاء Dashboard في Google Sheets
3. ربط الـ Sheet مع Google Data Studio للتقارير

هل تريد مساعدة في أي من هذه الخطوات؟
