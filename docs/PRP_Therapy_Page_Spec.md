# PRP Therapy Page Specification
## For Claude Code Implementation

**File Location:** `app/services/prp-therapy/page.tsx`

---

## Page Requirements

### Visual Design
- Use consistent lotus flower header image from public folder
- Match the design pattern of other service pages
- Professional medical aesthetic with regenerative medicine theme
- Include before/after image placeholders (if applicable)

### Header Section
```typescript
// Import the lotus image
import Image from 'next/image'

// Hero section with lotus image
<div className="relative h-[300px] md:h-[400px] w-full">
  <Image
    src="/lotus-header.jpg" // or whatever the lotus image is named in public folder
    alt="Lotus Direct Care - PRP Therapy"
    fill
    className="object-cover"
    priority
  />
  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
  <div className="absolute bottom-0 left-0 right-0 p-8">
    <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
      PRP Therapy
    </h1>
    <p className="text-xl text-white/90">
      Harness your body's natural healing power with platelet-rich plasma
    </p>
  </div>
</div>
```

### SEO Metadata
```typescript
export const metadata: Metadata = {
  title: 'PRP Injections for Joint Pain, Hair Loss & Aesthetics | Lotus Direct Care',
  description: 'Platelet-rich plasma (PRP) therapy for arthritis, sports injuries, hair restoration, and regenerative medicine. Natural healing in Mequon, WI.',
  keywords: 'PRP therapy mequon, platelet rich plasma wisconsin, PRP injections milwaukee, joint pain treatment, hair restoration PRP, regenerative medicine',
  openGraph: {
    title: 'PRP Therapy at Lotus Direct Care',
    description: 'Natural regenerative therapy using your own platelets to heal joints, restore hair, and rejuvenate tissue.',
    images: ['/lotus-header.jpg'],
  }
}
```

### Content Structure

#### 1. Introduction Section
- Engaging intro about body's natural healing ability
- Brief explanation of regenerative medicine
- Dr. Rosenberg's approach to PRP

#### 2. What is PRP Therapy?
- Scientific explanation in layman's terms
- The concentration process
- Growth factors and healing cascade
- Why PRP works

#### 3. Our PRP Applications
Create a tabbed interface using Shadcn Tabs component:

**Tab 1: Orthopedic/Joint**
- Knee osteoarthritis
- Rotator cuff injuries
- Tennis/Golfer's elbow
- Achilles tendonitis
- Plantar fasciitis
- Hip pain
- Sports injuries

**Tab 2: Aesthetic/Hair**
- Hair restoration for men and women
- Facial rejuvenation
- Scar reduction
- Skin texture improvement

**Tab 3: Sexual Health**
- Male sexual wellness (P-Shot)
- Female sexual wellness (O-Shot)
- Improved function and sensitivity

**Tab 4: Other Applications**
- Chronic wound healing
- Dental/oral surgery
- General tissue repair

#### 4. The Science Behind PRP
- Platelet biology and growth factors
- Healing cascade activation
- Clinical research summary
- Success rates by condition
- Comparison to cortisone/surgery

#### 5. The PRP Process at Lotus
Step-by-step cards using Shadcn Card component:
1. **Consultation** - Assessment and candidacy
2. **Blood Draw** - Simple, like routine lab work
3. **Processing** - Centrifuge separation (15 min)
4. **Preparation** - Numbing and cleaning
5. **Injection** - Precise placement
6. **Recovery** - What to expect

Include estimated timeline: 45-60 minutes total

#### 6. What Makes Our PRP Different
- Dr. Rosenberg's precision techniques
- High-quality centrifuge system
- Customized protocols per condition
- Integration with functional medicine
- Ultrasound guidance when needed
- Follow-up support included

#### 7. Expected Results Timeline
Create visual timeline using Cards:
- **Week 1-2**: Initial healing response
- **Week 4-6**: Tissue regeneration begins
- **Month 2-3**: Noticeable improvement
- **Month 3-6**: Maximum benefit
- **Long-term**: Lasting results

Include disclaimer about individual variation

#### 8. Good Candidates for PRP
Two columns using grid:
**Ideal Candidates:**
- Active individuals
- Mild to moderate conditions
- Failed conservative treatment
- Want to avoid surgery
- Prefer natural healing

**Not Suitable For:**
- Active infections
- Blood disorders
- Certain medications
- Active cancer
- Severe arthritis

#### 9. Pricing and Packages
Transparent pricing table using Shadcn Table:
- Single joint injection: $XXX
- Bilateral (both knees, etc): $XXX
- Hair restoration session: $XXX
- Package deals (3 sessions): Save 15%
- Combination treatments available

