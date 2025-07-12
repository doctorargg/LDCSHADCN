import { GoogleGenerativeAI } from '@google/generative-ai';
import { AIService, AIResponse, AIPromptOptions } from './base';
import { AIProvider } from '../config';

/**
 * Service for interacting with Google's Gemini AI models
 * Implements research capabilities, content analysis, and medical information extraction
 */
export class GeminiService extends AIService {
  private client: GoogleGenerativeAI;
  private retryAttempts = 3;
  private retryDelay = 1000; // Initial delay in ms

  constructor(apiKey: string, model: string) {
    super(AIProvider.GOOGLE, apiKey, model);
    this.client = new GoogleGenerativeAI(apiKey);
  }

  /**
   * Generate a response using Gemini AI with retry logic and error handling
   * @param prompt - The user prompt
   * @param options - Additional options for the AI request
   * @returns AI response with content and metadata
   */
  async generateResponse(
    prompt: string,
    options: AIPromptOptions = {}
  ): Promise<AIResponse> {
    console.log('GeminiService.generateResponse called', {
      model: this.model,
      hasApiKey: !!this.apiKey,
      promptLength: prompt.length,
    });

    return this.executeWithRetry(async () => {
      try {
        const model = this.client.getGenerativeModel({ model: this.model });
        
        // Combine system prompt with user prompt if provided
        const fullPrompt = options.systemPrompt 
          ? `${options.systemPrompt}\n\n${prompt}`
          : prompt;

        // Configure generation parameters
        const generationConfig = {
          temperature: options.temperature || 0.7,
          maxOutputTokens: options.maxTokens || 4000,
          topP: 0.8,
          topK: 10,
        };

        const result = await model.generateContent({
          contents: [{ role: 'user', parts: [{ text: fullPrompt }] }],
          generationConfig,
        });

        const response = await result.response;
        const content = response.text();

        // Handle JSON response format if requested
        if (options.responseFormat === 'json') {
          try {
            // Validate JSON response
            JSON.parse(content);
          } catch (e) {
            console.warn('Response is not valid JSON, returning as text');
          }
        }

        return {
          content: this.truncateResponse(content),
          provider: this.provider,
          model: this.model,
          tokensUsed: response.usageMetadata?.candidatesTokenCount,
        };
      } catch (error) {
        throw error; // Re-throw to be caught by retry logic
      }
    });
  }

  /**
   * Perform a research query using Gemini's advanced capabilities
   * @param query - The research query
   * @param context - Additional context for the research
   * @returns Structured research response
   */
  async performResearch(
    query: string,
    context?: {
      domain?: string;
      depth?: 'basic' | 'intermediate' | 'comprehensive';
      includeReferences?: boolean;
    }
  ): Promise<AIResponse> {
    const researchPrompt = this.buildResearchPrompt(query, context);
    
    return this.generateResponse(researchPrompt, {
      systemPrompt: 'You are a medical research assistant with expertise in functional medicine, direct primary care, and evidence-based healthcare. Provide thorough, accurate, and well-structured research responses.',
      temperature: 0.5, // Lower temperature for more factual responses
      maxTokens: 6000, // Higher token limit for comprehensive research
      responseFormat: 'json',
    });
  }

  /**
   * Analyze medical content for accuracy and relevance
   * @param content - The content to analyze
   * @param criteria - Analysis criteria
   * @returns Analysis results
   */
  async analyzeContent(
    content: string,
    criteria?: {
      checkAccuracy?: boolean;
      extractKeyPoints?: boolean;
      assessRelevance?: boolean;
      targetAudience?: string;
    }
  ): Promise<AIResponse> {
    const analysisPrompt = this.buildAnalysisPrompt(content, criteria);
    
    return this.generateResponse(analysisPrompt, {
      systemPrompt: 'You are a medical content analyst specializing in functional medicine and patient education. Analyze content for accuracy, clarity, and relevance to the target audience.',
      temperature: 0.3, // Very low temperature for analytical tasks
      responseFormat: 'json',
    });
  }

  /**
   * Extract structured medical information from unstructured text
   * @param text - The text to extract information from
   * @param schema - The expected structure of extracted data
   * @returns Extracted information matching the schema
   */
  async extractMedicalInfo(
    text: string,
    schema?: {
      conditions?: boolean;
      symptoms?: boolean;
      treatments?: boolean;
      medications?: boolean;
      lifestyle?: boolean;
    }
  ): Promise<AIResponse> {
    const extractionPrompt = this.buildExtractionPrompt(text, schema);
    
    return this.generateResponse(extractionPrompt, {
      systemPrompt: 'You are a medical information extraction specialist. Extract and structure medical information accurately while maintaining clinical precision.',
      temperature: 0.2, // Very low temperature for extraction accuracy
      responseFormat: 'json',
    });
  }

