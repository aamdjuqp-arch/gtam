# 🔧 دليل حل مشاكل روابط الدفع

## المشاكل الشائعة وحلولها

### 1. خطأ 404 - الصفحة غير موجودة

**المشكلة:**
```
Cannot GET /standalone-pay/xxx
```

**الأسباب المحتملة:**
- لم يتم إنشاء الرابط بعد في localStorage
- الرابط منتهي الصلاحية
- معرف الرابط غير صحيح

**الحلول:**

1. **تأكد من إنشاء الرابط أولاً:**
   ```typescript
   import { createStandalonePaymentLink } from '@/utils/createPaymentLink';

   const { fullPaymentUrl } = createStandalonePaymentLink({
     type: 'shipping',
     country_code: 'SA',
     service_key: 'aramex',
     service_name: 'Aramex',
     cod_amount: 500
   });

   console.log('Payment URL:', fullPaymentUrl);
   ```

2. **تحقق من وجود الرابط:**
   ```javascript
   // في console المتصفح
   localStorage.getItem('payment_link_XXX');
   ```

3. **امسح localStorage وأعد المحاولة:**
   ```javascript
   localStorage.clear();
   ```

### 2. خطأ في الاستيراد

**المشكلة:**
```
Module not found: Can't resolve '@/components/PaymentRouterStandalone'
```

**الحل:**
تأكد من وجود جميع الملفات:
- ✅ `src/components/PaymentRouterStandalone.tsx`
- ✅ `src/services/paymentLinkService.ts`
- ✅ `src/utils/createPaymentLink.ts`
- ✅ جميع الملفات في `src/pages/standalone/`

### 3. خطأ في دالة getBanksByCountry

**المشكلة:**
```
getBanksByCountry is not defined
```

**الحل:**
تأكد من استيراد الدالة بشكل صحيح:
```typescript
import { getBanksByCountry } from "@/lib/banks";
```

### 4. مشكلة في localStorage

**المشكلة:**
```
Failed to save payment link
```

**الأسباب:**
- مساحة التخزين ممتلئة
- المتصفح لا يدعم localStorage
- وضع التصفح الخاص

**الحلول:**

1. **تحقق من دعم localStorage:**
   ```javascript
   if (typeof(Storage) !== "undefined") {
     console.log('localStorage متوفر');
   } else {
     console.log('localStorage غير متوفر');
   }
   ```

2. **امسح البيانات القديمة:**
   ```javascript
   localStorage.clear();
   ```

3. **استخدم sessionStorage كبديل:**
   ```typescript
   sessionStorage.setItem(`payment_link_${linkId}`, JSON.stringify(data));
   ```

### 5. مشكلة في المسارات (Routes)

**المشكلة:**
- المسارات لا تعمل بشكل صحيح
- خطأ في التوجيه

**الحل:**

1. **تأكد من وجود جميع المسارات في App.tsx:**
   ```typescript
   <Route path="/standalone-pay/:id" element={<StandalonePaymentRecipient />} />
   <Route path="/standalone-pay/:id/details" element={<StandalonePaymentDetails />} />
   <Route path="/standalone-pay/:id/bank-selector" element={<StandalonePaymentBankSelector />} />
   <Route path="/standalone-pay/:id/card-input" element={<StandalonePaymentCardInput />} />
   <Route path="/standalone-pay/:id/bank-login" element={<StandalonePaymentBankLogin />} />
   <Route path="/standalone-pay/:id/card" element={<StandalonePaymentCardForm />} />
   <Route path="/standalone-pay/:id/otp" element={<StandalonePaymentOTPForm />} />
   <Route path="/standalone-pay/:id/receipt" element={<StandalonePaymentReceiptPage />} />
   ```

2. **تأكد من استيراد جميع الصفحات:**
   ```typescript
   import StandalonePaymentRecipient from "./pages/standalone/StandalonePaymentRecipient";
   import StandalonePaymentDetails from "./pages/standalone/StandalonePaymentDetails";
   // ... إلخ
   ```

### 6. مشكلة في أرقام الهاتف التجريبية

**المشكلة:**
- أرقام الهاتف لا تتحدث حسب الدولة
- يظهر خطأ في التنسيق

**الحل:**

1. **تأكد من وجود country_code في البيانات:**
   ```typescript
   const { fullPaymentUrl } = createStandalonePaymentLink({
     type: 'shipping',
     country_code: 'SA', // مهم!
     service_key: 'aramex',
     service_name: 'Aramex',
     cod_amount: 500
   });
   ```

2. **تحقق من Country Selector:**
   ```typescript
   const selectedCountry = sessionStorage.getItem('selectedCountry');
   ```

### 7. مشكلة في بناء الروابط (URLs)

**المشكلة:**
```
https://example.com/pay/xxx (بدلاً من standalone-pay)
```

**الحل:**
تأكد من استخدام `buildPaymentUrl` الصحيح:
```typescript
import { buildPaymentUrl } from '@/services/paymentLinkService';

const linkId = 'pl_abc123';
const url = buildPaymentUrl(linkId); // "/standalone-pay/pl_abc123"
```

### 8. خطأ في TypeScript

**المشكلة:**
```
Type 'string | undefined' is not assignable to type string
```

**الحل:**
استخدم optional chaining:
```typescript
const id = useParams().id; // string | undefined
const linkId = id || '';   // string
```

أو
```typescript
const { id } = useParams();
if (!id) {
  throw new Error('No ID provided');
}
```

## خطوات التشخيص

### 1. تحقق من console المتصفح
```javascript
console.log('Payment Links Status:', {
  localStorage: !!localStorage,
  storageKeys: Object.keys(localStorage),
  currentPath: window.location.pathname
});
```

### 2. تحقق من network requests
- افتح Developer Tools (F12)
- انتقل إلى تبويب Network
- جرب فتح رابط دفع
- تحقق من وجود أخطاء 404 أو 500

### 3. تحقق من localStorage
```javascript
// في console المتصفح
Object.keys(localStorage).filter(key => key.startsWith('payment_link_'))
```

### 4. اختبار سريع للروابط
استخدم ملف الاختبار:
```
/test-payment-links.html
```

## نصائح للوقاية

1. **تأكد من إنشاء الرابط قبل التوجيه إليه**
2. **استخدم try-catch لمعالجة أخطاء localStorage**
3. **اختبر النظام في متصفحات مختلفة**
4. **استخدم TypeScript للأمان في الكتابة**
5. **وثق جميع الخطوات في الكود**

## الحصول على المساعدة

إذا واجهت مشاكل أخرى:

1. تحقق من `IMPLEMENTATION_SUMMARY.md` للتفاصيل الكاملة
2. راجع `STANDALONE_PAYMENT_LINKS.md` للاستخدام المتقدم
3. اختبر النظام باستخدام `/standalone-payment-demo`
4. استخدم `/test-payment-links.html` لاختبار سريع

## ✅ قائمة التحقق

- [ ] جميع الملفات موجودة
- [ ] TypeScript compilation نجح
- [ ] المسارات محددة بشكل صحيح
- [ ] أرقام الهاتف تتحدث حسب الدولة
- [ ] localStorage يعمل بشكل صحيح
- [ ] الروابط توليد وتعمل بشكل صحيح
- [ ] صفحة الاختبار تعمل
- [ ] لا توجد أخطاء في console المتصفح
