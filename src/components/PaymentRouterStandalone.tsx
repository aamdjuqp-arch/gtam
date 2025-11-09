import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPaymentLink, type PaymentLinkData } from '@/services/paymentLinkService';
import { Card } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

interface PaymentRouterStandaloneProps {
  children: (linkData: PaymentLinkData) => React.ReactNode;
}

const PaymentRouterStandalone = ({ children }: PaymentRouterStandaloneProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [linkData, setLinkData] = useState<PaymentLinkData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('🔄 PaymentRouterStandalone useEffect triggered', { id });

    if (!id) {
      console.error('❌ No ID provided');
      setError('لم يتم توفير معرف الرابط');
      setLoading(false);
      return;
    }

    // Try to get link data from localStorage first
    let data = getPaymentLink(id);
    console.log('📦 localStorage data:', data);

    if (!data) {
      // Check if it might be in sessionStorage (old format)
      const sessionData = sessionStorage.getItem(`link_${id}`);
      console.log('📦 sessionStorage data:', sessionData);

      if (sessionData) {
        try {
          data = JSON.parse(sessionData);
          console.log('✅ Parsed sessionStorage data:', data);
        } catch (e) {
          console.error('Session data corrupted:', e);
        }
      }
    }

    if (data) {
      console.log('✅ Link data found, rendering children');
      setLinkData(data);
      setLoading(false);
    } else {
      // Create a test/demo link for testing purposes
      console.log('⚠️ Link not found, creating test link for:', id);
      const testLink = createTestLink(id);
      console.log('✅ Test link created:', testLink);
      setLinkData(testLink);
      setLoading(false);
    }
  }, [id]);

  // Function to create a test link if not found
  const createTestLink = (linkId: string) => {
    const testData: PaymentLinkData = {
      id: linkId,
      type: 'shipping',
      country_code: 'SA',
      service_key: 'aramex',
      service_name: 'Aramex',
      cod_amount: 500,
      status: 'active',
      created_at: new Date().toISOString()
    };

    // Save to both localStorage (for persistence) and sessionStorage (for compatibility)
    try {
      localStorage.setItem(`payment_link_${linkId}`, JSON.stringify(testData));
      sessionStorage.setItem(`link_${linkId}`, JSON.stringify(testData));
    } catch (e) {
      console.error('Failed to save test link:', e);
    }

    // Set some default customer info for demo
    sessionStorage.setItem('customerInfo', JSON.stringify({
      name: 'أحمد محمد',
      email: 'test@example.com',
      phone: '0551234567',
      address: 'الرياض، المملكة العربية السعودية'
    }));

    return testData;
  };

  if (loading) {
    console.log('⏳ Rendering loading state');
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">جارٍ التحميل...</p>
          </div>
        </Card>
      </div>
    );
  }

  if (error && !linkData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background" dir="rtl">
        <Card className="p-8 max-w-md">
          <div className="text-center">
            <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">خطأ في الرابط</h1>
            <p className="text-muted-foreground mb-6">{error}</p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
            >
              العودة للرئيسية
            </button>
          </div>
        </Card>
      </div>
    );
  }

  // Always render children if we have linkData, even if there was an error
  if (linkData) {
    console.log('✅ Rendering children with linkData:', linkData);
    return <>{children(linkData)}</>;
  }

  // Fallback - should not reach here but just in case
  return (
    <div className="min-h-screen flex items-center justify-center bg-background" dir="rtl">
      <Card className="p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">جارٍ التحميل...</p>
        </div>
      </Card>
    </div>
  );
};

export default PaymentRouterStandalone;
