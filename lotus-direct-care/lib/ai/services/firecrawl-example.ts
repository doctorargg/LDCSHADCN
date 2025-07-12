/**
 * Example usage of the Firecrawl service
 * This file demonstrates how to use various Firecrawl features
 */

import { FirecrawlService } from '../firecrawl-service';

async function exampleUsage() {
  const firecrawl = FirecrawlService.getInstance();

  // Example 1: Scrape a single web page
  console.log('Example 1: Scraping a single page');
  const scrapeResult = await firecrawl.scrapeUrl({
    url: 'https://pubmed.ncbi.nlm.nih.gov/12345678',
    formats: ['markdown', 'metadata'],
    waitFor: 2000, // Wait 2 seconds for dynamic content
  });
  
  if (scrapeResult.success) {
    console.log('Title:', scrapeResult.title);
    console.log('Content preview:', scrapeResult.markdown?.substring(0, 200));
  }

  // Example 2: Search the web and scrape results
  console.log('\nExample 2: Web search with content scraping');
  const searchResult = await firecrawl.searchWeb({
    query: 'functional medicine gut health research 2024',
    limit: 5,
    scrapeResults: true,
    formats: ['markdown'],
    timeRange: 'year',
  });
  
  console.log(`Found ${searchResult.totalResults} results`);
  searchResult.results.forEach((result, index) => {
    console.log(`${index + 1}. ${result.title} - ${result.url}`);
  });

  // Example 3: Extract structured data from medical websites
  console.log('\nExample 3: Medical content extraction');
  const extractionResult = await firecrawl.extractContent({
    url: 'https://clinicaltrials.gov/ct2/show/NCT12345678',
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        status: { type: 'string' },
        conditions: { type: 'array', items: { type: 'string' } }
      }
    }
    // Additional schema and prompts can be automatically selected based on URL
  });
  
  if (extractionResult[0] && extractionResult[0].confidence === 'high') {
    console.log('Extracted clinical trial data:', extractionResult[0].extractedData);
  }

  // Example 4: Parse medical website with specialized extraction
  console.log('\nExample 4: Medical website parsing');
  const medicalResult = await firecrawl.parseMedicalWebsite({
    url: 'https://pubmed.ncbi.nlm.nih.gov/12345678',
    extractionType: 'pubmed',
    includeReferences: true,
    includeFigures: false,
  });
  
  if (medicalResult.success && medicalResult.medicalContent) {
    console.log('Abstract:', medicalResult.medicalContent.abstract);
    console.log('Authors:', medicalResult.medicalContent.authors?.join(', '));
    console.log('Keywords:', medicalResult.medicalContent.keywords?.join(', '));
  }

  // Example 5: Monitor RSS feeds
  console.log('\nExample 5: RSS feed monitoring');
  const rssResult = await firecrawl.monitorRSSFeed({
    feedUrl: 'https://pubmed.ncbi.nlm.nih.gov/rss/search/functional_medicine',
    extractFullContent: true,
    filters: {
      keywords: ['microbiome', 'gut health', 'inflammation'],
      dateRange: {
        start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Last 7 days
        end: new Date(),
      },
    },
  });
  
  console.log(`Found ${rssResult.items.length} new items matching filters`);
  rssResult.items.forEach(item => {
    console.log(`- ${item.title} (${item.pubDate.toLocaleDateString()})`);
  });

  // Example 6: Crawl a website (async operation)
  console.log('\nExample 6: Website crawling');
  const crawlResult = await firecrawl.crawlWebsite({
    url: 'https://www.functionalmedicine.org/resources',
    maxDepth: 2,
    maxPages: 10,
    includePatterns: ['/resources/', '/education/'],
    excludePatterns: ['/login', '/account'],
  });
  
  if (crawlResult.status === 'pending') {
    console.log('Crawl job started with ID:', crawlResult.jobId);
    
    // Check status after some time
    setTimeout(async () => {
      const status = await firecrawl.checkCrawlStatus(crawlResult.jobId);
      console.log('Crawl status:', status.status);
      if (status.status === 'completed') {
        console.log(`Crawled ${status.completedPages} pages`);
      }
    }, 30000); // Check after 30 seconds
  }

  // Example 7: Configure service settings
  console.log('\nExample 7: Service configuration');
  firecrawl.configure({
    cacheEnabled: true,
    cacheDuration: 7200000, // 2 hours
    rateLimits: {
      maxRequestsPerMinute: 30, // More conservative rate
    },
  });

  // Example 8: Clear expired cache
  console.log('\nExample 8: Cache management');
  await firecrawl.clearCache(); // Clears expired entries
  
  // Clear specific URL cache
  await firecrawl.clearCache('https://example.com/specific-page');

  // Example 9: Check service health
  console.log('\nExample 9: Service health check');
  const health = await firecrawl.getHealthStatus();
  console.log('Service health:', health);
}

// Integration with research workflow
async function researchWorkflowExample() {
  const firecrawl = FirecrawlService.getInstance();
  
  // Step 1: Search for recent research
  const searchResults = await firecrawl.searchWeb({
    query: 'ketamine therapy depression clinical trials 2024',
    limit: 10,
    scrapeResults: false, // Just get URLs first
  });
  
  // Step 2: Extract structured data from promising results
  const extractionPromises = searchResults.results
    .slice(0, 3) // Top 3 results
    .map(result => 
      firecrawl.extractContent({
        url: result.url,
        prompt: 'Extract key findings, methodology, and clinical implications',
        schema: {
          type: 'object',
          properties: {
            keyFindings: { type: 'array', items: { type: 'string' } },
            methodology: { type: 'string' },
            clinicalImplications: { type: 'string' }
          }
        }
      })
    );
  
  const extractedData = await Promise.all(extractionPromises);
  
  // Step 3: Compile research summary
  const researchSummary = {
    searchQuery: 'ketamine therapy depression clinical trials 2024',
    searchDate: new Date(),
    sources: extractedData.flat().map(result => ({
      url: result.url,
      confidence: result.confidence,
      keyData: result.extractedData,
    })),
  };
  
  return researchSummary;
}

// Error handling example
async function errorHandlingExample() {
  const firecrawl = FirecrawlService.getInstance();
  
  try {
    const result = await firecrawl.scrapeUrl({
      url: 'https://invalid-url-example.com',
      formats: ['markdown'],
    });
    
    if (!result.success) {
      console.error('Scraping failed:', result.error);
      // Handle error appropriately
    }
  } catch (error) {
    console.error('Unexpected error:', error);
    // Log to monitoring service
  }
}

// Export for use in other modules
export { exampleUsage, researchWorkflowExample, errorHandlingExample };