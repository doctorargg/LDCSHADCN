# Appendix B: Technical Specifications - Simplified Version
## Lotus Direct Care Website PRD

### Executive Summary
Technical specifications for a streamlined, SEO-optimized medical website with AI-powered blog automation, external service integrations, and shadcn UI components. No HIPAA compliance required as all patient data is handled externally.

---

## 1. System Architecture

### 1.1 Simplified Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend                              │
│          Next.js 14 + Shadcn UI + Tailwind CSS             │
│                    TypeScript + React                        │
└─────────────────┬───────────────────────────┬───────────────┘
                  │                           │
┌─────────────────▼─────────┐   ┌────────────▼────────────────┐
│      API Routes           │   │     Static Assets           │
│  - Lead Capture           │   │  - Images (WebP)            │
│  - Blog Management        │   │  - Fonts                    │
│  - AI Content Gen         │   │  - JSON-LD                  │
└─────────────┬─────────────┘   └─────────────────────────────┘
              │
┌─────────────▼─────────────────────────────────────────────┐
│                    Backend Services                        │
├───────────────────────────┬───────────────────────────────┤
│   AI Blog Engine          │        Integrations          │
│ - Firecrawl API          │    - Zapier Webhooks        │
│ - Claude/OpenAI/Gemini   │    - External Links         │
│ - Content Pipeline       │    - Analytics (GA4)        │
└───────────────────────────┴───────────────────────────────┘
                            │
┌───────────────────────────▼───────────────────────────────┐
│                      Database                              │
│               PostgreSQL (Supabase/Neon)                   │
│          Blog Posts | Leads | Content Sources             │
└───────────────────────────────────────────────────────────┘
```

### 1.2 Technology Stack

```typescript
// Tech stack configuration
const techStack = {
  frontend: {
    framework: 'Next.js 14 (App Router)',
    ui: 'Shadcn UI',
    styling: 'Tailwind CSS',
    language: 'TypeScript',
    animations: 'Framer Motion',
    icons: 'Lucide React'
  },
  
  backend: {
    runtime: 'Node.js 20 LTS',
    api: 'Next.js API Routes',
    ai: ['Claude SDK', 'OpenAI SDK', 'Gemini SDK'],
    scraping: 'Firecrawl API',
    webhooks: 'Zapier Integration'
  },
  
  database: {
    primary: 'PostgreSQL (Supabase)',
    orm: 'Prisma',
    caching: 'Next.js ISR'
  },
  
  deployment: {
    platform: 'Vercel',
    cdn: 'Cloudflare',
    monitoring: 'Vercel Analytics'
  }
};
```

---

## 2. Frontend Implementation

### 2.1 Project Structure

```
lotus-direct-care/
├── app/
│   ├── (marketing)/
│   │   ├── page.tsx              # Homepage
│   │   ├── about/page.tsx
│   │   ├── services/
│   │   │   ├── functional-medicine/page.tsx
│   │   │   ├── direct-primary-care/page.tsx
│   │   │   └── [service]/page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   └── contact/page.tsx
│   ├── admin/
│   │   ├── dashboard/page.tsx
│   │   ├── blog/
│   │   │   ├── new/page.tsx
│   │   │   └── edit/[id]/page.tsx
│   │   └── settings/page.tsx
│   ├── api/
│   │   ├── lead/route.ts
│   │   ├── blog/
│   │   │   ├── generate/route.ts
│   │   │   └── publish/route.ts
│   │   └── webhook/route.ts
│   └── layout.tsx
├── components/
│   ├── ui/                       # Shadcn UI components
│   ├── forms/
│   │   ├── LeadCaptureForm.tsx
│   │   └── NewsletterForm.tsx
│   ├── blog/
│   │   ├── BlogCard.tsx
│   │   └── AIGenerator.tsx
│   └── layout/
│       ├── Header.tsx
│       └── Footer.tsx
├── lib/
│   ├── ai/
│   │   ├── claude.ts
│   │   ├── openai.ts
│   │   └── firecrawl.ts
│   └── utils.ts
└── prisma/
    └── schema.prisma
```

### 2.2 Shadcn UI Components Setup

```bash
# Initialize shadcn UI
npx shadcn-ui@latest init

# Install needed components
npx shadcn-ui@latest add button card form input select
npx shadcn-ui@latest add dialog sheet tabs toast
npx shadcn-ui@latest add dropdown-menu navigation-menu
npx shadcn-ui@latest add badge skeleton alert
```

### 2.3 Core Components Implementation

```tsx
// components/forms/LeadCaptureForm.tsx
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'

const formSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  interest: z.enum(['functional-medicine', 'membership', 'consultation', 'other'])
})

