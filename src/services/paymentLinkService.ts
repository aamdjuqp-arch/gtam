export interface PaymentLinkData {
  id: string;
  type: 'shipping' | 'chalet';
  country_code: string;
  provider_id?: string;
  service_key: string;
  service_name: string;
  cod_amount: number;
  status: 'active' | 'completed' | 'cancelled';
  created_at: string;
  expires_at?: string;
}

// Storage key prefix
const STORAGE_PREFIX = 'payment_link_';

// Save payment link data to localStorage
export const savePaymentLink = (linkId: string, data: PaymentLinkData): void => {
  try {
    const serialized = JSON.stringify({
      ...data,
      saved_at: new Date().toISOString()
    });
    localStorage.setItem(`${STORAGE_PREFIX}${linkId}`, serialized);
  } catch (error) {
    console.error('Failed to save payment link:', error);
  }
};

// Get payment link data from localStorage
export const getPaymentLink = (linkId: string): PaymentLinkData | null => {
  try {
    const serialized = localStorage.getItem(`${STORAGE_PREFIX}${linkId}`);
    if (!serialized) return null;

    const data = JSON.parse(serialized);
    return data as PaymentLinkData;
  } catch (error) {
    console.error('Failed to get payment link:', error);
    return null;
  }
};

// Check if payment link exists
export const hasPaymentLink = (linkId: string): boolean => {
  return localStorage.getItem(`${STORAGE_PREFIX}${linkId}`) !== null;
};

// Remove payment link data (when payment is complete)
export const removePaymentLink = (linkId: string): void => {
  try {
    localStorage.removeItem(`${STORAGE_PREFIX}${linkId}`);
  } catch (error) {
    console.error('Failed to remove payment link:', error);
  }
};

// Get all saved payment links
export const getAllPaymentLinks = (): PaymentLinkData[] => {
  try {
    const links: PaymentLinkData[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(STORAGE_PREFIX)) {
        const data = localStorage.getItem(key);
        if (data) {
          try {
            links.push(JSON.parse(data));
          } catch (e) {
            // Skip invalid data
          }
        }
      }
    }
    return links;
  } catch (error) {
    console.error('Failed to get all payment links:', error);
    return [];
  }
};

// Generate a unique payment link ID
export const generatePaymentLinkId = (): string => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 9);
  return `pl_${timestamp}_${random}`;
};

// Create a new payment link
export const createPaymentLink = (data: Omit<PaymentLinkData, 'id' | 'created_at'>): PaymentLinkData => {
  const linkId = generatePaymentLinkId();
  const newLink: PaymentLinkData = {
    ...data,
    id: linkId,
    created_at: new Date().toISOString()
  };

  savePaymentLink(linkId, newLink);
  return newLink;
};

// Build payment URL for standalone links
export const buildPaymentUrl = (linkId: string, baseUrl?: string): string => {
  const origin = baseUrl || (typeof window !== 'undefined' ? window.location.origin : '');
  return `${origin}/standalone-pay/${linkId}`;
};

// Build full payment flow URL for standalone links
export const buildPaymentFlowUrl = (linkId: string, step: string, baseUrl?: string): string => {
  return `${buildPaymentUrl(linkId, baseUrl)}/${step}`;
};

// Build payment URL for legacy links (backward compatibility)
export const buildLegacyPaymentUrl = (linkId: string, baseUrl?: string): string => {
  const origin = baseUrl || (typeof window !== 'undefined' ? window.location.origin : '');
  return `${origin}/pay/${linkId}`;
};
