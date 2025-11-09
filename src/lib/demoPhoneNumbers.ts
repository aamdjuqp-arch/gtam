export interface DemoPhoneData {
  placeholder: string;
  display: string;
  format: string;
}

export const DEMO_PHONE_NUMBERS: Record<string, DemoPhoneData> = {
  SA: {
    placeholder: "05xxxxxxxx",
    display: "05xxxxxxxx",
    format: "05xxxxxxxx (مثال: 0551234567)"
  },
  AE: {
    placeholder: "050xxxxxxxx",
    display: "050xxxxxxxx",
    format: "050xxxxxxxx (مثال: 0501234567)"
  },
  KW: {
    placeholder: "9xxxxxxxx",
    display: "9xxxxxxxx",
    format: "9xxxxxxxx (مثال: 90012345)"
  },
  QA: {
    placeholder: "66xxxxxx",
    display: "66xxxxxx",
    format: "66xxxxxx (مثال: 66123456)"
  },
  OM: {
    placeholder: "9xxxxxxx",
    display: "9xxxxxxx",
    format: "9xxxxxxx (مثال: 91234567)"
  },
  BH: {
    placeholder: "3xxxxxxx",
    display: "3xxxxxxx",
    format: "3xxxxxxx (مثال: 31234567)"
  }
};

export const getDemoPhoneForCountry = (countryCode: string): DemoPhoneData => {
  return DEMO_PHONE_NUMBERS[countryCode] || DEMO_PHONE_NUMBERS.SA;
};
