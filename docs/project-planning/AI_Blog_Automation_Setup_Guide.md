# AI Blog Automation Setup Guide
## Lotus Direct Care Content Engine

**Purpose:** Step-by-step guide to implement an automated AI content generation system that creates SEO-optimized medical blog posts from authoritative sources.

---

## Table of Contents

1. [System Overview](#system-overview)
2. [API Setup & Configuration](#api-setup--configuration)
3. [Firecrawl Implementation](#firecrawl-implementation)
4. [LLM Integration](#llm-integration)
5. [Content Pipeline](#content-pipeline)
6. [Admin Dashboard](#admin-dashboard)
7. [Quality Control](#quality-control)
8. [Publishing Workflow](#publishing-workflow)
9. [SEO Optimization](#seo-optimization)
10. [Troubleshooting](#troubleshooting)

---

## 1. System Overview

### 1.1 Architecture Flow

```
Medical Sources → Firecrawl → Content Extraction → LLM Processing → 
Quality Check → SEO Optimization → Publishing Queue → Website
```

### 1.2 Key Components

```javascript
const aiSystemComponents = {
  discovery: {
    tool: 'Firecrawl',
    purpose: 'Crawl medical journals and trusted sources'
  },
  
  processing: {
    tools: ['Claude API', 'OpenAI API', 'Gemini API'],
    purpose: 'Generate high-quality medical content'
  },
  
  optimization: {
    tool: 'Custom SEO processor',
    purpose: 'Ensure content ranks well'
  },
  
  publishing: {
    tool: 'Next.js + PostgreSQL',
    purpose: 'Queue and publish content automatically'
  }
}
```

---

## 2. API Setup & Configuration

### 2.1 Required API Keys

```bash
# .env.local file
# AI APIs
CLAUDE_API_KEY=sk-ant-api03-...
OPENAI_API_KEY=sk-...
GOOGLE_AI_API_KEY=... # for Gemini

# Content Discovery
FIRECRAWL_API_KEY=fc-...

# Database
DATABASE_URL=postgresql://...

# Optional
SERPAPI_KEY=... # for competitor research
```

### 2.2 API Service Setup

```typescript
// lib/ai/config.ts
export const aiConfig = {
  claude: {
    apiKey: process.env.CLAUDE_API_KEY!,
    model: 'claude-3-opus-20240229',
    maxTokens: 4000,
    temperature: 0.7
  },
  
  openai: {
    apiKey: process.env.OPENAI_API_KEY!,
    model: 'gpt-4-turbo-preview',
    maxTokens: 4000,
    temperature: 0.7
  },
  
  gemini: {
    apiKey: process.env.GOOGLE_AI_API_KEY!,
    model: 'gemini-pro',
    maxTokens: 4000,
    temperature: 0.7
  },
  
  firecrawl: {
    apiKey: process.env.FIRECRAWL_API_KEY!,
    rateLimit: 100, // requests per minute
    timeout: 30000 // 30 seconds
  }
}
```

---

## 3. Firecrawl Implementation

### 3.1 Source Configuration

```typescript
// lib/ai/sources.ts
export const medicalSources = [
  {
    name: 'PubMed Central',
    url: 'https://www.ncbi.nlm.nih.gov/pmc/',
    type: 'journal',
    topics: ['functional medicine', 'integrative health', 'microbiome'],
    crawlFrequency: 'daily',
    maxArticles: 10
  },
  {
    name: 'IFM Articles',
    url: 'https://www.ifm.org/news-insights/',
    type: 'professional',
    topics: ['functional medicine', 'clinical insights'],
    crawlFrequency: 'weekly',
    maxArticles: 5
  },
  {
    name: 'JAMA Network',
    url: 'https://jamanetwork.com/journals/jama',
    type: 'journal',
    topics: ['clinical research', 'evidence-based medicine'],
    crawlFrequency: 'weekly',
    maxArticles: 5
  },
  {
    name: 'Nature Medicine',
    url: 'https://www.nature.com/nm/',
    type: 'journal',
    topics: ['longevity', 'aging', 'chronic disease'],
    crawlFrequency: 'weekly',
    maxArticles: 5
  },
  {
    name: 'Cell Metabolism',
    url: 'https://www.cell.com/cell-metabolism/home',
    type: 'journal',
    topics: ['metabolism', 'mitochondria', 'nutrition'],
    crawlFrequency: 'weekly',
    maxArticles: 3
  }
]
```

### 3.2 Crawling Implementation

```typescript
// lib/ai/crawler.ts
import { FirecrawlApp } from '@mendable/firecrawl-js';
import { medicalSources } from './sources';

const app = new FirecrawlApp({ apiKey: process.env.FIRECRAWL_API_KEY! });

export async function crawlMedicalContent() {
  const results = [];
  
  for (const source of medicalSources) {
    try {
      // Build search query
      const query = `site:${source.url} ${source.topics.join(' OR ')} after:${getDateRange(source.crawlFrequency)}`;
      
      // Search for recent content
      const searchResults = await app.search(query, {
        limit: source.maxArticles,
        scrapeOptions: {
          formats: ['markdown', 'links'],
          onlyMainContent: true
        }
      });
      
      // Process each result
      for (const result of searchResults.data) {
        // Skip if already processed
        if (await isAlreadyProcessed(result.url)) continue;
        
        // Extract full content
        const fullContent = await app.scrapeUrl(result.url, {
          formats: ['markdown'],
          onlyMainContent: true,
          waitFor: 2000 // Wait for dynamic content
        });
        
        results.push({
          source: source.name,
          url: result.url,
          title: result.title,
          content: fullContent.data.markdown,
          excerpt: result.excerpt,
          publishedDate: extractPublishDate(fullContent.data.markdown),
          topics: source.topics,
          crawledAt: new Date()
        });
      }
    } catch (error) {
      console.error(`Error crawling ${source.name}:`, error);
      // Continue with next source
    }
  }
  
  return results;
}

function getDateRange(frequency: string): string {
  const date = new Date();
  switch (frequency) {
    case 'daily':
      date.setDate(date.getDate() - 1);
      break;
    case 'weekly':
      date.setDate(date.getDate() - 7);
      break;
    case 'monthly':
      date.setMonth(date.getMonth() - 1);
      break;
  }
  return date.toISOString().split('T')[0];
}
```

---

## 4. LLM Integration

### 4.1 Claude Integration (Primary)

```typescript
// lib/ai/claude.ts
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY!,
});

export async function generateWithClaude(
  researchContent: string[],
  topic: string,
  keywords: string[]
) {
  const systemPrompt = `You are Dr. Aaron Rosenberg, an IFM-certified functional medicine physician writing for your practice website. Your writing style is:
  - Professional yet accessible
  - Evidence-based and scientific
  - Empathetic and patient-focused
  - Educational without being condescending
  
  Always cite research when making claims. Focus on practical applications for patients.`;
  
  const userPrompt = buildPrompt(researchContent, topic, keywords);
  
  try {
    const message = await anthropic.messages.create({
      model: 'claude-3-opus-20240229',
      max_tokens: 4000,
      temperature: 0.7,
      system: systemPrompt,
      messages: [{
        role: 'user',
        content: userPrompt
      }]
    });
    
    return parseResponse(message.content);
  } catch (error) {
    console.error('Claude API error:', error);
    throw error;
  }
}

function buildPrompt(research: string[], topic: string, keywords: string[]): string {
  return `Create a comprehensive blog post about "${topic}" for my functional medicine practice website.

Recent Research Findings:
${research.map((r, i) => `[${i + 1}] ${r}`).join('\n\n')}

Requirements:
1. Length: 1500-2000 words
2. Include these keywords naturally: ${keywords.join(', ')}
3. Structure:
   - Engaging introduction addressing patient pain points
   - What the latest research shows (cite sources)
   - The functional medicine approach
   - Practical steps patients can take
   - When to seek professional help
   - Clear call-to-action

4. Include:
   - Title (60 characters max)
   - Meta description (155 characters)
   - 5 relevant tags
   - 3-5 internal link suggestions

5. Tone: Professional but conversational, empathetic, evidence-based

Please format your response with clear sections for title, meta description, tags, and main content.`;
}
```

### 4.2 OpenAI Integration (Backup)

```typescript
// lib/ai/openai.ts
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function generateWithOpenAI(
  researchContent: string[],
  topic: string,
  keywords: string[]
) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: "You are Dr. Aaron Rosenberg, an IFM-certified functional medicine physician..."
        },
        {
          role: "user",
          content: buildPrompt(researchContent, topic, keywords)
        }
      ],
      temperature: 0.7,
      max_tokens: 4000
    });
    
    return parseResponse(completion.choices[0].message.content);
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw error;
  }
}
```

### 4.3 Response Parser

```typescript
// lib/ai/parser.ts
export interface ParsedBlogPost {
  title: string;
  metaDescription: string;
  tags: string[];
  content: string;
  internalLinks: string[];
  wordCount: number;
  readingTime: number;
}

export function parseResponse(aiResponse: string): ParsedBlogPost {
  // Extract sections using regex or string parsing
  const titleMatch = aiResponse.match(/Title:\s*(.+)/i);
  const metaMatch = aiResponse.match(/Meta Description:\s*(.+)/i);
  const tagsMatch = aiResponse.match(/Tags:\s*(.+)/i);
  const linksMatch = aiResponse.match(/Internal Links:\s*(.+)/i);
  
  // Find main content (everything after the metadata)
  const contentStart = aiResponse.search(/## |# /);
  const content = aiResponse.substring(contentStart).trim();
  
  // Calculate metrics
  const wordCount = content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200); // 200 words per minute
  
  return {
    title: titleMatch?.[1]?.trim() || 'Untitled',
    metaDescription: metaMatch?.[1]?.trim() || '',
    tags: tagsMatch?.[1]?.split(',').map(t => t.trim()) || [],
    content: content,
    internalLinks: linksMatch?.[1]?.split(',').map(l => l.trim()) || [],
    wordCount,
    readingTime
  };
}
```

---

## 5. Content Pipeline

### 5.1 Automated Pipeline

```typescript
// lib/ai/pipeline.ts
export async function runContentPipeline() {
  console.log('Starting content pipeline...');
  
  try {
    // Step 1: Crawl sources
    const crawledContent = await crawlMedicalContent();
    console.log(`Crawled ${crawledContent.length} articles`);
    
    // Step 2: Group by topic
    const topicGroups = groupByTopic(crawledContent);
    
    // Step 3: Generate blog posts
    const blogPosts = [];
    
    for (const [topic, articles] of Object.entries(topicGroups)) {
      // Skip if we recently wrote about this topic
      if (await hasRecentPost(topic, 7)) continue;
      
      // Extract key findings
      const research = articles
        .slice(0, 3) // Top 3 most relevant
        .map(a => extractKeyFindings(a.content));
      
      // Get keywords for this topic
      const keywords = await getTopicKeywords(topic);
      
      // Generate content
      const post = await generateBlogPost(research, topic, keywords);
      
      // Quality check
      if (await passesQualityCheck(post)) {
        blogPosts.push({
          ...post,
          topic,
          sources: articles.map(a => a.url),
          status: 'draft'
        });
      }
    }
    
    // Step 4: Save to database
    for (const post of blogPosts) {
      await saveBlogPost(post);
    }
    
    console.log(`Generated ${blogPosts.length} blog posts`);
    
  } catch (error) {
    console.error('Pipeline error:', error);
    // Send notification
    await notifyAdmin('Content pipeline failed', error);
  }
}

// Run pipeline on schedule
export function schedulePipeline() {
  // Daily at 9 AM
  cron.schedule('0 9 * * *', runContentPipeline);
}
```

### 5.2 Topic Management

```typescript
// lib/ai/topics.ts
export const contentTopics = [
  {
    name: 'Gut Health',
    keywords: ['microbiome', 'digestive health', 'SIBO', 'leaky gut'],
    frequency: 'biweekly',
    priority: 'high'
  },
  {
    name: 'Hormone Balance',
    keywords: ['thyroid', 'adrenal', 'testosterone', 'estrogen'],
    frequency: 'biweekly',
    priority: 'high'
  },
  {
    name: 'Chronic Fatigue',
    keywords: ['fatigue', 'energy', 'mitochondria', 'adrenal fatigue'],
    frequency: 'monthly',
    priority: 'medium'
  },
  {
    name: 'Longevity',
    keywords: ['aging', 'healthspan', 'longevity medicine', 'NAD+'],
    frequency: 'biweekly',
    priority: 'high'
  },
  {
    name: 'Inflammation',
    keywords: ['chronic inflammation', 'autoimmune', 'cytokines'],
    frequency: 'monthly',
    priority: 'medium'
  },
  {
    name: 'Mental Health',
    keywords: ['depression', 'anxiety', 'brain health', 'neurotransmitters'],
    frequency: 'monthly',
    priority: 'medium'
  }
];

export async function getTopicKeywords(topic: string): Promise<string[]> {
  const topicData = contentTopics.find(t => 
    t.name.toLowerCase().includes(topic.toLowerCase())
  );
  
  // Add location modifiers
  const locationKeywords = ['wisconsin', 'milwaukee', 'mequon'];
  
  return [
    ...(topicData?.keywords || []),
    ...locationKeywords.map(loc => `${topic} ${loc}`)
  ];
}
```

---

## 6. Admin Dashboard

### 6.1 Dashboard Interface

```tsx
// app/admin/blog/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function BlogDashboard() {
  const [posts, setPosts] = useState([])
  const [sources, setSources] = useState([])
  const [isGenerating, setIsGenerating] = useState(false)
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">AI Blog Management</h1>
      
      <div className="grid gap-6 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{posts.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Scheduled</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {posts.filter(p => p.status === 'scheduled').length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Published Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {posts.filter(p => isToday(p.publishedAt)).length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Avg. Reading Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {calculateAvgReadingTime(posts)} min
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="posts">
        <TabsList className="mb-4">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="generate">Generate</TabsTrigger>
          <TabsTrigger value="sources">Sources</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="posts">
          <PostsManager posts={posts} />
        </TabsContent>
        
        <TabsContent value="generate">
          <ContentGenerator onGenerate={handleGenerate} />
        </TabsContent>
        
        <TabsContent value="sources">
          <SourcesManager sources={sources} />
        </TabsContent>
        
        <TabsContent value="settings">
          <AISettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}
```

### 6.2 Content Generator Component

```tsx
// components/admin/ContentGenerator.tsx
export function ContentGenerator({ onGenerate }) {
  const [config, setConfig] = useState({
    topic: '',
    keywords: '',
    aiModel: 'claude',
    tone: 'professional',
    length: '1500-2000'
  })
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate New Content</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Topic</Label>
          <Select value={config.topic} onValueChange={(v) => 
            setConfig({...config, topic: v})
          }>
            <SelectTrigger>
              <SelectValue placeholder="Select topic" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gut-health">Gut Health</SelectItem>
              <SelectItem value="hormones">Hormone Balance</SelectItem>
              <SelectItem value="fatigue">Chronic Fatigue</SelectItem>
              <SelectItem value="longevity">Longevity Medicine</SelectItem>
              <SelectItem value="custom">Custom Topic</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label>Target Keywords</Label>
          <Input 
            value={config.keywords}
            onChange={(e) => setConfig({...config, keywords: e.target.value})}
            placeholder="functional medicine mequon, gut health wisconsin"
          />
        </div>
        
        <div>
          <Label>AI Model</Label>
          <RadioGroup value={config.aiModel} onValueChange={(v) => 
            setConfig({...config, aiModel: v})
          }>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="claude" id="claude" />
              <Label htmlFor="claude">Claude 3 Opus (Best Quality)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="gpt4" id="gpt4" />
              <Label htmlFor="gpt4">GPT-4 (Alternative)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="gemini" id="gemini" />
              <Label htmlFor="gemini">Gemini Pro (Fast)</Label>
            </div>
          </RadioGroup>
        </div>
        
        <Button 
          onClick={() => onGenerate(config)} 
          className="w-full"
          disabled={!config.topic}
        >
          Generate Blog Post
        </Button>
      </CardContent>
    </Card>
  )
}
```

---

## 7. Quality Control

### 7.1 Automated Quality Checks

```typescript
// lib/ai/quality.ts
export async function qualityCheck(post: ParsedBlogPost): Promise<QualityReport> {
  const checks = {
    // Length check
    lengthOk: post.wordCount >= 1200 && post.wordCount <= 2500,
    
    // SEO checks
    titleLength: post.title.length <= 60,
    metaLength: post.metaDescription.length <= 155,
    keywordDensity: await checkKeywordDensity(post),
    
    // Content quality
    readability: await checkReadability(post.content),
    medicalAccuracy: await checkMedicalClaims(post.content),
    
    // Formatting
    hasHeaders: checkHeaders(post.content),
    hasIntro: checkIntroduction(post.content),
    hasCTA: checkCallToAction(post.content),
    
    // Originality
    plagiarism: await checkPlagiarism(post.content),
    aiDetection: await checkAIDetection(post.content)
  };
  
  const score = calculateQualityScore(checks);
  
  return {
    passed: score >= 80,
    score,
    checks,
    recommendations: generateRecommendations(checks)
  };
}

function calculateQualityScore(checks: any): number {
  const weights = {
    lengthOk: 10,
    titleLength: 5,
    metaLength: 5,
    keywordDensity: 15,
    readability: 20,
    medicalAccuracy: 20,
    hasHeaders: 10,
    hasIntro: 5,
    hasCTA: 5,
    plagiarism: 5
  };
  
  let score = 0;
  for (const [check, weight] of Object.entries(weights)) {
    if (checks[check]) score += weight;
  }
  
  return score;
}
```

### 7.2 Manual Review Interface

```tsx
// components/admin/PostReview.tsx
export function PostReview({ post, onApprove, onReject }) {
  const [edits, setEdits] = useState(post.content)
  const [feedback, setFeedback] = useState('')
  
  return (
    <div className="grid grid-cols-2 gap-6">
      <div>
        <h3 className="font-semibold mb-2">Original</h3>
        <div className="prose max-w-none">
          <div dangerouslySetInnerHTML={{ __html: marked(post.content) }} />
        </div>
      </div>
      
      <div>
        <h3 className="font-semibold mb-2">Edit</h3>
        <Textarea
          value={edits}
          onChange={(e) => setEdits(e.target.value)}
          className="min-h-[600px] font-mono text-sm"
        />
      </div>
      
      <div className="col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Quality Checks</CardTitle>
          </CardHeader>
          <CardContent>
            <QualityChecklist post={post} />
          </CardContent>
        </Card>
        
        <div className="mt-4 flex gap-4">
          <Button onClick={() => onApprove(edits)}>
            Approve & Publish
          </Button>
          <Button variant="outline" onClick={() => onReject(feedback)}>
            Request Revision
          </Button>
        </div>
      </div>
    </div>
  )
}
```

---

## 8. Publishing Workflow

### 8.1 Publishing Queue

```typescript
// lib/ai/publisher.ts
export class PublishingQueue {
  async addToQueue(post: BlogPost) {
    // Check publishing schedule
    const nextSlot = await this.getNextPublishingSlot();
    
    await prisma.blogPost.create({
      data: {
        ...post,
        status: 'scheduled',
        scheduledFor: nextSlot
      }
    });
  }
  
  async getNextPublishingSlot(): Promise<Date> {
    // Get optimal publishing times based on analytics
    const optimalTimes = [
      { day: 2, hour: 9 },  // Tuesday 9 AM
      { day: 4, hour: 9 },  // Thursday 9 AM
      { day: 2, hour: 14 }, // Tuesday 2 PM
    ];
    
    // Find next available slot
    const now = new Date();
    const scheduled = await prisma.blogPost.findMany({
      where: { status: 'scheduled' },
      select: { scheduledFor: true }
    });
    
    // Logic to find next free optimal slot
    return calculateNextSlot(now, optimalTimes, scheduled);
  }
  
  async publishScheduledPosts() {
    const due = await prisma.blogPost.findMany({
      where: {
        status: 'scheduled',
        scheduledFor: { lte: new Date() }
      }
    });
    
    for (const post of due) {
      await this.publishPost(post);
    }
  }
  
  private async publishPost(post: BlogPost) {
    try {
      // Update status
      await prisma.blogPost.update({
        where: { id: post.id },
        data: {
          status: 'published',
          publishedAt: new Date()
        }
      });
      
      // Trigger revalidation
      await fetch('/api/revalidate', {
        method: 'POST',
        body: JSON.stringify({ path: `/blog/${post.slug}` })
      });
      
      // Social media integration
      await this.shareToSocial(post);
      
      // Email newsletter
      await this.addToNewsletter(post);
      
    } catch (error) {
      console.error('Publishing error:', error);
      await this.notifyAdmin(post, error);
    }
  }
}
```

### 8.2 Cron Jobs

```typescript
// lib/cron/blog-automation.ts
import cron from 'node-cron';

export function initializeBlogAutomation() {
  // Daily content discovery (9 AM)
  cron.schedule('0 9 * * *', async () => {
    console.log('Running daily content discovery...');
    await runContentPipeline();
  });
  
  // Publishing check (every hour)
  cron.schedule('0 * * * *', async () => {
    const publisher = new PublishingQueue();
    await publisher.publishScheduledPosts();
  });
  
  // Weekly source audit (Mondays at 8 AM)
  cron.schedule('0 8 * * 1', async () => {
    await auditContentSources();
  });
  
  // Monthly analytics report
  cron.schedule('0 10 1 * *', async () => {
    await generateMonthlyReport();
  });
}
```

---

## 9. SEO Optimization

### 9.1 Automated SEO Enhancement

```typescript
// lib/ai/seo-optimizer.ts
export async function optimizeForSEO(post: BlogPost): Promise<BlogPost> {
  // 1. Title optimization
  post.title = await optimizeTitle(post.title, post.keywords);
  
  // 2. Meta description
  if (!post.metaDescription) {
    post.metaDescription = generateMetaDescription(post.content, post.keywords);
  }
  
  // 3. URL slug
  post.slug = generateSEOSlug(post.title);
  
  // 4. Internal linking
  post.content = await addInternalLinks(post.content);
  
  // 5. Image optimization
  post.content = await optimizeImages(post.content);
  
  // 6. Schema markup
  post.schema = generateArticleSchema(post);
  
  // 7. Related posts
  post.relatedPosts = await findRelatedPosts(post);
  
  return post;
}

async function addInternalLinks(content: string): Promise<string> {
  const linkOpportunities = [
    {
      keywords: ['functional medicine', 'root cause'],
      link: '/functional-medicine',
      anchor: 'functional medicine approach'
    },
    {
      keywords: ['membership', 'direct primary care'],
      link: '/direct-primary-care',
      anchor: 'direct primary care membership'
    },
    {
      keywords: ['Dr. Rosenberg', 'our approach'],
      link: '/about',
      anchor: 'Dr. Rosenberg\'s approach'
    }
  ];
  
  let updatedContent = content;
  
  for (const opportunity of linkOpportunities) {
    // Add links where keywords appear (max 1 per keyword)
    for (const keyword of opportunity.keywords) {
      const regex = new RegExp(`\\b${keyword}\\b(?![^<]*>)`, 'i');
      if (regex.test(updatedContent)) {
        updatedContent = updatedContent.replace(
          regex,
          `[${opportunity.anchor}](${opportunity.link})`
        );
        break; // Only one link per opportunity
      }
    }
  }
  
  return updatedContent;
}
```

### 9.2 Keyword Integration

```typescript
// lib/ai/keyword-optimizer.ts
export function integrateKeywords(
  content: string, 
  keywords: string[]
): string {
  // Calculate current density
  const density = calculateKeywordDensity(content, keywords);
  
  // Target 1-2% density
  const targetDensity = 0.015;
  const wordCount = content.split(/\s+/).length;
  const targetOccurrences = Math.floor(wordCount * targetDensity);
  
  let optimizedContent = content;
  
  for (const keyword of keywords) {
    const currentCount = countOccurrences(content, keyword);
    
    if (currentCount < targetOccurrences) {
      // Add keywords naturally
      optimizedContent = addKeywordNaturally(
        optimizedContent, 
        keyword, 
        targetOccurrences - currentCount
      );
    }
  }
  
  return optimizedContent;
}
```

---

## 10. Troubleshooting

### 10.1 Common Issues

```typescript
// lib/ai/troubleshooting.ts
export const commonIssues = {
  'API_RATE_LIMIT': {
    error: 'Rate limit exceeded',
    solution: 'Implement exponential backoff',
    code: `
      async function retryWithBackoff(fn, maxRetries = 3) {
        for (let i = 0; i < maxRetries; i++) {
          try {
            return await fn();
          } catch (error) {
            if (i === maxRetries - 1) throw error;
            await new Promise(r => setTimeout(r, Math.pow(2, i) * 1000));
          }
        }
      }
    `
  },
  
  'CONTENT_TOO_SHORT': {
    error: 'Generated content under 1200 words',
    solution: 'Adjust prompt to request more detail',
    code: `
      const enhancedPrompt = prompt + '\\n\\nIMPORTANT: Provide comprehensive detail with multiple examples and thorough explanations. The article must be at least 1500 words.';
    `
  },
  
  'DUPLICATE_CONTENT': {
    error: 'Similar post already exists',
    solution: 'Check for existing posts before generation',
    code: `
      async function checkDuplicates(title, topic) {
        const similar = await prisma.blogPost.findMany({
          where: {
            OR: [
              { title: { contains: title, mode: 'insensitive' } },
              { tags: { has: topic } }
            ],
            createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
          }
        });
        return similar.length > 0;
      }
    `
  }
};
```

### 10.2 Monitoring & Alerts

```typescript
// lib/ai/monitoring.ts
export class AIMonitor {
  async checkSystemHealth() {
    const health = {
      apis: await this.checkAPIs(),
      database: await this.checkDatabase(),
      queue: await this.checkQueue(),
      quality: await this.checkQuality()
    };
    
    if (!health.apis.healthy || !health.database.healthy) {
      await this.sendAlert('Critical: AI system unhealthy', health);
    }
    
    return health;
  }
  
  async checkAPIs() {
    const apis = ['claude', 'openai', 'firecrawl'];
    const results = {};
    
    for (const api of apis) {
      try {
        await this.pingAPI(api);
        results[api] = { healthy: true, latency: Date.now() };
      } catch (error) {
        results[api] = { healthy: false, error: error.message };
      }
    }
    
    return {
      healthy: Object.values(results).every(r => r.healthy),
      results
    };
  }
  
  async sendAlert(message: string, data: any) {
    // Email notification
    await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: `AI System Alert: ${message}`,
      html: `
        <h2>${message}</h2>
        <pre>${JSON.stringify(data, null, 2)}</pre>
        <p>Time: ${new Date().toISOString()}</p>
      `
    });
    
    // Slack notification (if configured)
    if (process.env.SLACK_WEBHOOK) {
      await fetch(process.env.SLACK_WEBHOOK, {
        method: 'POST',
        body: JSON.stringify({
          text: message,
          attachments: [{ text: JSON.stringify(data, null, 2) }]
        })
      });
    }
  }
}
```

---

## Best Practices Summary

### Do's ✅
1. **Cite sources** in every AI-generated article
2. **Review content** before publishing (even if briefly)
3. **Monitor API costs** - set up billing alerts
4. **Test prompts** thoroughly before automation
5. **Keep backups** of high-performing content
6. **Track performance** of AI vs human content
7. **Update sources** regularly for freshness

### Don'ts ❌
1. **Don't publish** without quality checks
2. **Don't ignore** API rate limits
3. **Don't skip** medical accuracy review
4. **Don't over-optimize** for keywords
5. **Don't rely** on single AI model
6. **Don't forget** internal linking
7. **Don't neglect** user engagement metrics

---

## Getting Started Checklist

- [ ] Obtain all required API keys
- [ ] Set up database schema
- [ ] Configure content sources
- [ ] Create admin dashboard
- [ ] Test content generation
- [ ] Implement quality checks
- [ ] Set up publishing queue
- [ ] Configure cron jobs
- [ ] Test full pipeline
- [ ] Monitor first week closely

This system will generate 8-12 high-quality, SEO-optimized blog posts per month automatically, establishing Lotus Direct Care as a thought leader in functional medicine.