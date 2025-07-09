import { AIProvider } from '../config';

export interface AIResponse {
  content: string;
  provider: AIProvider;
  model: string;
  tokensUsed?: number;
  error?: string;
}

export interface AIPromptOptions {
  systemPrompt?: string;
  temperature?: number;
  maxTokens?: number;
  responseFormat?: 'text' | 'json';
}

export abstract class AIService {
  protected provider: AIProvider;
  protected apiKey: string;
  protected model: string;

  constructor(provider: AIProvider, apiKey: string, model: string) {
    this.provider = provider;
    this.apiKey = apiKey;
    this.model = model;
  }

  abstract generateResponse(
    prompt: string,
    options?: AIPromptOptions
  ): Promise<AIResponse>;

  protected handleError(error: any): AIResponse {
    console.error(`AI Service Error (${this.provider}):`, error);
    return {
      content: '',
      provider: this.provider,
      model: this.model,
      error: error.message || 'Unknown error occurred',
    };
  }

  // Helper method to ensure response is within token limits
  protected truncateResponse(response: string, maxLength: number = 4000): string {
    if (response.length <= maxLength) return response;
    
    // Try to find a natural break point
    const truncated = response.substring(0, maxLength);
    const lastSentence = truncated.lastIndexOf('. ');
    
    if (lastSentence > maxLength * 0.8) {
      return truncated.substring(0, lastSentence + 1);
    }
    
    return truncated + '...';
  }
}