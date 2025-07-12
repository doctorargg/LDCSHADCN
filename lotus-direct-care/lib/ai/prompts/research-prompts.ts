import { practiceInfo, responseGuidelines } from '../config';

/**
 * Research context for generating prompts
 */
export interface ResearchContext {
  topic: string;
  scope: 'narrow' | 'broad' | 'comprehensive';
  audience: 'medical-professionals' | 'patients' | 'general';
  includeEvidence: boolean;
  maxDepth?: number;
}

/**
 * Medical research categories
 */
export const ResearchCategories = {
  FUNCTIONAL_MEDICINE: 'functional-medicine',
  CHRONIC_CONDITIONS: 'chronic-conditions',
  PREVENTIVE_CARE: 'preventive-care',
  NUTRITIONAL_MEDICINE: 'nutritional-medicine',
  HORMONE_HEALTH: 'hormone-health',
  MENTAL_WELLNESS: 'mental-wellness',
  LONGEVITY: 'longevity-medicine',
  INTEGRATIVE_THERAPIES: 'integrative-therapies',
} as const;

/**
 * Generate system prompt for medical research
 */
export function generateResearchSystemPrompt(): string {
  return `You are an expert medical researcher specializing in functional medicine and integrative healthcare. 
Your role is to provide evidence-based, comprehensive research while adhering to these guidelines:

Practice Context:
- You're researching for ${practiceInfo.name}, led by ${practiceInfo.doctor} (${practiceInfo.credentials})
- Focus areas: ${practiceInfo.services.join(', ')}
- Approach: Root cause medicine with personalized treatment plans

Research Guidelines:
- Prioritize peer-reviewed sources and clinical evidence
- Include both conventional and functional medicine perspectives
- Consider patient safety and contraindications
- Maintain ${responseGuidelines.tone} tone
- Emphasize ${responseGuidelines.emphasis.join(', ')}

Important Restrictions:
${responseGuidelines.avoid.map(item => `- ${item}`).join('\n')}

Always structure responses with clear sections and actionable insights.`;
}

/**
 * Generate prompt for medical condition research
 */
export function generateConditionResearchPrompt(
  condition: string,
  context: Partial<ResearchContext> = {}
): string {
  const audience = context.audience || 'patients';
  const scope = context.scope || 'comprehensive';
  
  return `Research the medical condition: ${condition}

Scope: ${scope} analysis
Target Audience: ${audience}

Please provide a structured research response covering:

1. Overview & Definition
   - Clear explanation of the condition
   - Prevalence and demographics
   - Risk factors

2. Root Causes & Pathophysiology
   - Underlying mechanisms
   - Contributing factors (genetic, environmental, lifestyle)
   - Systems affected

3. Symptoms & Diagnosis
   - Common symptoms and presentations
   - Diagnostic criteria and tests
   - Differential diagnoses

4. Functional Medicine Approach
   - Root cause analysis framework
   - Systems-based evaluation
   - Key imbalances to address

5. Treatment Options
   - Conventional treatments
   - Functional medicine interventions
   - Integrative therapies
   - Lifestyle modifications

6. Nutritional Considerations
   - Dietary recommendations
   - Key nutrients
   - Foods to avoid/include

7. Patient Outcomes & Prognosis
   - Expected outcomes with different approaches
   - Success factors
   - Long-term management

${context.includeEvidence ? '8. Evidence & References\n   - Key studies\n   - Clinical guidelines\n   - Recent research findings' : ''}

Format the response as structured JSON for easy parsing and use.`;
}

/**
 * Generate prompt for treatment protocol research
 */
