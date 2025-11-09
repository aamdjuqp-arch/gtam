# إنشاء مستودع GitHub جديد

## الخطوة 1: إنشاء المستودع على GitHub

1. **اذهب إلى GitHub.com**
   - https://github.com/new
   - أو انقر على "+" في أعلى يمين الصفحة ← "New repository"

2. **املأ بيانات المستودع:**
   - **Repository name**: `gulf-unified-gateway` (أو أي اسم تفضله)
   - **Description**: `منصة الشحن الذكية - Gulf Unified Gateway`
   - **Visibility**: Private (أو Public حسب تفضيلك)
   - ⚠️ **لا تحدد** "Add a README file" (لدينا واحد)
   - ⚠️ **لا تحدد** "Add .gitignore" (لدينا واحد)
   - ⚠️ **لا تحدد** "Choose a license" (اختياري)

3. **انقر "Create repository"**

## الخطوة 2: الدفع إلى المستودع

بعد إنشاء المستودع، ستحصل على صفحة تحتوي على URL. انسخ الرابط واستخدمه:

```bash
# استبدل YOUR_USERNAME باسم المستخدم الخاص بك
# واستبدل REPOSITORY_NAME باسم المستودع الذي أنشأته

git remote add origin https://github.com/YOUR_USERNAME/REPOSITORY_NAME.git
git push -u origin main
```

### مثال:
```bash
git remote add origin https://github.com/ahmed123/gulf-unified-gateway.git
git push -u origin main
```

## الخطوة 3: التحقق

- اذهب إلى المستودع على GitHub
- تأكد من أن جميع الملفات موجودة
- التحقق من commit الأول

## مشكلة: GitHub يطلب كلمة مرور

إذا طلب GitHub كلمة مرور:
1. اذهب إلى GitHub → Settings → Developer settings → Personal access tokens
2. انشئ "New token (classic)"
3. اختر "repo" permissions
4. انسخ التوكن
5. استخدمه كـ password

## بديل: استخدام GitHub Desktop

1. حمل GitHub Desktop
2. "Add an Existing Repository from your Hard Drive"
3. اختر مجلد المشروع
4. "Publish repository"
5. املأ بيانات المستودع
6. انقر "Publish Repository"

---

**جاهز للمتابعة!** 🚀
