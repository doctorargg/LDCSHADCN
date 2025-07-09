import { practiceInfo, blogConfig } from '../config';

export interface BlogContext {
  topic: string;
  targetAudience: string;
  wordCount: number;
  tone: string;
  includeCallToAction: boolean;
}

export function generateBlogSystemPrompt(): string {
  return `You are a medical content writer for ${practiceInfo.name}, working with ${practiceInfo.doctor}. 
Your role is to create informative, engaging, and medically accurate blog posts that educate patients while maintaining appropriate medical boundaries.

Practice Information:
- Name: ${practiceInfo.name}
- Doctor: ${practiceInfo.doctor} (${practiceInfo.credentials})
- Specialties: Functional Medicine, Direct Primary Care, Personalized Medicine
- Philosophy: Root-cause approach, evidence-based treatments, patient-centered care

Content Guidelines:
1. MEDICAL ACCURACY: All medical information must be evidence-based and accurate
2. DISCLAIMERS: Include appropriate medical disclaimers (not medical advice, consult physician)
3. TONE: Professional yet approachable, educational without being condescending
4. COMPLIANCE: Follow HIPAA guidelines, no specific patient information
5. BRANDING: Naturally incorporate practice values and services when relevant
6. SEO: Create content that is search-engine friendly without keyword stuffing

Important Restrictions:
- Do NOT make specific medical recommendations
- Do NOT diagnose conditions
- Do NOT recommend specific dosages or treatment protocols
- Always encourage readers to consult with their healthcare provider
- Emphasize that Dr. Rosenberg is a licensed physician but NOT board certified

Content Structure:
- Engaging introduction that identifies the problem
- Educational body with actionable insights
- Natural integration of practice services when relevant
- Clear call-to-action at the end
- Appropriate medical disclaimers`;
}

export function generateBlogPrompt(context: BlogContext): string {
  return `Please create a comprehensive blog post on the following topic:

Topic: ${context.topic}
Target Audience: ${context.targetAudience}
Word Count: Approximately ${context.wordCount} words
Tone: ${context.tone}
Include Call-to-Action: ${context.includeCallToAction ? 'Yes' : 'No'}

Please structure your response as JSON with the following format:
{
  "title": "Engaging, SEO-friendly title",
  "excerpt": "Compelling 1-2 sentence summary for preview",
  "content": "Full blog post content in markdown format",
  "category": "Most relevant category",
  "tags": ["tag1", "tag2", "tag3"],
  "seoTitle": "SEO-optimized title (60 chars max)",
  "seoDescription": "Meta description (160 chars max)",
  "seoKeywords": ["keyword1", "keyword2", "keyword3"]
}

Content Requirements:
1. Start with a relatable patient scenario or common concern
2. Provide educational value with evidence-based information
3. Include practical tips or insights patients can use
4. ${context.includeCallToAction ? 'End with a subtle call-to-action inviting readers to learn more about our practice' : 'End with a summary of key points'}
5. Include this disclaimer: "This blog is for educational purposes only and should not replace professional medical advice."

Focus on creating content that:
- Addresses common patient questions and concerns
- Explains complex medical concepts in accessible language
- Demonstrates our practice's expertise and approach
- Encourages readers to take a proactive role in their health`;
}

// Blog topic generator with medical focus
export async function selectBlogTopic(): Promise<string> {
  const topics = [
    // Functional Medicine Topics
    "Understanding Functional Medicine: A Root-Cause Approach to Chronic Illness",
    "The Gut-Brain Connection: How Your Digestive Health Affects Mental Wellness",
    "Inflammation: The Hidden Driver of Chronic Disease",
    "Optimizing Thyroid Function: Beyond Standard Lab Ranges",
    "Autoimmune Conditions: A Functional Medicine Perspective",
    
    // Direct Primary Care Topics
    "Direct Primary Care: Healthcare Without the Insurance Hassles",
    "The Benefits of Having a Personal Physician Who Actually Knows You",
    "Why Longer Appointments Lead to Better Health Outcomes",
    "Preventive Care: Investing in Your Future Health",
    
    // Weight Management Topics
    "Metabolic Health: Why Weight Loss Isn't Just About Calories",
    "Hormones and Weight: Understanding the Connection",
    "Sustainable Weight Loss: A Medical Approach That Works",
    "The Role of Insulin Resistance in Weight Management",
    
    // Longevity Medicine Topics
    "Biomarkers of Aging: What Your Labs Really Tell You",
    "Optimizing Healthspan: Living Better, Not Just Longer",
    "The Science of Cellular Health and Aging",
    "Preventive Strategies for Cognitive Health",
    
    // Mental Health Topics
    "Ketamine Therapy: A Breakthrough Treatment for Depression",
    "The Functional Medicine Approach to Anxiety",
    "Stress and Your Health: The Physiological Impact",
    "Sleep Optimization: The Foundation of Mental Health",
    
    // Hormone Health Topics
    "Bioidentical Hormone Replacement: Risks, Benefits, and Alternatives",
    "Adrenal Health: Managing Stress and Fatigue",
    "Men's Health: Optimizing Testosterone Naturally",
    "Women's Health: Navigating Hormonal Changes",
    
    // Nutrition Topics
    "Food as Medicine: Nutritional Strategies for Chronic Conditions",
    "The Anti-Inflammatory Diet: What to Eat for Optimal Health",
    "Personalized Nutrition: Why One Size Doesn't Fit All",
    "Supplements: Separating Science from Marketing",
    
    // Chronic Disease Management
    "Diabetes Prevention: A Functional Medicine Approach",
    "Heart Health Beyond Cholesterol Numbers",
    "Chronic Fatigue: Uncovering Hidden Causes",
    "Managing Chronic Pain Without Dependency",
  ];

  // Randomly select a topic
  return topics[Math.floor(Math.random() * topics.length)];
}

