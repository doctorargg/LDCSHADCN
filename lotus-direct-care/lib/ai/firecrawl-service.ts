import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';
import {
  WebScrapeRequest,
  WebScrapeResult,
  WebCrawlRequest,
  WebCrawlResult,
  WebSearchRequest,
  WebSearchResult,
  ContentExtractionRequest,
  ContentExtractionResult,
  RSSFeedMonitorRequest,
  RSSFeedResult,
  RSSFeedItem,
  MedicalWebsiteParseRequest,
  MedicalWebsiteParseResult,
  CachedContent,
  RateLimitConfig,
} from '../types/ai';
import {
  getExtractionTemplate,
  detectExtractionType,
  sanitizationRules,
  qualityIndicators,
} from './prompts/extraction-templates';

/**
 * Firecrawl API response types
 */
interface FirecrawlScrapeResponse {
  success: boolean;
  data?: {
    markdown?: string;
    html?: string;
    screenshot?: string;
    links?: string[];
    metadata?: {
      title?: string;
      description?: string;
      keywords?: string;
      author?: string;
      publishDate?: string;
      language?: string;
      sourceURL?: string;
    };
  };
  error?: string;
}

interface FirecrawlCrawlResponse {
  success: boolean;
  jobId?: string;
  error?: string;
}

interface FirecrawlSearchResponse {
  success: boolean;
  data?: Array<{
    title: string;
    url: string;
    description: string;
    markdown?: string;
    html?: string;
  }>;
  error?: string;
}

interface FirecrawlExtractResponse {
  success: boolean;
  data?: any;
  error?: string;
}

/**
 * Rate limiter implementation
 */
class RateLimiter {
  private requestCounts: Map<string, number[]> = new Map();
  private config: RateLimitConfig;

  constructor(config: RateLimitConfig) {
    this.config = config;
  }

  async checkLimit(key: string = 'default'): Promise<boolean> {
    const now = Date.now();
    const counts = this.requestCounts.get(key) || [];
    
    // Clean old entries
    const validCounts = counts.filter(timestamp => {
      const age = now - timestamp;
      return age < 86400000; // Keep last 24 hours
    });

    // Check limits
    const lastMinute = validCounts.filter(t => now - t < 60000).length;
    const lastHour = validCounts.filter(t => now - t < 3600000).length;
    const lastDay = validCounts.length;

    if (
      lastMinute >= this.config.maxRequestsPerMinute ||
      lastHour >= this.config.maxRequestsPerHour ||
      lastDay >= this.config.maxRequestsPerDay
    ) {
      // Check burst limit
      const recentRequests = validCounts.filter(t => now - t < 1000).length;
      if (recentRequests >= this.config.burstLimit) {
        return false;
      }
    }

    // Add current request
    validCounts.push(now);
    this.requestCounts.set(key, validCounts);
    return true;
  }

  async waitForLimit(key: string = 'default'): Promise<void> {
    while (!(await this.checkLimit(key))) {
      await new Promise(resolve => setTimeout(resolve, this.config.cooldownPeriod));
    }
  }
}

/**
 * Firecrawl service for web scraping and content extraction
 */
export class FirecrawlService {
  private static instance: FirecrawlService;
  private apiKey: string;
  private baseUrl: string = 'https://api.firecrawl.dev/v1';
  private supabase: any;
  private rateLimiter: RateLimiter;
  private cacheEnabled: boolean = true;
  private cacheDuration: number = 3600000; // 1 hour default

  private constructor() {
    this.apiKey = process.env.FIRECRAWL_API_KEY || '';
    
    if (!this.apiKey) {
      console.warn('FirecrawlService: FIRECRAWL_API_KEY not found in environment');
    }

    // Initialize Supabase for caching
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (supabaseUrl && supabaseKey) {
      this.supabase = createClient(supabaseUrl, supabaseKey);
    }

    // Initialize rate limiter
    this.rateLimiter = new RateLimiter({
      maxRequestsPerMinute: 60,
      maxRequestsPerHour: 500,
      maxRequestsPerDay: 5000,
      burstLimit: 10,
      cooldownPeriod: 1000,
    });
  }

  static getInstance(): FirecrawlService {
    if (!this.instance) {
      this.instance = new FirecrawlService();
    }
    return this.instance;
  }

