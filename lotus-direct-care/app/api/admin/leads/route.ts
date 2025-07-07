import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { z } from 'zod'
import { logger, logApiError } from '@/lib/logger'

// Simple authentication check using API key
function isAuthenticated(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization')
  const adminApiKey = process.env.ADMIN_API_KEY
  
  if (!adminApiKey) {
    logger.error('ADMIN_API_KEY not configured')
    return false
  }
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false
  }
  
  const token = authHeader.slice(7)
  return token === adminApiKey
}

// Query parameters schema
const querySchema = z.object({
  status: z.enum(['new', 'contacted', 'converted', 'archived']).optional(),
  limit: z.string().regex(/^\d+$/).transform(Number).optional(),
  offset: z.string().regex(/^\d+$/).transform(Number).optional(),
  orderBy: z.enum(['created_at', 'name', 'email']).optional(),
  order: z.enum(['asc', 'desc']).optional(),
})

export async function GET(request: NextRequest) {
  try {
    // Check if Supabase is configured
    if (!supabase) {
      return NextResponse.json(
        { message: 'Database not configured' },
        { status: 503 }
      )
    }

    // Check authentication
    if (!isAuthenticated(request)) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    // Parse query parameters
    const { searchParams } = new URL(request.url)
    const queryParams = {
      status: searchParams.get('status'),
      limit: searchParams.get('limit'),
      offset: searchParams.get('offset'),
      orderBy: searchParams.get('orderBy'),
      order: searchParams.get('order'),
    }
    
    // Validate query parameters
    const validatedParams = querySchema.parse(queryParams)
    
    // Build query
    let query = supabase
      .from('leads')
      .select('*', { count: 'exact' })
    
    // Apply filters
    if (validatedParams.status) {
      query = query.eq('status', validatedParams.status)
    }
    
    // Apply ordering
    const orderBy = validatedParams.orderBy || 'created_at'
    const order = validatedParams.order || 'desc'
    query = query.order(orderBy, { ascending: order === 'asc' })
    
    // Apply pagination
    const limit = validatedParams.limit || 50
    const offset = validatedParams.offset || 0
    query = query.range(offset, offset + limit - 1)
    
    // Execute query
    const { data, error, count } = await query
    
    if (error) {
      logApiError('GET /api/admin/leads', error)
      return NextResponse.json(
        { message: 'Failed to fetch leads' },
        { status: 500 }
      )
    }
    
    // Log successful query
    logger.info('Admin leads fetched', {
      count: data?.length || 0,
      total: count || 0,
      filters: { status: validatedParams.status },
      pagination: { limit, offset }
    })
    
    // Return paginated response
    return NextResponse.json({
      data: data || [],
      pagination: {
        total: count || 0,
        limit,
        offset,
        hasMore: (count || 0) > offset + limit
      }
    })
    
  } catch (error) {
    logApiError('GET /api/admin/leads', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          message: 'Invalid query parameters',
          errors: error.errors 
        },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Update lead status
export async function PATCH(request: NextRequest) {
  try {
    // Check if Supabase is configured
    if (!supabase) {
      return NextResponse.json(
        { message: 'Database not configured' },
        { status: 503 }
      )
    }

    // Check authentication
    if (!isAuthenticated(request)) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    // Parse request body
    const body = await request.json()
    
    // Validate input
    const updateSchema = z.object({
      id: z.string().uuid(),
      status: z.enum(['new', 'contacted', 'converted', 'archived'])
    })
    
    const validatedData = updateSchema.parse(body)
    
    // Update lead status
    const { data, error } = await supabase
      .from('leads')
      .update({ status: validatedData.status })
      .eq('id', validatedData.id)
      .select()
      .single()
    
    if (error) {
      logApiError('PATCH /api/admin/leads', error, { leadId: validatedData.id })
      return NextResponse.json(
        { message: 'Failed to update lead' },
        { status: 500 }
      )
    }
    
    if (!data) {
      return NextResponse.json(
        { message: 'Lead not found' },
        { status: 404 }
      )
    }
    
    logger.info('Lead status updated', {
      leadId: data.id,
      newStatus: data.status,
      email: data.email
    })
    
    return NextResponse.json({
      message: 'Lead updated successfully',
      data
    })
    
  } catch (error) {
    logApiError('PATCH /api/admin/leads', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          message: 'Invalid request data',
          errors: error.errors 
        },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}