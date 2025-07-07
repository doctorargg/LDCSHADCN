export type Database = {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          message: string | null
          preferred_contact: 'email' | 'phone' | 'either' | null
          reason_for_visit: string | null
          created_at: string
          source: string
          status: 'new' | 'contacted' | 'converted' | 'archived'
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          message?: string | null
          preferred_contact?: 'email' | 'phone' | 'either' | null
          reason_for_visit?: string | null
          created_at?: string
          source?: string
          status?: 'new' | 'contacted' | 'converted' | 'archived'
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          message?: string | null
          preferred_contact?: 'email' | 'phone' | 'either' | null
          reason_for_visit?: string | null
          created_at?: string
          source?: string
          status?: 'new' | 'contacted' | 'converted' | 'archived'
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      lead_status: 'new' | 'contacted' | 'converted' | 'archived'
    }
  }
}