import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createStandalonePaymentLink, sharePaymentLink } from "@/utils/createPaymentLink";
import { Link2, Copy, Share2, ExternalLink } from "lucide-react";

const StandalonePaymentDemo = () => {
  const [formData, setFormData] = useState({
    type: 'shipping',
    country_code: 'SA',
    service_key: 'aramex',
    service_name: 'Aramex',
    cod_amount: 500
  });
  const [paymentUrl, setPaymentUrl] = useState<string>('');

  const services = [
    { key: 'aramex', name: 'Aramex', nameAr: 'أرامكس' },
    { key: 'dhl', name: 'DHL', nameAr: 'دي إتش إل' },
    { key: 'fedex', name: 'FedEx', nameAr: 'فيدإكس' },
    { key: 'smsa', name: 'SMSA', nameAr: 'سمسا' },
    { key: 'ups', name: 'UPS', nameAr: 'يو بي إس' }
  ];

  const countries = [
    { code: 'SA', name: 'Saudi Arabia', nameAr: 'المملكة العربية السعودية' },
    { code: 'AE', name: 'United Arab Emirates', nameAr: 'الإمارات العربية المتحدة' },
    { code: 'KW', name: 'Kuwait', nameAr: 'دولة الكويت' },
    { code: 'QA', name: 'Qatar', nameAr: 'دولة قطر' },
    { code: 'OM', name: 'Oman', nameAr: 'سلطنة عمان' },
    { code: 'BH', name: 'Bahrain', nameAr: 'مملكة البحرين' }
  ];

  const handleCreateLink = () => {
    const { fullPaymentUrl } = createStandalonePaymentLink(formData);
    setPaymentUrl(fullPaymentUrl);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(paymentUrl);
    alert('تم نسخ رابط الدفع إلى الحافظة');
  };

  const handleShareLink = () => {
    sharePaymentLink(paymentUrl, 'رابط الدفع');
  };

  const handleOpenLink = () => {
    window.open(paymentUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-background py-12" dir="rtl">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">إنشاء رابط دفع مستقل</h1>
          <p className="text-muted-foreground">
            قم بإنشاء روابط دفع فريدة يمكن مشاركتها واستخدامها مباشرة
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Form Card */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">بيانات رابط الدفع</h2>

            <div className="space-y-4">
              <div>
                <Label>نوع الخدمة</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => setFormData({ ...formData, type: value as 'shipping' | 'chalet' })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="shipping">شحن</SelectItem>
                    <SelectItem value="chalet">شاليه</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>الدولة</Label>
                <Select
                  value={formData.country_code}
                  onValueChange={(value) => setFormData({ ...formData, country_code: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.nameAr}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>خدمة الشحن</Label>
                <Select
                  value={formData.service_key}
                  onValueChange={(value) => {
                    const service = services.find(s => s.key === value);
                    setFormData({
                      ...formData,
                      service_key: value,
                      service_name: service?.nameAr || value
                    });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service.key} value={service.key}>
                        {service.nameAr}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>المبلغ</Label>
                <Input
                  type="number"
                  value={formData.cod_amount}
                  onChange={(e) => setFormData({ ...formData, cod_amount: parseInt(e.target.value) || 0 })}
                  placeholder="أدخل المبلغ"
                />
              </div>

              <Button onClick={handleCreateLink} className="w-full" size="lg">
                <Link2 className="w-5 h-5 ml-2" />
                إنشاء رابط الدفع
              </Button>
            </div>
          </Card>

          {/* Result Card */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">رابط الدفع</h2>

            {paymentUrl ? (
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">رابط الدفع:</p>
                  <p className="font-mono text-sm break-all">{paymentUrl}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button onClick={handleCopyLink} variant="outline">
                    <Copy className="w-4 h-4 ml-2" />
                    نسخ
                  </Button>

                  <Button onClick={handleShareLink} variant="outline">
                    <Share2 className="w-4 h-4 ml-2" />
                    مشاركة
                  </Button>

                  <Button onClick={handleOpenLink} className="col-span-2">
                    <ExternalLink className="w-4 h-4 ml-2" />
                    فتح الرابط
                  </Button>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    💡 يمكنك مشاركة هذا الرابط مع العملاء لدفع المبلغ مباشرة
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Link2 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>قم بإدخال البيانات وإنشاء رابط الدفع</p>
              </div>
            )}
          </Card>
        </div>

        {/* Information Card */}
        <Card className="p-6 mt-6">
          <h3 className="text-xl font-bold mb-4">معلومات مهمة</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">المميزات:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>✅ روابط فريدة يمكن مشاركتها</li>
                <li>✅ تعمل بشكل مستقل عن التطبيق</li>
                <li>✅ دعم جميع الدول الخليجية</li>
                <li>✅ نظام دفع متكامل</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">تنسيق الرابط:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>📌 /standalone-pay/{'{linkId}'}</li>
                <li>📌 مسار واحد للدفع</li>
                <li>📌 يمكن فتحه في أي متصفح</li>
                <li>📌 لا يحتاج تطبيق</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StandalonePaymentDemo;
