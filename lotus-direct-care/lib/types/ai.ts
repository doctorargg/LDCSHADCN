import { AIProvider } from '../ai/config';

/**
 * Core AI service types
 */
export interface AIServiceConfig {
  provider: AIProvider;
  apiKey: string;
  model: string;
  temperature?: number;
  maxTokens?: number;
}

/**
 * Research-specific types for Gemini integration
 */
export interface ResearchQuery {
  query: string;
  domain?: string;
  depth?: 'basic' | 'intermediate' | 'comprehensive';
  includeReferences?: boolean;
  maxResults?: number;
  timeRange?: {
    start: Date;
    end: Date;
  };
}

export interface ResearchResult {
  summary: string;
  keyFindings: string[];
  detailedAnalysis: string;
  clinicalRelevance: string;
  patientConsiderations: string;
  references?: string[];
  confidenceLevel: 'high' | 'medium' | 'low';
  metadata?: {
    queryTime: number;
    tokenUsage: number;
    model: string;
  };
}

/**
 * Content analysis types
 */
export interface ContentAnalysisRequest {
  content: string;
  analysisType: 'accuracy' | 'relevance' | 'quality' | 'comprehensive';
  criteria?: {
    checkAccuracy?: boolean;
    extractKeyPoints?: boolean;
    assessRelevance?: boolean;
    targetAudience?: string;
  };
}

export interface ContentAnalysisResult {
  accuracyAssessment?: {
    score: number;
    concerns: string[];
    strengths: string[];
  };
  keyPoints?: string[];
  relevance?: {
    targetAudience: string;
    relevanceScore: number;
    recommendations: string[];
  };
  overallQuality: 'excellent' | 'good' | 'fair' | 'poor';
  suggestions?: string[];
}

/**
 * Medical information extraction types
 */
export interface MedicalExtractionRequest {
  text: string;
  extractionSchema?: {
    conditions?: boolean;
    symptoms?: boolean;
    treatments?: boolean;
    medications?: boolean;
    lifestyle?: boolean;
    labValues?: boolean;
    procedures?: boolean;
  };
  includeConfidence?: boolean;
}

export interface MedicalExtractionResult {
  conditions?: string[];
  symptoms?: string[];
  treatments?: {
    name: string;
    type: 'medication' | 'therapy' | 'procedure' | 'supplement';
    description: string;
  }[];
  medications?: {
    name: string;
    dosage?: string;
    frequency?: string;
    purpose?: string;
  }[];
  lifestyleRecommendations?: string[];
  labValues?: {
    test: string;
    value: string;
    unit?: string;
    reference?: string;
    interpretation?: 'normal' | 'high' | 'low';
  }[];
  procedures?: {
    name: string;
    date?: string;
    findings?: string;
  }[];
  extractionConfidence: 'high' | 'medium' | 'low';
}

/**
 * Diagnostic interpretation types
 */
export interface DiagnosticInterpretationRequest {
  testType: string;
  results: {
    parameter: string;
    value: number | string;
    unit?: string;
    referenceRange?: string;
  }[];
  patientContext?: {
    age?: number;
    gender?: string;
    conditions?: string[];
    medications?: string[];
  };
}

export interface DiagnosticInterpretationResult {
  summary: string;
  abnormalFindings: {
    parameter: string;
    interpretation: string;
    clinicalSignificance: string;
    possibleCauses: string[];
  }[];
  patterns: string[];
  recommendations: {
    additionalTesting?: string[];
    interventions?: string[];
    monitoring?: string[];
  };
  functionalMedicinePerspective: string;
}

/**
 * Literature review types
 */
export interface LiteratureReviewRequest {
  topic: string;
  yearRange?: {
    start: number;
    end: number;
  };
  studyTypes?: ('clinical-trial' | 'meta-analysis' | 'review' | 'case-study')[];
  qualityThreshold?: 'high' | 'medium' | 'any';
}

export interface LiteratureReviewResult {
  overview: string;
  majorStudies: {
    title: string;
    authors: string;
    year: number;
    type: string;
    keyFindings: string[];
    limitations?: string[];
  }[];
  evidenceSummary: {
    strongEvidence: string[];
    moderateEvidence: string[];
    emergingEvidence: string[];
    contradictoryFindings?: string[];
  };
  clinicalImplications: string[];
  knowledgeGaps: string[];
  recommendations: string[];
}

/**
 * Comparative analysis types
 */
export interface ComparativeAnalysisRequest {
  options: string[];
  comparisonCriteria: string[];
  context?: {
    condition?: string;
    patientPopulation?: string;
    practiceType?: string;
  };
}

export interface ComparativeAnalysisResult {
  summary: string;
  comparisons: {
    criterion: string;
    analysis: {
      option: string;
      rating: number;
      rationale: string;
    }[];
  }[];
  recommendations: {
    bestOverall?: string;
    bestForScenario: {
      scenario: string;
      recommendation: string;
      reasoning: string;
    }[];
  };
  clinicalPearls: string[];
}

/**
 * AI task types for queuing and processing
 */
export interface AITask {
  id: string;
  type: 'research' | 'analysis' | 'extraction' | 'interpretation' | 'review' | 'comparison';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  request: any; // Type depends on task type
  status: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt: Date;
  startedAt?: Date;
  completedAt?: Date;
  result?: any;
  error?: string;
  retryCount?: number;
  metadata?: {
    requester?: string;
    context?: string;
    tags?: string[];
  };
}

