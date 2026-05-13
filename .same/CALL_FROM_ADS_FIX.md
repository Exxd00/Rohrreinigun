# 📞 إصلاح تتبع "Call from Ads"

## المشكلة

عندما يضغط شخص على رقم الهاتف **مباشرة في الإعلان** (وليس في الموقع):
- المكالمة تتم مباشرة
- لا يزور الموقع أبداً
- `gtag` لا يُنفذ
- **Conversion لا يُسجل!**

```
┌─────────────────────────────────────────┐
│  الإعلان في Google                     │
│  ┌─────────────────────────────────┐   │
│  │ 📞 0911 892 186 82              │   │ ← يضغط هنا
│  │    (Call Extension)             │   │
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
              │
              ▼
        📱 مكالمة مباشرة
              │
              ▼
        ❌ لا يُسجل في Google Ads!
```

---

## الحلول المتاحة

### الحل 1: Google Forwarding Numbers (الأفضل)

**الفكرة:** Google يعطيك رقماً خاصاً يظهر في الإعلان. عندما يتصل العميل، المكالمة تُحوّل لرقمك الحقيقي ويُسجل التحويل تلقائياً.

**المتطلبات:**
- يجب أن تكون Google Forwarding Numbers متاحة في ألمانيا
- تفعيل Call Reporting في إعدادات الحساب

**الخطوات:**
1. اذهب إلى Google Ads → الإعدادات → إعدادات الحساب
2. ابحث عن "Call reporting"
3. فعّل "Use a Google forwarding number"
4. أنشئ Call Extension جديد واختر forwarding number

### الحل 2: استيراد التحويلات عبر API (النظام الجديد)

**الفكرة:** عندما تتلقى مكالمة من عميل، تسأله "كيف وجدتنا؟" وإذا قال "من Google"، تُسجل التحويل يدوياً.

**المتطلبات:**
- Google Ads API credentials
- GCLID (إذا متاح) أو رقم هاتف المتصل

**الخطوات:**
1. اذهب إلى `/admin/google-ads`
2. أدخل بيانات API في الإعدادات
3. استخدم "استيراد مكالمة" في قسم التحويلات

**عبر API مباشرة:**
```bash
POST /api/google-ads/conversions
{
  "action": "upload-call",
  "gclid": "CjwKCAjw...",  # أو
  "callerPhoneNumber": "+491234567890",
  "conversionActionName": "call_confirmed",
  "conversionDateTime": "2026-05-09T14:30:00+02:00",
  "conversionValue": 150
}
```

### الحل 3: Call Tracking Service (الأكثر دقة)

**الفكرة:** استخدام خدمة تتبع مكالمات متخصصة تعطي أرقاماً ديناميكية.

**الخدمات:**
- CallRail
- CallTrackingMetrics
- Matelso (ألماني)

**المميزات:**
- تتبع دقيق 100%
- تسجيل المكالمات
- تحليلات متقدمة

**العيوب:**
- تكلفة إضافية (€50-200/شهر)

---

## الإعداد المثالي

### 1. أنشئ Conversion Action للمكالمات

```bash
POST /api/google-ads/conversions
{
  "action": "create-call-conversion",
  "name": "Calls from Ads",
  "defaultValue": 75
}
```

### 2. تأكد من إعدادات Call Extension

في Google Ads:
1. Tools & Settings → Conversions
2. ابحث عن "Calls from ads using call extensions"
3. تأكد من أنها ENABLED
4. تأكد من أن "Count" = "One"

### 3. فعّل Call Reporting

1. Account settings → Call reporting
2. فعّل "On"
3. اختر الـ conversion action الصحيح

---

## بيانات API المطلوبة

### من أين تحصل عليها:

| البيانات | المصدر |
|----------|--------|
| Developer Token | [Google Ads API Center](https://ads.google.com/aw/apicenter) |
| Client ID | [Google Cloud Console](https://console.cloud.google.com/apis/credentials) |
| Client Secret | نفس المكان |
| Refresh Token | OAuth Playground أو كود |
| Customer ID | Google Ads → أعلى يمين الشاشة |

### خطوات الحصول على Refresh Token:

1. اذهب إلى [OAuth Playground](https://developers.google.com/oauthplayground/)
2. اضغط على ⚙️ (الإعدادات)
3. فعّل "Use your own OAuth credentials"
4. أدخل Client ID و Client Secret
5. في الخطوة 1: أضف scope: `https://www.googleapis.com/auth/adwords`
6. اضغط "Authorize APIs"
7. سجّل دخول بحسابك
8. في الخطوة 2: اضغط "Exchange authorization code for tokens"
9. انسخ الـ Refresh Token

---

## متغيرات البيئة

أضف هذه إلى `.env.local`:

```env
GOOGLE_ADS_DEVELOPER_TOKEN=xxxxxxxxxxxx
GOOGLE_ADS_CLIENT_ID=xxxx.apps.googleusercontent.com
GOOGLE_ADS_CLIENT_SECRET=GOCSPX-xxxx
GOOGLE_ADS_REFRESH_TOKEN=1//xxxx
GOOGLE_ADS_CUSTOMER_ID=123-456-7890
```

---

## اختبار النظام

### 1. اختبار الاتصال:
```bash
GET /api/google-ads?action=test
```

### 2. عرض Conversion Actions:
```bash
GET /api/google-ads?action=conversions
```

### 3. استيراد تحويل تجريبي:
```bash
POST /api/google-ads/conversions
{
  "action": "upload-call",
  "gclid": "test-gclid",
  "conversionActionName": "call_confirmed",
  "conversionValue": 50
}
```

---

## الخلاصة

**للإصلاح السريع:**
1. احصل على API credentials
2. اذهب إلى `/admin/google-ads`
3. أدخل البيانات في الإعدادات
4. استخدم استيراد المكالمات اليدوي

**للإصلاح الدائم:**
1. فعّل Google Forwarding Numbers (إذا متاح)
2. أو استخدم خدمة Call Tracking

**للمتابعة:**
- راجع التقارير أسبوعياً
- تأكد من تسجيل جميع المكالمات
- قارن عدد المكالمات الحقيقية مع المسجلة
