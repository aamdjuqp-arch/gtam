# Demo Phone Numbers Auto-Update Feature

## Overview
This implementation adds automatic country-based demo phone number updates across the Gulf Unified Gateway payment flow. When a user selects a country, all demo/test phone numbers automatically update to match the selected country's phone number format.

## Changes Made

### 1. New File: `src/lib/demoPhoneNumbers.ts`
Created a configuration file that maps each country code to its specific phone number format:

- **SA (Saudi Arabia)**: `05xxxxxxxx` → Example: 0551234567
- **AE (United Arab Emirates)**: `050xxxxxxxx` → Example: 0501234567
- **KW (Kuwait)**: `9xxxxxxxx` → Example: 90012345
- **QA (Qatar)**: `66xxxxxx` → Example: 66123456
- **OM (Oman)**: `9xxxxxxx` → Example: 91234567
- **BH (Bahrain)**: `3xxxxxxx` → Example: 31234567

### 2. Updated: `src/pages/PaymentBankLogin.tsx`
**Changes:**
- Imported `getDemoPhoneForCountry` function
- Added `demoPhoneData` variable that gets country-specific phone format
- Updated phone input placeholder to use dynamic country-specific format
- Added example text showing the phone number format
- Added a demo phone number display section that shows the format for the selected country

**Features:**
- When login type is 'phone', the input field shows the country-specific placeholder
- Example format is displayed below the input field
- For other login types (username/customerId), a demo box shows the phone format for reference

### 3. Updated: `src/pages/PaymentOTPForm.tsx`
**Changes:**
- Imported `getCountryByCode` function
- Added `selectedCountry` and `selectedCountryData` variables
- Updated demo info section to show country flag and name alongside the demo OTP code

**Features:**
- Displays country flag and name with the demo OTP information
- Helps users identify which country they're testing for

## How It Works

1. **Country Selection**: When a user selects a country in the payment flow, the country code is stored in `sessionStorage` as 'selectedCountry'

2. **Automatic Updates**: All components that display demo information automatically retrieve the country from `sessionStorage` and update their content accordingly

3. **Phone Number Display**: The phone number format changes based on the selected country:
   - Placeholder text updates to show the correct format
   - Example text helps users understand the expected input
   - Demo box shows the format for reference

## Example Flow

**User selects Saudi Arabia (SA):**
- Phone placeholder: `05xxxxxxxx`
- Example text: `05xxxxxxxx (مثال: 0551234567)`
- Demo box shows: `05xxxxxxxx` with the same example

**User selects UAE (AE):**
- Phone placeholder: `050xxxxxxxx`
- Example text: `050xxxxxxxx (مثال: 0501234567)`
- Demo box shows: `050xxxxxxxx` with the same example

## Benefits

1. **Better UX**: Users see phone numbers in their country's format
2. **Reduced Confusion**: No need to remember different country formats
3. **Visual Clarity**: Country flag and name displayed for easy identification
4. **Consistency**: All demo information updates consistently across the app

## Technical Details

- **Type Safety**: All code is fully typed with TypeScript
- **Backward Compatible**: Defaults to Saudi format (SA) if no country is selected
- **No Breaking Changes**: Existing functionality remains unchanged
- **Performance**: Minimal overhead - simple lookup from configuration object

## Testing

To test this feature:

1. Select different countries in the payment flow
2. Navigate to the bank login page
3. Verify that:
   - Phone placeholder matches the selected country
   - Example text shows correct format
   - Demo box displays the right format
4. Try different login types (username, customerId, phone)
5. Check the OTP page shows the correct country flag

## Future Enhancements

Potential improvements:
- Add more countries by updating `DEMO_PHONE_NUMBERS` object
- Add phone number validation based on country format
- Support for more phone number formats (if needed)
- Add country-specific demo data for other fields

## Files Modified

1. ✅ `src/lib/demoPhoneNumbers.ts` (created)
2. ✅ `src/pages/PaymentBankLogin.tsx` (updated)
3. ✅ `src/pages/PaymentOTPForm.tsx` (updated)

## Status

✅ Implementation Complete
✅ TypeScript Check Passed
✅ No Breaking Changes
✅ Ready for Testing
