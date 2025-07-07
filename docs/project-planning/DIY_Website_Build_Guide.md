# DIY Website Build Guide - Zero to Launch
## Lotus Direct Care Website with AI Blog System

**Budget:** Your time + ~$50-100/month maximum  
**Tools:** Windsurf, Claude Code, and determination  
**Timeline:** Build as you go, launch when ready

---

## 1. The Ultra-Lean Stack

### 1.1 Everything Free or Cheap

```
Total Monthly Costs: $20-50
- Domain: $15/year (Namecheap)
- Hosting: $0 (Vercel free tier)
- Database: $0 (Supabase free tier)
- AI APIs: $20-50/month (usage-based)
- Everything else: FREE
```

### 1.2 Your DIY Tech Stack

```javascript
const diyStack = {
  // Frontend (All Free)
  framework: 'Next.js 14', // Free, easy with AI help
  ui: 'Shadcn UI', // Free, copy-paste components
  styling: 'Tailwind CSS', // Free, AI understands it well
  
  // Backend (All Free)
  database: 'Supabase', // 500MB free forever
  hosting: 'Vercel', // Generous free tier
  
  // AI Tools (Pay-as-you-go)
  blog: 'OpenAI GPT-3.5', // Cheap, good enough
  coding: 'Claude Code + Windsurf', // Your copilots
  
  // Marketing (All Free)
  analytics: 'Google Analytics 4',
  seo: 'Google Search Console',
  email: 'Resend.com', // 100 emails/day free
}
```

---

## 2. Phase 1: Basic Website (Weekend 1-2)

### 2.1 Day 1: Setup Everything

```bash
# In Windsurf terminal:
npx create-next-app@latest lotus-direct-care --typescript --tailwind --app
cd lotus-direct-care
npx shadcn-ui@latest init
```

**Get These Free Accounts:**
1. GitHub (code storage)
2. Vercel (hosting)
3. Supabase (database)
4. Resend (email)

### 2.2 Day 2: Homepage with Shadcn

```typescript
// Tell Claude Code: "Create a medical practice homepage using Shadcn UI with:
// - Hero section with lead capture form
// - Services grid
// - About preview
// - Contact info
// Make it look professional and medical"

// Claude will generate everything!
```

### 2.3 Quick Lead Capture

```typescript
// Super simple lead capture - no Zapier needed!
// app/api/lead/route.ts

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const data = await req.json();
  
  // Save to Supabase (free tier)
  const { error } = await supabase
    .from('leads')
    .insert([data]);
  
  // Email yourself (free)
  await resend.emails.send({
    from: 'website@yourdomain.com',
    to: 'dr.rosenberg@gmail.com',
    subject: 'New Lead!',
    html: `<p>New lead: ${data.email}</p>`
  });
  
  return Response.json({ success: true });
}
```

---

## 3. Phase 2: Service Pages (Weekend 3-4)

### 3.1 The Copy-Paste Approach

```typescript
// Create one perfect service page template
// Then copy-paste and modify for each service

// Tell Claude Code:
"Create a service page template with:
- SEO-optimized structure
- Educational content sections  
- Benefits list
- FAQ accordion from Shadcn
- Lead capture form
- External booking links"
```

### 3.2 External Links (No Integration Needed!)

```typescript
// Just use regular links - so simple!
<Button asChild size="lg">
  <a href="https://lotusdirectcare.hint.com/signup/membership/contacts" 
     target="_blank">
    Become a Member
  </a>
</Button>

<Button asChild variant="outline">
  <a href="https://app.elationemr.com/book/lotusdirectcare" 
     target="_blank">
    Book Appointment
  </a>
</Button>
```

---

## 4. Phase 3: AI Blog System (The Fun Part!)

### 4.1 Dirt-Cheap AI Setup

