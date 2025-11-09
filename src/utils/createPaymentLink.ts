import { createPaymentLink, buildPaymentUrl, type PaymentLinkData } from '@/services/paymentLinkService';

/**
 * Create a new standalone payment link
 */
export const createStandalonePaymentLink = (
  params: {
    type: 'shipping' | 'chalet';
    country_code: string;
    service_key: string;
    service_name: string;
    cod_amount: number;
    provider_id?: string;
  }
): {
  linkId: string;
  paymentUrl: string;
  fullPaymentUrl: string;
  data: PaymentLinkData;
} => {
  // Create the payment link
  const linkData = createPaymentLink({
    type: params.type,
    country_code: params.country_code,
    service_key: params.service_key,
    service_name: params.service_name,
    cod_amount: params.cod_amount,
    provider_id: params.provider_id,
    status: 'active'
  });

  // Build URLs
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://example.com';
  const linkId = linkData.id;
  const paymentUrl = buildPaymentUrl(linkId, baseUrl);
  const fullPaymentUrl = paymentUrl; // Main entry point

  return {
    linkId,
    paymentUrl,
    fullPaymentUrl,
    data: linkData
  };
};

/**
 * Example usage in a page component
 */
export const exampleUsage = `
import { createStandalonePaymentLink } from '@/utils/createPaymentLink';

// Create a new payment link
const { linkId, fullPaymentUrl, data } = createStandalonePaymentLink({
  type: 'shipping',
  country_code: 'SA',
  service_key: 'aramex',
  service_name: 'Aramex',
  cod_amount: 500
});

console.log('Payment Link ID:', linkId);
console.log('Payment URL:', fullPaymentUrl);
console.log('Link Data:', data);

/*
  Output:
  Payment Link ID: pl_abc123def456
  Payment URL: https://yoursite.com/standalone-pay/pl_abc123def456
  Link Data: {
    id: "pl_abc123def456",
    type: "shipping",
    country_code: "SA",
    service_key: "aramex",
    service_name: "Aramex",
    cod_amount: 500,
    status: "active",
    created_at: "2024-01-01T00:00:00.000Z"
  }
*/
`;

/**
 * Helper to share payment link
 */
export const sharePaymentLink = (paymentUrl: string, title: string = 'رابط الدفع') => {
  if (navigator.share) {
    navigator.share({
      title: title,
      url: paymentUrl
    }).catch(err => console.log('Error sharing:', err));
  } else {
    // Fallback: copy to clipboard
    navigator.clipboard.writeText(paymentUrl).then(() => {
      alert('تم نسخ رابط الدفع إلى الحافظة');
    }).catch(err => {
      console.error('Failed to copy:', err);
    });
  }
};
