# Appendix E: Analytics Implementation - Simplified Version
## Lotus Direct Care Website PRD

### Executive Summary
Streamlined analytics implementation focused on lead generation, SEO performance, and conversion optimization. No HIPAA compliance needed as all patient data is handled through external systems.

---

## 1. Analytics Architecture Overview

### 1.1 Simplified Analytics Stack

```
┌─────────────────────────────────────────────────────────────┐
│                    Data Collection                           │
│        Google Analytics 4 + Google Tag Manager              │
└───────────────┬────────────────────────┬────────────────────┘
                │                        │
┌───────────────▼──────────┐  ┌─────────▼────────────────────┐
│   Lead Tracking          │  │   SEO Performance            │
│ - Form Submissions       │  │ - Organic Traffic            │
│ - Phone Clicks          │  │ - Keyword Rankings           │
│ - External Link Clicks  │  │ - Blog Performance           │
└──────────────────────────┘  └──────────────────────────────┘
                │                        │
┌───────────────▼────────────────────────▼────────────────────┐
│                 Reporting & Optimization                     │
│    GA4 Dashboard | Search Console | Conversion Reports      │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 Key Metrics Focus

```javascript
const primaryMetrics = {
  // Lead Generation
  leadCapture: {
    formSubmissions: 'Primary conversion metric',
    phoneClicks: 'Mobile engagement indicator',
    externalBookingClicks: 'Scheduling intent'
  },
  
  // SEO Performance
  organicGrowth: {
    traffic: 'Monthly organic visitors',
    keywords: 'Ranking positions',
    blogEngagement: 'AI content performance'
  },
  
  // User Behavior
  engagement: {
    timeOnSite: 'Content quality indicator',
    pagesPerSession: 'Site exploration',
    bounceRate: 'Landing page effectiveness'
  }
};
```

---

## 2. Google Analytics 4 Setup

### 2.1 Account Configuration

```javascript
// GA4 Configuration for Next.js
// app/components/GoogleAnalytics.tsx

'use client'

import Script from 'next/script'

export default function GoogleAnalytics() {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
            debug_mode: ${process.env.NODE_ENV === 'development'}
          });
        `}
      </Script>
    </>
  )
}
```

### 2.2 Event Tracking Configuration

```javascript
// lib/analytics.ts
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Predefined events for consistency
export const analyticsEvents = {
  // Lead Generation Events
  leadFormSubmit: (formName: string) => 
    trackEvent('generate_lead', 'engagement', formName),
  
  leadFormStart: (formName: string) =>
    trackEvent('form_start', 'engagement', formName),
  
  // Phone Tracking
  phoneClick: (location: string) =>
    trackEvent('phone_click', 'engagement', location),
  
  // External Links
  externalLinkClick: (destination: string) =>
    trackEvent('external_link', 'engagement', destination),
  
  // Content Engagement
  blogRead: (title: string, readTime: number) =>
    trackEvent('blog_read', 'content', title, readTime),
  
  scrollDepth: (depth: number) =>
    trackEvent('scroll', 'engagement', `${depth}%`),
  
  // Navigation
  ctaClick: (ctaText: string, location: string) =>
    trackEvent('cta_click', 'navigation', `${ctaText} - ${location}`)
}
```

### 2.3 Enhanced Ecommerce for Lead Value

```javascript
// Track lead value through the funnel
export const trackLeadValue = {
  // View membership options
  viewMembership: () => {
    gtag('event', 'view_item', {
      currency: 'USD',
      value: 165.00,
      items: [{
        item_id: 'DPC_MEMBERSHIP',
        item_name: 'Direct Primary Care Membership',
        item_category: 'Healthcare',
        price: 165.00,
        quantity: 1
      }]
    })
  },
  
  // Begin lead capture
  beginSignup: () => {
    gtag('event', 'begin_checkout', {
      currency: 'USD',
      value: 165.00,
      items: [{
        item_id: 'DPC_MEMBERSHIP',
        item_name: 'Direct Primary Care Membership',
        price: 165.00
      }]
    })
  },
  
  // Complete lead capture
  completeLead: (leadSource: string) => {
    gtag('event', 'generate_lead', {
      currency: 'USD',
      value: 165.00, // Monthly membership value
      lead_source: leadSource
    })
  }
}
```

---

## 3. Google Tag Manager Implementation

### 3.1 Container Setup

