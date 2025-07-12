import { AIProvider, aiConfig, getAvailableProvider, AIModels } from '../config';
import { AIService } from './base';
import { AnthropicService } from './anthropic';
import { OpenAIService } from './openai';
import { GeminiService } from './gemini';

export class AIServiceFactory {
  private static instances: Map<AIProvider, AIService> = new Map();

  static getService(preferredProvider?: AIProvider): AIService | null {
    // Determine which provider to use
    const provider = preferredProvider || getAvailableProvider();
    
    if (!provider) {
      console.error('No AI provider API key configured');
      return null;
    }

    // Return cached instance if available
    if (this.instances.has(provider)) {
      return this.instances.get(provider)!;
    }

    // Create the appropriate service
    let service: AIService | null = null;
    
    switch (provider) {
      case AIProvider.ANTHROPIC:
        if (!aiConfig.ANTHROPIC_API_KEY) return null;
        service = new AnthropicService(
          aiConfig.ANTHROPIC_API_KEY,
          aiConfig.AI_MODEL_PRIMARY
        );
        break;
        
      case AIProvider.OPENAI:
        if (!aiConfig.OPENAI_API_KEY) return null;
        service = new OpenAIService(
          aiConfig.OPENAI_API_KEY,
          aiConfig.AI_MODEL_PRIMARY
        );
        break;
        
      case AIProvider.GOOGLE:
        if (!aiConfig.GOOGLE_AI_API_KEY) return null;
        service = new GeminiService(
          aiConfig.GOOGLE_AI_API_KEY,
          AIModels[AIProvider.GOOGLE].primary
        );
        break;
        
      default:
        return null;
    }

    if (service) {
      this.instances.set(provider, service);
    }

    return service;
  }

  /**
   * Get a specific AI service by provider
   * Useful when you need a specific provider's capabilities
   */
  static getSpecificService(provider: AIProvider): AIService | null {
    return this.getService(provider);
  }

  /**
   * Get Gemini service specifically for research tasks
   */
  static getGeminiService(): GeminiService | null {
    const service = this.getSpecificService(AIProvider.GOOGLE);
    return service instanceof GeminiService ? service : null;
  }

  // Clear cached instances (useful for testing)
  static clearInstances(): void {
    this.instances.clear();
  }

  // Clear a specific provider's instance
  static clearInstance(provider: AIProvider): void {
    this.instances.delete(provider);
  }
}