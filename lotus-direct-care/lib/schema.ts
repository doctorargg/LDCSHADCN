import { SITE_URL, CONTACT_INFO } from './constants'

export interface BreadcrumbItem {
  name: string
  url: string
}

export interface MedicalProcedureSchema {
  name: string
  description: string
  medicalSpecialty: string[]
  procedureType?: string
  bodyLocation?: string[]
  preparation?: string
  followup?: string
  medicationClass?: string[]
  contraindication?: string[]
  indication?: string[]
}

export function createMedicalProcedureSchema(procedure: MedicalProcedureSchema) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    "name": procedure.name,
    "description": procedure.description,
    "medicalSpecialty": procedure.medicalSpecialty,
    "procedureType": procedure.procedureType,
    "bodyLocation": procedure.bodyLocation,
    "preparation": procedure.preparation,
    "followup": procedure.followup,
    "medicationClass": procedure.medicationClass,
    "contraindication": procedure.contraindication,
    "indication": procedure.indication,
    "provider": {
      "@type": "MedicalOrganization",
      "name": "Lotus Direct Care",
      "url": SITE_URL,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": CONTACT_INFO.ADDRESS.STREET + ", " + CONTACT_INFO.ADDRESS.SUITE,
        "addressLocality": CONTACT_INFO.ADDRESS.CITY,
        "addressRegion": CONTACT_INFO.ADDRESS.STATE,
        "postalCode": CONTACT_INFO.ADDRESS.ZIP,
        "addressCountry": "US"
      },
      "telephone": CONTACT_INFO.PHONE
    }
  }
}

export interface FAQSchema {
  question: string
  answer: string
}

export function createFAQPageSchema(faqs: FAQSchema[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }
}

export function createPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Dr. Aaron Rosenberg",
    "givenName": "Aaron",
    "familyName": "Rosenberg",
    "honorificPrefix": "Dr.",
    "honorificSuffix": "MD",
    "jobTitle": "Physician",
    "description": "Dr. Aaron Rosenberg is a physician specializing in functional medicine, direct primary care, longevity medicine, and integrative therapies at Lotus Direct Care in Mequon, Wisconsin.",
    "url": SITE_URL + "/about",
    "worksFor": {
      "@type": "MedicalOrganization",
      "name": "Lotus Direct Care",
      "url": SITE_URL
    },
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Physician",
      "occupationLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Mequon",
          "addressRegion": "Wisconsin",
          "addressCountry": "US"
        }
      }
    },
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "Degree",
        "name": "Doctor of Medicine",
        "educationalLevel": "Graduate"
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
    ],
    "knowsAbout": [
      "Functional Medicine",
      "Direct Primary Care", 
      "Longevity Medicine",
      "Addiction Medicine",
      "Integrative Medicine",
      "Ketamine Therapy",
      "PRP Therapy"
    ],
    "alumniOf": {
      "@type": "Organization",
      "name": "Medical School" // Can be updated with specific school when known
    }
  }
}

// Predefined schemas for common services
export const FUNCTIONAL_MEDICINE_SCHEMA: MedicalProcedureSchema = {
  name: "Functional Medicine",
  description: "Comprehensive approach to healthcare that focuses on identifying and addressing the root causes of disease through personalized treatment plans.",
  medicalSpecialty: ["Functional Medicine", "Internal Medicine"],
  procedureType: "Diagnostic and therapeutic approach",
  preparation: "Comprehensive health history, laboratory testing, lifestyle assessment",
  followup: "Regular monitoring and treatment plan adjustments based on patient progress",
  indication: [
    "Chronic fatigue",
    "Digestive disorders", 
    "Hormonal imbalances",
    "Autoimmune conditions",
    "Metabolic disorders",
    "Chronic inflammation"
  ]
}

export const DIRECT_PRIMARY_CARE_SCHEMA: MedicalProcedureSchema = {
  name: "Direct Primary Care",
  description: "Membership-based healthcare model providing direct access to primary care physician without insurance middleman, offering unlimited visits and personalized care.",
  medicalSpecialty: ["Primary Care", "Internal Medicine"],
  procedureType: "Healthcare delivery model",
  preparation: "Health assessment and membership enrollment",
  followup: "Ongoing access to physician via phone, text, email, and in-person visits"
}

export const KETAMINE_THERAPY_SCHEMA: MedicalProcedureSchema = {
  name: "Ketamine Therapy",
  description: "Evidence-based treatment using ketamine for treatment-resistant depression, anxiety, chronic pain, and other psychiatric conditions.",
  medicalSpecialty: ["Psychiatry", "Pain Medicine"],
  procedureType: "Pharmacological therapy",
  bodyLocation: ["Brain", "Nervous System"],
  preparation: "Medical evaluation, psychiatric assessment, informed consent",
  followup: "Regular monitoring sessions and treatment plan adjustments",
  medicationClass: ["NMDA receptor antagonist"],
  indication: [
    "Treatment-resistant depression",
    "Anxiety disorders",
    "Chronic pain",
    "PTSD",
    "Bipolar disorder"
  ],
  contraindication: [
    "Uncontrolled hypertension",
    "History of psychosis",
    "Active substance abuse",
    "Pregnancy"
  ]
}

export const PRP_THERAPY_SCHEMA: MedicalProcedureSchema = {
  name: "Platelet-Rich Plasma (PRP) Therapy",
  description: "Regenerative medicine treatment using patient's own platelets to accelerate healing of injured tendons, ligaments, muscles, and joints.",
  medicalSpecialty: ["Regenerative Medicine", "Orthopedic Medicine"],
  procedureType: "Injection therapy",
  bodyLocation: ["Joints", "Tendons", "Ligaments", "Muscles"],
  preparation: "Medical evaluation, blood draw for platelet concentration",
  followup: "Follow-up visits to monitor healing progress",
  indication: [
    "Joint pain",
    "Tendon injuries",
    "Ligament injuries", 
    "Muscle injuries",
    "Arthritis"
  ]
}

export const INTEGRATIVE_THERAPIES_SCHEMA: MedicalProcedureSchema = {
  name: "Integrative Therapies",
  description: "Combination of conventional medical treatments with evidence-based complementary therapies for comprehensive healing approach.",
  medicalSpecialty: ["Integrative Medicine", "Holistic Medicine"],
  procedureType: "Comprehensive treatment approach",
  preparation: "Holistic health assessment, treatment plan development",
  followup: "Regular monitoring and therapy adjustments",
  indication: [
    "Chronic conditions",
    "Complex health issues",
    "Preventive care",
    "Wellness optimization"
  ]
}

export function createBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  }
}

export interface ReviewSchema {
  author: string
  rating: number
  reviewBody: string
  datePublished?: string
}

export function createReviewSchema(reviews: ReviewSchema[]) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    "name": "Lotus Direct Care",
    "url": SITE_URL,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": CONTACT_INFO.ADDRESS.STREET + ", " + CONTACT_INFO.ADDRESS.SUITE,
      "addressLocality": CONTACT_INFO.ADDRESS.CITY,
      "addressRegion": CONTACT_INFO.ADDRESS.STATE,
      "postalCode": CONTACT_INFO.ADDRESS.ZIP,
      "addressCountry": "US"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1),
      "reviewCount": reviews.length,
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": reviews.map(review => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.author
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating,
        "bestRating": "5",
        "worstRating": "1"
      },
      "reviewBody": review.reviewBody,
      "datePublished": review.datePublished || new Date().toISOString().split('T')[0]
    }))
  }
}