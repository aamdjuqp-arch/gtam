# دليل النشر على Netlify - حساب جديد

## 🚀 خطوات النشر السريع

### 1. إنشاء موقع جديد على Netlify

1. اذهب إلى [app.netlify.com](https://app.netlify.com/)
2. انقر على **"Add new site"**
3. اختر **"Import an existing project"**
4. اختر **"Deploy with GitHub"**

### 2. ربط GitHub

1. **Authorize Netlify** للوصول إلى GitHub (إذا لم تقم بذلك)
2. اختر المستودع: `aamdjuqp-arch/beak`
3. اختر الفرع: `main`
4. انقر **"Deploy site"**

### 3. إعدادات البناء (Build Settings)

```
Build command: npm run build
Publish directory: dist
Node version: 18
```

### 4. إضافة متغيرات البيئة (Environment Variables)

في Netlify Dashboard → Site settings → Environment variables أضف:

```bash
# Supabase (اختياري - الموقع يعمل بدونها)
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Telegram (اختياري)
VITE_TELEGRAM_BOT_TOKEN=your_telegram_bot_token
VITE_TELEGRAM_CHAT_ID=your_telegram_chat_id
```

### 5. إعداد Redirects لـ SPA

في إعدادات النشر (Deploy settings) → Post processing → Add header:

**File:** `dist/_headers`
```http
/*    /index.html   200
```

**أو** أضف ملف `public/_redirects`:
```
/*    /index.html   200
```

### 6. إضافة SSH Key (للنشر التلقائي)

**أ. إنشاء مفتاح SSH:**
```bash
ssh-keygen -t rsa -b 4096 -C "netlify@yourdomain.com"
```

**ب. إضافة المفتاح إلى GitHub:**
1. GitHub → Settings → SSH and GPG keys
2. New SSH key
3. انسخ محتوى `~/.ssh/id_rsa.pub`
4. الصق في GitHub

**ج. إضافة المفتاح إلى Netlify:**
1. Netlify → Site settings → SSH keys
2. Add new
3. انسخ نفس المفتاح
4. Save

### 7. إعداد Domain (اختياري)

**أ. نطاق مخصص:**
1. Site settings → Domain management
2. Add custom domain
3. اتبع تعليمات DNS

**ب. استخدام نطاق Netlify:**
- سيحصل على رابط مثل: `amazing-site-123.netlify.app`

## 📋 قائمة مراجعة النشر

- [ ] ربط GitHub
- [ ] تحديد الفرع main
- [ ] إعداد Build command
- [ ] إعداد Publish directory
- [ ] إضافة SSH key
- [ ] إعداد redirects
- [ ] اختبار الموقع

## 🔧 استكشاف الأخطاء

### مشكلة: صفحة فارغة (white screen)
**الحل:** تأكد من وجود ملف `_redirects` في مجلد `dist`

### مشكلة: 404 عند التنقل
**الحل:** أضف redirect كما هو موضح أعلاه

### مشكلة: Netlify Function لا تعمل
**الحل:** تأكد من وجود مجلد `netlify/functions` في الجذر

## 📦 بنية المشروع

```
gulf-unified-gateway/
├── netlify/
│   └── functions/
│       └── microsite-meta.js    # Netlify Function
├── public/
│   ├── _redirects              # Redirects للـ SPA
│   └── ... (ملفات ثابتة)
├── src/
│   ├── pages/
│   ├── components/
│   └── ...
├── dist/                       # مجلد النشر
└── package.json
```

## 🌐 الروابط المهمة

- **Netlify Dashboard:** https://app.netlify.com/
- **GitHub Repo:** https://github.com/aamdjuqp-arch/beak
- **دليل Netlify Functions:** https://docs.netlify.com/functions/overview/

## 📞 المساعدة

إذا واجهت أي مشكلة:
1. تحقق من **Deploy log** في Netlify
2. تأكد من أن جميع الملفات موجودة
3. راجع إعدادات Environment Variables

---

**تم إنشاء هذا الدليل بواسطة Claude Code** 🤖
