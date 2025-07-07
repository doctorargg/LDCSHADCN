import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lotus Direct Care | Functional Medicine & Direct Primary Care in Mequon, WI",
  description: "Dr. Aaron Rosenberg provides personalized functional medicine and direct primary care in Mequon, Wisconsin. Expert in longevity medicine, integrative therapies, and addiction medicine.",
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
    title: "Lotus Direct Care | Functional Medicine & Direct Primary Care in Mequon, WI",
    description: "Dr. Aaron Rosenberg provides personalized functional medicine and direct primary care in Mequon, Wisconsin.",
    url: "https://lotusdirectcare.com",
    siteName: "Lotus Direct Care",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lotus Direct Care | Functional Medicine & Direct Primary Care",
    description: "Dr. Aaron Rosenberg provides personalized functional medicine and direct primary care in Mequon, Wisconsin.",
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
    "@type": "MedicalOrganization",
    "name": "Lotus Direct Care",
    "url": "https://lotusdirectcare.com",
    "logo": "https://lotusdirectcare.com/images/logo.png",
    "description": "Functional medicine and direct primary care practice in Mequon, Wisconsin",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "11649 N Port Washington Rd",
      "addressLocality": "Mequon",
      "addressRegion": "WI",
      "postalCode": "53092",
      "addressCountry": "US"
    },
    "telephone": "262-299-8488",
    "email": "info@lotusdirectcare.com",
    "founder": {
      "@type": "Person",
      "name": "Dr. Aaron Rosenberg, MD",
      "jobTitle": "Physician"
    },
    "medicalSpecialty": [
      "Internal Medicine",
      "Functional Medicine",
      "Addiction Medicine"
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
    "sameAs": [
      "https://www.legitscript.com/websites/lotusdirectcare.com"
    ]
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          <Navigation />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
