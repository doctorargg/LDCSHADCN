/**
 * Simple test to verify Gemini integration
 * Run with: npm test test/gemini-integration.test.ts
 */

import { AIServiceFactory } from '../lib/ai/services/factory';
import { AIProvider } from '../lib/ai/config';

async function testGeminiIntegration() {
  console.log('Testing Gemini Integration...\n');
  
  // Test 1: Service instantiation
  console.log('Test 1: Service Instantiation');
  const geminiService = AIServiceFactory.getGeminiService();
  
  if (!geminiService) {
    console.error('❌ FAILED: Gemini service not available. Please set GEMINI_API_KEY or GOOGLE_AI_API_KEY in environment.');
    return;
  }
  console.log('✅ PASSED: Gemini service instantiated successfully\n');
  
  // Test 2: Basic research query
  console.log('Test 2: Basic Research Query');
  try {
    const result = await geminiService.performResearch(
      'What is functional medicine?',
      {
        domain: 'healthcare',
        depth: 'basic',
        includeReferences: false,
      }
    );
    
    if (result.content && !result.error) {
      console.log('✅ PASSED: Research query successful');
      console.log('Response preview:', result.content.substring(0, 200) + '...\n');
    } else {
      console.error('❌ FAILED: Research query returned error:', result.error);
    }
  } catch (error) {
    console.error('❌ FAILED: Research query threw error:', error);
  }
  
  // Test 3: Content analysis
  console.log('Test 3: Content Analysis');
  try {
    const testContent = 'Functional medicine focuses on root causes of disease.';
    const result = await geminiService.analyzeContent(testContent, {
      checkAccuracy: true,
      extractKeyPoints: true,
    });
    
    if (result.content && !result.error) {
      console.log('✅ PASSED: Content analysis successful');
      console.log('Analysis preview:', result.content.substring(0, 200) + '...\n');
    } else {
      console.error('❌ FAILED: Content analysis returned error:', result.error);
    }
  } catch (error) {
    console.error('❌ FAILED: Content analysis threw error:', error);
  }
  
  // Test 4: Medical information extraction
  console.log('Test 4: Medical Information Extraction');
  try {
    const clinicalText = 'Patient has hypertension, managed with lisinopril 10mg daily.';
    const result = await geminiService.extractMedicalInfo(clinicalText, {
      conditions: true,
      medications: true,
    });
    
    if (result.content && !result.error) {
      console.log('✅ PASSED: Medical extraction successful');
      console.log('Extraction preview:', result.content.substring(0, 200) + '...\n');
    } else {
      console.error('❌ FAILED: Medical extraction returned error:', result.error);
    }
  } catch (error) {
    console.error('❌ FAILED: Medical extraction threw error:', error);
  }
  
  console.log('Gemini Integration Testing Complete!');
}

// Run the test if this file is executed directly
if (require.main === module) {
  testGeminiIntegration().catch(console.error);
}

export { testGeminiIntegration };