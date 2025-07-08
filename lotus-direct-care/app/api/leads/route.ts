import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { supabase, handleSupabaseError } from '@/lib/supabase'
import type { InsertLead } from '@/lib/supabase'
import { logger, logApiError } from '@/lib/logger'
import { sendEmails, type EmailLeadData } from '@/lib/email'

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
        .from('leads')
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
    const emailResults = await sendEmails(emailData)
    
    // Log email results
    if (emailResults.notification.error) {
      logger.error('Failed to send notification email', emailResults.notification.error as Error)
    }
    
    if (emailResults.confirmation.error) {
      logger.error('Failed to send confirmation email', emailResults.confirmation.error as Error)
    }
    
    // Return success response
    return NextResponse.json(
      { 
        message: 'Thank you for your submission! We will contact you soon.',
        id: supabase ? 'temp-' + Date.now() : undefined,
      },
      { status: 201 }
    )
    
  } catch (error) {
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

