import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { supabase } from '@/lib/supabase';
import { EmailResponder } from '@/lib/ai/email-responder';
import { sendAIGeneratedEmail } from '@/lib/email';
import { logger } from '@/lib/logger';

// Schema for the AI email request
const aiEmailSchema = z.object({
  leadId: z.string().uuid(),
  patientName: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  reasonForVisit: z.string().optional(),
  message: z.string(),
  preferredContactMethod: z.string().optional(),
});

// This endpoint can be called by a cron job or external service
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = aiEmailSchema.parse(body);
    
    // Check if AI response already exists for this lead
    if (supabase) {
      const { data: existingResponse } = await supabase
        .from('ai_email_responses')
        .select('id')
        .eq('lead_id', validatedData.leadId)
        .single();
        
      if (existingResponse) {
        return NextResponse.json(
          { message: 'AI response already sent for this lead' },
          { status: 200 }
        );
      }
    }
    
    // Generate AI response
    const emailResponder = EmailResponder.getInstance();
    const aiResponse = await emailResponder.generateResponse({
      patientName: validatedData.patientName,
      email: validatedData.email,
      phone: validatedData.phone,
      reasonForVisit: validatedData.reasonForVisit,
      message: validatedData.message,
      preferredContactMethod: validatedData.preferredContactMethod,
    });
    
    // Save to database
    if (supabase) {
      await supabase
        .from('ai_email_responses')
        .insert({
          lead_id: validatedData.leadId,
          subject: aiResponse.subject,
          html_content: aiResponse.htmlContent,
          text_content: aiResponse.textContent,
          inquiry_type: aiResponse.inquiryType,
          sent_at: new Date().toISOString(),
          ai_generated: true,
        });
    }
    
    // Send the email
    await sendAIGeneratedEmail({
      to: validatedData.email,
      subject: aiResponse.subject,
      html: aiResponse.htmlContent,
      text: aiResponse.textContent,
    });
    
    logger.info('AI email sent via separate endpoint', {
      leadId: validatedData.leadId,
      email: validatedData.email,
      inquiryType: aiResponse.inquiryType,
    });
    
    return NextResponse.json({
      message: 'AI email sent successfully',
      inquiryType: aiResponse.inquiryType,
    });
    
  } catch (error: unknown) {
    logger.error('Error in AI email endpoint', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Validation error', errors: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}