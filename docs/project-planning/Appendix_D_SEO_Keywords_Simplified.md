# Appendix D: SEO Keyword Research - Simplified Version
## Lotus Direct Care Website PRD

### Executive Summary
Focused keyword strategy for dominating functional medicine and direct primary care searches in Wisconsin, optimized for AI content generation and local SEO dominance.

---

## 1. Core SEO Strategy

### 1.1 Three-Pillar Approach

```
Pillar 1: Service Keywords (Homepage + Service Pages)
└── Functional Medicine + Location
└── Direct Primary Care + Location  
└── Integrative Medicine + Location

Pillar 2: Problem/Condition Keywords (AI Blog Content)
└── Chronic Conditions + Functional Medicine
└── Symptoms + Root Cause
└── Health Optimization + Longevity

Pillar 3: Comparison/Education Keywords (Resource Pages)
└── DPC vs Insurance
└── Functional vs Conventional
└── Cost Comparisons
```

### 1.2 Geographic Strategy

**Primary Markets:**
- Mequon (headquarters)
- Milwaukee (largest city)
- North Shore communities

**Secondary Markets:**
- Brown Deer, Cedarburg, Grafton
- Whitefish Bay, Shorewood, River Hills

---

## 2. High-Priority Keywords (Homepage + Service Pages)

### 2.1 Primary Target Keywords

| Keyword | Monthly Volume | Difficulty | Priority | Target Page |
|---------|---------------|------------|----------|-------------|
| functional medicine mequon | 50-100 | Low | **Critical** | Homepage |
| functional medicine milwaukee | 200-300 | Medium | **Critical** | Location Page |
| direct primary care wisconsin | 100-200 | Low | **Critical** | DPC Service |
| integrative medicine milwaukee | 300-400 | Medium | High | Service Page |
| dr aaron rosenberg mequon | 20-30 | Very Low | High | About Page |

### 2.2 Long-Tail Service Keywords

```javascript
const serviceKeywords = {
  functionalMedicine: [
    'functional medicine doctor near me',
    'root cause medicine wisconsin',
    'ifm certified physician milwaukee',
    'evidence based functional medicine',
    'functional medicine testing mequon'
  ],
  
  directPrimaryCare: [
    'dpc membership wisconsin',
    'direct primary care near me',
    'membership medicine mequon',
    'concierge medicine milwaukee',
    'primary care without insurance'
  ],
  
  conditions: [
    'chronic fatigue treatment mequon',
    'hormone imbalance doctor milwaukee',
    'gut health specialist wisconsin',
    'thyroid doctor functional medicine',
    'autoimmune specialist mequon'
  ]
}
```

---

## 3. AI Blog Content Keywords

### 3.1 High-Volume Educational Topics

| Topic Cluster | Target Keywords | Content Frequency |
|---------------|-----------------|-------------------|
| **Gut Health** | gut microbiome testing, SIBO treatment, leaky gut syndrome | 2x/month |
| **Hormones** | hormone optimization, bioidentical hormones, thyroid function | 2x/month |
| **Fatigue** | chronic fatigue causes, adrenal fatigue, mitochondrial dysfunction | 1x/month |
| **Longevity** | healthspan vs lifespan, longevity medicine, anti-aging science | 2x/month |
| **Inflammation** | chronic inflammation, inflammatory markers, anti-inflammatory diet | 1x/month |

### 3.2 AI Content Calendar Keywords

```javascript
// Weekly AI blog topics with keyword focus
const aiContentCalendar = {
  week1: {
    topic: 'Functional Medicine Education',
    keywords: [
      'what is functional medicine',
      'functional medicine vs conventional',
      'root cause analysis health'
    ],
    localModifier: 'wisconsin'
  },
  
  week2: {
    topic: 'Condition Deep Dive',
    keywords: [
      'chronic [condition] treatment',
      '[condition] functional medicine approach',
      'natural [condition] remedies'
    ],
    localModifier: 'milwaukee area'
  },
  
  week3: {
    topic: 'Latest Research',
    keywords: [
      '[topic] new research 2025',
      'latest [topic] studies',
      'evidence based [topic]'
    ],
    sources: ['PubMed', 'JAMA', 'Nature']
  },
  
  week4: {
    topic: 'Practical Application',
    keywords: [
      'how to improve [health aspect]',
      '[health goal] guide',
      '[symptom] solutions'
    ],
    ctaFocus: 'consultation'
  }
}
```

