import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { savePaymentLink, type PaymentLinkData } from "@/services/paymentLinkService";
import { Link2, ExternalLink, CheckCircle } from "lucide-react";

const TestLinks = () => {
  const [createdLinks, setCreatedLinks] = useState<string[]>([]);

  const testCountries = [
    { code: 'SA', name: 'السعودية', service: 'aramex', serviceName: 'أرامكس', amount: 500 },
    { code: 'AE', name: 'الإمارات', service: 'dhl', serviceName: 'DHL', amount: 750 },
    { code: 'KW', name: 'الكويت', service: 'smsa', serviceName: 'سمسا', amount: 300 },
    { code: 'QA', name: 'قطر', service: 'fedex', serviceName: 'FedEx', amount: 600 },
    { code: 'OM', name: 'عمان', service: 'ups', serviceName: 'UPS', amount: 450 },
    { code: 'BH', name: 'البحرين', service: 'aramex', serviceName: 'أرامكس', amount: 400 }
  ];

  const generateTestLink = (country: typeof testCountries[0]) => {
    const linkId = `pl_test_${country.code.toLowerCase()}_${Date.now()}`;

    const linkData: PaymentLinkData = {
      id: linkId,
      type: 'shipping',
      country_code: country.code,
      service_key: country.service,
      service_name: country.serviceName,
      cod_amount: country.amount,
      status: 'active',
      created_at: new Date().toISOString()
    };

    // Save to localStorage
    savePaymentLink(linkId, linkData);

    // Add to created links
    setCreatedLinks(prev => [...prev, linkId]);

    console.log('Created test link:', {
      linkId,
      url: `${window.location.origin}/standalone-pay/${linkId}`,
      data: linkData
    });
  };

  const generateAllTestLinks = () => {
    testCountries.forEach(country => {
      generateTestLink(country);
    });
  };

  const openLink = (linkId: string) => {
    window.open(`/standalone-pay/${linkId}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-background py-12" dir="rtl">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">إنشاء روابط اختبار</h1>
          <p className="text-muted-foreground">
            إنشاء روابط دفع اختبار لجميع الدول
          </p>
        </div>

        <Card className="p-6 mb-6">
          <div className="flex gap-4">
            <Button onClick={generateAllTestLinks} size="lg" className="flex-1">
              <Link2 className="w-5 h-5 ml-2" />
              إنشاء جميع روابط الاختبار
            </Button>
            <Button
              onClick={() => {
                localStorage.clear();
                sessionStorage.clear();
                setCreatedLinks([]);
                alert('تم مسح جميع البيانات');
              }}
              variant="destructive"
              size="lg"
            >
              مسح جميع البيانات
            </Button>
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-4">
          {testCountries.map((country) => {
            const linkId = `pl_test_${country.code.toLowerCase()}_${Date.now()}`;
            const url = `/standalone-pay/${linkId}`;
            const exists = createdLinks.includes(linkId);

            return (
              <Card key={country.code} className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-lg">
                    {country.code === 'SA' && '🇸🇦'}
                    {country.code === 'AE' && '🇦🇪'}
                    {country.code === 'KW' && '🇰🇼'}
                    {country.code === 'QA' && '🇶🇦'}
                    {country.code === 'OM' && '🇴🇲'}
                    {country.code === 'BH' && '🇧🇭'}
                    <span className="mr-2">{country.name}</span>
                  </h3>
                  {exists && <CheckCircle className="w-5 h-5 text-green-500" />}
                </div>

                <div className="text-sm text-muted-foreground mb-3">
                  <p>الخدمة: {country.serviceName}</p>
                  <p>المبلغ: {country.amount} {country.code === 'SA' && 'ر.س'}
                    {country.code === 'AE' && 'د.إ'}
                    {country.code === 'KW' && 'د.ك'}
                    {country.code === 'QA' && 'ر.ق'}
                    {country.code === 'OM' && 'ر.ع'}
                    {country.code === 'BH' && 'د.ب'}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => generateTestLink(country)}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    إنشاء رابط
                  </Button>
                  <Button
                    onClick={() => openLink(linkId)}
                    size="sm"
                    className="flex-1"
                  >
                    <ExternalLink className="w-4 h-4 ml-1" />
                    اختبار
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {createdLinks.length > 0 && (
          <Card className="p-6 mt-6">
            <h2 className="text-xl font-bold mb-4">الروابط المُنشأة</h2>
            <div className="space-y-2">
              {createdLinks.map((linkId) => (
                <div key={linkId} className="p-3 bg-muted rounded-lg flex items-center justify-between">
                  <span className="font-mono text-sm">{linkId}</span>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => navigator.clipboard.writeText(`${window.location.origin}/standalone-pay/${linkId}`)}
                      size="sm"
                      variant="outline"
                    >
                      نسخ الرابط
                    </Button>
                    <Button
                      onClick={() => openLink(linkId)}
                      size="sm"
                    >
                      <ExternalLink className="w-4 h-4 ml-1" />
                      فتح
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        <Card className="p-6 mt-6">
          <h2 className="text-xl font-bold mb-4">معلومات مهمة</h2>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• يتم حفظ الروابط في localStorage</p>
            <p>• يمكن فتح الروابط في نافذة جديدة للاختبار</p>
            <p>• استخدم "مسح جميع البيانات" لحذف جميع الروابط</p>
            <p>• الروابط تعمل حتى بعد إعادة تحميل الصفحة</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TestLinks;