```javascript
// GTM Container Configuration
const gtmContainerConfig = {
  containerId: 'GTM-XXXXXX',
  
  // Tags to implement
  tags: [
    {
      name: 'GA4 Configuration',
      type: 'GA4 Config',
      measurementId: 'G-XXXXXXXXXX'
    },
    {
      name: 'Lead Form Submission',
      type: 'GA4 Event',
      eventName: 'generate_lead',
      parameters: {
        lead_type: '{{Form ID}}',
        lead_source: '{{Page Path}}'
      }
    },
    {
      name: 'Phone Click Tracking',
      type: 'GA4 Event',
      eventName: 'phone_click',
      parameters: {
        click_location: '{{Click Classes}}',
        device_type: '{{Device Type}}'
      }
    }
  ],
  
  // Triggers
  triggers: [
    {
      name: 'Lead Form Submit',
      type: 'Form Submission',
      formId: 'lead-capture-form'
    },
    {
      name: 'Phone Number Click',
      type: 'Link Click',
      linkUrl: 'tel:*'
    },
    {
      name: 'External Booking Click',
      type: 'Link Click',
      linkUrl: 'elationemr.com|hint.com'
    }
  ],
  
  // Variables
  variables: [
    {
      name: 'Form ID',
      type: 'Form ID'
    },
    {
      name: 'Device Type',
      type: 'JavaScript Variable',
      javascript: 'function() { return /Mobile|Android/i.test(navigator.userAgent) ? "mobile" : "desktop"; }'
    }
  ]
}
```

### 3.2 Custom HTML Tags for Advanced Tracking

```html
<!-- Scroll Depth Tracking -->
<script>
(function() {
  var depths = [25, 50, 75, 90, 100];
  var depthsReached = [];
  
  function trackScroll() {
    var scrollPercent = (window.scrollY + window.innerHeight) / document.body.scrollHeight * 100;
    
    depths.forEach(function(depth) {
      if (scrollPercent >= depth && depthsReached.indexOf(depth) === -1) {
        depthsReached.push(depth);
        dataLayer.push({
          'event': 'scroll_depth',
          'percent_scrolled': depth
        });
      }
    });
  }
  
  window.addEventListener('scroll', trackScroll);
})();
</script>

<!-- Time on Page Engagement -->
<script>
(function() {
  var engagementTimes = [30, 60, 120, 180]; // seconds
  var startTime = Date.now();
  
  engagementTimes.forEach(function(time) {
    setTimeout(function() {
      dataLayer.push({
        'event': 'time_on_page',
        'engagement_time': time
      });
    }, time * 1000);
  });
})();
</script>
```

---

## 4. Lead Tracking Implementation

### 4.1 Form Tracking Component

```typescript
// components/TrackedLeadForm.tsx
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { analyticsEvents } from '@/lib/analytics'

export function TrackedLeadForm({ formName }: { formName: string }) {
  const { register, handleSubmit, watch } = useForm()
  
  // Track form starts
  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (type === 'change' && Object.keys(value).length === 1) {
        analyticsEvents.leadFormStart(formName)
      }
    })
    return () => subscription.unsubscribe()
  }, [watch, formName])
  
  const onSubmit = async (data: any) => {
    try {
      // Send to API
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      
      if (response.ok) {
        // Track successful submission
        analyticsEvents.leadFormSubmit(formName)
        trackLeadValue.completeLead(formName)
        
        // Facebook Pixel (if implemented)
        if (window.fbq) {
          window.fbq('track', 'Lead', {
            value: 165.00,
            currency: 'USD',
            content_name: formName
          })
        }
      }
    } catch (error) {
      console.error('Form submission error:', error)
    }
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Form fields */}
    </form>
  )
}
```

### 4.2 Phone Click Tracking

```typescript
// components/TrackedPhoneLink.tsx
import { analyticsEvents } from '@/lib/analytics'

export function TrackedPhoneLink({ 
  location 
}: { 
  location: string 
}) {
  const phoneNumber = '262-XXX-XXXX'
  
  const handleClick = () => {
    analyticsEvents.phoneClick(location)
    
    // Additional tracking for mobile vs desktop
    const isMobile = /Mobile|Android/i.test(navigator.userAgent)
    gtag('event', 'conversion', {
      'send_to': 'AW-XXXXXXXXX/XXXXXXXXX', // Google Ads conversion
      'value': isMobile ? 50.0 : 25.0, // Higher value for mobile
      'currency': 'USD'
    })
  }
  
  return (
    <a 
      href={`tel:${phoneNumber}`}
      onClick={handleClick}
      className="phone-link"
    >
      {phoneNumber}
    </a>
  )
}
```

---

## 5. SEO Performance Tracking

