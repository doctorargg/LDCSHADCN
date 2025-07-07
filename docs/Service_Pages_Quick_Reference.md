# Service Pages Quick Reference
## All Service Pages for Lotus Direct Care Website

### Complete Service Menu Structure

```
app/
└── services/
    ├── functional-medicine/
    │   └── page.tsx
    ├── direct-primary-care/
    │   └── page.tsx
    ├── integrative-therapies/
    │   └── page.tsx
    ├── longevity-medicine/
    │   └── page.tsx
    ├── addiction-medicine/
    │   └── page.tsx
    ├── ketamine-therapy/
    │   └── page.tsx          [NEW - See Ketamine_Therapy_Page_Spec.md]
    └── prp-therapy/
        └── page.tsx          [NEW - See PRP_Therapy_Page_Spec.md]
```

### Navigation Menu Order

1. **Functional Medicine** - Root cause approach
2. **Direct Primary Care** - Membership model explained
3. **Integrative Therapies** - Best of both worlds
4. **Longevity Medicine** - Optimization and healthspan
5. **Addiction Medicine** - MAT and recovery support
6. **Ketamine Therapy** - Mental health and pain
7. **PRP Therapy** - Regenerative medicine

### URL Structure

- `/services/functional-medicine`
- `/services/direct-primary-care`
- `/services/integrative-therapies`
- `/services/longevity-medicine`
- `/services/addiction-medicine`
- `/services/ketamine-therapy`
- `/services/prp-therapy`

### Homepage Services Grid

The homepage should display all 7 services in a responsive grid:

```typescript
const services = [
  {
    title: "Functional Medicine",
    description: "Discover and treat the root causes of chronic illness",
    href: "/services/functional-medicine",
    icon: "stethoscope" // lucide-react icon
  },
  {
    title: "Direct Primary Care",
    description: "Healthcare membership with unlimited access",
    href: "/services/direct-primary-care",
    icon: "users"
  },
  {
    title: "Integrative Therapies",
    description: "Combining conventional and natural approaches",
    href: "/services/integrative-therapies",
    icon: "heart-handshake"
  },
  {
    title: "Longevity Medicine",
    description: "Optimize your healthspan, not just lifespan",
    href: "/services/longevity-medicine",
    icon: "activity"
  },
  {
    title: "Addiction Medicine",
    description: "Compassionate, evidence-based recovery support",
    href: "/services/addiction-medicine",
    icon: "shield-check"
  },
  {
    title: "Ketamine Therapy",
    description: "Breakthrough treatment for depression and pain",
    href: "/services/ketamine-therapy",
    icon: "brain"
  },
  {
    title: "PRP Therapy",
    description: "Natural regenerative therapy for healing",
    href: "/services/prp-therapy",
    icon: "sparkles"
  }
];
```

### Mobile Navigation

For mobile menu, consider grouping:

**Primary Services**
- Functional Medicine
- Direct Primary Care
- Integrative Therapies

**Specialized Treatments**
- Longevity Medicine
- Addiction Medicine
- Ketamine Therapy
- PRP Therapy

### Consistent Elements Across All Service Pages

1. **Header Image**: Lotus flower from `/public/lotus-header.jpg`
2. **Lead Capture Form**: Using `<LeadCaptureForm />` component
3. **External Booking Links**: Elation EMR integration
4. **Trust Elements**: Dr. Rosenberg's credentials
5. **Mobile Sticky CTA**: Bottom button on mobile
6. **FAQ Section**: Using Shadcn Accordion
7. **Related Services**: Cross-linking between pages

### SEO Keywords by Service

1. **Functional Medicine**: "functional medicine mequon", "root cause medicine wisconsin"
2. **Direct Primary Care**: "dpc wisconsin", "membership medicine mequon"
3. **Integrative**: "integrative medicine milwaukee", "holistic doctor mequon"
4. **Longevity**: "longevity medicine wisconsin", "healthspan optimization"
5. **Addiction**: "addiction medicine mequon", "MAT wisconsin"
6. **Ketamine**: "ketamine therapy mequon", "ketamine treatment wisconsin"
7. **PRP**: "prp therapy mequon", "platelet rich plasma wisconsin"

### Implementation Order

1. ✅ Core services likely already built
2. ⏳ Add Ketamine Therapy page using spec
3. ⏳ Add PRP Therapy page using spec
4. ⏳ Update navigation menu
5. ⏳ Update homepage service grid
6. ⏳ Add to sitemap
7. ⏳ Create service-specific blog content

---

## Quick Commands for Claude Code

To build the new pages, tell Claude Code:

```
"Using the Ketamine_Therapy_Page_Spec.md file in the docs folder, build the complete ketamine therapy service page with all sections, maintaining consistency with other service pages"
```

```
"Using the PRP_Therapy_Page_Spec.md file in the docs folder, build the complete PRP therapy service page with all sections, maintaining consistency with other service pages"
```

```
"Update the main navigation menu to include all 7 services, with Ketamine Therapy and PRP Therapy added to the list"
```

```
"Update the homepage services grid to display all 7 services including Ketamine and PRP"
```