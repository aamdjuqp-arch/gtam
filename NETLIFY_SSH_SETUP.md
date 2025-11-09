# إعداد Netlify SSH Key

## طريقة إضافة مفتاح SSH إلى Netlify

### 1. إنشاء مفتاح SSH جديد (إذا لم يكن موجوداً)

```bash
# إنشاء مفتاح جديد
ssh-keygen -t rsa -b 4096 -C "netlify@yourdomain.com"
```

### 2. إضافة المفتاح إلى Netlify

1. اذهب إلى [Netlify Dashboard](https://app.netlify.com/)
2. اختر موقعك (Site)
3. اذهب إلى: **Site settings** → **SSH keys** → **Add new**
4. انسخ محتوى المفتاح العام (عادة موجود في `~/.ssh/id_rsa.pub`)
5. الصق المفتاح في Netlify
6. احفظ الإعدادات

### 3. إضافة المفتاح إلى المستودع

```bash
# نسخ المفتاح العام
cat ~/.ssh/id_rsa.pub

# ثم إضافته في GitHub
# GitHub → Settings → SSH and GPG keys → New SSH key
```

### 4. إعدادات النشر في Netlify

في إعدادات النشر (Build & deploy → Repository):
- **Repository provider**: GitHub
- **Repository**: beak.git
- **Branch**: main
- **Build command**: `npm run build`
- **Publish directory**: `dist`

### ملاحظات

- **لا تشارك أبداً المفتاح الخاص** (id_rsa بدون .pub)
- **احتفظ بنسخة من المفتاح** في مكان آمن
- **SSH Key مطلوب** للنشر التلقائي من GitHub إلى Netlify
