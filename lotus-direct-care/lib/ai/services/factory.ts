import { AIProvider, aiConfig, getAvailableProvider } from '../config';
import { AIService } from './base';
import { AnthropicService } from './anthropic';
import { OpenAIService } from './openai';

export class AIServiceFactory {
  private static instance: AIService | null = null;

  static getService(preferredProvider?: AIProvider): AIService | null {
    // Return cached instance if available
    if (this.instance) return this.instance;

    // Determine which provider to use
    const provider = preferredProvider || getAvailableProvider();
    
    if (!provider) {
      console.error('No AI provider API key configured');
      return null;
    }

    // Create the appropriate service
    switch (provider) {
      case AIProvider.ANTHROPIC:
        if (!aiConfig.ANTHROPIC_API_KEY) return null;
        this.instance = new AnthropicService(
          aiConfig.ANTHROPIC_API_KEY,
          aiConfig.AI_MODEL_PRIMARY
        );
        break;
        
      case AIProvider.OPENAI:
        if (!aiConfig.OPENAI_API_KEY) return null;
        this.instance = new OpenAIService(
          aiConfig.OPENAI_API_KEY,
          aiConfig.AI_MODEL_PRIMARY
        );
        break;
        
      case AIProvider.GOOGLE:
        // Google implementation would go here
        console.warn('Google AI provider not yet implemented');
        return null;
        
      default:
        return null;
    }

    return this.instance;
  }

  // Clear the cached instance (useful for testing)
  static clearInstance(): void {
    this.instance = null;
  }
}