  /**
   * Generate cache key for content
   */
  private generateCacheKey(type: string, identifier: string): string {
    return crypto
      .createHash('sha256')
      .update(`${type}:${identifier}`)
      .digest('hex');
  }

  /**
   * Get cached content
   */
  private async getCachedContent(
    type: string,
    identifier: string
  ): Promise<CachedContent | null> {
    if (!this.cacheEnabled || !this.supabase) {
      return null;
    }

    try {
      const cacheKey = this.generateCacheKey(type, identifier);
      const { data, error } = await this.supabase
        .from('ai_content_cache')
        .select('*')
        .eq('hash', cacheKey)
        .gte('expires_at', new Date().toISOString())
        .single();

      if (error || !data) {
        return null;
      }

      return {
        id: data.id,
        url: data.url,
        content: data.content,
        contentType: data.content_type,
        hash: data.hash,
        cachedAt: new Date(data.cached_at),
        expiresAt: new Date(data.expires_at),
        metadata: data.metadata,
      };
    } catch (error) {
      console.error('Error retrieving cached content:', error);
      return null;
    }
  }

  /**
   * Cache content
   */
  private async cacheContent(
    type: string,
    identifier: string,
    content: any,
    metadata?: Record<string, any>
  ): Promise<void> {
    if (!this.cacheEnabled || !this.supabase) {
      return;
    }

    try {
      const cacheKey = this.generateCacheKey(type, identifier);
      const expiresAt = new Date(Date.now() + this.cacheDuration);

      await this.supabase.from('ai_content_cache').upsert({
        url: identifier,
        hash: cacheKey,
        content_type: type,
        content: content,
        metadata: metadata,
        cached_at: new Date().toISOString(),
        expires_at: expiresAt.toISOString(),
      });
    } catch (error) {
      console.error('Error caching content:', error);
    }
  }

