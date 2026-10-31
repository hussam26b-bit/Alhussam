# أول دين — مشروع بناء APK

## الطريقة الأسهل: بناء APK مجانًا عبر GitHub (بدون تثبيت أي برنامج)
1. أنشئ حسابًا على github.com، ثم أنشئ مستودعًا جديدًا (New repository).
2. ارفع محتويات هذا المجلد كاملةً إلى المستودع، مع الحفاظ على المجلد المخفي `.github`.
3. افتح تبويب **Actions** ← **Build APK** ← **Run workflow**، وانتظر 5–10 دقائق.
4. افتح التشغيل المنتهي، ونزّل **awwal-deen-apk** من قسم Artifacts، وفك الضغط لتجد `app-debug.apk`.
5. انقل الملف إلى الجوال وثبّته، وفعّل «السماح بالتثبيت من مصادر غير معروفة» إن طلب الجوال ذلك.

## الطريقة الثانية: على الكمبيوتر
المتطلبات: Node.js 20 و Android Studio (مع JDK 17).
```
npm install
npx cap add android
npx @capacitor/assets generate --android
npx cap sync android
npx cap open android
```
ومن Android Studio: Build ← Build APK(s).

## ملاحظات
- أيقونة التطبيق مأخوذة من `assets/icon.png` (شعار الحسام على خلفية خضراء).
- الديون محفوظة داخل التطبيق على الجوال، ومسح بيانات التطبيق يحذفها.
- زر PDF يفتح نافذة المشاركة لحفظ الملف أو إرساله (واتساب وغيره).
- هذا APK تجريبي (debug) للتثبيت المباشر. للنشر على Google Play يلزم توقيع إصدار release.
