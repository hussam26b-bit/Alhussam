# أول دين — مشروع التطبيق

## هيكل المشروع
```
awwal-deen-apk/
├── alhussam_dist/            ← واجهة التطبيق (webDir)
│   ├── index.html            ← الهيكل فقط، ويستدعي الملفات بمسارات نسبية
│   ├── css/style.css         ← كل التنسيقات
│   └── js/                   ← تُحمَّل بهذا الترتيب
│       ├── logo.js           ← الشعار (ملف مولَّد، لا يُعدَّل يدويًا)
│       ├── state.js          ← البيانات والتخزين ودوال مساعدة
│       ├── ui.js             ← رسم الشاشات ومعالج النقرات
│       ├── settings.js       ← الثيم
│       ├── files.js          ← حفظ/مشاركة الملفات (أندرويد/متصفح)
│       ├── backup.js         ← تصدير واستيراد .hussam
│       ├── pdf.js            ← لافتة PDF والقائمة والكشف
│       └── main.js           ← نقطة البداية
├── assets/                   ← ملفات أيقونة التطبيق
├── capacitor.config.json     ← webDir = alhussam_dist
├── package.json
└── .github/workflows/build-apk.yml   ← بناء APK تلقائي
```

## أين أعدّل ماذا؟
| أريد تغيير | الملف |
|---|---|
| الألوان والأشكال | `css/style.css` |
| اسم المكتب الافتراضي والعنوان والهاتف | `js/state.js` (المتغير `O`) |
| اسم ملف النسخة الاحتياطية | `js/backup.js` (`BACKUP_NAME`) |
| شكل لافتة PDF | `js/pdf.js` (دالة `banner`) |
| الشعار | استبدل محتوى `js/logo.js` |
| أيقونة التطبيق | ملفات `assets/` |

## بناء APK
**عبر GitHub (الأسهل):** ارفع كل الملفات مع المجلد المخفي `.github`، ثم Actions ← Build APK ← Run workflow، ونزّل الملف من Artifacts.

**على الكمبيوتر:** Node.js 20 و Android Studio:
```
npm install
npx cap add android
npx @capacitor/assets generate --android
npx cap sync android
npx cap open android
```

## ملاحظات
- لتغيير اسم مجلد الواجهة عدّله في ثلاثة أماكن: اسم المجلد، و`webDir`، وخطوة Check web folder في `build-apk.yml`.
- النسخة الاحتياطية `Alhussam_AwwalDeen_Data.hussam`، ولا يقبل الاستيراد غيرها.
- الديون محفوظة داخل التطبيق، ومسح بيانات التطبيق يحذفها، فخذ نسخة احتياطية دوريًا.
- هذا APK تجريبي (debug). النشر في Google Play يحتاج توقيع release.
