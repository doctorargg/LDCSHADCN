# Ketamine Therapy Page Specification
## For Claude Code Implementation

**File Location:** `app/services/ketamine-therapy/page.tsx`

---

## Page Requirements

### Visual Design
- Use consistent lotus flower header image from public folder
- Match the design pattern of other service pages
- Mobile-first responsive layout
- Clean medical aesthetic with calming colors

### Header Section
```typescript
// Import the lotus image
import Image from 'next/image'

// Hero section with lotus image
<div className="relative h-[300px] md:h-[400px] w-full">
  <Image
    src="/lotus-header.jpg" // or whatever the lotus image is named in public folder
    alt="Lotus Direct Care - Ketamine Therapy"
    fill
    className="object-cover"
    priority
  />
  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
  <div className="absolute bottom-0 left-0 right-0 p-8">
    <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
      Ketamine Therapy
    </h1>
    <p className="text-xl text-white/90">
      Evidence-based treatment for depression, anxiety, and chronic pain
    </p>
  </div>
</div>
```

### SEO Metadata
```typescript
export const metadata: Metadata = {
  title: 'Ketamine Therapy for Depression & Chronic Pain | Lotus Direct Care',
  description: 'Evidence-based ketamine treatment for treatment-resistant depression, anxiety, PTSD, and chronic pain. Supervised by Dr. Aaron Rosenberg in Mequon, WI.',
  keywords: 'ketamine therapy mequon, ketamine treatment wisconsin, ketamine infusion milwaukee, depression treatment, chronic pain relief, PTSD treatment',
  openGraph: {
    title: 'Ketamine Therapy at Lotus Direct Care',
    description: 'Find relief from treatment-resistant depression and chronic pain with supervised ketamine therapy.',
    images: ['/lotus-header.jpg'],
  }
}
```

### Content Structure

#### 1. Introduction Section
- Brief, empathetic introduction acknowledging patient struggles
- Mention Dr. Rosenberg's expertise
- Clear value proposition

#### 2. What is Ketamine Therapy?
- Medical explanation (NMDA receptors, neuroplasticity)
- FDA off-label use discussion
- How it differs from traditional antidepressants
- Recent research citations

#### 3. Conditions We Treat
Create a grid using Shadcn Cards:
- Treatment-Resistant Depression
- Major Depressive Disorder
- Anxiety Disorders
- PTSD
- Chronic Pain Syndromes
- Fibromyalgia
- Complex Regional Pain Syndrome
- Migraines

#### 4. The Science Behind Ketamine
- Mechanism of action
- Neuroplasticity and BDNF
- Rapid onset compared to SSRIs
- Research and evidence base

#### 5. Our Treatment Approach
- Initial consultation and assessment
- Medical clearance process
- Personalized dosing protocols
- Integration with functional medicine
- Monitoring and safety measures

#### 6. What to Expect
Timeline accordion using Shadcn Accordion component:
- Before Your First Session
- During Treatment
- After Treatment
- Follow-up Care
- Maintenance Protocols

#### 7. Safety and Monitoring
- Medical supervision throughout
- Vital sign monitoring
- Contraindications
- Side effect management
- Integration support

#### 8. Why Choose Lotus Direct Care
- Dr. Rosenberg's qualifications
- Integrated approach with functional medicine
- Personalized protocols
- Comfortable, private setting
- Direct physician access for questions

#### 9. Investment and Insurance
- Transparent pricing
- Package options
- HSA/FSA eligibility
- Why insurance doesn't cover (yet)
- Value comparison

#### 10. FAQ Section
Use Shadcn Accordion component:
- How many treatments will I need?
- Is ketamine safe?
- What are the side effects?
- Can I drive after treatment?
- How quickly will I see results?
- Is this the same as "Special K"?
- Can I continue my other medications?

### Call-to-Action Sections

#### Primary CTA (Sticky on mobile)
```typescript
<div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t md:hidden">
  <Button size="lg" className="w-full" asChild>
    <a href="https://app.elationemr.com/book/lotusdirectcare">
      Schedule Consultation
    </a>
  </Button>
</div>
```

#### Lead Capture Form
```typescript
<Card className="max-w-md mx-auto p-6 mt-8">
  <CardHeader>
    <CardTitle>Learn More About Ketamine Therapy</CardTitle>
    <CardDescription>
      Get our free guide: "Is Ketamine Therapy Right for You?"
    </CardDescription>
  </CardHeader>
  <CardContent>
    <LeadCaptureForm 
      source="ketamine-therapy"
      offer="ketamine-guide"
    />
  </CardContent>
</Card>
```

### Testimonial Section
Include 2-3 anonymized patient stories focusing on:
- Life before treatment
- The treatment experience
- Results achieved
- Life transformation

### Related Content Links
- Link to relevant blog posts
- Link to mental health resources
- Link to functional medicine approach
- Link to Dr. Rosenberg's bio

### Trust Elements
- Dr. Rosenberg's credentials
- Years of experience
- Number of treatments administered
- Safety record
- Professional affiliations

### Mobile Optimizations
- Sticky CTA button
- Collapsible sections for easy scanning
- Touch-friendly buttons (min 44px)
- Optimized images
- Fast loading

### Schema Markup
```typescript
const ketamineSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalTherapy",
  "name": "Ketamine Therapy",
  "alternateName": "Ketamine Infusion Therapy",
  "description": "Ketamine therapy for treatment-resistant depression and chronic pain",
  "medicalSpecialty": "Psychiatry",
  "recognizingAuthority": {
    "@type": "MedicalOrganization",
    "name": "Lotus Direct Care"
  },
  "availableAt": {
    "@type": "MedicalClinic",
    "name": "Lotus Direct Care",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Mequon",
      "addressRegion": "WI"
    }
  }
}
```

---

## Component Requirements

Use these Shadcn UI components:
- Card (for condition grid, testimonials)
- Accordion (for FAQ, timeline)
- Button (for CTAs)
- Badge (for highlighting key points)
- Separator (for section breaks)
- Alert (for important notices)

## Color Scheme
- Primary: Teal (#006B6B) - for headers and CTAs
- Secondary: Soft gray (#F5F5F5) - for backgrounds
- Accent: Warm gold (#FFB500) - for highlights
- Text: Dark gray (#333333) - for readability

## Typography
- Headers: font-bold with appropriate sizes
- Body text: text-base leading-relaxed
- Medical terms: Explained in simple language
- Important info: Font-semibold or Alert components

## External Links
- Booking: https://app.elationemr.com/book/lotusdirectcare
- Patient portal: https://app.elationpassport.com/passport/login/
- Membership signup: https://lotusdirectcare.hint.com/signup/membership/contacts

---

## Content Tone
- Professional yet compassionate
- Acknowledge patient struggles
- Evidence-based without being overly technical
- Hope-inspiring but realistic
- Clear about what ketamine can and cannot do

## Key Messages
1. Ketamine offers hope when other treatments have failed
2. Safe, supervised, medical setting
3. Integrated with functional medicine approach
4. Rapid relief possible (not guaranteed)
5. Personalized treatment protocols

Remember to maintain consistency with other service pages in terms of layout, styling, and user experience.