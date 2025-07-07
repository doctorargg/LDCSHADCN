# Lotus Image Implementation Guide
## Consistent Visual Branding Across All Pages

### Image Setup

**Required Image in Public Folder:**
```
public/
├── lotus-header.jpg    (Main header image - 1920x600px recommended)
├── lotus-icon.png      (Small icon version - 64x64px)
└── lotus-logo.svg      (Vector logo if available)
```

### Consistent Header Implementation

Every service page should use this exact header structure:

```typescript
import Image from 'next/image'

// Consistent header component for all service pages
export function ServicePageHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="relative h-[300px] md:h-[400px] w-full">
      {/* Lotus background image */}
      <Image
        src="/lotus-header.jpg"
        alt={`Lotus Direct Care - ${title}`}
        fill
        className="object-cover"
        priority
      />
      
      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
      
      {/* Text content */}
      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 md:mb-4">
            {title}
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  )
}
```

### Usage on Each Service Page

```typescript
// Ketamine Therapy Page
<ServicePageHeader 
  title="Ketamine Therapy"
  subtitle="Evidence-based treatment for depression, anxiety, and chronic pain"
/>

// PRP Therapy Page
<ServicePageHeader 
  title="PRP Therapy"
  subtitle="Harness your body's natural healing power with platelet-rich plasma"
/>

// Functional Medicine Page
<ServicePageHeader 
  title="Functional Medicine"
  subtitle="Discover and treat the root causes of chronic illness"
/>

// Direct Primary Care Page
<ServicePageHeader 
  title="Direct Primary Care"
  subtitle="Healthcare the way it should be - personal, accessible, affordable"
/>

// Add similar headers for all other service pages...
```

### Fallback if Lotus Image Not Available

If the lotus image isn't ready yet, use a gradient placeholder:

```typescript
// Temporary gradient header while waiting for lotus image
export function ServicePageHeaderTemp({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="relative h-[300px] md:h-[400px] w-full bg-gradient-to-br from-teal-600 to-teal-800">
      {/* Decorative pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 md:mb-4">
            {title}
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  )
}
```

### Small Lotus Icon Usage

For section dividers or bullet points:

```typescript
// Section divider with lotus
<div className="flex items-center justify-center my-12">
  <Image 
    src="/lotus-icon.png" 
    alt="Lotus" 
    width={32} 
    height={32}
    className="opacity-20"
  />
</div>

// Or as a decorative element
<div className="relative">
  <h2 className="text-3xl font-bold mb-6">Our Approach</h2>
  <Image 
    src="/lotus-icon.png" 
    alt="" 
    width={48} 
    height={48}
    className="absolute -top-2 -left-12 opacity-10"
  />
</div>
```

### Optimization Notes

1. **Image Sizing**: Keep header image under 200KB for fast loading
2. **Format**: Use `.jpg` for photos, `.svg` for logos
3. **Alt Text**: Always include descriptive alt text
4. **Priority Loading**: Use `priority` prop on above-fold images
5. **Responsive**: Image looks good on all screen sizes

### Color Coordination

The lotus image should work with your brand colors:
- Teal (#006B6B) - Primary brand color
- Make sure lotus image doesn't clash
- Consider teal-tinted overlay if needed

### Instructions for Claude Code

Tell Claude Code:
```
"Create a reusable ServicePageHeader component that displays the lotus-header.jpg image from the public folder with a gradient overlay and text. Use this component consistently across all service pages."
```

```
"Ensure all service pages import and use the ServicePageHeader component with appropriate titles and subtitles for visual consistency."
```

### Quick Test

To verify image is working:
1. Place `lotus-header.jpg` in `/public` folder
2. Check it displays at `http://localhost:3000/lotus-header.jpg`
3. Implement ServicePageHeader component
4. Use on all service pages

This ensures perfect visual consistency across your entire site!