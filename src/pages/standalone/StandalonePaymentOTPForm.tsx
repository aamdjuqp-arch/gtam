import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getServiceBranding } from "@/lib/serviceLogos";
import PaymentRouterStandalone from "@/components/PaymentRouterStandalone";
import { Shield, ArrowLeft, AlertCircle } from "lucide-react";

const StandalonePaymentOTPForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [attempts, setAttempts] = useState(0);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(60);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const DEMO_OTP = "123456";

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    if (numericValue.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = numericValue;
      setOtp(newOtp);
      setError("");

      if (numericValue && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 6);
    if (pastedData) {
      const newOtp = [...otp];
      for (let i = 0; i < pastedData.length && i < 6; i++) {
        newOtp[i] = pastedData[i];
      }
      setOtp(newOtp);
      const nextEmptyIndex = newOtp.findIndex(val => !val);
      if (nextEmptyIndex !== -1) {
        inputRefs.current[nextEmptyIndex]?.focus();
      } else {
        inputRefs.current[5]?.focus();
      }
    }
  };

  const handleClearAll = () => {
    setOtp(["", "", "", "", "", ""]);
    setError("");
    inputRefs.current[0]?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const otpString = otp.join('');

    if (otpString.length !== 6) {
      setError("الرجاء إدخال رمز التحقق كاملاً");
      return;
    }

    if (otpString === DEMO_OTP) {
      navigate(`/standalone-pay/${id}/receipt`);
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      if (newAttempts >= 3) {
        setError("تم حظر عملية الدفع مؤقتاً لأسباب أمنية.");
      } else {
        setError(`رمز التحقق غير صحيح. حاول مرة أخرى. (${3 - newAttempts} محاولات متبقية)`);
        handleClearAll();
      }
    }
  };

  const isOtpComplete = otp.every(digit => digit !== "");

  return (
    <PaymentRouterStandalone>
      {(linkData) => {
        const serviceKey = linkData.service_key;
        const serviceName = linkData.service_name;
        const branding = getServiceBranding(serviceKey);
        const amount = linkData.cod_amount;
        const formattedAmount = `${amount} ر.س`;

        return (
          <div className="min-h-screen bg-background" dir="rtl">
            <div className="container mx-auto px-3 sm:px-4 py-8">
              <div className="max-w-2xl mx-auto">
                <Card className="p-4 sm:p-8 shadow-2xl border-t-4" style={{ borderTopColor: branding.colors.primary }}>
                  <div className="text-center mb-6 sm:mb-8">
                    <div
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse shadow-lg"
                      style={{
                        background: `linear-gradient(135deg, ${branding.colors.primary}, ${branding.colors.secondary})`
                      }}
                    >
                      <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold mb-2">رمز التحقق</h1>
                    <p className="text-sm sm:text-base text-muted-foreground">أدخل الرمز المرسل إلى هاتفك</p>
                  </div>

                  <div
                    className="rounded-lg p-3 sm:p-4 mb-6"
                    style={{
                      background: `${branding.colors.primary}10`,
                      border: `1px solid ${branding.colors.primary}30`
                    }}
                  >
                    <p className="text-xs sm:text-sm text-center">
                      تم إرسال رمز التحقق المكون من 6 أرقام إلى هاتفك المسجل في البنك
                    </p>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                      <div className="flex gap-2 sm:gap-3 justify-center items-center mb-4" dir="ltr">
                        {otp.map((digit, index) => (
                          <Input
                            key={index}
                            ref={(el) => (inputRefs.current[index] = el)}
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            onPaste={handlePaste}
                            className="w-12 h-14 sm:w-16 sm:h-20 text-center text-xl sm:text-3xl font-bold border-2 rounded-xl transition-all"
                            style={{
                              borderColor: digit ? branding.colors.primary : undefined,
                              backgroundColor: digit ? `${branding.colors.primary}08` : undefined
                            }}
                            disabled={attempts >= 3}
                            autoComplete="off"
                          />
                        ))}
                      </div>
                    </div>

                    {error && (
                      <div
                        className="rounded-lg p-3 sm:p-4 mb-6 flex items-start gap-2 bg-destructive/10 border border-destructive/30"
                      >
                        <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0 text-destructive" />
                        <p className="text-xs sm:text-sm text-destructive">{error}</p>
                      </div>
                    )}

                    {countdown > 0 && (
                      <div className="text-center mb-6">
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          إعادة إرسال الرمز بعد <strong>{countdown}</strong> ثانية
                        </p>
                      </div>
                    )}

                    {attempts > 0 && attempts < 3 && (
                      <div className="text-center mb-6">
                        <p className="text-xs sm:text-sm text-yellow-600">
                          المحاولات المتبقية: <strong>{3 - attempts}</strong>
                        </p>
                      </div>
                    )}

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full text-sm sm:text-lg py-5 sm:py-7 text-white"
                      disabled={attempts >= 3 || !isOtpComplete}
                      style={{
                        background: attempts >= 3
                          ? '#666'
                          : `linear-gradient(135deg, ${branding.colors.primary}, ${branding.colors.secondary})`
                      }}
                    >
                      {attempts >= 3 ? (
                        <span>محظور مؤقتاً</span>
                      ) : (
                        <>
                          <span className="ml-2">تأكيد الدفع</span>
                          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                        </>
                      )}
                    </Button>

                    {countdown === 0 && (
                      <Button
                        type="button"
                        variant="ghost"
                        className="w-full mt-3"
                        style={{ color: branding.colors.primary }}
                        onClick={() => {
                          setCountdown(60);
                        }}
                      >
                        إعادة إرسال الرمز
                      </Button>
                    )}
                  </form>

                  <div className="mt-6 p-3 bg-muted/30 rounded-lg text-center">
                    <p className="text-xs text-muted-foreground">
                      🔐 للاختبار: استخدم الرمز <strong className="text-foreground">123456</strong>
                    </p>
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

export default StandalonePaymentOTPForm;
