import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { supabase, handleSupabaseError } from '@/lib/supabase'
import type { InsertLead } from '@/lib/supabase'
import { logger, logApiError } from '@/lib/logger'
import { sendEmails, type EmailLeadData } from '@/lib/email'
// AI imports removed for frontend-updates branch
// import { EmailResponder, type EmailResponse } from '@/lib/ai/email-responder'
// import { emailResponseConfig } from '@/lib/ai/config'

// Validation schema matching the frontend
const leadSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  preferredContact: z.enum(["email", "phone", "either"]).optional(),
  reasonForVisit: z.string().optional(),
  message: z.string().max(500).optional(),
})

export async function POST(request: NextRequest) {
  // Debug: Log that the endpoint was hit
  console.log('POST /api/leads endpoint hit')
  
  try {
    // Parse request body
    const body = await request.json()
    
    // Validate input
    const validatedData = leadSchema.parse(body)
    
    // Prepare email data
    const emailData: EmailLeadData = {
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      preferredContact: validatedData.preferredContact,
      reasonForVisit: validatedData.reasonForVisit,
      message: validatedData.message || '',
    }
    
    // If Supabase is configured, save to database
    let savedLeadId: string | undefined;
    
    if (supabase) {
      // Prepare lead data for insertion
      const leadData: InsertLead = {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone || null,
        message: validatedData.message || null,
        preferred_contact: validatedData.preferredContact || null,
        reason_for_visit: validatedData.reasonForVisit || null,
        source: 'website',
        status: 'new'
      }
      
      // Save to Supabase
      const { data, error } = await supabase
        .from('form_submissions')
        .insert(leadData)
        .select()
        .single()
      
      if (error) {
        const errorMessage = handleSupabaseError(error)
        logApiError('POST /api/leads', error, { email: leadData.email })
        
        // Don't fail the entire request if it's just a duplicate
        if (error.code !== '23505') {
          return NextResponse.json(
            { message: errorMessage },
            { status: 500 }
          )
        }
      } else {
        savedLeadId = data.id;
        // Log successful submission
        logger.info('New lead saved', {
          id: data.id,
          email: data.email,
          source: data.source,
          createdAt: data.created_at,
        })
      }
    } else {
      // Log that we're operating without database
      logger.info('Lead submitted (no database)', {
        email: validatedData.email,
        name: validatedData.name,
      })
    }
    
    // Send email notifications
    let emailResults;
    try {
      emailResults = await sendEmails(emailData)
    } catch (emailError) {
      logger.error('Failed to send emails', emailError, { 
        email: validatedData.email,
        name: validatedData.name 
      })
      // Don't fail the entire request if email sending fails
      emailResults = {
        notification: { success: false, error: emailError },
        confirmation: { success: false, error: emailError }
      }
    }
    
    // Log email results
    if (emailResults.notification.error) {
      logger.error('Failed to send notification email', emailResults.notification.error)
    }
    
    if (emailResults.confirmation.error) {
      logger.error('Failed to send confirmation email', emailResults.confirmation.error)
    }
    
    // AI-generated follow-up email functionality removed for frontend-updates branch
    // This functionality exists on the ai-integration branch
    
    // Return success response
    return NextResponse.json(
      { 
        message: 'Thank you for your submission! We will contact you soon.',
        id: savedLeadId || (supabase ? undefined : 'temp-' + Date.now()),
      },
      { status: 201 }
    )
    
  } catch (error) {
    // Enhanced error logging
    console.error('Caught error in POST /api/leads:', {
      error,
      errorType: typeof error,
      errorString: String(error),
      errorJSON: JSON.stringify(error),
      errorKeys: error && typeof error === 'object' ? Object.keys(error) : [],
      errorMessage: error instanceof Error ? error.message : 'Not an Error instance',
      errorStack: error instanceof Error ? error.stack : 'No stack trace'
    })
    
    logApiError('POST /api/leads', error)
    
    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          message: 'Validation error',
          errors: error.errors 
        },
        { status: 400 }
      )
    }
    
    // Handle other errors
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