---

## 4. Local SEO Keywords

### 4.1 Location + Service Combinations

```
Primary Combinations:
- functional medicine + mequon
- functional medicine + milwaukee  
- direct primary care + mequon
- direct primary care + milwaukee
- integrative medicine + north shore
- holistic doctor + ozaukee county

Neighborhood Targeting:
- functional medicine + whitefish bay
- integrative doctor + shorewood
- direct primary care + river hills
- membership medicine + cedarburg
```

### 4.2 "Near Me" Optimization

**Mobile-First Keywords (72.9% mobile traffic):**
- functional medicine near me
- direct primary care near me
- integrative doctor near me
- holistic primary care near me
- root cause doctor near me

---

## 5. Competitive Keywords

### 5.1 Competitor Comparison Keywords

| Competitor | Target Keywords | Content Strategy |
|------------|----------------|------------------|
| **vs Mequon Wellness** | mequon wellness alternative, functional medicine no hidden fees | Comparison page |
| **vs Traditional Care** | primary care without insurance, alternative to insurance | Education page |
| **vs Concierge** | direct primary care vs concierge, affordable membership medicine | FAQ page |

### 5.2 Branded Keywords
- lotus direct care
- dr aaron rosenberg
- dr rosenberg mequon
- lotus functional medicine
- lotus direct care reviews

---

## 6. Question Keywords (Featured Snippets)

### 6.1 High-Intent Questions

```javascript
const featuredSnippetTargets = {
  what: [
    'what is functional medicine',
    'what is direct primary care',
    'what causes chronic fatigue',
    'what is root cause medicine'
  ],
  
  how: [
    'how does direct primary care work',
    'how much does functional medicine cost',
    'how to find root cause of illness',
    'how to optimize hormones naturally'
  ],
  
  why: [
    'why functional medicine works',
    'why choose direct primary care',
    'why am i always tired',
    'why conventional medicine fails chronic illness'
  ],
  
  cost: [
    'functional medicine cost wisconsin',
    'direct primary care pricing',
    'dpc membership fees',
    'functional medicine insurance coverage'
  ]
}
```

### 6.2 FAQ Schema Opportunities

```html
<!-- Structured data for FAQ rich results -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "How much does functional medicine cost?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "At Lotus Direct Care, functional medicine is included in your monthly membership starting at $165/month for individuals."
    }
  }]
}
</script>
```

---

## 7. Content Optimization Guidelines

### 7.1 On-Page SEO Template

```markdown
# [Primary Keyword] | [Secondary Keyword] - Lotus Direct Care

Meta Description: [Primary keyword] in [Location]. [Unique value prop]. [Trust signal]. Call [Phone] or book online.

## [H2 with Primary Keyword naturally included]

[First paragraph must include primary keyword within first 100 words]

### [H3 with related LSI keywords]

[Content sections with semantic variations]

Location mentions: Every 300-400 words
Internal links: 2-3 per 1000 words
External links: 1-2 authoritative sources
```

### 7.2 AI Blog Optimization Prompts

```javascript
// Prompts for AI content generation with SEO
const seoOptimizedPrompts = {
  primary: `Write about ${keyword} for a functional medicine practice in ${location}. 
           Include these related terms naturally: ${lsiKeywords.join(', ')}`,
  
  local: `Mention ${location} and surrounding areas (${nearbyAreas}) 2-3 times naturally.
          Include "near me" variations for mobile search.`,
  
  structure: `Use this structure:
            - H1: Include primary keyword
            - H2s: Use question formats when possible
            - Include FAQ section with 3-5 common questions
            - Meta description: 155 chars with keyword
            - Target 1500-2000 words`,
  
  cta: `Include these CTAs:
        - Mid-content: Lead magnet related to topic
        - End: Schedule consultation
        - Sidebar: Newsletter signup`
}
```

---