### 5.1 Search Console Integration

```javascript
// Weekly SEO performance check
const seoTracking = {
  // Core metrics to monitor
  metrics: [
    'clicks',
    'impressions', 
    'ctr',
    'position'
  ],
  
  // Key pages to track
  pages: [
    '/',
    '/functional-medicine',
    '/direct-primary-care',
    '/blog/*'
  ],
  
  // Target keywords
  queries: [
    'functional medicine mequon',
    'direct primary care wisconsin',
    'dr aaron rosenberg',
    'integrative medicine milwaukee'
  ]
}

// Automated reporting setup
const searchConsoleReports = {
  weekly: {
    metrics: ['clicks', 'impressions', 'position'],
    dimensions: ['query', 'page'],
    filters: ['country == USA']
  },
  
  monthly: {
    metrics: ['clicks', 'ctr'],
    dimensions: ['page', 'device'],
    comparison: 'previous_period'
  }
}
```

### 5.2 Blog Performance Analytics

```typescript
// AI blog content tracking
export const trackBlogPerformance = {
  // Track AI-generated content
  articleView: (article: {
    title: string,
    author: string,
    aiModel: string,
    keywords: string[]
  }) => {
    gtag('event', 'page_view', {
      page_title: article.title,
      content_type: 'ai_blog',
      content_author: article.author,
      ai_model: article.aiModel,
      target_keywords: article.keywords.join(',')
    })
  },
  
  // Engagement metrics
  articleEngagement: (title: string, metrics: {
    timeOnPage: number,
    scrollDepth: number,
    ctaClicks: number
  }) => {
    gtag('event', 'article_engagement', {
      article_title: title,
      read_time: metrics.timeOnPage,
      scroll_depth: metrics.scrollDepth,
      engagement_score: calculateEngagementScore(metrics)
    })
  }
}

function calculateEngagementScore(metrics: any): number {
  // Weighted engagement score
  const timeScore = Math.min(metrics.timeOnPage / 180, 1) * 0.4
  const scrollScore = (metrics.scrollDepth / 100) * 0.4
  const ctaScore = Math.min(metrics.ctaClicks / 3, 1) * 0.2
  
  return Math.round((timeScore + scrollScore + ctaScore) * 100)
}
```

---

## 6. Conversion Optimization Tracking

### 6.1 A/B Testing Framework

```typescript
// Simple A/B testing implementation
export class ABTest {
  constructor(
    public testName: string,
    public variants: string[],
    public successMetric: string
  ) {}
  
  getVariant(): string {
    // Check if user already has variant
    const saved = localStorage.getItem(`ab_${this.testName}`)
    if (saved) return saved
    
    // Assign random variant
    const variant = this.variants[Math.floor(Math.random() * this.variants.length)]
    localStorage.setItem(`ab_${this.testName}`, variant)
    
    // Track assignment
    gtag('event', 'ab_test_assignment', {
      test_name: this.testName,
      variant: variant
    })
    
    return variant
  }
  
  trackSuccess(): void {
    const variant = localStorage.getItem(`ab_${this.testName}`)
    gtag('event', 'ab_test_success', {
      test_name: this.testName,
      variant: variant,
      success_metric: this.successMetric
    })
  }
}

// Example test
const ctaTest = new ABTest(
  'hero_cta_text',
  ['Schedule Consultation', 'Get Started Today', 'Book Your Visit'],
  'lead_form_submit'
)
```

### 6.2 Conversion Funnel Tracking

```javascript
// Define conversion funnel steps
const conversionFunnel = {
  steps: [
    { name: 'page_view', value: 1 },
    { name: 'scroll_50', value: 2 },
    { name: 'cta_click', value: 5 },
    { name: 'form_start', value: 10 },
    { name: 'form_submit', value: 50 },
    { name: 'external_booking', value: 100 }
  ],
  
  trackStep: function(stepName: string) {
    const step = this.steps.find(s => s.name === stepName)
    if (step) {
      gtag('event', 'funnel_progress', {
        funnel_step: step.name,
        funnel_value: step.value
      })
    }
  }
}
```

---

## 7. Dashboard & Reporting

### 7.1 GA4 Custom Dashboards

