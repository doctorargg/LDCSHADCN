// Site Information
export const SITE_NAME = "Lotus Direct Care";
export const SITE_DESCRIPTION = "Dr. Aaron Rosenberg provides personalized functional medicine and direct primary care in Mequon, Wisconsin. Expert in longevity medicine, integrative therapies, and addiction medicine.";
export const SITE_URL = "https://lotusdirectcare.com";

// External Service URLs
export const EXTERNAL_URLS = {
  PATIENT_PORTAL: "https://app.elationemr.com/login",
  BOOK_APPOINTMENT: "https://lotusdirectcare.janeapp.com/",
  MEMBERSHIP_SIGNUP: "https://app.hint.com/enroll/Lotus-Direct-Care/",
} as const;

// Contact Information
export const CONTACT_INFO = {
  PHONE: "(262) 242-0700",
  FAX: "(855) 457-1293",
  EMAIL: "info@lotusdirectcare.com",
  ADDRESS: {
    STREET: "1516 W Mequon Rd.",
    SUITE: "STE 103",
    CITY: "Mequon",
    STATE: "WI",
    ZIP: "53092",
    FULL: "1516 W Mequon Rd., STE 103, Mequon, WI 53092",
  },
} as const;

// Business Hours
export const BUSINESS_HOURS = {
  MON: { open: "9:00 AM", close: "5:00 PM" },
  TUE: { open: "9:00 AM", close: "5:00 PM" },
  WED: { open: "9:00 AM", close: "5:00 PM" },
  THU: { open: "9:00 AM", close: "5:00 PM" },
  FRI: { open: "9:00 AM", close: "5:00 PM" },
  SAT: { open: "Closed", close: "Closed" },
  SUN: { open: "Closed", close: "Closed" },
} as const;

// Doctor Information
export const DOCTOR_INFO = {
  NAME: "Dr. Aaron Rosenberg",
  TITLE: "MD",
  SPECIALTIES: [
    "Functional Medicine",
    "Direct Primary Care",
    "Longevity Medicine",
    "Integrative Therapies",
    "Addiction Medicine",
  ],
} as const;

// SEO Keywords
export const SEO_KEYWORDS = [
  "functional medicine",
  "direct primary care",
  "Dr. Aaron Rosenberg",
  "Mequon",
  "Wisconsin",
  "longevity medicine",
  "integrative therapies",
  "addiction medicine",
  "holistic health",
  "preventive medicine",
  "personalized healthcare",
];

// Brand Colors (for future use)
export const BRAND_COLORS = {
  PRIMARY: "#4A90E2", // Placeholder - update with actual brand colors
  SECONDARY: "#7EC8E3",
  ACCENT: "#F5A623",
  DARK: "#2C3E50",
  LIGHT: "#F8F9FA",
} as const;