## 8. Keyword Research Tools & Tracking

### 8.1 Research Tools Priority

```javascript
const keywordTools = {
  primary: {
    tool: 'Google Keyword Planner',
    use: 'Volume data for PPC keywords',
    frequency: 'Monthly'
  },
  
  competitive: {
    tool: 'Google Search Console',
    use: 'Actual search queries',
    frequency: 'Weekly'
  },
  
  content: {
    tool: 'Answer The Public',
    use: 'Question keywords for blog',
    frequency: 'Monthly'
  },
  
  local: {
    tool: 'Google Trends',
    use: 'Local interest comparison',
    frequency: 'Quarterly'
  }
}
```

### 8.2 Keyword Tracking Dashboard

```javascript
// Keywords to track weekly
const trackingPriorities = {
  mustRankTop3: [
    'functional medicine mequon',
    'dr aaron rosenberg',
    'lotus direct care'
  ],
  
  targetPage1: [
    'functional medicine milwaukee',
    'direct primary care wisconsin',
    'integrative medicine near me'
  ],
  
  growthOpportunities: [
    'chronic fatigue treatment wisconsin',
    'hormone doctor milwaukee',
    'root cause medicine'
  ],
  
  longTail: [
    // Track 20-30 long-tail keywords
    // Focus on those generating traffic
  ]
}
```

---

## 9. Local SEO Implementation

### 9.1 Google My Business Optimization

```javascript
const gmbOptimization = {
  primaryCategory: 'Medical Clinic',
  additionalCategories: [
    'Family Practice Physician',
    'Internist',
    'Alternative Medicine Practitioner'
  ],
  
  keywords: {
    businessName: 'Lotus Direct Care - Functional Medicine',
    description: 'Include all primary keywords naturally',
    services: 'List with keyword-rich descriptions',
    posts: 'Weekly posts targeting different keywords'
  }
}
```

### 9.2 Local Landing Pages

```
Structure for each location page:

/locations/milwaukee/
- Title: Functional Medicine Milwaukee | Lotus Direct Care
- H1: Premier Functional Medicine Serving Milwaukee
- Content: Why Milwaukee residents choose us
- Testimonials: From Milwaukee patients
- Directions: From major Milwaukee landmarks
- CTA: Schedule your Milwaukee consultation
```

---

## 10. Content Production Schedule

### 10.1 Month 1: Foundation
**Week 1-2:** Core service pages with primary keywords
**Week 3-4:** Location pages for top 5 cities

### 10.2 Month 2-3: AI Content Ramp-Up
**Weekly:** 2-3 AI-generated blog posts
**Topics:** Rotate through keyword clusters
**Focus:** Long-tail condition keywords

### 10.3 Month 4-6: Scale & Optimize
**Content:** 3-4 posts weekly
**Testing:** A/B test titles and meta descriptions
**Expansion:** Add more location pages
**Refinement:** Update based on Search Console data

---

## 11. Competitor Keyword Gaps

### 11.1 Uncontested Opportunities

```javascript
const blueOceanKeywords = [
  // No competition
  'evidence based functional medicine wisconsin',
  'ifm certified doctor milwaukee',
  'functional medicine membership program',
  'root cause medicine mequon',
  
  // Low competition
  'longevity medicine wisconsin',
  'addiction medicine primary care',
  'executive health optimization milwaukee',
  'microbiome testing mequon'
]
```

### 11.2 Quick Win Keywords

**Target these first (low competition, decent volume):**
1. functional medicine mequon (50-100/mo)
2. dpc wisconsin (30-50/mo)
3. dr aaron rosenberg (20-30/mo)
4. root cause medicine wisconsin (30-50/mo)
5. membership medicine mequon (10-20/mo)

---

## SEO Keyword Summary

This simplified keyword strategy focuses on:

1. **Dominating local searches** for functional medicine
2. **Creating AI content** for condition-based keywords  
3. **Capturing "near me" mobile searches** (72.9% of traffic)
4. **Building topical authority** through consistent blogging
5. **Converting high-intent searches** to leads

Priority: Get homepage ranking for main keywords, then scale with AI-generated content targeting long-tail opportunities.