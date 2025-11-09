# Standalone Payment Links System

## Overview

The Standalone Payment Links System allows you to create unique, shareable payment links that work independently of the main application. These links can be accessed directly without requiring users to navigate through the main app.

## Features

- ✅ **Unique Payment Links**: Each link has a unique ID and works independently
- ✅ **Self-Contained**: No dependency on main app state or navigation
- ✅ **Data Persistence**: Payment link data is stored in localStorage
- ✅ **Country Support**: Works with all 6 supported countries (SA, AE, KW, QA, OM, BH)
- ✅ **Phone Number Auto-Update**: Demo phone numbers update based on selected country
- ✅ **Complete Payment Flow**: All payment steps (recipient, details, bank selection, OTP, receipt)

## How It Works

### 1. Link Creation

```typescript
import { createStandalonePaymentLink } from '@/utils/createPaymentLink';

// Create a new payment link
const { linkId, fullPaymentUrl, data } = createStandalonePaymentLink({
  type: 'shipping',
  country_code: 'SA',
  service_key: 'aramex',
  service_name: 'Aramex',
  cod_amount: 500
});

console.log('Payment URL:', fullPaymentUrl);
// Output: https://yoursite.com/standalone-pay/pl_abc123def456
```

### 2. Link Structure

```
Base URL: https://yoursite.com

Standalone Payment Flow:
├── /standalone-pay/{linkId}              → Recipient Info
├── /standalone-pay/{linkId}/details       → Payment Details
├── /standalone-pay/{linkId}/bank-selector → Bank Selection
├── /standalone-pay/{linkId}/card-input    → Card Number
├── /standalone-pay/{linkId}/bank-login    → Bank Login
├── /standalone-pay/{linkId}/card          → Card Details (Legacy)
├── /standalone-pay/{linkId}/otp           → OTP Verification
└── /standalone-pay/{linkId}/receipt       → Payment Receipt
```

### 3. Data Storage

Payment link data is stored in localStorage with the key format:
```
payment_link_{linkId}
```

Example data structure:
```json
{
  "id": "pl_abc123def456",
  "type": "shipping",
  "country_code": "SA",
  "service_key": "aramex",
  "service_name": "Aramex",
  "cod_amount": 500,
  "status": "active",
  "created_at": "2024-01-01T00:00:00.000Z",
  "saved_at": "2024-01-01T00:00:00.000Z"
}
```

## Usage Examples

### Example 1: Create and Share a Payment Link

```typescript
// In a component or API endpoint
const handleCreateLink = () => {
  const { fullPaymentUrl } = createStandalonePaymentLink({
    type: 'shipping',
    country_code: 'SA',
    service_key: 'aramex',
    service_name: 'Aramex',
    cod_amount: 500
  });

  // Share the link
  navigator.clipboard.writeText(fullPaymentUrl);
  alert('تم إنشاء رابط الدفع وتم نسخه إلى الحافظة');
};
```

### Example 2: Programmatic Link Generation

```typescript
// Server-side or batch processing
const links = [
  {
    type: 'shipping' as const,
    country_code: 'SA',
    service_key: 'aramex',
    service_name: 'Aramex',
    cod_amount: 500
  },
  {
    type: 'shipping' as const,
    country_code: 'AE',
    service_key: 'dhl',
    service_name: 'DHL',
    cod_amount: 750
  }
];

links.forEach(link => {
  const { fullPaymentUrl } = createStandalonePaymentLink(link);
  console.log(`Created link: ${fullPaymentUrl}`);
});
```

### Example 3: Using with Forms

```html
<form onSubmit={createPayment}>
  <input type="text" name="service" value="aramex" />
  <input type="text" name="amount" value="500" />
  <input type="text" name="country" value="SA" />
  <button type="submit">إنشاء رابط الدفع</button>
</form>
```

