import { AIServiceFactory } from './services/factory';
import { emailResponseConfig, practiceInfo } from './config';
import {
  EmailContext,
  generateSystemPrompt,
  generateEmailPrompt,
  determineInquiryType,
  generateCTA,
} from './prompts/email-response';

export interface EmailResponse {
  subject: string;
  htmlContent: string;
  textContent: string;
  inquiryType: string;
  aiGenerated: boolean;
  error?: string;
}

export class EmailResponder {
  private static instance: EmailResponder;

  private constructor() {}

  static getInstance(): EmailResponder {
    if (!this.instance) {
      this.instance = new EmailResponder();
    }
    return this.instance;
  }

  async generateResponse(context: EmailContext): Promise<EmailResponse> {
    console.log('EmailResponder.generateResponse called', {
      enabled: emailResponseConfig.enabled,
      provider: emailResponseConfig.provider,
    });
    
    // Check if AI email responses are enabled
    if (!emailResponseConfig.enabled) {
      console.log('AI email responses disabled');
      return this.getDefaultResponse(context);
    }

    // Get AI service
    const aiService = AIServiceFactory.getService();
    if (!aiService) {
      console.error('No AI service available for email response', {
        hasAnthropicKey: !!process.env.ANTHROPIC_API_KEY,
        hasOpenAIKey: !!process.env.OPENAI_API_KEY,
        provider: emailResponseConfig.provider,
      });
      return this.getDefaultResponse(context);
    }

    try {
      // Determine inquiry type
      const inquiryType = determineInquiryType(context.message, context.reasonForVisit);

      // Generate AI response
      const aiResponse = await aiService.generateResponse(
        generateEmailPrompt(context),
        {
          systemPrompt: generateSystemPrompt(),
          temperature: emailResponseConfig.temperature,
          maxTokens: emailResponseConfig.maxTokens,
        }
      );

      if (aiResponse.error) {
        console.error('AI response error:', aiResponse.error);
        return this.getDefaultResponse(context);
      }

      // Format the response with proper HTML structure
      const htmlContent = this.formatHtmlResponse(
        context.patientName,
        aiResponse.content,
        inquiryType
      );

      // Generate text version
      const textContent = this.htmlToText(htmlContent);

      // Generate subject line
      const subject = this.generateSubject(context, inquiryType);

      return {
        subject,
        htmlContent,
        textContent,
        inquiryType,
        aiGenerated: true,
      };
    } catch (error) {
      console.error('Error generating AI response:', error);
      return this.getDefaultResponse(context);
    }
  }

  private formatHtmlResponse(
    patientName: string,
    aiContent: string,
    inquiryType: string
  ): string {
    const logoUrl = `${practiceInfo.website}/images/lotus_logo.png`;
    const cta = generateCTA(inquiryType);

    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lotus Direct Care - Response to Your Inquiry</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .header {
      background: linear-gradient(135deg, #4A90E2 0%, #7EC8E3 100%);
      padding: 30px;
      text-align: center;
    }
    .logo {
      max-width: 150px;
      height: auto;
    }
    .content {
      padding: 40px 30px;
    }
    .greeting {
      font-size: 18px;
      margin-bottom: 20px;
    }
    .message {
      margin-bottom: 30px;
    }
    .cta {
      background-color: #f8f9fa;
      border-left: 4px solid #4A90E2;
      padding: 20px;
      margin: 30px 0;
    }
    .cta ul {
      margin: 10px 0;
      padding-left: 20px;
    }
    .cta li {
      margin: 8px 0;
    }
    .cta a {
      color: #4A90E2;
      text-decoration: none;
      font-weight: 500;
    }
    .cta a:hover {
      text-decoration: underline;
    }
    .signature {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #e0e0e0;
    }
    .footer {
      background-color: #f8f9fa;
      padding: 20px 30px;
      text-align: center;
      font-size: 14px;
      color: #666;
    }
    .footer a {
      color: #4A90E2;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="${logoUrl}" alt="Lotus Direct Care" class="logo">
    </div>
    
    <div class="content">
      <p class="greeting">Dear ${patientName},</p>
      
      <div class="message">
        ${aiContent}
      </div>
      
      <div class="cta">
        ${cta}
      </div>
      
      <div class="signature">
        <p>We look forward to partnering with you on your health journey!</p>
        <p>
          <strong>The Lotus Direct Care Team</strong><br>
          ${practiceInfo.phone} | ${practiceInfo.email}<br>
          ${practiceInfo.address}
        </p>
      </div>
    </div>
    
    <div class="footer">
      <p>
        <a href="${practiceInfo.links.website}">Visit our website</a> | 
        <a href="${practiceInfo.links.patientPortal}">Patient Portal</a> | 
        <a href="${practiceInfo.links.bookAppointment}">Book Appointment</a>
      </p>
      <p>
        Office Hours: ${practiceInfo.hours}<br>
        © ${new Date().getFullYear()} Lotus Direct Care. All rights reserved.
      </p>
    </div>
  </div>
</body>
</html>`;
  }

  private htmlToText(html: string): string {
    // Simple HTML to text conversion
    return html
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<[^>]+>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/\s+/g, ' ')
      .trim();
  }

  private generateSubject(context: EmailContext, inquiryType: string): string {
    const subjectMap: Record<string, string> = {
      generalInquiry: 'Thank you for your interest in Lotus Direct Care',
      functionalMedicine: 'Your Functional Medicine Inquiry - Lotus Direct Care',
      directPrimaryCare: 'Direct Primary Care Membership Information',
      weightLoss: 'Your Weight Management Journey - Lotus Direct Care',
      chronicConditions: 'Comprehensive Care for Your Health Concerns',
      ketamineTherapy: 'Ketamine Therapy Information - Lotus Direct Care',
      longevity: 'Longevity Medicine at Lotus Direct Care',
    };

    return subjectMap[inquiryType] || subjectMap.generalInquiry;
  }

  private getDefaultResponse(context: EmailContext): EmailResponse {
    const htmlContent = this.formatHtmlResponse(
      context.patientName,
      `Thank you for contacting Lotus Direct Care. We've received your inquiry and will respond within one business day.
      
      In the meantime, feel free to explore our website to learn more about our services and approach to healthcare.`,
      'generalInquiry'
    );

    return {
      subject: 'Thank you for contacting Lotus Direct Care',
      htmlContent,
      textContent: this.htmlToText(htmlContent),
      inquiryType: 'generalInquiry',
      aiGenerated: false,
    };
  }

  // Method to add delay before sending (for natural feel)
  async scheduleResponse(
    context: EmailContext,
    sendCallback: (response: EmailResponse) => Promise<void>
  ): Promise<void> {
    console.log('scheduleResponse called with delay:', emailResponseConfig.delayMs);
    
    try {
      const response = await this.generateResponse(context);
      console.log('AI response generated:', {
        subject: response.subject,
        inquiryType: response.inquiryType,
        aiGenerated: response.aiGenerated,
        hasError: !!response.error,
      });
      
      // Schedule the email to be sent after the configured delay
      setTimeout(async () => {
        console.log('Executing scheduled email send after delay');
        try {
          await sendCallback(response);
          console.log('Scheduled email callback completed');
        } catch (error) {
          console.error('Error in scheduled email callback:', error);
        }
      }, emailResponseConfig.delayMs);
    } catch (error) {
      console.error('Error in scheduleResponse:', error);
      throw error;
    }
  }
}