import Anthropic from '@anthropic-ai/sdk';
import { AIService, AIResponse, AIPromptOptions } from './base';
import { AIProvider } from '../config';

export class AnthropicService extends AIService {
  private client: Anthropic;

  constructor(apiKey: string, model: string) {
    super(AIProvider.ANTHROPIC, apiKey, model);
    this.client = new Anthropic({ apiKey });
  }

  async generateResponse(
    prompt: string,
    options: AIPromptOptions = {}
  ): Promise<AIResponse> {
    console.log('AnthropicService.generateResponse called', {
      model: this.model,
      hasApiKey: !!this.apiKey,
      promptLength: prompt.length,
    });
    
    try {
      const response = await this.client.messages.create({
        model: this.model,
        max_tokens: options.maxTokens || 4000,
        temperature: options.temperature || 0.7,
        system: options.systemPrompt || 'You are a helpful medical practice assistant for Lotus Direct Care.',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      });

      const content = response.content[0].type === 'text' 
        ? response.content[0].text 
        : '';

      return {
        content: this.truncateResponse(content),
        provider: this.provider,
        model: this.model,
        tokensUsed: response.usage?.output_tokens,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }
}