# DIY Technical Cheat Sheet
## Quick Reference for Building with AI Assistants

---

## 1. Project Setup Commands

```bash
# Start your project (run once)
npx create-next-app@latest lotus-direct-care --typescript --tailwind --app
cd lotus-direct-care

# Add Shadcn UI
npx shadcn-ui@latest init

# Install common components you'll need
npx shadcn-ui@latest add button card form input textarea
npx shadcn-ui@latest add select tabs dialog sheet
npx shadcn-ui@latest add accordion badge skeleton

# Install other essentials
npm install @supabase/supabase-js
npm install resend
npm install openai
npm install lucide-react
```

---

## 2. File Structure - Keep It Simple

```
lotus-direct-care/
├── app/
│   ├── page.tsx                    # Homepage
│   ├── about/page.tsx             # About page
│   ├── services/
│   │   ├── functional-medicine/page.tsx
│   │   └── direct-primary-care/page.tsx
│   ├── blog/
│   │   ├── page.tsx               # Blog listing
│   │   └── [slug]/page.tsx        # Individual posts
│   ├── contact/page.tsx           # Contact page
│   ├── api/
│   │   ├── lead/route.ts          # Lead capture
│   │   └── generate-blog/route.ts # AI blog generation
│   └── admin/
│       └── blog/page.tsx          # Your secret blog generator
├── components/
│   ├── ui/                        # Shadcn components (auto-generated)
│   ├── LeadForm.tsx              # Reusable lead form
│   ├── Header.tsx                # Site header
│   └── Footer.tsx                # Site footer
└── lib/
    ├── supabase.ts               # Database connection
    └── openai.ts                 # AI connection
```

---

## 3. Essential Code Snippets

### 3.1 Supabase Connection
```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
```

### 3.2 Lead Form Component
```typescript
// components/LeadForm.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

export function LeadForm() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    
    await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name })
    })
    
    alert('Thanks! I\'ll be in touch within 24 hours.')
    setEmail('')
    setName('')
    setLoading(false)
  }
  
  return (
    <Card className="p-6">
      <h3 className="text-xl font-bold mb-4">Start Your Health Journey</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Sending...' : 'Get Started'}
        </Button>
      </form>
    </Card>
  )
}
```

### 3.3 External Links Component
```typescript
// components/PatientLinks.tsx
import { Button } from '@/components/ui/button'

export function PatientLinks() {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Button asChild size="lg">
        <a 
          href="https://lotusdirectcare.hint.com/signup/membership/contacts"
          target="_blank"
          rel="noopener noreferrer"
        >
          Become a Member
        </a>
      </Button>
      
      <Button asChild variant="outline" size="lg">
        <a 
          href="https://app.elationemr.com/book/lotusdirectcare"
          target="_blank"
          rel="noopener noreferrer"
        >
          Book Appointment
        </a>
      </Button>
      
      <Button asChild variant="secondary" size="lg">
        <a 
          href="https://app.elationpassport.com/passport/login/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Patient Portal
        </a>
      </Button>
    </div>
  )
}
```

### 3.4 Blog Post Generator
```typescript
// app/api/generate-blog/route.ts
import OpenAI from 'openai'
import { supabase } from '@/lib/supabase'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!
})

export async function POST(req: Request) {
  const { topic, keywords } = await req.json()
  
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `You are Dr. Aaron Rosenberg, an IFM-certified functional medicine physician in Mequon, Wisconsin. Write in a professional yet conversational tone.`
      },
      {
        role: "user",
        content: `Write a 1500-word blog post about ${topic}. Include these keywords naturally: ${keywords}. Format with markdown.`
      }
    ],
    temperature: 0.7,
    max_tokens: 3000
  })
  
  const content = completion.choices[0].message.content
  
  // Extract title (first line after #)
  const titleMatch = content?.match(/^#\s+(.+)$/m)
  const title = titleMatch ? titleMatch[1] : topic
  
  // Create slug
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  
  // Save to Supabase
  await supabase.from('posts').insert({
    title,
    slug,
    content,
    keywords,
    status: 'draft'
  })
  
  return Response.json({ success: true, title, slug })
}
```

---

## 4. Environment Variables

### 4.1 Local Development (.env.local)
```bash
# Supabase (from your Supabase dashboard)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# OpenAI (from platform.openai.com)
OPENAI_API_KEY=sk-...

# Resend (from resend.com)
RESEND_API_KEY=re_...

# Your domain (for emails)
NEXT_PUBLIC_DOMAIN=http://localhost:3000
```

