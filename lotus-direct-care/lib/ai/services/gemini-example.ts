/**
 * Example usage of the Gemini AI Service
 * This file demonstrates how to use the GoogleAIService for various research tasks
 */

import { AIServiceFactory } from './factory';
import { AIProvider } from '../config';
import { GeminiService } from './gemini';
import {
  generateConditionResearchPrompt,
  generateTreatmentResearchPrompt,
  generateNutritionalResearchPrompt,
  ResearchCategories,
} from '../prompts/research-prompts';

/**
 * Example 1: Basic research query
 */
async function basicResearchExample() {
  const geminiService = AIServiceFactory.getGeminiService();
  
  if (!geminiService) {
    console.error('Gemini service not available. Please set GEMINI_API_KEY in environment.');
    return;
  }

  try {
    const result = await geminiService.performResearch(
      'What are the latest advances in functional medicine approaches to autoimmune conditions?',
      {
        domain: 'functional medicine',
        depth: 'comprehensive',
        includeReferences: true,
      }
    );

    console.log('Research Result:', JSON.parse(result.content));
  } catch (error) {
    console.error('Research failed:', error);
  }
}

/**
 * Example 2: Medical condition research
 */
async function conditionResearchExample() {
  const geminiService = AIServiceFactory.getGeminiService();
  
  if (!geminiService) {
    console.error('Gemini service not available');
    return;
  }

  try {
    // Generate a condition research prompt
    const prompt = generateConditionResearchPrompt('Hashimoto\'s Thyroiditis', {
      scope: 'comprehensive',
      audience: 'patients',
      includeEvidence: true,
    });

    const result = await geminiService.generateResponse(prompt, {
      temperature: 0.5,
      maxTokens: 6000,
      responseFormat: 'json',
    });

    console.log('Condition Research:', JSON.parse(result.content));
  } catch (error) {
    console.error('Condition research failed:', error);
  }
}

/**
 * Example 3: Content analysis
 */
async function contentAnalysisExample() {
  const geminiService = AIServiceFactory.getGeminiService();
  
  if (!geminiService) {
    console.error('Gemini service not available');
    return;
  }

  const sampleContent = `
    Functional medicine takes a different approach to healthcare by focusing on 
    identifying and addressing the root causes of disease. Unlike conventional 
    medicine, which often treats symptoms, functional medicine practitioners 
    spend time with their patients, listening to their histories and looking at 
    the interactions among genetic, environmental, and lifestyle factors.
  `;

  try {
    const result = await geminiService.analyzeContent(sampleContent, {
      checkAccuracy: true,
      extractKeyPoints: true,
      assessRelevance: true,
      targetAudience: 'patients interested in functional medicine',
    });

    console.log('Content Analysis:', JSON.parse(result.content));
  } catch (error) {
    console.error('Content analysis failed:', error);
  }
}

/**
 * Example 4: Medical information extraction
 */
async function medicalExtractionExample() {
  const geminiService = AIServiceFactory.getGeminiService();
  
  if (!geminiService) {
    console.error('Gemini service not available');
    return;
  }

  const clinicalNote = `
    Patient presents with fatigue, brain fog, and joint pain for the past 6 months. 
    Labs show TSH 5.2 (elevated), TPO antibodies positive at 156. Vitamin D level 
    is 22 ng/mL (low). Started on levothyroxine 50mcg daily and vitamin D3 5000 IU 
    daily. Recommended anti-inflammatory diet and stress management techniques.
  `;

  try {
    const result = await geminiService.extractMedicalInfo(clinicalNote, {
      conditions: true,
      symptoms: true,
      medications: true,
      lifestyle: true,
    });

    console.log('Extracted Medical Info:', JSON.parse(result.content));
  } catch (error) {
    console.error('Medical extraction failed:', error);
  }
}

/**
 * Example 5: Treatment protocol research
 */
async function treatmentResearchExample() {
  const geminiService = AIServiceFactory.getGeminiService();
  
  if (!geminiService) {
    console.error('Gemini service not available');
    return;
  }

  try {
    const prompt = generateTreatmentResearchPrompt(
      'Low Dose Naltrexone (LDN)',
      'Autoimmune conditions',
      { scope: 'comprehensive' }
    );

    const result = await geminiService.generateResponse(prompt, {
      temperature: 0.4,
      responseFormat: 'json',
    });

    console.log('Treatment Research:', JSON.parse(result.content));
  } catch (error) {
    console.error('Treatment research failed:', error);
  }
}

/**
 * Example 6: Nutritional research
 */
async function nutritionalResearchExample() {
  const geminiService = AIServiceFactory.getGeminiService();
  
  if (!geminiService) {
    console.error('Gemini service not available');
    return;
  }

  try {
    const prompt = generateNutritionalResearchPrompt(
      'Ketogenic diet for neurological conditions',
      { scope: 'comprehensive', includeEvidence: true }
    );

    const result = await geminiService.generateResponse(prompt, {
      temperature: 0.5,
      responseFormat: 'json',
    });

    console.log('Nutritional Research:', JSON.parse(result.content));
  } catch (error) {
    console.error('Nutritional research failed:', error);
  }
}

/**
 * Example 7: Batch research with rate limiting
 */
async function batchResearchExample() {
  const geminiService = AIServiceFactory.getGeminiService();
  
  if (!geminiService) {
    console.error('Gemini service not available');
    return;
  }

  const topics = [
    'Gut-brain axis in depression',
    'Mitochondrial dysfunction in chronic fatigue',
    'Inflammation markers in autoimmune disease',
  ];

  for (const topic of topics) {
    try {
      console.log(`\nResearching: ${topic}`);
      
      const result = await geminiService.performResearch(topic, {
        depth: 'intermediate',
        domain: 'functional medicine',
      });

      console.log('Summary:', JSON.parse(result.content).summary);
      
      // Add delay to respect rate limits
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      console.error(`Failed to research ${topic}:`, error);
    }
  }
}

/**
 * Run all examples
 */
export async function runGeminiExamples() {
  console.log('=== Gemini Service Examples ===\n');
  
  console.log('1. Basic Research Example');
  await basicResearchExample();
  
  console.log('\n2. Condition Research Example');
  await conditionResearchExample();
  
  console.log('\n3. Content Analysis Example');
  await contentAnalysisExample();
  
  console.log('\n4. Medical Extraction Example');
  await medicalExtractionExample();
  
  console.log('\n5. Treatment Research Example');
  await treatmentResearchExample();
  
  console.log('\n6. Nutritional Research Example');
  await nutritionalResearchExample();
  
  console.log('\n7. Batch Research Example');
  await batchResearchExample();
}

// Export individual examples for selective use
export {
  basicResearchExample,
  conditionResearchExample,
  contentAnalysisExample,
  medicalExtractionExample,
  treatmentResearchExample,
  nutritionalResearchExample,
  batchResearchExample,
};