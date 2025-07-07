import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

// Create a single supabase client for interacting with your database
// This client can be used in server components and API routes
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// For static export, we'll make Supabase optional
const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === 'true'

if (!supabaseUrl || !supabaseAnonKey) {
  if (!isStaticExport) {
    throw new Error('Missing Supabase environment variables')
  }
  console.warn('Supabase environment variables not found. API routes will not function.')
}

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient<Database>(supabaseUrl, supabaseAnonKey)
  : null as any

// Type definitions for our database tables
export type Lead = Database['public']['Tables']['leads']['Row']
export type InsertLead = Database['public']['Tables']['leads']['Insert']
export type UpdateLead = Database['public']['Tables']['leads']['Update']

// Helper function to handle Supabase errors
export function handleSupabaseError(error: any) {
  console.error('Supabase error:', error)
  
  // Return user-friendly error messages
  if (error.code === '23505') {
    return 'This email has already been submitted'
  }
  
  if (error.code === 'PGRST116') {
    return 'Database table not found. Please ensure migrations have been run.'
  }
  
  return 'An unexpected error occurred. Please try again later.'
}