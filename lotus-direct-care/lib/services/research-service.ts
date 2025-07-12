import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { AIServiceFactory } from '@/lib/ai/services/factory';
import { AIProvider } from '@/lib/ai/config';
import { FirecrawlService } from '@/lib/ai/firecrawl-service';

export interface ResearchSource {
  id: string;
  name: string;
  url: string;
  domain: string;
  source_type: string;
  categories: string[];
  is_active: boolean;
  reliability_score: number;
}

export interface ResearchQuery {
  id: string;
  name: string;
  query_text: string;
  query_type: string;
  categories: string[];
  include_sources?: string[];
  exclude_sources?: string[];
  max_results: number;
  freshness_days: number;
  min_reliability_score: number;
}

export interface ResearchResult {
  id?: string;
  title: string;
  url: string;
  content: string;
  summary: string;
  key_points: string[];
  relevance_score: number;
  source_id?: string;
  source_name?: string;
  published_date?: Date;
  topics: string[];
}

export class ResearchService {
  /**
   * Execute a research query using configured sources
   */
  async executeResearch(queryId: string): Promise<ResearchResult[]> {
    // Use admin client for research operations to bypass RLS
    const supabase = createAdminClient();
    
    // Start history entry
    const startTime = Date.now();
    let historyId: string | undefined;
    
    try {
      // Debug: List all queries first
      const { data: allQueries, error: listError } = await supabase
        .from('research_queries')
        .select('id, name')
        .limit(10);
      
      if (listError) {
        console.error('Error listing queries:', listError);
      } else {
        console.log('Available queries:', allQueries?.map(q => ({ id: q.id, name: q.name })));
      }
      
      // Get query configuration
      console.log('Fetching research query with ID:', queryId);
      const { data: query, error: queryError } = await supabase
        .from('research_queries')
        .select('*')
        .eq('id', queryId)
        .single();
      
      if (queryError) {
        console.error('Error fetching query:', queryError);
        throw new Error(`Failed to fetch query: ${queryError.message}`);
      }
      
      if (!query) {
        console.error('No query found with ID:', queryId);
        throw new Error('Query not found');
      }
      
      console.log('Query found:', query.name);

      // Record start of research
      const { data: history } = await supabase
        .from('research_history')
        .insert({
          action_type: 'query_run',
          query_id: queryId,
          details: { query_text: query.query_text }
        })
        .select()
        .single();
      
      historyId = history?.id;

      // Get active sources
      const sources = await this.getActiveSources(query);
      
      // Execute research across sources
      const allResults: ResearchResult[] = [];
      
      for (const source of sources) {
        try {
          const sourceResults = await this.searchSource(source, query);
          allResults.push(...sourceResults);
        } catch (error) {
          console.error(`Error searching source ${source.name}:`, error);
          // Continue with other sources
        }
      }

      // Deduplicate and rank results
      const processedResults = await this.processResults(allResults, query);
      
      // Save results to cache
      await this.saveResults(queryId, processedResults);
      
      // Update query last run time
      await supabase
        .from('research_queries')
        .update({ last_run_at: new Date().toISOString() })
        .eq('id', queryId);

      // Update history with success
      if (historyId) {
        await supabase
          .from('research_history')
          .update({
            success: true,
            duration_ms: Date.now() - startTime,
            details: {
              query_text: query.query_text,
              results_count: processedResults.length,
              sources_searched: sources.length
            }
          })
          .eq('id', historyId);
      }

      return processedResults;
    } catch (error) {
      // Update history with error
      if (historyId !== undefined) {
        await supabase
          .from('research_history')
          .update({
            success: false,
            error_message: error instanceof Error ? error.message : 'Unknown error',
            duration_ms: Date.now() - startTime
          })
          .eq('id', historyId);
      }
      throw error;
    }
  }

  /**
   * Get active sources based on query configuration
   */
  private async getActiveSources(query: ResearchQuery): Promise<ResearchSource[]> {
    const supabase = createAdminClient();
    
    let sourcesQuery = supabase
      .from('research_sources')
      .select('*')
      .eq('is_active', true)
      .gte('reliability_score', query.min_reliability_score);

    // Apply include/exclude filters
    if (query.include_sources && query.include_sources.length > 0) {
      sourcesQuery = sourcesQuery.in('id', query.include_sources);
    } else if (query.exclude_sources && query.exclude_sources.length > 0) {
      sourcesQuery = sourcesQuery.not('id', 'in', `(${query.exclude_sources.join(',')})`);
    }

    // Filter by categories if specified
    if (query.categories && query.categories.length > 0) {
      sourcesQuery = sourcesQuery.overlaps('categories', query.categories);
    }

    const { data, error } = await sourcesQuery;
    
    if (error) {
      throw new Error(`Failed to fetch sources: ${error.message}`);
    }

    return data || [];
  }