// SEO metadata generator
export async function generateSEOMetadata(title: string, excerpt: string): Promise<{
  title: string;
  description: string;
  keywords: string[];
}> {
  // Truncate title for SEO
  const seoTitle = title.length > 60 ? title.substring(0, 57) + '...' : title;
  
  // Create meta description from excerpt
  const seoDescription = excerpt.length > 160 
    ? excerpt.substring(0, 157) + '...' 
    : excerpt;
  
  // Extract keywords from title and excerpt
  const combinedText = `${title} ${excerpt}`.toLowerCase();
  const keywords: string[] = [];
  
  // Medical keywords to look for
  const medicalKeywords = [
    'functional medicine', 'direct primary care', 'holistic health',
    'integrative medicine', 'preventive care', 'chronic disease',
    'hormone health', 'weight management', 'mental health',
    'personalized medicine', 'root cause', 'wellness'
  ];
  
  medicalKeywords.forEach(keyword => {
    if (combinedText.includes(keyword)) {
      keywords.push(keyword);
    }
  });
  
  // Always include practice keywords
  keywords.push('lotus direct care', 'dr rosenberg', 'arizona');
  
  return {
    title: seoTitle,
    description: seoDescription,
    keywords: keywords.slice(0, 5), // Limit to 5 keywords
  };
}

// Content templates for specific conditions
export const conditionTemplates = {
  chronicFatigue: {
    keywords: ['fatigue', 'tired', 'exhaustion', 'energy'],
    outline: [
      'Understanding chronic fatigue vs normal tiredness',
      'Common underlying causes (thyroid, adrenal, mitochondrial)',
      'The functional medicine testing approach',
      'Lifestyle and nutritional interventions',
      'When to seek professional help',
    ],
  },
  
  thyroidHealth: {
    keywords: ['thyroid', 'hypothyroid', 'hyperthyroid', 'hashimoto'],
    outline: [
      'Thyroid function basics',
      'Why standard labs might miss thyroid issues',
      'Symptoms of thyroid dysfunction',
      'The functional medicine approach to thyroid health',
      'Supporting thyroid function naturally',
    ],
  },
  
  gutHealth: {
    keywords: ['digestive', 'gut', 'microbiome', 'ibs', 'bloating'],
    outline: [
      'The importance of gut health',
      'Signs of gut dysfunction',
      'The gut-brain-immune connection',
      'Testing and assessment options',
      'Healing protocols and dietary strategies',
    ],
  },
  
  hormoneBalance: {
    keywords: ['hormone', 'estrogen', 'testosterone', 'menopause', 'andropause'],
    outline: [
      'Understanding hormone imbalances',
      'Common symptoms in men and women',
      'The role of stress and lifestyle',
      'Testing and monitoring approaches',
      'Natural vs bioidentical hormone options',
    ],
  },
};

// Call-to-action templates
export const ctaTemplates = {
  general: `Ready to take control of your health? At Lotus Direct Care, we offer comprehensive functional medicine consultations to help uncover the root causes of your health concerns. <a href="${practiceInfo.links.membershipSignup}">Learn more about our membership options</a> or <a href="${practiceInfo.links.bookAppointment}">schedule a consultation</a> with Dr. Rosenberg today.`,
  
  functionalMedicine: `If you're tired of treating symptoms and ready to address root causes, our functional medicine approach might be right for you. <a href="${practiceInfo.links.website}/services/functional-medicine">Explore our functional medicine services</a> or <a href="${practiceInfo.links.membershipSignup}">become a member</a> to start your healing journey.`,
  
  directPrimaryCare: `Experience healthcare that puts you first. Our Direct Primary Care model offers unlimited visits, extended appointments, and direct physician access. <a href="${practiceInfo.links.membershipSignup}">Join our practice today</a> and discover the difference personalized care can make.`,
  
  weightLoss: `Struggling with weight loss? Our medical weight management program addresses the metabolic and hormonal factors that affect your weight. <a href="${practiceInfo.links.bookAppointment}">Schedule a consultation</a> to create your personalized weight loss plan.`,
  
  chronicConditions: `Living with chronic health issues doesn't have to be your normal. Our comprehensive approach has helped many patients find relief and improved quality of life. <a href="${practiceInfo.links.bookAppointment}">Book an appointment</a> to discuss your health concerns with Dr. Rosenberg.`,
};