export function LeadCaptureForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      interest: 'consultation'
    }
  })
  
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      })
      
      if (response.ok) {
        toast({
          title: "Thank you for your interest!",
          description: "We'll be in touch within 24 hours.",
        })
        form.reset()
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again or call us directly.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Start Your Health Journey</CardTitle>
        <CardDescription>
          Schedule a free consultation to learn how we can help
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="john@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone (Optional)</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="(555) 123-4567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="interest"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>I'm interested in</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your interest" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="functional-medicine">Functional Medicine</SelectItem>
                      <SelectItem value="membership">Membership Information</SelectItem>
                      <SelectItem value="consultation">Free Consultation</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
              {isLoading ? 'Submitting...' : 'Get Started'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
```

---

## 3. AI Blog Automation System

### 3.1 Firecrawl Integration

```typescript
// lib/ai/firecrawl.ts
import { FirecrawlApp } from '@mendable/firecrawl-js';

const firecrawl = new FirecrawlApp({
  apiKey: process.env.FIRECRAWL_API_KEY!
});

export interface ContentSource {
  url: string;
  type: 'journal' | 'blog' | 'news';
  topics: string[];
}

export async function crawlMedicalSources() {
  const sources: ContentSource[] = [
    {
      url: 'https://pubmed.ncbi.nlm.nih.gov',
      type: 'journal',
      topics: ['functional medicine', 'longevity', 'microbiome']
    },
    {
      url: 'https://www.functionalmedicine.org/news',
      type: 'news',
      topics: ['functional medicine', 'integrative health']
    },
    {
      url: 'https://jamanetwork.com',
      type: 'journal',
      topics: ['evidence-based medicine', 'clinical research']
    }
  ];
  
  const results = [];
  
  for (const source of sources) {
    try {
      // Search for recent articles
      const searchResults = await firecrawl.search(
        `site:${source.url} ${source.topics.join(' OR ')} after:${getLastWeekDate()}`,
        { limit: 10 }
      );
      
      // Scrape full content of relevant articles
      for (const result of searchResults.data) {
        const content = await firecrawl.scrapeUrl(result.url, {
          formats: ['markdown', 'links'],
          onlyMainContent: true
        });
        
        results.push({
          source: source.url,
          url: result.url,
          title: result.title,
          content: content.data.markdown,
          links: content.data.links,
          crawledAt: new Date()
        });
      }
    } catch (error) {
      console.error(`Error crawling ${source.url}:`, error);
    }
  }
  
  return results;
}

function getLastWeekDate() {
  const date = new Date();
  date.setDate(date.getDate() - 7);
  return date.toISOString().split('T')[0];
}
```

### 3.2 AI Content Generation

```typescript
// lib/ai/claude.ts
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY!,
});

export async function generateBlogPost(
  research: string[],
  keywords: string[],
  topic: string
) {
  const systemPrompt = `You are Dr. Aaron Rosenberg, an IFM-certified functional medicine physician in Mequon, Wisconsin. 
  Write in a professional yet accessible tone that demonstrates expertise while remaining approachable. 
  Focus on evidence-based information and practical applications.
  Always cite sources when referencing research.`;
  
  const userPrompt = `Create a comprehensive blog post about ${topic}.
  
  Use these research findings:
  ${research.join('\n\n')}
  
  Target these SEO keywords naturally: ${keywords.join(', ')}
  
  Structure:
  1. Engaging introduction that addresses reader pain points
  2. Clear explanation of the topic
  3. Evidence from recent research
  4. Practical applications for patients
  5. Connection to functional medicine approach
  6. Call-to-action for consultation
  
  Length: 1500-2000 words
  Style: Educational, authoritative, but conversational
  Include: Meta description (155 chars), title tag, and 5 relevant tags`;
  
  const message = await anthropic.messages.create({
    model: 'claude-3-opus-20240229',
    max_tokens: 4000,
    temperature: 0.7,
    system: systemPrompt,
    messages: [
      {
        role: 'user',
        content: userPrompt
      }
    ]
  });
  
  return parseAIResponse(message.content);
}

function parseAIResponse(content: string) {
  // Extract structured data from AI response
  const titleMatch = content.match(/Title: (.+)/);
  const metaMatch = content.match(/Meta Description: (.+)/);
  const tagsMatch = content.match(/Tags: (.+)/);
  const bodyStart = content.indexOf('\n\n') + 2;
  
  return {
    title: titleMatch?.[1] || 'Untitled',
    metaDescription: metaMatch?.[1] || '',
    tags: tagsMatch?.[1]?.split(', ') || [],
    content: content.substring(bodyStart)
  };
}
```

### 3.3 Blog Admin Dashboard

```tsx
// app/admin/dashboard/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'
import { Loader2, FileText, TrendingUp, Calendar } from 'lucide-react'