### 4.2 Production (Add to Vercel)
Same variables, but change:
```bash
NEXT_PUBLIC_DOMAIN=https://lotusdirectcare.com
```

---

## 5. SEO Quick Wins

### 5.1 Page Metadata Template
```typescript
// app/services/functional-medicine/page.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Functional Medicine Doctor in Mequon | Lotus Direct Care',
  description: 'Evidence-based functional medicine with Dr. Aaron Rosenberg. Find root causes of chronic illness. Serving Mequon and Milwaukee.',
  keywords: 'functional medicine mequon, root cause medicine wisconsin',
}

export default function FunctionalMedicinePage() {
  // Your page content
}
```

### 5.2 Simple Schema Markup
```typescript
// Add to app/layout.tsx head
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'MedicalBusiness',
      name: 'Lotus Direct Care',
      description: 'Functional medicine and direct primary care',
      url: 'https://lotusdirectcare.com',
      telephone: '262-XXX-XXXX',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Your Address',
        addressLocality: 'Mequon',
        addressRegion: 'WI',
        postalCode: 'XXXXX',
        addressCountry: 'US'
      }
    })
  }}
/>
```

---

## 6. Common AI Prompts for Building

### 6.1 For Claude Code/Windsurf

**Homepage Hero:**
```
Create a hero section for a medical website with:
- Large headline about functional medicine
- Subheadline explaining the benefit
- Lead capture form on the right
- Trust badges below
- Mobile responsive
- Use Shadcn UI components
```

**Service Page:**
```
Create a service page for "Functional Medicine" that includes:
- Hero section with page title
- What is functional medicine section
- Conditions we treat grid
- Our approach section
- FAQ using Shadcn accordion
- CTA to book consultation
- SEO optimized content
```

**Blog Listing:**
```
Create a blog listing page that:
- Fetches posts from Supabase
- Shows title, excerpt, date
- Has pagination
- Mobile responsive cards
- Link to individual posts
```

---

## 7. Deployment Checklist

### 7.1 Before First Deploy
- [ ] Remove all console.log statements
- [ ] Test all forms locally
- [ ] Check all external links work
- [ ] Add environment variables to Vercel
- [ ] Test mobile responsiveness

### 7.2 Vercel Deploy Commands
```bash
# First time setup
npm install -g vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod

# Link existing project
vercel link
```

---

## 8. Quick Fixes for Common Issues

### "Module not found"
```bash
npm install [missing-package]
```

### "Hydration error"
```typescript
// Wrap dynamic content in useEffect or use 'use client'
'use client'
```

### "Type error"
```typescript
// Add 'any' temporarily, fix later
const data: any = await fetch...
```

### "Build failed on Vercel"
```bash
# Check build logs for missing env vars
# Make sure all imports use correct case
# Remove unused imports
```

---

## 9. Performance Tips

### 9.1 Images
```typescript
// Always use Next.js Image
import Image from 'next/image'

<Image
  src="/doctor.jpg"
  alt="Dr. Rosenberg"
  width={400}
  height={300}
  className="rounded-lg"
/>
```

### 9.2 Fonts
```typescript
// In app/layout.tsx
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
```

---

## 10. Remember: Ship It!

**Perfectionism is the enemy of launch.**

Your version 1 needs:
- ✅ Homepage that captures leads
- ✅ Service pages that educate
- ✅ Links to booking/membership
- ✅ Basic blog functionality
- ✅ Mobile responsiveness

It doesn't need:
- ❌ Perfect code
- ❌ Every feature
- ❌ Complex animations
- ❌ Advanced analytics
- ❌ Perfect SEO (yet)

**Launch first, iterate forever!**

---

## Your Daily Workflow

1. **Morning (30 min)**
   - Ask Claude Code to build one component
   - Test it
   - Commit to GitHub

2. **Evening (30 min)**
   - Generate a blog post
   - Review and publish
   - Deploy to Vercel

3. **Weekend (2 hours)**
   - Build a full page
   - Fix any bugs
   - Plan next week

In 4-6 weeks of this, you'll have a fully functional website!

Remember: Every line of code you don't write is a line you don't have to maintain. Let AI do the heavy lifting! 🚀