/**
 * Rate limiting configuration
 */
export interface RateLimitConfig {
  maxRequestsPerMinute: number;
  maxRequestsPerHour: number;
  maxRequestsPerDay: number;
  burstLimit: number;
  cooldownPeriod: number; // in milliseconds
}

/**
 * AI service metrics
 */
export interface AIServiceMetrics {
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  averageResponseTime: number;
  tokenUsage: {
    input: number;
    output: number;
    total: number;
  };
  costEstimate?: number;
  lastError?: {
    timestamp: Date;
    message: string;
    type: string;
  };
}

/**
 * Batch processing types
 */
export interface BatchProcessingRequest<T> {
  items: T[];
  batchSize: number;
  delayBetweenBatches?: number; // in milliseconds
  continueOnError?: boolean;
  progressCallback?: (completed: number, total: number) => void;
}

export interface BatchProcessingResult<T, R> {
  successful: {
    item: T;
    result: R;
  }[];
  failed: {
    item: T;
    error: string;
  }[];
  summary: {
    totalItems: number;
    successCount: number;
    failureCount: number;
    processingTime: number;
  };
}

/**
 * Web scraping types for Firecrawl integration
 */
export interface WebScrapeRequest {
  url: string;
  formats?: ('markdown' | 'html' | 'screenshot' | 'links' | 'metadata')[];
  waitFor?: number; // milliseconds to wait for dynamic content
  screenshot?: boolean;
  fullPage?: boolean;
  actions?: WebAction[];
  headers?: Record<string, string>;
  excludeSelectors?: string[];
  includeSelectors?: string[];
}

export interface WebAction {
  type: 'click' | 'type' | 'wait' | 'scroll' | 'screenshot';
  selector?: string;
  value?: string | number;
  delay?: number;
}

export interface WebScrapeResult {
  url: string;
  title?: string;
  markdown?: string;
  html?: string;
  screenshot?: string;
  links?: string[];
  metadata?: {
    description?: string;
    keywords?: string[];
    author?: string;
    publishedDate?: string;
    language?: string;
  };
  extractedContent?: any;
  scrapedAt: Date;
  success: boolean;
  error?: string;
}

export interface WebCrawlRequest {
  url: string;
  maxDepth?: number;
  maxPages?: number;
  includePatterns?: string[];
  excludePatterns?: string[];
  formats?: ('markdown' | 'html' | 'links')[];
  waitFor?: number;
}

export interface WebCrawlResult {
  jobId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  pages?: WebScrapeResult[];
  totalPages?: number;
  completedPages?: number;
  startedAt: Date;
  completedAt?: Date;
  error?: string;
}

export interface WebSearchRequest {
  query: string;
  limit?: number;
  language?: string;
  country?: string;
  timeRange?: 'day' | 'week' | 'month' | 'year' | 'all';
  scrapeResults?: boolean;
  formats?: ('markdown' | 'html')[];
}

export interface WebSearchResult {
  results: {
    title: string;
    url: string;
    description: string;
    content?: string;
    markdown?: string;
    html?: string;
  }[];
  totalResults: number;
  searchedAt: Date;
}

export interface ContentExtractionRequest {
  url: string | string[];
  schema: Record<string, any>;
  prompt?: string;
  systemPrompt?: string;
}

export interface ContentExtractionResult {
  url: string;
  extractedData: any;
  confidence: 'high' | 'medium' | 'low';
  extractedAt: Date;
}

export interface RSSFeedMonitorRequest {
  feedUrl: string;
  lastChecked?: Date;
  extractFullContent?: boolean;
  filters?: {
    keywords?: string[];
    authors?: string[];
    categories?: string[];
    dateRange?: {
      start: Date;
      end: Date;
    };
  };
}

export interface RSSFeedItem {
  title: string;
  link: string;
  description: string;
  pubDate: Date;
  author?: string;
  categories?: string[];
  content?: string;
  markdown?: string;
}

export interface RSSFeedResult {
  feedUrl: string;
  title: string;
  items: RSSFeedItem[];
  lastUpdated: Date;
  nextCheck?: Date;
}

export interface MedicalWebsiteParseRequest {
  url: string;
  extractionType: 'pubmed' | 'clinicalTrial' | 'medicalJournal' | 'healthNews' | 'generic';
  includeReferences?: boolean;
  includeFigures?: boolean;
  includeSupplementary?: boolean;
}

export interface MedicalWebsiteParseResult extends WebScrapeResult {
  medicalContent?: {
    abstract?: string;
    introduction?: string;
    methods?: string;
    results?: string;
    discussion?: string;
    conclusion?: string;
    references?: string[];
    authors?: string[];
    journal?: string;
    publicationDate?: string;
    doi?: string;
    pmid?: string;
    keywords?: string[];
    figures?: {
      caption: string;
      url?: string;
      description?: string;
    }[];
  };
}

export interface CachedContent {
  id: string;
  url: string;
  content: any;
  contentType: 'scrape' | 'crawl' | 'search' | 'extraction' | 'rss' | 'medical';
  hash: string;
  cachedAt: Date;
  expiresAt: Date;
  metadata?: Record<string, any>;
}