-- Lotus Direct Care Database Schema
-- This file contains the SQL schema for the leads management system

-- Create enum for lead status
CREATE TYPE lead_status AS ENUM ('new', 'contacted', 'converted', 'archived');

-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
    -- Primary key
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    
    -- Contact information
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    message TEXT,
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
    source VARCHAR(100) DEFAULT 'website' NOT NULL,
    status lead_status DEFAULT 'new' NOT NULL,
    
    -- Constraints
    CONSTRAINT email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$')
);

-- Create indexes for performance
CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_source ON leads(source);

-- Enable Row Level Security (RLS)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Policy: Service role can do everything
CREATE POLICY "Service role can manage all leads" ON leads
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Policy: Anon users can only insert new leads
CREATE POLICY "Anonymous users can create leads" ON leads
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- Policy: Authenticated users can view all leads
CREATE POLICY "Authenticated users can view leads" ON leads
    FOR SELECT
    TO authenticated
    USING (true);

-- Policy: Authenticated users can update lead status
CREATE POLICY "Authenticated users can update leads" ON leads
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Create a view for lead statistics (optional)
CREATE OR REPLACE VIEW lead_statistics AS
SELECT 
    COUNT(*) as total_leads,
    COUNT(*) FILTER (WHERE status = 'new') as new_leads,
    COUNT(*) FILTER (WHERE status = 'contacted') as contacted_leads,
    COUNT(*) FILTER (WHERE status = 'converted') as converted_leads,
    COUNT(*) FILTER (WHERE status = 'archived') as archived_leads,
    COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE - INTERVAL '7 days') as leads_last_7_days,
    COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE - INTERVAL '30 days') as leads_last_30_days
FROM leads;

-- Grant permissions on the view
GRANT SELECT ON lead_statistics TO authenticated;

-- Add comment on table
COMMENT ON TABLE leads IS 'Stores lead information from website contact forms';
COMMENT ON COLUMN leads.source IS 'Source of the lead (e.g., website, phone, referral)';
COMMENT ON COLUMN leads.status IS 'Current status of the lead in the sales pipeline';