export function generateTreatmentResearchPrompt(
  treatment: string,
  condition?: string,
  context: Partial<ResearchContext> = {}
): string {
  const scope = context.scope || 'comprehensive';
  
  let prompt = `Research the treatment protocol: ${treatment}`;
  if (condition) {
    prompt += ` for ${condition}`;
  }
  
  prompt += `\n\nScope: ${scope} analysis\n\n`;
  prompt += `Provide comprehensive research covering:

1. Treatment Overview
   - Mechanism of action
   - Primary applications
   - Treatment timeline

2. Clinical Evidence
   - Efficacy data
   - Safety profile
   - Comparative effectiveness

3. Implementation Protocol
   - Patient selection criteria
   - Dosing/administration guidelines
   - Monitoring requirements

4. Integration with Functional Medicine
   - Synergistic approaches
   - Addressing root causes
   - Systems support

5. Patient Considerations
   - Contraindications
   - Side effects/risks
   - Patient education points

6. Outcomes & Expectations
   - Success rates
   - Timeline for improvement
   - Maintenance strategies

7. Complementary Approaches
   - Lifestyle modifications
   - Nutritional support
   - Other therapies

Return as structured JSON with clear sections and evidence ratings.`;
  
  return prompt;
}

/**
 * Generate prompt for nutritional research
 */
export function generateNutritionalResearchPrompt(
  topic: string,
  context: Partial<ResearchContext> = {}
): string {
  return `Research nutritional approaches for: ${topic}

Provide evidence-based nutritional research including:

1. Nutritional Foundations
   - Key nutrients involved
   - Biochemical pathways
   - Deficiency/excess impacts

2. Dietary Strategies
   - Therapeutic diets
   - Food as medicine approach
   - Meal planning guidelines

3. Supplementation Protocols
   - Evidence-based supplements
   - Dosing recommendations
   - Quality considerations

4. Clinical Applications
   - Patient assessment
   - Personalization factors
   - Monitoring strategies

5. Food Lists
   - Beneficial foods
   - Foods to avoid
   - Preparation methods

6. Implementation Support
   - Patient education
   - Behavior change strategies
   - Common challenges

Format as JSON with practical, actionable recommendations.`;
}

/**
 * Generate prompt for diagnostic interpretation
 */
export function generateDiagnosticResearchPrompt(
  testType: string,
  parameters?: string[],
  context: Partial<ResearchContext> = {}
): string {
  let prompt = `Research diagnostic test interpretation for: ${testType}\n\n`;
  
  if (parameters && parameters.length > 0) {
    prompt += `Specific parameters: ${parameters.join(', ')}\n\n`;
  }
  
  prompt += `Provide comprehensive guidance on:

1. Test Overview
   - What it measures
   - Clinical significance
   - Testing methodology

2. Reference Ranges
   - Standard ranges
   - Optimal vs. normal ranges
   - Factors affecting results

3. Clinical Interpretation
   - Pattern recognition
   - Functional medicine perspective
   - System interactions

4. Abnormal Results
   - Common causes of abnormalities
   - Clinical implications
   - Further testing needed

5. Treatment Implications
   - Intervention strategies
   - Monitoring recommendations
   - Expected changes with treatment

6. Patient Communication
   - How to explain results
   - Action steps
   - Follow-up planning

Return as structured JSON for clinical decision support.`;
  
  return prompt;
}

/**
 * Generate prompt for literature review
 */
export function generateLiteratureReviewPrompt(
  topic: string,
  yearRange?: { start: number; end: number },
  context: Partial<ResearchContext> = {}
): string {
  const currentYear = new Date().getFullYear();
  const startYear = yearRange?.start || currentYear - 5;
  const endYear = yearRange?.end || currentYear;
  
  return `Conduct a literature review on: ${topic}

Time Range: ${startYear} to ${endYear}
Focus: Functional and integrative medicine perspective

Structure the review as follows:

1. Research Overview
   - Current state of knowledge
   - Key developments
   - Emerging trends

2. Major Studies
   - Landmark research
   - Clinical trials
   - Systematic reviews

3. Evidence Summary
   - Strength of evidence
   - Consensus findings
   - Contradictory results

4. Clinical Applications
   - Practice guidelines
   - Implementation strategies
   - Real-world outcomes

5. Knowledge Gaps
   - Areas needing research
   - Unanswered questions
   - Future directions

6. Practical Implications
   - For practitioners
   - For patients
   - For treatment protocols

Format as JSON with study citations and evidence quality ratings.`;
}

