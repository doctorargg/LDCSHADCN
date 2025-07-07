import { EXTERNAL_URLS } from "./constants";

// Navigation Menu Items
export const navigationItems = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "About",
    href: "/about",
    subItems: [
      { title: "Dr. Aaron Rosenberg", href: "/about/dr-rosenberg" },
      { title: "Our Approach", href: "/about/approach" },
      { title: "Patient Testimonials", href: "/about/testimonials" },
    ],
  },
  {
    title: "Services",
    href: "/services",
    subItems: [
      { title: "Direct Primary Care", href: "/services/direct-primary-care" },
      { title: "Functional Medicine", href: "/services/functional-medicine" },
      { title: "Integrative Therapies", href: "/services/integrative-therapies" },
      { title: "Longevity Medicine", href: "/services/longevity-medicine" },
      { title: "Addiction Medicine", href: "/services/addiction-medicine" },
      { title: "Ketamine Therapy", href: "/services/ketamine-therapy" },
      { title: "PRP Therapy", href: "/services/prp-therapy" },
    ],
  },
  {
    title: "Membership",
    href: "/membership",
  },
  {
    title: "Resources",
    href: "/resources",
    subItems: [
      { title: "Patient Forms", href: "/resources/forms" },
      { title: "Educational Resources", href: "/resources/education" },
      { title: "FAQs", href: "/faq" },
      { title: "Blog", href: "/resources/blog" },
    ],
  },
  {
    title: "Contact",
    href: "/contact",
  },
] as const;

// Footer Links
export const footerLinks = {
  practice: [
    { title: "About Us", href: "/about" },
    { title: "Our Services", href: "/services" },
    { title: "Membership Plans", href: "/membership" },
    { title: "Patient Testimonials", href: "/about/testimonials" },
    { title: "Contact", href: "/contact" },
  ],
  patients: [
    { title: "Patient Portal", href: EXTERNAL_URLS.PATIENT_PORTAL, external: true },
    { title: "Book Appointment", href: EXTERNAL_URLS.BOOK_APPOINTMENT, external: true },
    { title: "Patient Forms", href: "/resources/forms" },
    { title: "FAQs", href: "/faq" },
  ],
  resources: [
    { title: "Blog", href: "/resources/blog" },
    { title: "Educational Resources", href: "/resources/education" },
    { title: "Health Tips", href: "/resources/health-tips" },
    { title: "Privacy Policy", href: "/privacy-policy" },
    { title: "Terms of Service", href: "/terms-of-service" },
  ],
} as const;

// Social Media Links (update when available)
export const socialLinks = {
  facebook: "",
  twitter: "",
  instagram: "",
  linkedin: "",
  youtube: "",
} as const;

// CTA (Call to Action) Configuration
export const ctaConfig = {
  primary: {
    text: "Join Our Practice",
    href: EXTERNAL_URLS.MEMBERSHIP_SIGNUP,
    external: true,
  },
  secondary: {
    text: "Book Consultation",
    href: EXTERNAL_URLS.BOOK_APPOINTMENT,
    external: true,
  },
} as const;

// Page Metadata Defaults
export const defaultMetadata = {
  titleTemplate: "%s | Lotus Direct Care",
  defaultTitle: "Lotus Direct Care | Functional Medicine & Direct Primary Care",
  description: "Dr. Aaron Rosenberg provides personalized functional medicine and direct primary care in Mequon, Wisconsin.",
} as const;

// Feature Flags (for controlling feature visibility)
export const features = {
  blog: true,
  testimonials: true,
  onlineBooking: true,
  patientPortal: true,
  newsletter: true,
} as const;