  /**
   * Search a specific source for relevant content
   */
  private async searchSource(source: ResearchSource, query: ResearchQuery): Promise<ResearchResult[]> {
    const results: ResearchResult[] = [];
    
    try {
      // Use Firecrawl to search the source
      const firecrawl = FirecrawlService.getInstance();
      const searchResults = await firecrawl.searchWeb({
        query: `${query.query_text} site:${source.url}`,
        limit: Math.ceil(query.max_results / 3), // Distribute across sources
        scrapeResults: true,
        formats: ['markdown']
      });

      // Process each result with Gemini
      for (const result of searchResults.results) {
        if (!result.content) continue;

        // Use AI service to analyze and summarize the content
        const aiService = AIServiceFactory.getService(AIProvider.GOOGLE);
        if (!aiService) {
          console.error('AI service not available');
          continue;
        }

        const analysisPrompt = `Analyze the following medical/health content in the context of this query: "${query.query_text}"

Content:
${result.content.substring(0, 3000)}

Provide:
1. A concise summary (2-3 sentences)
2. Key points (maximum 5)
3. Relevance score (0-1) to the query
4. Main topics covered`;

        const response = await aiService.generateResponse(analysisPrompt);
        const responseText = response.content;
        
        // Parse the response to extract structured data
        const summary = responseText.match(/Summary:?\s*([^\n]+(?:\n[^\n]+)?)/i)?.[1] || '';
        const keyPointsMatch = responseText.match(/Key [Pp]oints:?\s*([^\n]+(?:\n[^\n]+)*)/i)?.[1] || '';
        const keyPoints = keyPointsMatch
          .split('\n')
          .map((point: string) => point.trim())
          .filter((point: string) => point && point.length > 0)
          .map((point: string) => point.replace(/^[-•*\d.]+\s*/, ''))
          .slice(0, 5);
        const relevanceMatch = responseText.match(/Relevance:?\s*([0-9.]+)/i)?.[1];
        const relevance = relevanceMatch ? parseFloat(relevanceMatch) : 0.5;
        const topicsMatch = responseText.match(/Topics:?\s*([^\n]+)/i)?.[1] || '';
        const topics = topicsMatch
          .split(/[,;]/)
          .map((topic: string) => topic.trim())
          .filter((topic: string) => topic.length > 0);

        results.push({
          title: result.title || 'Untitled',
          url: result.url,
          content: result.content.substring(0, 5000), // Limit content size
          summary: summary.trim(),
          key_points: keyPoints,
          relevance_score: Math.min(1, Math.max(0, relevance)),
          source_id: source.id,
          source_name: source.name,
          topics: topics
        });
      }

      // Record successful crawl
      await this.recordSourceCrawl(source.id, true, results.length);
    } catch (error) {
      // Record failed crawl
      await this.recordSourceCrawl(source.id, false, 0, error instanceof Error ? error.message : 'Unknown error');
      throw error;
    }

    return results;
  }

  /**
   * Process, deduplicate, and rank results
   */
  private async processResults(results: ResearchResult[], query: ResearchQuery): Promise<ResearchResult[]> {
    // Remove duplicates based on URL
    const uniqueResults = new Map<string, ResearchResult>();
    
    for (const result of results) {
      const existing = uniqueResults.get(result.url);
      if (!existing || result.relevance_score > existing.relevance_score) {
        uniqueResults.set(result.url, result);
      }
    }

    // Convert back to array and sort by relevance
    let processedResults = Array.from(uniqueResults.values())
      .sort((a, b) => b.relevance_score - a.relevance_score);

    // Apply freshness filter if specified
    if (query.freshness_days > 0) {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - query.freshness_days);
      
      processedResults = processedResults.filter(result => {
        if (!result.published_date) return true; // Keep if no date
        return new Date(result.published_date) >= cutoffDate;
      });
    }

    // Limit to max results
    return processedResults.slice(0, query.max_results);
  }

  /**
   * Save research results to database
   */
  private async saveResults(queryId: string, results: ResearchResult[]): Promise<void> {
    const supabase = createAdminClient();
    
    // Mark previous results as outdated
    await supabase
      .from('research_results')
      .update({ is_duplicate: true })
      .eq('query_id', queryId)
      .eq('is_duplicate', false);

    // Insert new results
    const recordsToInsert = results.map(result => ({
      query_id: queryId,
      source_id: result.source_id,
      title: result.title,
      url: result.url,
      content: result.content,
      summary: result.summary,
      key_points: result.key_points,
      relevance_score: result.relevance_score,
      topics: result.topics,
      published_date: result.published_date,
      metadata: {
        source_name: result.source_name
      }
    }));

    const { error } = await supabase
      .from('research_results')
      .insert(recordsToInsert);

    if (error) {
      throw new Error(`Failed to save results: ${error.message}`);
    }
  }

  /**
   * Record source crawl in history
   */
  private async recordSourceCrawl(
    sourceId: string, 
    success: boolean, 
    resultCount: number,
    errorMessage?: string
  ): Promise<void> {
    const supabase = createAdminClient();
    
    await supabase
      .from('research_history')
      .insert({
        action_type: 'source_crawl',
        source_id: sourceId,
        success,
        error_message: errorMessage,
        details: { results_found: resultCount }
      });

    // Update source last crawled time if successful
    if (success) {
      await supabase
        .from('research_sources')
        .update({ last_crawled_at: new Date().toISOString() })
        .eq('id', sourceId);
    }
  }

  /**
   * Get recent research results for a query
   */
  async getRecentResults(queryId: string, limit: number = 20): Promise<ResearchResult[]> {
    const supabase = createAdminClient();
    
    const { data, error } = await supabase
      .from('research_results')
      .select('*')
      .eq('query_id', queryId)
      .eq('is_duplicate', false)
      .order('relevance_score', { ascending: false })
      .limit(limit);

    if (error) {
      throw new Error(`Failed to fetch results: ${error.message}`);
    }

    return data || [];
  }

  /**
   * Get research history
   */
  async getHistory(filters?: {
    action_type?: string;
    days?: number;
    limit?: number;
  }): Promise<any[]> {
    const supabase = createAdminClient();
    
    let query = supabase
      .from('research_history')
      .select(`
        *,
        research_queries(name),
        research_sources(name)
      `)
      .order('created_at', { ascending: false });

    if (filters?.action_type) {
      query = query.eq('action_type', filters.action_type);
    }

    if (filters?.days) {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - filters.days);
      query = query.gte('created_at', cutoffDate.toISOString());
    }

    if (filters?.limit) {
      query = query.limit(filters.limit);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(`Failed to fetch history: ${error.message}`);
    }

    return data || [];
  }
}

export const researchService = new ResearchService();