```typescript
// Use GPT-3.5 for blog posts - 10x cheaper than GPT-4
// $0.002 per 1K tokens ≈ $0.01 per blog post!

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // $5/month gets you ~500 posts!
});

async function generateBlogPost(topic: string) {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{
      role: "system",
      content: "You are Dr. Aaron Rosenberg, a functional medicine physician..."
    }, {
      role: "user", 
      content: `Write a 1500-word blog post about ${topic}...`
    }],
    temperature: 0.7,
  });
  
  return completion.choices[0].message.content;
}
```

### 4.2 Free Content Sources

```typescript
// Instead of expensive Firecrawl, use free sources:
const freeContentSources = {
  // RSS feeds (free)
  pubmed: 'https://pubmed.ncbi.nlm.nih.gov/rss/search/...',
  
  // Google Scholar Alerts (free)
  scholar: 'Set up email alerts, manually input interesting findings',
  
  // Direct scraping (free but manual)
  manual: 'Read interesting studies, paste key points into prompt'
}

// Or just generate from topics!
const weeklyTopics = [
  'gut microbiome and mental health',
  'mitochondrial dysfunction and fatigue',
  'hormone optimization for longevity',
  'inflammation and chronic disease'
];
```

### 4.3 Simple Blog Generator

```typescript
// app/admin/generate-blog/page.tsx
// A simple form just for you!

export default function GenerateBlog() {
  const [topic, setTopic] = useState('');
  const [keywords, setKeywords] = useState('');
  const [generating, setGenerating] = useState(false);
  
  async function handleGenerate() {
    setGenerating(true);
    
    const response = await fetch('/api/generate-blog', {
      method: 'POST',
      body: JSON.stringify({ topic, keywords })
    });
    
    const { content } = await response.json();
    
    // Save to Supabase
    await supabase.from('posts').insert({
      title: content.title,
      content: content.body,
      status: 'draft'
    });
    
    alert('Blog post generated! Check Supabase dashboard.');
    setGenerating(false);
  }
  
  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1>Generate Blog Post</h1>
      <Input 
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Topic (e.g., chronic fatigue syndrome)"
      />
      <Input
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
        placeholder="Keywords (e.g., fatigue treatment wisconsin)"
      />
      <Button onClick={handleGenerate} disabled={generating}>
        {generating ? 'Generating...' : 'Generate with AI'}
      </Button>
    </div>
  );
}
```

---

## 5. The Absolute Minimum Database

### 5.1 Two Tables is All You Need

```sql
-- Supabase SQL editor (run once)

-- Leads table
CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT,
  phone TEXT,
  message TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Blog posts table  
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  keywords TEXT,
  status TEXT DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT NOW(),
  published_at TIMESTAMP
);

-- That's it! No complex schemas needed.
```

### 5.2 Supabase = Your CMS

```typescript
// List all posts (for your blog page)
const { data: posts } = await supabase
  .from('posts')
  .select('*')
  .eq('status', 'published')
  .order('published_at', { ascending: false });

// Get single post
const { data: post } = await supabase
  .from('posts')
  .select('*')
  .eq('slug', params.slug)
  .single();
```

---

## 6. SEO on a Shoestring

### 6.1 Free SEO Tools Only

```typescript
// metadata.ts - Tell AI to generate these for each page
export const metadata: Metadata = {
  title: 'Functional Medicine Doctor in Mequon | Dr. Aaron Rosenberg',
  description: 'Evidence-based functional medicine...',
  keywords: ['functional medicine mequon', 'dr aaron rosenberg'],
}

// Free tools:
// - Google Search Console (monitor rankings)
// - Google Analytics 4 (track visitors)
// - Schema markup (copy from Schema.org)
// - XML sitemap (Next.js generates automatically)
```

### 6.2 DIY Local SEO

```javascript
// Just hardcode your schema - no fancy plugins needed
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "name": "Lotus Direct Care",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Your Address",
    "addressLocality": "Mequon",
    "addressRegion": "WI"
  },
  "telephone": "262-XXX-XXXX",
  "url": "https://lotusdirectcare.com"
}
</script>
```

