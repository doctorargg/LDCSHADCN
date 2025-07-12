import { z } from 'zod';

// AI Provider Types
export enum AIProvider {
  ANTHROPIC = 'anthropic',
  OPENAI = 'openai',
  GOOGLE = 'google',
}

// AI Model Configuration
export const AIModels = {
  [AIProvider.ANTHROPIC]: {
    primary: 'claude-3-5-sonnet-20241022',  // Latest Claude 3.5 Sonnet
    secondary: 'claude-3-haiku-20240307',    // Fast, affordable fallback
  },
  [AIProvider.OPENAI]: {
    primary: 'gpt-4-turbo-preview',
    secondary: 'gpt-3.5-turbo',
  },
  [AIProvider.GOOGLE]: {
    primary: 'gemini-pro',
    secondary: 'gemini-pro',
  },
} as const;

// Environment Variable Schema
const envSchema = z.object({
  // AI API Keys
  ANTHROPIC_API_KEY: z.string().optional(),
  OPENAI_API_KEY: z.string().optional(),
  GOOGLE_AI_API_KEY: z.string().optional(),
  GEMINI_API_KEY: z.string().optional(), // Alias for GOOGLE_AI_API_KEY
  FIRECRAWL_API_KEY: z.string().optional(),
  
  // AI Configuration
  AI_MODEL_PRIMARY: z.string().default('claude-3-5-sonnet-20241022'),
  AI_MODEL_SECONDARY: z.string().default(AIModels[AIProvider.OPENAI].primary),
  AI_TEMPERATURE: z.coerce.number().min(0).max(2).default(0.7),
  AI_MAX_TOKENS: z.coerce.number().min(100).max(8000).default(4000),
  
  // Email Response Settings
  AI_EMAIL_RESPONSE_DELAY_MS: z.coerce.number().default(120000), // 2 minutes
  AI_EMAIL_RESPONSE_ENABLED: z.string().transform(val => val === 'true').default('true'),
  
  // Blog Automation Settings
  AI_BLOG_GENERATION_ENABLED: z.string().transform(val => val === 'true').default('true'),
  AI_BLOG_SCHEDULE_CRON: z.string().default('0 9 * * 1'), // Monday 9 AM
  AI_BLOG_MIN_WORDS: z.coerce.number().default(2000),
  AI_BLOG_MAX_WORDS: z.coerce.number().default(2500),
  
  // Feature Flags
  FEATURE_AI_EMAIL_RESPONDER: z.string().transform(val => val === 'true').default('true'),
  FEATURE_AI_BLOG_AUTOMATION: z.string().transform(val => val === 'true').default('true'),
  FEATURE_AI_CRM: z.string().transform(val => val === 'true').default('true'),
});

// Parse and validate environment variables
const parseEnv = () => {
  try {
    // Handle GEMINI_API_KEY as an alias for GOOGLE_AI_API_KEY
    const env = { ...process.env };
    if (env.GEMINI_API_KEY && !env.GOOGLE_AI_API_KEY) {
      env.GOOGLE_AI_API_KEY = env.GEMINI_API_KEY;
    }
    return envSchema.parse(env);
  } catch (error) {
    console.error('Invalid environment variables:', error);
    throw new Error('Invalid environment configuration');
  }
};

// Export validated config
export const aiConfig = parseEnv();

// Helper to get the appropriate AI provider based on available keys
export function getAvailableProvider(): AIProvider | null {
  if (aiConfig.ANTHROPIC_API_KEY) return AIProvider.ANTHROPIC;
  if (aiConfig.OPENAI_API_KEY) return AIProvider.OPENAI;
  if (aiConfig.GOOGLE_AI_API_KEY) return AIProvider.GOOGLE;
  return null;
}

// Email Response Configuration
export const emailResponseConfig = {
  enabled: aiConfig.AI_EMAIL_RESPONSE_ENABLED && aiConfig.FEATURE_AI_EMAIL_RESPONDER,
  delayMs: aiConfig.AI_EMAIL_RESPONSE_DELAY_MS,
  provider: getAvailableProvider(),
  model: aiConfig.AI_MODEL_PRIMARY,
  temperature: aiConfig.AI_TEMPERATURE,
  maxTokens: aiConfig.AI_MAX_TOKENS,
};

// Blog Generation Configuration
export const blogConfig = {
  enabled: aiConfig.AI_BLOG_GENERATION_ENABLED && aiConfig.FEATURE_AI_BLOG_AUTOMATION,
  schedule: aiConfig.AI_BLOG_SCHEDULE_CRON,
  provider: getAvailableProvider(),
  model: aiConfig.AI_MODEL_PRIMARY,
  wordCount: aiConfig.AI_BLOG_MIN_WORDS, // Target word count
  temperature: aiConfig.AI_TEMPERATURE,
  maxTokens: aiConfig.AI_MAX_TOKENS,
  targetAudience: 'Patients seeking holistic, evidence-based healthcare solutions',
  tone: 'Professional yet approachable, educational and empowering',
};

// Practice Information for AI Context
export const practiceInfo = {
  name: 'Lotus Direct Care',
  doctor: 'Dr. Aaron Rosenberg',
  credentials: 'MD, Functional Medicine Training (IFM)',
  address: '1516 W Mequon Rd., STE 103, Mequon, WI 53092',
  phone: '(262) 242-0700',
  email: 'info@lotusdirectcare.com',
  website: 'https://lotusdirectcare.com',
  hours: 'Monday-Friday 9am-5pm, Closed weekends',
  
  // Key Links for CTAs
  links: {
    patientPortal: 'https://app.elationemr.com/login',
    bookAppointment: 'https://lotusdirectcare.janeapp.com/',
    membershipSignup: 'https://app.hint.com/enroll/Lotus-Direct-Care/',
    website: 'https://lotusdirectcare.com',
  },
  
  // Services
  services: [
    'Direct Primary Care',
    'Functional Medicine',
    'Ketamine Therapy',
    'PRP Therapy',
    'Addiction Medicine',
    'Longevity Medicine',
    'Integrative Therapies',
  ],
  
  // Key Differentiators
  differentiators: [
    '60-90 minute appointments vs traditional 7-minute visits',
    'Direct access to Dr. Rosenberg via phone, text, and email',
    'Root cause approach to health issues',
    'Transparent pricing with no insurance hassles',
    'Evidence-based functional medicine',
    'Personalized treatment plans',
  ],
};

// Response Tone Guidelines
export const responseGuidelines = {
  tone: 'professional yet approachable',
  style: 'evidence-based and educational',
  emphasis: [
    'Patient-centered care',
    'Root cause medicine',
    'Personalized approach',
    'Direct access to physician',
    'Longer appointment times',
  ],
  avoid: [
    'Making specific medical diagnoses',
    'Providing medical advice without consultation',
    'Guaranteeing specific outcomes',
    'Discussing specific pricing without consultation',
  ],
};