export default function AdminDashboard() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [posts, setPosts] = useState([])
  const { toast } = useToast()
  
  async function generateNewPost() {
    setIsGenerating(true)
    
    try {
      const response = await fetch('/api/blog/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: 'longevity medicine',
          keywords: ['longevity medicine wisconsin', 'healthspan optimization'],
          aiModel: 'claude'
        })
      })
      
      const data = await response.json()
      
      toast({
        title: "Blog post generated!",
        description: "Review and edit before publishing.",
      })
      
      // Refresh posts list
      fetchPosts()
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsGenerating(false)
    }
  }
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">AI Blog Dashboard</h1>
      
      <Tabs defaultValue="posts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="posts">Blog Posts</TabsTrigger>
          <TabsTrigger value="generate">Generate New</TabsTrigger>
          <TabsTrigger value="sources">Content Sources</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="posts">
          <Card>
            <CardHeader>
              <CardTitle>Published & Draft Posts</CardTitle>
              <CardDescription>Manage your AI-generated content</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Posts list table */}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="generate">
          <Card>
            <CardHeader>
              <CardTitle>Generate New Post</CardTitle>
              <CardDescription>Use AI to create SEO-optimized content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select topic" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="functional-medicine">Functional Medicine</SelectItem>
                  <SelectItem value="longevity">Longevity Medicine</SelectItem>
                  <SelectItem value="gut-health">Gut Health</SelectItem>
                  <SelectItem value="hormones">Hormone Optimization</SelectItem>
                </SelectContent>
              </Select>
              
              <Input placeholder="Target keywords (comma separated)" />
              
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="AI Model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="claude">Claude 3 Opus</SelectItem>
                  <SelectItem value="gpt4">GPT-4</SelectItem>
                  <SelectItem value="gemini">Gemini Pro</SelectItem>
                </SelectContent>
              </Select>
              
              <Button 
                onClick={generateNewPost} 
                disabled={isGenerating}
                className="w-full"
              >
                {isGenerating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isGenerating ? 'Generating...' : 'Generate Blog Post'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
```

---

## 4. API Routes Implementation

### 4.1 Lead Capture API

```typescript
// app/api/lead/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const leadSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  interest: z.string()
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = leadSchema.parse(body)
    
    // Save to database
    const lead = await prisma.lead.create({
      data: validatedData
    })
    
    // Send to Zapier webhook
    await fetch(process.env.ZAPIER_WEBHOOK_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...validatedData,
        source: 'website',
        timestamp: new Date().toISOString()
      })
    })
    
    return NextResponse.json({ success: true, id: lead.id })
  } catch (error) {
    console.error('Lead capture error:', error)
    return NextResponse.json(
      { error: 'Failed to capture lead' },
      { status: 500 }
    )
  }
}
```

### 4.2 Blog Generation API

```typescript
// app/api/blog/generate/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { crawlMedicalSources } from '@/lib/ai/firecrawl'
import { generateBlogPost } from '@/lib/ai/claude'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { topic, keywords, aiModel } = await request.json()
    
    // Step 1: Crawl recent medical sources
    const sources = await crawlMedicalSources()
    const relevantContent = sources
      .filter(s => s.content.toLowerCase().includes(topic.toLowerCase()))
      .map(s => s.content)
      .slice(0, 5) // Top 5 relevant sources
    
    // Step 2: Generate blog post
    const blogPost = await generateBlogPost(relevantContent, keywords, topic)
    
    // Step 3: Save to database
    const post = await prisma.blogPost.create({
      data: {
        title: blogPost.title,
        slug: generateSlug(blogPost.title),
        content: blogPost.content,
        metaDescription: blogPost.metaDescription,
        keywords: keywords,
        status: 'draft',
        aiModel: aiModel,
        sourceUrls: sources.map(s => s.url)
      }
    })
    
    return NextResponse.json({ 
      success: true, 
      postId: post.id,
      post: blogPost 
    })
  } catch (error) {
    console.error('Blog generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate blog post' },
      { status: 500 }
    )
  }
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
```

---

## 5. SEO Implementation

### 5.1 Next.js SEO Configuration

```typescript
// app/layout.tsx
import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://lotusdirectcare.com'),
  title: {
    default: 'Lotus Direct Care | Functional Medicine & Direct Primary Care in Mequon, WI',
    template: '%s | Lotus Direct Care'
  },
  description: 'Evidence-based functional medicine with Dr. Aaron Rosenberg. Direct primary care membership for personalized healthcare in Mequon, Wisconsin.',
  keywords: ['functional medicine mequon', 'direct primary care wisconsin', 'dr aaron rosenberg'],
  authors: [{ name: 'Dr. Aaron Rosenberg' }],
  creator: 'Lotus Direct Care',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://lotusdirectcare.com',
    siteName: 'Lotus Direct Care',
    images: [{
      url: '/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Lotus Direct Care - Functional Medicine'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@lotusdirectcare',
    creator: '@draronrosenberg'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'MedicalClinic',
              name: 'Lotus Direct Care',
              image: 'https://lotusdirectcare.com/logo.png',
              '@id': 'https://lotusdirectcare.com',
              url: 'https://lotusdirectcare.com',
              telephone: '262-XXX-XXXX',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Your Address',
                addressLocality: 'Mequon',
                addressRegion: 'WI',
                postalCode: 'XXXXX',
                addressCountry: 'US'
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 43.2234,
                longitude: -87.9256
              },
              openingHoursSpecification: {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                opens: '08:00',
                closes: '17:00'
              },
              sameAs: [
                'https://www.facebook.com/lotusdirectcare',
                'https://www.instagram.com/lotusdirectcare',
                'https://www.linkedin.com/company/lotus-direct-care'
              ]
            })
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
```

### 5.2 Dynamic SEO for Blog Posts

```typescript
// app/blog/[slug]/page.tsx
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'