```typescript
const createPayment = (e: FormEvent) => {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);

  const { fullPaymentUrl } = createStandalonePaymentLink({
    type: 'shipping',
    country_code: formData.get('country') as string,
    service_key: formData.get('service') as string,
    service_name: formData.get('service') as string,
    cod_amount: parseInt(formData.get('amount') as string)
  });

  // Display or share the link
  alert(`رابط الدفع: ${fullPaymentUrl}`);
};
```

## API Reference

### `createStandalonePaymentLink(params)`

Creates a new standalone payment link.

**Parameters:**
- `params.type`: 'shipping' | 'chalet'
- `params.country_code`: 'SA' | 'AE' | 'KW' | 'QA' | 'OM' | 'BH'
- `params.service_key`: Service identifier (e.g., 'aramex', 'dhl')
- `params.service_name`: Service display name (e.g., 'Aramex')
- `params.cod_amount`: Payment amount
- `params.provider_id?`: Optional provider ID

**Returns:**
- `linkId`: Generated unique link ID
- `paymentUrl`: Full payment URL
- `fullPaymentUrl`: Same as paymentUrl (entry point)
- `data`: PaymentLinkData object

### `buildPaymentUrl(linkId: string, baseUrl?: string)`

Builds a payment URL for a given link ID.

**Parameters:**
- `linkId`: The payment link ID
- `baseUrl?`: Optional base URL (uses window.location.origin if not provided)

**Returns:**
- Complete payment URL string

### `getPaymentLink(linkId: string)`

Retrieves payment link data from storage.

**Parameters:**
- `linkId`: The payment link ID

**Returns:**
- PaymentLinkData object or null if not found

### `removePaymentLink(linkId: string)`

Removes payment link data from storage.

**Parameters:**
- `linkId`: The payment link ID

## Benefits

### For Developers
- Easy to integrate with existing systems
- No need for complex state management
- Works with any frontend or backend

### For Users
- Can access payment links directly
- No app installation required
- Shareable via any medium (WhatsApp, email, SMS)

### For Businesses
- Generate payment links programmatically
- Track payments by unique ID
- No integration with main website required

## Migration from Old System

### Old URLs (Deprecated)
```
/pay/{id}/recipient
/pay/{id}/details
/pay/{id}/bank-selector
```

### New URLs (Recommended)
```
/standalone-pay/{id}
/standalone-pay/{id}/details
/standalone-pay/{id}/bank-selector
```

## Configuration

### Environment Variables
No additional environment variables required. The system uses localStorage for data persistence.

### Dependencies
- React Router (for navigation)
- localStorage (for data persistence)

## Testing

### Test Link Structure
```
https://yoursite.com/standalone-pay/pl_test123456
```

### Sample Test Data
```typescript
// Create test link
const testLink = createStandalonePaymentLink({
  type: 'shipping',
  country_code: 'SA',
  service_key: 'aramex',
  service_name: 'Aramex',
  cod_amount: 500
});

console.log('Test URL:', testLink.fullPaymentUrl);
```

## Best Practices

1. **Link Generation**: Generate links on-demand, not in advance
2. **Link Sharing**: Use the `sharePaymentLink` utility for better UX
3. **Data Cleanup**: Remove completed payment links using `removePaymentLink`
4. **Error Handling**: Always check if a link exists before rendering
5. **Validation**: Validate payment link data before processing

## Limitations

- Links are stored in localStorage (client-side only)
- Maximum storage: ~5-10MB (browser dependent)
- No server-side persistence without additional implementation
- One-time use (link data is not automatically removed)

## Future Enhancements

- [ ] Add link expiration
- [ ] Add server-side persistence option
- [ ] Add link analytics
- [ ] Add QR code generation
- [ ] Add link encryption
- [ ] Add batch link generation API

## Support

For issues or questions:
- Check the console for error messages
- Verify link data in localStorage
- Ensure all required parameters are provided
- Check browser compatibility (localStorage support)