/**
 * Generate prompt for comparative analysis
 */
export function generateComparativeResearchPrompt(
  options: string[],
  criteria: string[],
  context: Partial<ResearchContext> = {}
): string {
  return `Compare and analyze the following options: ${options.join(' vs ')}

Evaluation Criteria:
${criteria.map(c => `- ${c}`).join('\n')}

Provide a comprehensive comparison including:

1. Overview of Each Option
   - Key characteristics
   - Mechanism/approach
   - Primary applications

2. Comparative Analysis
   - Side-by-side comparison
   - Strengths and limitations
   - Evidence quality

3. Clinical Considerations
   - Patient selection
   - Contraindications
   - Cost-benefit analysis

4. Functional Medicine Perspective
   - Root cause alignment
   - Systems support
   - Personalization factors

5. Recommendations
   - Best use cases
   - Combination strategies
   - Decision framework

6. Summary Table
   - Quick reference guide
   - Key differentiators
   - Clinical pearls

Return as structured JSON with clear comparisons and clinical guidance.`;
}

/**
 * Research topic suggestions based on practice focus
 */
export const ResearchTopicSuggestions = {
  [ResearchCategories.FUNCTIONAL_MEDICINE]: [
    'Gut-brain axis in chronic disease',
    'Mitochondrial dysfunction and fatigue',
    'Inflammation and autoimmunity',
    'Detoxification pathways',
    'Microbiome optimization',
  ],
  [ResearchCategories.CHRONIC_CONDITIONS]: [
    'Type 2 diabetes reversal protocols',
    'Hashimoto\'s thyroiditis management',
    'Chronic fatigue syndrome',
    'Fibromyalgia treatment approaches',
    'Long COVID recovery',
  ],
  [ResearchCategories.PREVENTIVE_CARE]: [
    'Cardiovascular disease prevention',
    'Cancer risk reduction strategies',
    'Cognitive decline prevention',
    'Metabolic syndrome prevention',
    'Immune system optimization',
  ],
  [ResearchCategories.NUTRITIONAL_MEDICINE]: [
    'Therapeutic ketogenic diets',
    'Intermittent fasting protocols',
    'Anti-inflammatory nutrition',
    'Nutrigenomics applications',
    'Micronutrient optimization',
  ],
  [ResearchCategories.HORMONE_HEALTH]: [
    'Bioidentical hormone therapy',
    'Thyroid optimization',
    'Adrenal dysfunction',
    'PCOS management',
    'Male hormone optimization',
  ],
  [ResearchCategories.MENTAL_WELLNESS]: [
    'Nutritional psychiatry',
    'Stress resilience protocols',
    'Sleep optimization',
    'Anxiety management',
    'Depression and inflammation',
  ],
  [ResearchCategories.LONGEVITY]: [
    'Cellular senescence',
    'NAD+ optimization',
    'Telomere support',
    'Autophagy enhancement',
    'Longevity biomarkers',
  ],
  [ResearchCategories.INTEGRATIVE_THERAPIES]: [
    'IV nutrient therapy',
    'Peptide therapeutics',
    'Ozone therapy',
    'Photobiomodulation',
    'Hyperbaric oxygen therapy',
  ],
};

/**
 * Generate a research prompt based on category
 */
export function generateCategoryResearchPrompt(
  category: keyof typeof ResearchCategories,
  specificTopic?: string
): string {
  const topics = ResearchTopicSuggestions[ResearchCategories[category]];
  const topic = specificTopic || topics[0];
  
  return generateConditionResearchPrompt(topic, {
    scope: 'comprehensive',
    includeEvidence: true,
    audience: 'medical-professionals',
  });
}