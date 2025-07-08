import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import "./globals.css";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";



export const metadata: Metadata = {
  metadataBase: new URL("https://lotusdirectcare.com"),
  title: "Lotus Direct Care | Direct Primary Care & Personalized Medicine in Mequon, WI",
  description: "Dr. Aaron Rosenberg provides comprehensive healthcare through direct primary care with a functional medicine approach. Expert in personalized medicine, longevity medicine, integrative therapies, and addiction medicine in Mequon, Wisconsin.",
  keywords: "functional medicine, direct primary care, Dr. Aaron Rosenberg, Mequon, Wisconsin, longevity medicine, integrative therapies, addiction medicine",
  authors: [{ name: "Dr. Aaron Rosenberg" }],
  creator: "Lotus Direct Care",
  publisher: "Lotus Direct Care",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Lotus Direct Care | Direct Primary Care & Personalized Medicine in Mequon, WI",
    description: "Dr. Aaron Rosenberg provides comprehensive healthcare through direct primary care with a functional medicine approach in Mequon, Wisconsin.",
    url: "https://lotusdirectcare.com",
    siteName: "Lotus Direct Care",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lotus Direct Care | Direct Primary Care & Personalized Medicine",
    description: "Dr. Aaron Rosenberg provides comprehensive healthcare through direct primary care with a functional medicine approach in Mequon, Wisconsin.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "", // Add Google verification code when available
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["MedicalOrganization", "LocalBusiness"],
    "name": "Lotus Direct Care",
    "url": "https://lotusdirectcare.com",
    "logo": "https://lotusdirectcare.com/images/Lotus Midjourney Flowers/lotus_logo_hero - Copy.png",
    "description": "Comprehensive direct primary care practice with functional medicine approach and integrative healthcare solutions in Mequon, Wisconsin",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "1516 W Mequon Rd., STE 103",
      "addressLocality": "Mequon",
      "addressRegion": "WI",
      "postalCode": "53092",
      "addressCountry": "US"
    },
    "telephone": "(262) 242-0700",
    "faxNumber": "(855) 457-1293",
    "email": "info@lotusdirectcare.com",
    "priceRange": "$165-$220",
    "paymentAccepted": ["Cash", "Credit Card", "HSA", "FSA"],
    "currenciesAccepted": "USD",
    "areaServed": [
      {
        "@type": "City",
        "name": "Mequon",
        "containedInPlace": {
          "@type": "State", 
          "name": "Wisconsin"
        }
      },
      {
        "@type": "City",
        "name": "Milwaukee",
        "containedInPlace": {
          "@type": "State",
          "name": "Wisconsin" 
        }
      },
      {
        "@type": "AdministrativeArea",
        "name": "Ozaukee County",
        "containedInPlace": {
          "@type": "State",
          "name": "Wisconsin"
        }
      }
    ],
    "openingHours": [
      "Mo-Fr 09:00-17:00"
    ],
    "founder": {
      "@type": "Person",
      "name": "Dr. Aaron Rosenberg",
      "jobTitle": "Physician",
      "worksFor": {
        "@type": "MedicalOrganization",
        "name": "Lotus Direct Care"
      }
    },
    "employee": {
      "@type": "Person", 
      "name": "Dr. Aaron Rosenberg",
      "jobTitle": "Physician",
      "hasCredential": [
        {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "Degree",
          "name": "Doctor of Medicine"
        },
        {
          "@type": "EducationalOccupationalCredential", 
          "credentialCategory": "Certification",
          "name": "Functional Medicine Training",
          "issuedBy": {
            "@type": "Organization",
            "name": "Institute for Functional Medicine"
          }
        }
      ]
    },
    "medicalSpecialty": [
      "Direct Primary Care",
      "Functional Medicine", 
      "Longevity Medicine",
      "Addiction Medicine",
      "Integrative Medicine"
    ],
    "hasCredential": {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "Certification",
      "name": "LegitScript Certification",
      "issuedBy": {
        "@type": "Organization",
        "name": "LegitScript",
        "url": "https://www.legitscript.com"
      },
      "url": "https://www.legitscript.com/websites/lotusdirectcare.com"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "(262) 242-0700",
        "contactType": "customer service",
        "availableLanguage": "English"
      },
      {
        "@type": "ContactPoint",
        "email": "info@lotusdirectcare.com", 
        "contactType": "customer service"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Medical Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "MedicalProcedure",
            "name": "Direct Primary Care Membership"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "MedicalProcedure",
            "name": "Functional Medicine"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "MedicalProcedure", 
            "name": "Ketamine Therapy"
          }
        }
      ]
    },
    "sameAs": [
      "https://www.legitscript.com/websites/lotusdirectcare.com"
    ]
  };

  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <div className="flex min-h-screen flex-col">
          <Navigation />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