  /**
   * Make API request to Firecrawl
   */
  private async makeRequest<T>(
    endpoint: string,
    method: string = 'POST',
    body?: any
  ): Promise<T> {
    if (!this.apiKey) {
      throw new Error('Firecrawl API key not configured');
    }

    // Apply rate limiting
    await this.rateLimiter.waitForLimit();

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Firecrawl API error: ${response.status} - ${error}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Firecrawl API request error:', error);
      throw error;
    }
  }

  /**
   * Scrape a single web page
   */
  async scrapeUrl(request: WebScrapeRequest): Promise<WebScrapeResult> {
    try {
      // Check cache first
      const cached = await this.getCachedContent('scrape', request.url);
      if (cached) {
        console.log('Returning cached scrape for:', request.url);
        return cached.content as WebScrapeResult;
      }

      // Prepare Firecrawl request
      const firecrawlRequest: any = {
        url: request.url,
        formats: request.formats || ['markdown', 'html', 'metadata', 'links'],
      };

      if (request.waitFor) {
        firecrawlRequest.waitFor = request.waitFor;
      }

      if (request.screenshot || request.fullPage) {
        firecrawlRequest.formats.push(request.fullPage ? 'screenshot@fullPage' : 'screenshot');
      }

      if (request.actions && request.actions.length > 0) {
        firecrawlRequest.actions = request.actions.map(action => ({
          type: action.type,
          selector: action.selector,
          value: action.value,
          milliseconds: action.delay,
        }));
      }

      if (request.headers) {
        firecrawlRequest.headers = request.headers;
      }

      if (request.excludeSelectors) {
        firecrawlRequest.excludeTags = request.excludeSelectors;
      }

      if (request.includeSelectors) {
        firecrawlRequest.includeTags = request.includeSelectors;
      }

      // Make API request
      const response = await this.makeRequest<FirecrawlScrapeResponse>(
        '/scrape',
        'POST',
        firecrawlRequest
      );

      if (!response.success || !response.data) {
        throw new Error(response.error || 'Scraping failed');
      }

      // Prepare result
      const result: WebScrapeResult = {
        url: request.url,
        title: response.data.metadata?.title,
        markdown: response.data.markdown,
        html: response.data.html,
        screenshot: response.data.screenshot,
        links: response.data.links,
        metadata: {
          description: response.data.metadata?.description,
          keywords: response.data.metadata?.keywords?.split(',').map(k => k.trim()),
          author: response.data.metadata?.author,
          publishedDate: response.data.metadata?.publishDate,
          language: response.data.metadata?.language,
        },
        scrapedAt: new Date(),
        success: true,
      };

      // Cache the result
      await this.cacheContent('scrape', request.url, result);

      return result;
    } catch (error) {
      console.error('Error scraping URL:', error);
      return {
        url: request.url,
        scrapedAt: new Date(),
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Crawl a website
   */
  async crawlWebsite(request: WebCrawlRequest): Promise<WebCrawlResult> {
    try {
      const firecrawlRequest: any = {
        url: request.url,
        maxDepth: request.maxDepth || 2,
        limit: request.maxPages || 100,
        scrapeOptions: {
          formats: request.formats || ['markdown', 'html', 'links'],
        },
      };

      if (request.includePatterns) {
        firecrawlRequest.includePaths = request.includePatterns;
      }

      if (request.excludePatterns) {
        firecrawlRequest.excludePaths = request.excludePatterns;
      }

      if (request.waitFor) {
        firecrawlRequest.scrapeOptions.waitFor = request.waitFor;
      }

      // Start crawl job
      const response = await this.makeRequest<FirecrawlCrawlResponse>(
        '/crawl',
        'POST',
        firecrawlRequest
      );

      if (!response.success || !response.jobId) {
        throw new Error(response.error || 'Crawl initiation failed');
      }

      return {
        jobId: response.jobId,
        status: 'pending',
        startedAt: new Date(),
      };
    } catch (error) {
      console.error('Error starting crawl:', error);
      return {
        jobId: '',
        status: 'failed',
        startedAt: new Date(),
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Check crawl job status
   */
  async checkCrawlStatus(jobId: string): Promise<WebCrawlResult> {
    try {
      const response = await this.makeRequest<any>(
        `/crawl/${jobId}`,
        'GET'
      );

      const result: WebCrawlResult = {
        jobId,
        status: response.status || 'pending',
        startedAt: new Date(response.createdAt || Date.now()),
        totalPages: response.total,
        completedPages: response.completed,
      };

      if (response.status === 'completed') {
        result.completedAt = new Date();
        result.pages = response.data?.map((page: any) => ({
          url: page.url,
          title: page.metadata?.title,
          markdown: page.markdown,
          html: page.html,
          links: page.links,
          metadata: page.metadata,
          scrapedAt: new Date(),
          success: true,
        }));
      } else if (response.status === 'failed') {
        result.error = response.error || 'Crawl failed';
      }

      return result;
    } catch (error) {
      console.error('Error checking crawl status:', error);
      return {
        jobId,
        status: 'failed',
        startedAt: new Date(),
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Search the web and optionally scrape results
   */
  async searchWeb(request: WebSearchRequest): Promise<WebSearchResult> {
    try {
      const firecrawlRequest: any = {
        query: request.query,
        limit: request.limit || 10,
      };

      if (request.language) {
        firecrawlRequest.lang = request.language;
      }

      if (request.country) {
        firecrawlRequest.country = request.country;
      }

      if (request.timeRange) {
        const timeRangeMap: Record<string, string> = {
          'day': 'qdr:d',
          'week': 'qdr:w',
          'month': 'qdr:m',
          'year': 'qdr:y',
          'all': '',
        };
        firecrawlRequest.tbs = timeRangeMap[request.timeRange];
      }

      if (request.scrapeResults) {
        firecrawlRequest.scrapeOptions = {
          formats: request.formats || ['markdown'],
        };
      }

      const response = await this.makeRequest<FirecrawlSearchResponse>(
        '/search',
        'POST',
        firecrawlRequest
      );

      if (!response.success || !response.data) {
        throw new Error(response.error || 'Search failed');
      }

      return {
        results: response.data.map(item => ({
          title: item.title,
          url: item.url,
          description: item.description,
          markdown: item.markdown,
          html: item.html,
        })),
        totalResults: response.data.length,
        searchedAt: new Date(),
      };
    } catch (error) {
      console.error('Error searching web:', error);
      return {
        results: [],
        totalResults: 0,
        searchedAt: new Date(),
      };
    }
  }

  /**
   * Extract structured content using AI
   */
  async extractContent(
    request: ContentExtractionRequest
  ): Promise<ContentExtractionResult[]> {
    try {
      const urls = Array.isArray(request.url) ? request.url : [request.url];
      const results: ContentExtractionResult[] = [];

      for (const url of urls) {
        try {
          const extractionType = detectExtractionType(url);
          const template = getExtractionTemplate(extractionType);

          const firecrawlRequest = {
            urls: [url],
            prompt: request.prompt || template.prompt,
            systemPrompt: request.systemPrompt || template.systemPrompt,
            schema: request.schema || template.schema,
          };

          const response = await this.makeRequest<FirecrawlExtractResponse>(
            '/extract',
            'POST',
            firecrawlRequest
          );

          if (response.success && response.data) {
            results.push({
              url,
              extractedData: response.data,
              confidence: this.assessExtractionConfidence(response.data),
              extractedAt: new Date(),
            });
          }
        } catch (error) {
          console.error(`Error extracting from ${url}:`, error);
          results.push({
            url,
            extractedData: null,
            confidence: 'low',
            extractedAt: new Date(),
          });
        }
      }

      return results;
    } catch (error) {
      console.error('Error in content extraction:', error);
      return [];
    }
  }

  /**
   * Monitor RSS feeds
   */
  async monitorRSSFeed(request: RSSFeedMonitorRequest): Promise<RSSFeedResult> {
    try {
      // Scrape RSS feed
      const scrapeResult = await this.scrapeUrl({
        url: request.feedUrl,
        formats: ['markdown', 'links'],
      });

      if (!scrapeResult.success || !scrapeResult.markdown) {
        throw new Error('Failed to fetch RSS feed');
      }

      // Parse RSS content (simplified - in production, use a proper RSS parser)
      const items: RSSFeedItem[] = [];
      const itemMatches = scrapeResult.markdown.matchAll(
        /## (.+?)\n.*?Link:\s*\[.*?\]\((.+?)\).*?Published:\s*(.+?)\n([\s\S]+?)(?=##|$)/g
      );

      for (const match of Array.from(itemMatches)) {
        const [, title, link, pubDate, description] = match;
        const item: RSSFeedItem = {
          title: title.trim(),
          link: link.trim(),
          description: description.trim(),
          pubDate: new Date(pubDate.trim()),
        };

        // Apply filters
        if (request.filters) {
          const passesFilters = this.checkRSSFilters(item, request.filters);
          if (!passesFilters) continue;
        }

        // Extract full content if requested
        if (request.extractFullContent) {
          const contentResult = await this.scrapeUrl({
            url: item.link,
            formats: ['markdown'],
          });
          if (contentResult.success) {
            item.markdown = contentResult.markdown;
          }
        }

        items.push(item);
      }

      return {
        feedUrl: request.feedUrl,
        title: scrapeResult.title || 'RSS Feed',
        items,
        lastUpdated: new Date(),
        nextCheck: new Date(Date.now() + 3600000), // Check again in 1 hour
      };
    } catch (error) {
      console.error('Error monitoring RSS feed:', error);
      return {
        feedUrl: request.feedUrl,
        title: 'RSS Feed',
        items: [],
        lastUpdated: new Date(),
      };
    }
  }

  /**
   * Parse medical websites with specialized extraction
   */
  async parseMedicalWebsite(
    request: MedicalWebsiteParseRequest
  ): Promise<MedicalWebsiteParseResult> {
    try {
      // First, scrape the page
      const scrapeResult = await this.scrapeUrl({
        url: request.url,
        formats: ['markdown', 'html', 'links', 'metadata'],
      });

      if (!scrapeResult.success) {
        return scrapeResult as MedicalWebsiteParseResult;
      }

      // Get appropriate extraction template
      const extractionType = request.extractionType || detectExtractionType(request.url);
      const template = getExtractionTemplate(extractionType);

      // Extract structured content
      const extractionResult = await this.extractContent({
        url: request.url,
        schema: template.schema,
        prompt: template.prompt,
        systemPrompt: template.systemPrompt,
      });

      const medicalContent = extractionResult[0]?.extractedData;

      // Sanitize content for medical accuracy
      if (medicalContent && scrapeResult.markdown) {
        const sanitized = this.sanitizeMedicalContent(scrapeResult.markdown);
        if (sanitized.warnings.length > 0) {
          console.warn('Medical content warnings:', sanitized.warnings);
        }
      }

      return {
        ...scrapeResult,
        medicalContent,
      } as MedicalWebsiteParseResult;
    } catch (error) {
      console.error('Error parsing medical website:', error);
      return {
        url: request.url,
        scrapedAt: new Date(),
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Assess extraction confidence based on data completeness
   */
  private assessExtractionConfidence(data: any): 'high' | 'medium' | 'low' {
    if (!data) return 'low';

    const fields = Object.keys(data);
    const filledFields = fields.filter(key => {
      const value = data[key];
      return value !== null && value !== undefined && value !== '';
    });

    const completeness = filledFields.length / fields.length;

    if (completeness > 0.8) return 'high';
    if (completeness > 0.5) return 'medium';
    return 'low';
  }

  /**
   * Check if RSS item passes filters
   */
  private checkRSSFilters(
    item: RSSFeedItem,
    filters: RSSFeedMonitorRequest['filters']
  ): boolean {
    if (!filters) return true;

    // Keyword filter
    if (filters.keywords && filters.keywords.length > 0) {
      const content = `${item.title} ${item.description}`.toLowerCase();
      const hasKeyword = filters.keywords.some(keyword =>
        content.includes(keyword.toLowerCase())
      );
      if (!hasKeyword) return false;
    }

    // Date range filter
    if (filters.dateRange) {
      if (item.pubDate < filters.dateRange.start || item.pubDate > filters.dateRange.end) {
        return false;
      }
    }

    // Author filter
    if (filters.authors && filters.authors.length > 0 && item.author) {
      const hasAuthor = filters.authors.some(author =>
        item.author?.toLowerCase().includes(author.toLowerCase())
      );
      if (!hasAuthor) return false;
    }

    return true;
  }

  /**
   * Sanitize medical content for accuracy
   */
  private sanitizeMedicalContent(content: string): {
    sanitized: string;
    warnings: string[];
  } {
    let sanitized = content;
    const warnings: string[] = [];

    // Check for marketing language
    for (const pattern of sanitizationRules.marketingPhrases) {
      if (pattern.test(content)) {
        warnings.push(`Contains marketing language: ${pattern.source}`);
      }
    }

    // Check for unsubstantiated claims
    for (const pattern of sanitizationRules.unsubstantiatedClaims) {
      if (pattern.test(content)) {
        warnings.push(`Contains unsubstantiated claim: ${pattern.source}`);
        sanitized = sanitized.replace(pattern, '[UNSUBSTANTIATED CLAIM REMOVED]');
      }
    }

    // Check for claims requiring evidence
    for (const phrase of sanitizationRules.requiresEvidence) {
      if (content.toLowerCase().includes(phrase)) {
        const hasEvidence = qualityIndicators.highQuality.some(indicator =>
          content.toLowerCase().includes(indicator)
        );
        if (!hasEvidence) {
          warnings.push(`Claim "${phrase}" lacks supporting evidence`);
        }
      }
    }

    return { sanitized, warnings };
  }

  /**
   * Configure service settings
   */
  configure(options: {
    cacheEnabled?: boolean;
    cacheDuration?: number;
    rateLimits?: Partial<RateLimitConfig>;
  }): void {
    if (options.cacheEnabled !== undefined) {
      this.cacheEnabled = options.cacheEnabled;
    }
    if (options.cacheDuration !== undefined) {
      this.cacheDuration = options.cacheDuration;
    }
    if (options.rateLimits) {
      this.rateLimiter = new RateLimiter({
        ...this.rateLimiter['config'],
        ...options.rateLimits,
      });
    }
  }

  /**
   * Clear cache for specific content or all
   */
  async clearCache(url?: string): Promise<void> {
    if (!this.supabase) return;

    try {
      if (url) {
        const cacheKey = this.generateCacheKey('scrape', url);
        await this.supabase
          .from('ai_content_cache')
          .delete()
          .eq('hash', cacheKey);
      } else {
        await this.supabase
          .from('ai_content_cache')
          .delete()
          .lt('expires_at', new Date().toISOString());
      }
    } catch (error) {
      console.error('Error clearing cache:', error);
    }
  }

  /**
   * Get service health status
   */
  async getHealthStatus(): Promise<{
    apiKeyConfigured: boolean;
    cacheAvailable: boolean;
    rateLimitStatus: string;
  }> {
    return {
      apiKeyConfigured: !!this.apiKey,
      cacheAvailable: !!this.supabase,
      rateLimitStatus: 'operational',
    };
  }
}