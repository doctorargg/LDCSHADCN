import OpenAI from 'openai';
import { AIService, AIResponse, AIPromptOptions } from './base';
import { AIProvider } from '../config';

export class OpenAIService extends AIService {
  private client: OpenAI;

  constructor(apiKey: string, model: string) {
    super(AIProvider.OPENAI, apiKey, model);
    this.client = new OpenAI({ apiKey });
  }

  async generateResponse(
    prompt: string,
    options: AIPromptOptions = {}
  ): Promise<AIResponse> {
    try {
      const completion = await this.client.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: 'system',
            content: options.systemPrompt || 'You are a helpful medical practice assistant for Lotus Direct Care.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: options.temperature || 0.7,
        max_tokens: options.maxTokens || 4000,
        response_format: options.responseFormat === 'json' 
          ? { type: 'json_object' } 
          : { type: 'text' },
      });

      const content = completion.choices[0]?.message?.content || '';

      return {
        content: this.truncateResponse(content),
        provider: this.provider,
        model: this.model,
        tokensUsed: completion.usage?.completion_tokens,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }
}