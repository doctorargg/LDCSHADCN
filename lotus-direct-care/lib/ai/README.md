# AI Services Documentation

## Overview

The Lotus Direct Care AI system provides multiple AI service integrations for various healthcare-related tasks including content generation, research, and medical information processing.

## Available AI Services

### 1. Anthropic (Claude)
- **Primary use**: Blog generation, email responses
- **Model**: Claude 3.5 Sonnet
- **Config**: `ANTHROPIC_API_KEY`

### 2. OpenAI
- **Primary use**: Alternative content generation
- **Model**: GPT-4 Turbo
- **Config**: `OPENAI_API_KEY`

### 3. Google Gemini (NEW)
- **Primary use**: Medical research, content analysis, information extraction
- **Model**: Gemini Pro
- **Config**: `GEMINI_API_KEY` or `GOOGLE_AI_API_KEY`

## Using the Gemini Service

### Basic Setup

```typescript
import { AIServiceFactory } from './services/factory';

// Get the Gemini service
const geminiService = AIServiceFactory.getGeminiService();

if (!geminiService) {
  console.error('Gemini service not available. Set GEMINI_API_KEY in environment.');
  return;
}
```

### Research Queries

```typescript
// Perform comprehensive research
const result = await geminiService.performResearch(
  'Latest advances in functional medicine for autoimmune conditions',
  {
    domain: 'functional medicine',
    depth: 'comprehensive',
    includeReferences: true,
  }
);

const research = JSON.parse(result.content);
console.log(research.summary);
console.log(research.keyFindings);
```

### Content Analysis

```typescript
// Analyze medical content for accuracy and relevance
const analysis = await geminiService.analyzeContent(
  articleContent,
  {
    checkAccuracy: true,
    extractKeyPoints: true,
    assessRelevance: true,
    targetAudience: 'patients seeking functional medicine',
  }
);

const results = JSON.parse(analysis.content);
console.log(results.accuracyAssessment);
```

### Medical Information Extraction

```typescript
// Extract structured medical data from unstructured text
const extraction = await geminiService.extractMedicalInfo(
  clinicalNotes,
  {
    conditions: true,
    symptoms: true,
    medications: true,
    lifestyle: true,
  }
);

const data = JSON.parse(extraction.content);
console.log(data.medications);
```

## Research Prompt Templates

The system includes pre-built prompt templates for common research scenarios:

```typescript
import {
  generateConditionResearchPrompt,
  generateTreatmentResearchPrompt,
  generateNutritionalResearchPrompt,
  generateDiagnosticResearchPrompt,
  generateLiteratureReviewPrompt,
  generateComparativeResearchPrompt,
} from './prompts/research-prompts';

// Research a medical condition
const prompt = generateConditionResearchPrompt('Hashimoto\'s Thyroiditis', {
  scope: 'comprehensive',
  audience: 'patients',
  includeEvidence: true,
});
```

## Error Handling

All AI services implement retry logic with exponential backoff:

- **Initial retry delay**: 1 second
- **Max retries**: 3
- **Backoff multiplier**: 2x

Non-retryable errors include:
- Authentication failures
- Invalid API keys
- Quota exceeded
- Malformed requests

## Rate Limiting

The Gemini service includes built-in rate limiting protection. When performing batch operations:

```typescript
// Add delays between requests
for (const topic of topics) {
  const result = await geminiService.performResearch(topic);
  // Process result...
  
  // Rate limit protection
  await new Promise(resolve => setTimeout(resolve, 2000));
}
```

## TypeScript Types

All research operations are fully typed. See `/lib/types/ai.ts` for:

- `ResearchQuery` / `ResearchResult`
- `ContentAnalysisRequest` / `ContentAnalysisResult`
- `MedicalExtractionRequest` / `MedicalExtractionResult`
- `DiagnosticInterpretationRequest` / `DiagnosticInterpretationResult`
- `LiteratureReviewRequest` / `LiteratureReviewResult`
- `ComparativeAnalysisRequest` / `ComparativeAnalysisResult`

## Testing

Run the integration test:

```bash
node test/gemini-integration.test.ts
```

Or use the comprehensive examples:

```typescript
import { runGeminiExamples } from './services/gemini-example';
await runGeminiExamples();
```

## Best Practices

1. **Always check service availability** before making requests
2. **Use appropriate temperature settings**:
   - Research: 0.3-0.5 (factual)
   - Content generation: 0.7-0.9 (creative)
3. **Implement proper error handling** for production use
4. **Cache research results** when appropriate
5. **Use batch processing** with rate limiting for multiple queries
6. **Choose the right depth**:
   - `basic`: Quick overview
   - `intermediate`: Standard research
   - `comprehensive`: Detailed analysis

## Environment Configuration

Add to your `.env.local`:

```env
# Gemini API (either one works)
GEMINI_API_KEY=your-gemini-api-key
# or
GOOGLE_AI_API_KEY=your-google-ai-api-key

# Other AI services
ANTHROPIC_API_KEY=your-anthropic-key
OPENAI_API_KEY=your-openai-key
```

## Future Enhancements

- Streaming responses for long research queries
- Multi-modal support (images, PDFs)
- Research result caching and deduplication
- Advanced prompt chaining for complex research
- Integration with medical databases and journals