  /**
   * Execute a function with exponential backoff retry logic
   * @param fn - The function to execute
   * @returns The result of the function
   */
  private async executeWithRetry<T>(fn: () => Promise<T>): Promise<T> {
    let lastError: any;
    
    for (let attempt = 0; attempt < this.retryAttempts; attempt++) {
      try {
        return await fn();
      } catch (error: any) {
        lastError = error;
        console.error(`Gemini API attempt ${attempt + 1} failed:`, error.message);
        
        // Don't retry on certain errors
        if (this.isNonRetryableError(error)) {
          break;
        }
        
        // Wait before retrying with exponential backoff
        if (attempt < this.retryAttempts - 1) {
          const delay = this.retryDelay * Math.pow(2, attempt);
          console.log(`Retrying in ${delay}ms...`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }
    
    return this.handleError(lastError) as T;
  }

  /**
   * Check if an error should not be retried
   * @param error - The error to check
   * @returns Whether the error is non-retryable
   */
  private isNonRetryableError(error: any): boolean {
    const message = error.message?.toLowerCase() || '';
    
    // Don't retry on authentication errors or invalid requests
    return (
      message.includes('api key') ||
      message.includes('authentication') ||
      message.includes('invalid') ||
      message.includes('quota exceeded') ||
      error.status === 400 ||
      error.status === 401 ||
      error.status === 403
    );
  }

  /**
   * Build a research prompt with appropriate context
   */
  private buildResearchPrompt(
    query: string,
    context?: {
      domain?: string;
      depth?: 'basic' | 'intermediate' | 'comprehensive';
      includeReferences?: boolean;
    }
  ): string {
    const depth = context?.depth || 'intermediate';
    const domain = context?.domain || 'functional medicine and direct primary care';
    
    let prompt = `Research Query: ${query}\n\n`;
    prompt += `Domain: ${domain}\n`;
    prompt += `Depth: ${depth}\n\n`;
    
    prompt += 'Please provide a research response in JSON format with the following structure:\n';
    prompt += '{\n';
    prompt += '  "summary": "Brief overview of findings",\n';
    prompt += '  "key_findings": ["Finding 1", "Finding 2", ...],\n';
    prompt += '  "detailed_analysis": "Comprehensive analysis",\n';
    prompt += '  "clinical_relevance": "Relevance to clinical practice",\n';
    prompt += '  "patient_considerations": "Important considerations for patients",\n';
    
    if (context?.includeReferences) {
      prompt += '  "references": ["Reference 1", "Reference 2", ...],\n';
    }
    
    prompt += '  "confidence_level": "high/medium/low"\n';
    prompt += '}\n\n';
    
    prompt += 'Ensure all information is accurate, evidence-based, and relevant to functional medicine practice.';
    
    return prompt;
  }

  /**
   * Build a content analysis prompt
   */
  private buildAnalysisPrompt(
    content: string,
    criteria?: {
      checkAccuracy?: boolean;
      extractKeyPoints?: boolean;
      assessRelevance?: boolean;
      targetAudience?: string;
    }
  ): string {
    const targetAudience = criteria?.targetAudience || 'patients seeking functional medicine care';
    
    let prompt = `Analyze the following medical content:\n\n${content}\n\n`;
    prompt += 'Provide analysis in JSON format:\n{\n';
    
    if (criteria?.checkAccuracy !== false) {
      prompt += '  "accuracy_assessment": {\n';
      prompt += '    "score": 0-10,\n';
      prompt += '    "concerns": ["concern 1", ...],\n';
      prompt += '    "strengths": ["strength 1", ...]\n';
      prompt += '  },\n';
    }
    
    if (criteria?.extractKeyPoints !== false) {
      prompt += '  "key_points": ["point 1", "point 2", ...],\n';
    }
    
    if (criteria?.assessRelevance !== false) {
      prompt += '  "relevance": {\n';
      prompt += `    "target_audience": "${targetAudience}",\n`;
      prompt += '    "relevance_score": 0-10,\n';
      prompt += '    "recommendations": ["recommendation 1", ...]\n';
      prompt += '  },\n';
    }
    
    prompt += '  "overall_quality": "excellent/good/fair/poor"\n';
    prompt += '}';
    
    return prompt;
  }

  /**
   * Build a medical information extraction prompt
   */
  private buildExtractionPrompt(
    text: string,
    schema?: {
      conditions?: boolean;
      symptoms?: boolean;
      treatments?: boolean;
      medications?: boolean;
      lifestyle?: boolean;
    }
  ): string {
    const includeAll = !schema || Object.keys(schema).length === 0;
    
    let prompt = `Extract medical information from the following text:\n\n${text}\n\n`;
    prompt += 'Return extracted information in JSON format:\n{\n';
    
    if (includeAll || schema?.conditions) {
      prompt += '  "conditions": ["condition 1", "condition 2", ...],\n';
    }
    
    if (includeAll || schema?.symptoms) {
      prompt += '  "symptoms": ["symptom 1", "symptom 2", ...],\n';
    }
    
    if (includeAll || schema?.treatments) {
      prompt += '  "treatments": [\n';
      prompt += '    {"name": "treatment 1", "type": "medication/therapy/procedure", "description": "..."},\n';
      prompt += '    ...\n';
      prompt += '  ],\n';
    }
    
    if (includeAll || schema?.medications) {
      prompt += '  "medications": [\n';
      prompt += '    {"name": "med 1", "dosage": "...", "purpose": "..."},\n';
      prompt += '    ...\n';
      prompt += '  ],\n';
    }
    
    if (includeAll || schema?.lifestyle) {
      prompt += '  "lifestyle_recommendations": ["recommendation 1", ...],\n';
    }
    
    prompt += '  "extraction_confidence": "high/medium/low"\n';
    prompt += '}\n\n';
    prompt += 'Only extract information explicitly mentioned in the text. Do not infer or add information.';
    
    return prompt;
  }
}