```javascript
// Executive Dashboard Configuration
const executiveDashboard = {
  cards: [
    {
      metric: 'Total Leads',
      event: 'generate_lead',
      period: 'last_30_days',
      comparison: 'previous_period'
    },
    {
      metric: 'Lead Conversion Rate',
      calculation: 'generate_lead / sessions',
      goal: 0.15, // 15%
      format: 'percentage'
    },
    {
      metric: 'Organic Traffic',
      source: 'organic',
      period: 'last_30_days',
      trend: true
    },
    {
      metric: 'Blog Engagement',
      events: ['blog_read', 'article_engagement'],
      aggregation: 'average'
    }
  ]
}

// Marketing Dashboard
const marketingDashboard = {
  reports: [
    {
      name: 'Lead Sources',
      dimensions: ['source', 'medium'],
      metrics: ['generate_lead', 'conversion_rate'],
      visualization: 'pie_chart'
    },
    {
      name: 'Content Performance',
      dimensions: ['page_title'],
      metrics: ['page_views', 'engagement_rate', 'generate_lead'],
      filter: 'content_type == blog',
      sort: 'generate_lead DESC'
    },
    {
      name: 'Device Performance',
      dimensions: ['device_category'],
      metrics: ['sessions', 'conversion_rate', 'bounce_rate'],
      comparison: true
    }
  ]
}
```

### 7.2 Automated Alerts

```javascript
// GA4 Intelligence Alerts
const alertConfigurations = [
  {
    name: 'Lead Drop Alert',
    condition: 'generate_lead decreases by 25%',
    period: 'daily',
    notification: 'email'
  },
  {
    name: 'Traffic Spike',
    condition: 'sessions increases by 200%',
    period: 'hourly',
    notification: 'email'
  },
  {
    name: 'High Bounce Rate',
    condition: 'bounce_rate > 70%',
    segment: 'organic traffic',
    notification: 'email'
  },
  {
    name: 'Blog Success',
    condition: 'blog engagement_score > 80',
    period: 'weekly',
    notification: 'slack'
  }
]
```

---

## 8. Privacy-Compliant Implementation

### 8.1 Cookie Consent

```typescript
// components/CookieConsent.tsx
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  
  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent')
    if (!consent) {
      setShowBanner(true)
      // Default to no tracking until consent
      gtag('consent', 'default', {
        'analytics_storage': 'denied',
        'ad_storage': 'denied'
      })
    }
  }, [])
  
  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'accepted')
    gtag('consent', 'update', {
      'analytics_storage': 'granted',
      'ad_storage': 'granted'
    })
    setShowBanner(false)
  }
  
  const handleDecline = () => {
    localStorage.setItem('cookie_consent', 'declined')
    setShowBanner(false)
  }
  
  if (!showBanner) return null
  
  return (
    <Card className="fixed bottom-0 left-0 right-0 p-4 m-4">
      <p>We use cookies to improve your experience and analyze site traffic.</p>
      <div className="mt-4 space-x-4">
        <Button onClick={handleAccept}>Accept</Button>
        <Button variant="outline" onClick={handleDecline}>Decline</Button>
      </div>
    </Card>
  )
}
```

### 8.2 Data Retention

```javascript
// Analytics data retention settings
const dataRetentionPolicy = {
  ga4: {
    eventData: 14, // months
    userData: 14,  // months
    
    // Exclude sensitive parameters
    excludeParams: [
      'email',
      'phone',
      'last_name',
      'full_name'
    ]
  },
  
  localStorage: {
    leadData: 0, // Don't store locally
    preferences: 365, // days
    abTests: 90 // days
  }
}
```

---

## 9. Implementation Checklist

### 9.1 Week 1: Foundation
- [ ] Install GA4 and GTM
- [ ] Configure basic page view tracking
- [ ] Set up lead form tracking
- [ ] Implement phone click tracking
- [ ] Configure Search Console

### 9.2 Week 2: Advanced Tracking
- [ ] Add scroll depth tracking
- [ ] Implement engagement timing
- [ ] Set up external link tracking
- [ ] Configure conversion funnels
- [ ] Create custom events

### 9.3 Week 3: Reporting
- [ ] Build GA4 dashboards
- [ ] Set up automated alerts
- [ ] Configure weekly reports
- [ ] Create conversion reports
- [ ] Test all tracking

### 9.4 Ongoing: Optimization
- [ ] A/B test implementation
- [ ] Blog performance tracking
- [ ] SEO monitoring
- [ ] Conversion optimization
- [ ] Regular audits

---

## Analytics Summary

This simplified analytics implementation provides:

1. **Complete lead tracking** without HIPAA concerns
2. **SEO performance monitoring** for organic growth
3. **Blog effectiveness measurement** for AI content
4. **Conversion optimization** tools
5. **Privacy-compliant** tracking

Focus remains on driving and measuring lead generation while building organic traffic through AI-powered content.