import { practiceInfo, responseGuidelines } from '../config';

export interface EmailContext {
  patientName: string;
  email: string;
  phone?: string;
  reasonForVisit?: string;
  message: string;
  preferredContactMethod?: string;
  insurance?: string;
}

export function generateSystemPrompt(): string {
  return `You are an AI assistant representing ${practiceInfo.name}, helping respond to patient inquiries. 
You work alongside ${practiceInfo.doctor}, who is a licensed physician with ${practiceInfo.credentials}.

Practice Information:
- Name: ${practiceInfo.name}
- Address: ${practiceInfo.address}
- Phone: ${practiceInfo.phone}
- Email: ${practiceInfo.email}
- Hours: ${practiceInfo.hours}

Services Offered:
${practiceInfo.services.map(service => `- ${service}`).join('\n')}

Key Differentiators:
${practiceInfo.differentiators.map(diff => `- ${diff}`).join('\n')}

Important Links:
- Book Appointment: ${practiceInfo.links.bookAppointment}
- Patient Portal: ${practiceInfo.links.patientPortal}
- Membership Signup: ${practiceInfo.links.membershipSignup}
- Website: ${practiceInfo.links.website}

Response Guidelines:
- Tone: ${responseGuidelines.tone}
- Style: ${responseGuidelines.style}
- Emphasize: ${responseGuidelines.emphasis.join(', ')}
- Avoid: ${responseGuidelines.avoid.join(', ')}

IMPORTANT: 
1. Always be helpful and informative while maintaining appropriate medical boundaries
2. Include relevant links as CTAs when appropriate (be tasteful, not pushy)
3. Encourage scheduling a consultation for specific medical questions
4. Highlight the practice's unique approach to healthcare
5. Keep responses concise but comprehensive (aim for 2-4 paragraphs)`;
}

export function generateEmailPrompt(context: EmailContext): string {
  return `Please generate a personalized email response for the following patient inquiry:

Patient Name: ${context.patientName}
Email: ${context.email}
${context.phone ? `Phone: ${context.phone}` : ''}
${context.reasonForVisit ? `Reason for Visit: ${context.reasonForVisit}` : ''}
${context.preferredContactMethod ? `Preferred Contact: ${context.preferredContactMethod}` : ''}
${context.insurance ? `Insurance: ${context.insurance}` : ''}

Patient's Message:
"${context.message}"

Please create a warm, professional response that:
1. Acknowledges their specific inquiry
2. Provides helpful information based on their needs
3. Includes appropriate calls-to-action (schedule consultation, learn more, etc.)
4. Maintains the practice's professional yet approachable tone
5. Ends with clear next steps

IMPORTANT: Do NOT include a greeting (like "Dear [Name]" or "Hi [Name]") as this will be added automatically by the email template. Start your response directly with the main content.

The response should be formatted as HTML suitable for email, but keep styling simple and clean.`;
}

// Specific templates for common inquiry types
export const responseTemplates = {
  generalInquiry: {
    keywords: ['information', 'learn more', 'interested', 'tell me about'],
    emphasis: ['comprehensive care', 'personalized approach', 'direct access'],
  },
  
  functionalMedicine: {
    keywords: ['functional medicine', 'root cause', 'holistic', 'integrative'],
    emphasis: ['evidence-based approach', 'comprehensive testing', 'personalized protocols'],
  },
  
  directPrimaryCare: {
    keywords: ['dpc', 'direct primary care', 'membership', 'monthly fee'],
    emphasis: ['no insurance hassles', 'unlimited visits', 'direct physician access'],
  },
  
  weightLoss: {
    keywords: ['weight loss', 'weight management', 'obesity', 'diet'],
    emphasis: ['metabolic approach', 'hormone optimization', 'sustainable results'],
  },
  
  chronicConditions: {
    keywords: ['chronic', 'pain', 'fatigue', 'autoimmune', 'inflammation'],
    emphasis: ['root cause analysis', 'comprehensive approach', 'long appointments'],
  },
  
  ketamineTherapy: {
    keywords: ['ketamine', 'depression', 'anxiety', 'ptsd', 'mental health'],
    emphasis: ['evidence-based treatment', 'supervised therapy', 'integrative approach'],
  },
  
  longevity: {
    keywords: ['longevity', 'anti-aging', 'healthspan', 'preventive'],
    emphasis: ['biomarker optimization', 'preventive strategies', 'evidence-based protocols'],
  },
};