---

## 7. Deployment - Keep It Simple

### 7.1 One-Command Deploy

```bash
# Connect to Vercel (one time)
vercel

# Deploy anytime
vercel --prod

# That's it! Your site is live.
```

### 7.2 Custom Domain

```
1. Buy domain on Namecheap ($15/year)
2. In Vercel dashboard: Add domain
3. Copy DNS settings to Namecheap
4. Wait 10 minutes
5. You're live with SSL!
```

---

## 8. Maintenance - Almost Zero

### 8.1 Weekly Tasks (30 minutes)
```
Monday Morning Routine:
1. Generate 1-2 blog posts with AI
2. Review and publish
3. Check leads in Supabase
4. Respond to inquiries
```

### 8.2 Monthly Tasks (1 hour)
```
First Monday of Month:
1. Check Google Search Console
2. Update any broken links
3. Generate monthly blog topics
4. Backup Supabase data (automatic)
```

---

## 9. Cost Breakdown - Real Numbers

### 9.1 One-Time Costs
```
Domain: $15 (annual)
Total: $15
```

### 9.2 Monthly Costs
```
Hosting (Vercel): $0 (free tier covers you)
Database (Supabase): $0 (500MB free)
OpenAI API: $5-20 (depending on usage)
Email (Resend): $0 (100/day free)
Total: $5-20/month
```

### 9.3 Optional Upgrades (Later)
```
Vercel Pro: $20/month (if you get tons of traffic)
Supabase Pro: $25/month (if you need more storage)
Better AI model: $20-50/month (GPT-4 for quality)
```

---

## 10. Building Order - Your Roadmap

### Week 1-2: Core Site
- [ ] Homepage with lead form
- [ ] About page
- [ ] Contact page
- [ ] Deploy to Vercel

### Week 3-4: Services  
- [ ] Functional Medicine page
- [ ] Direct Primary Care page
- [ ] Other service pages
- [ ] Add external booking links

### Week 5-6: Blog System
- [ ] Blog listing page
- [ ] Individual post pages
- [ ] Basic AI generator
- [ ] Write first 5 posts

### Week 7-8: Polish
- [ ] SEO optimization
- [ ] Mobile testing
- [ ] Speed optimization
- [ ] Launch!

---

## 11. Prompts for Claude Code/Windsurf

### Copy-Paste These Directly:

```
"Create a Next.js homepage for a functional medicine practice using Shadcn UI. Include a hero section with lead capture form, services grid with 5 services, about section preview, and contact information. Use a medical color scheme with teal and white."

"Add a simple lead capture API route that saves to Supabase and sends an email notification using Resend"

"Create a blog post template page that fetches content from Supabase and displays it with good typography"

"Add SEO metadata to all pages optimized for 'functional medicine mequon'"

"Create a simple admin page with a form to generate blog posts using OpenAI API"
```

---

## 12. Troubleshooting

### Common Issues:

**"Vercel build failing"**
```bash
# Usually missing environment variables
# Add to Vercel dashboard:
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
OPENAI_API_KEY=...
```

**"AI content sounds robotic"**
```javascript
// Better prompt:
"Write in a conversational, empathetic tone as if explaining to a friend who's struggling with their health. Use 'you' and 'your'. Include personal insights."
```

**"Site is slow"**
```bash
# Run Next.js analyzer
npm run analyze

# Usually too many imports
# Let Claude Code optimize
```

---

## You Can Do This!

Remember:
- Every feature doesn't need to be perfect on day 1
- AI assistants can write 90% of your code
- The free tiers are very generous
- You can always upgrade later
- Focus on launching, then iterate

Your medical expertise + AI coding assistance = A great website without the agency fees!

Start with `npx create-next-app` and build one page at a time. You've got this, Dr. R! 🚀