Note: HSA/FSA eligible, financing available

#### 10. FAQ Section
Use Shadcn Accordion component:
- How many treatments will I need?
- Is PRP painful?
- How long do results last?
- Can I exercise after PRP?
- Is PRP covered by insurance?
- How is PRP different from stem cells?
- What are the risks?
- Can I combine with other treatments?

### Call-to-Action Sections

#### Primary CTA (Sticky on mobile)
```typescript
<div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t md:hidden">
  <Button size="lg" className="w-full" asChild>
    <a href="https://app.elationemr.com/book/lotusdirectcare">
      Book PRP Consultation
    </a>
  </Button>
</div>
```

#### Condition-Specific CTAs
```typescript
<Card className="p-6 bg-teal-50 border-teal-200">
  <h3 className="font-semibold text-lg mb-2">
    Suffering from {condition}?
  </h3>
  <p className="text-gray-700 mb-4">
    Learn if PRP is right for your specific situation.
  </p>
  <Button asChild>
    <a href="/contact">Get Personalized Assessment</a>
  </Button>
</Card>
```

### Before/After Gallery Section
(If you have permissions to show):
```typescript
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <Card>
    <CardHeader>
      <CardTitle>Hair Restoration Results</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-600 mb-2">Before</p>
          <Image src="/prp-hair-before.jpg" alt="Before PRP" />
        </div>
        <div>
          <p className="text-sm text-gray-600 mb-2">After 3 Sessions</p>
          <Image src="/prp-hair-after.jpg" alt="After PRP" />
        </div>
      </div>
    </CardContent>
  </Card>
</div>
```

### Research and Evidence Section
- Key studies summary
- Success rate statistics
- Links to PubMed articles
- Professional endorsements

### Comparison Table
PRP vs Other Treatments using Shadcn Table:
| Factor | PRP | Cortisone | Surgery |
|--------|-----|-----------|---------|
| Natural | ✓ | ✗ | ✗ |
| Long-lasting | ✓ | ✗ | ✓ |
| Downtime | Minimal | None | Significant |
| Risk | Low | Medium | High |
| Cost | $$ | $ | $$$$ |

### Trust Elements
- Number of PRP procedures performed
- Years of experience
- Training and certifications
- Patient satisfaction rate
- Safety record

### Related Services Links
- Link to Functional Medicine (root cause approach)
- Link to Longevity Medicine (optimization)
- Link to relevant blog posts
- Link to patient resources

### Mobile Optimizations
- Sticky CTA button
- Swipeable condition cards
- Collapsible FAQ sections
- Quick-load images
- Easy phone booking

### Schema Markup
```typescript
const prpSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalProcedure",
  "name": "Platelet-Rich Plasma (PRP) Therapy",
  "alternateName": "PRP Injection",
  "description": "Regenerative therapy using concentrated platelets from patient's own blood",
  "medicalSpecialty": "Regenerative Medicine",
  "indication": [
    "Osteoarthritis",
    "Tendon injuries",
    "Hair loss",
    "Tissue regeneration"
  ],
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
- Tabs (for different applications)
- Card (for process steps, pricing)
- Accordion (for FAQs)
- Table (for comparisons, pricing)
- Button (for CTAs)
- Badge (for highlighting benefits)
- Alert (for important disclaimers)

## Visual Elements
- Process diagram or icons
- Body diagram showing injection sites
- Before/after placeholders
- Certification badges
- Trust symbols

## Color Scheme
- Primary: Teal (#006B6B) - main CTAs
- Accent: Gold (#FFB500) - highlights
- Success: Green - for benefits/checkmarks
- Neutral: Grays - for text and backgrounds

## Typography
- Clear hierarchy with consistent sizing
- Medical terms explained simply
- Benefits in bullet points
- Important info in Alert components

## External Links
- Booking: https://app.elationemr.com/book/lotusdirectcare
- Research articles (PubMed)
- Professional organizations
- Patient portal for follow-up

---

## Content Tone
- Educational and informative
- Excitement about natural healing
- Realistic expectations
- Professional medical authority
- Patient-centered approach

## Key Messages
1. Your body has amazing healing potential
2. PRP is natural - using your own blood
3. Proven science, not experimental
4. Multiple applications beyond joints
5. Dr. Rosenberg's expertise ensures best results

## Unique Selling Points
- Functional medicine integration
- Customized protocols
- High-quality equipment
- Comprehensive follow-up
- Transparent pricing

Remember to maintain consistency with other service pages while highlighting the regenerative/natural healing aspect of PRP.