// Helper to determine inquiry type
export function determineInquiryType(message: string, reasonForVisit?: string): string {
  const combinedText = `${message} ${reasonForVisit || ''}`.toLowerCase();
  
  for (const [type, template] of Object.entries(responseTemplates)) {
    if (template.keywords.some(keyword => combinedText.includes(keyword))) {
      return type;
    }
  }
  
  return 'generalInquiry';
}

// Generate appropriate CTA based on inquiry type
export function generateCTA(inquiryType: string): string {
  const ctas: Record<string, string> = {
    generalInquiry: `
      <p>I'd love to discuss how our practice can support your health goals. You can:</p>
      <ul>
        <li><a href="${practiceInfo.links.membershipSignup}">Sign up as a new patient</a> for our Direct Primary Care program</li>
        <li><a href="${practiceInfo.links.website}/services">Explore our services</a> to learn more about our approach</li>
        <li><a href="${practiceInfo.links.bookAppointment}">Schedule a free meet & greet</a> if you'd like to visit our practice first</li>
      </ul>
    `,
    
    functionalMedicine: `
      <p>To explore how functional medicine can help address your health concerns:</p>
      <ul>
        <li><a href="${practiceInfo.links.membershipSignup}">Sign up as a new patient</a> to get started</li>
        <li><a href="${practiceInfo.links.bookAppointment}">Book a comprehensive consultation</a> (60-90 minutes)</li>
        <li><a href="${practiceInfo.links.website}/services/functional-medicine">Learn about our functional medicine approach</a></li>
      </ul>
    `,
    
    directPrimaryCare: `
      <p>Ready to experience healthcare without the hassles? Here are your next steps:</p>
      <ul>
        <li><a href="${practiceInfo.links.membershipSignup}">Sign up for membership</a> - It's quick and easy!</li>
        <li><a href="${practiceInfo.links.bookAppointment}">Schedule a meet & greet</a> to tour our practice</li>
        <li><a href="${practiceInfo.links.website}/services/direct-primary-care">Compare our membership options</a></li>
      </ul>
    `,
    
    weightLoss: `
      <p>Let's create a personalized weight management plan for you:</p>
      <ul>
        <li><a href="${practiceInfo.links.membershipSignup}">Sign up to start your weight loss journey</a></li>
        <li><a href="${practiceInfo.links.bookAppointment}">Schedule a metabolic consultation</a></li>
        <li><a href="${practiceInfo.links.website}/services/functional-medicine">Learn about our approach to weight management</a></li>
      </ul>
    `,
    
    chronicConditions: `
      <p>We're here to help you find answers and relief. Your next steps:</p>
      <ul>
        <li><a href="${practiceInfo.links.membershipSignup}">Sign up as a new patient</a> to begin your healing journey</li>
        <li><a href="${practiceInfo.links.bookAppointment}">Book an extended consultation</a> to discuss your condition</li>
        <li><a href="${practiceInfo.links.website}/about/approach">Understand our root-cause approach</a></li>
      </ul>
    `,
    
    ketamineTherapy: `
      <p>To learn more about our ketamine therapy program:</p>
      <ul>
        <li><a href="${practiceInfo.links.bookAppointment}">Schedule a consultation</a> to determine if you're a candidate</li>
        <li><a href="${practiceInfo.links.website}/services/ketamine-therapy">Review our ketamine therapy protocols</a></li>
      </ul>
    `,
    
    longevity: `
      <p>Start optimizing your healthspan today:</p>
      <ul>
        <li><a href="${practiceInfo.links.bookAppointment}">Book a longevity consultation</a></li>
        <li><a href="${practiceInfo.links.website}/services/longevity-medicine">Explore our longevity protocols</a></li>
      </ul>
    `,
  };
  
  return ctas[inquiryType] || ctas.generalInquiry;
}