export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}): Promise<Metadata> {
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug }
  })
  
  if (!post) {
    return {
      title: 'Post Not Found'
    }
  }
  
  return {
    title: post.title,
    description: post.metaDescription,
    keywords: post.keywords,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      type: 'article',
      publishedTime: post.publishedAt?.toISOString(),
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.metaDescription,
    }
  }
}
```

---

## 6. Performance Optimization

### 6.1 Next.js Configuration

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lotusdirectcare.com'],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizeCss: true,
  },
  compress: true,
  poweredByHeader: false,
  
  // Generate static pages at build time
  output: 'standalone',
  
  // Optimize bundle size
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@sentry/node': '@sentry/browser',
      }
    }
    return config
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig
```

### 6.2 Image Optimization

```tsx
// components/OptimizedImage.tsx
import Image from 'next/image'

interface OptimizedImageProps {
  src: string
  alt: string
  width: number
  height: number
  priority?: boolean
}

export function OptimizedImage({ 
  src, 
  alt, 
  width, 
  height, 
  priority = false 
}: OptimizedImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      loading={priority ? 'eager' : 'lazy'}
      placeholder="blur"
      blurDataURL={`data:image/svg+xml;base64,...`} // Generated blur placeholder
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  )
}
```

---

## 7. Deployment Configuration

### 7.1 Vercel Deployment

```json
// vercel.json
{
  "buildCommand": "prisma generate && next build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "regions": ["cle1"],
  "functions": {
    "app/api/blog/generate/route.ts": {
      "maxDuration": 60
    }
  },
  "env": {
    "DATABASE_URL": "@database_url",
    "CLAUDE_API_KEY": "@claude_api_key",
    "OPENAI_API_KEY": "@openai_api_key",
    "FIRECRAWL_API_KEY": "@firecrawl_api_key",
    "ZAPIER_WEBHOOK_URL": "@zapier_webhook_url"
  },
  "crons": [
    {
      "path": "/api/cron/crawl-sources",
      "schedule": "0 9 * * *"
    }
  ]
}
```

### 7.2 Environment Variables

```bash
# .env.local
# Database
DATABASE_URL="postgresql://..."

# AI APIs
CLAUDE_API_KEY="sk-ant-..."
OPENAI_API_KEY="sk-..."
GEMINI_API_KEY="..."
FIRECRAWL_API_KEY="..."

# Integrations
ZAPIER_WEBHOOK_URL="https://hooks.zapier.com/..."
GA_MEASUREMENT_ID="G-..."

# External Service URLs
NEXT_PUBLIC_HINT_SIGNUP_URL="https://lotusdirectcare.hint.com/signup/membership/contacts"
NEXT_PUBLIC_ELATION_BOOKING_URL="https://app.elationemr.com/book/lotusdirectcare?appointment_types="
NEXT_PUBLIC_ELATION_MEET_GREET_URL="https://app.elationemr.com/book/lotusdirectcare/service-locations/933212881617143?appointment_types="
NEXT_PUBLIC_PATIENT_PORTAL_URL="https://app.elationpassport.com/passport/login/"
```

---

## Technical Implementation Summary

This simplified architecture provides:

1. **Streamlined Development** with Next.js 14 and Shadcn UI
2. **AI-Powered Content** via Firecrawl and LLM APIs
3. **Simple Lead Capture** with Zapier webhook integration
4. **External Service Links** for all patient data handling
5. **Optimized Performance** for SEO and conversions
6. **Easy Deployment** on Vercel with automated builds

No HIPAA compliance needed, no complex integrations, just a fast, SEO-optimized marketing website with AI content generation.