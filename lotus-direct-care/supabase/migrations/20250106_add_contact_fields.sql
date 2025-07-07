-- Add new fields to the leads table for comprehensive contact form
ALTER TABLE leads 
ADD COLUMN IF NOT EXISTS preferred_contact TEXT CHECK (preferred_contact IN ('email', 'phone', 'either')),
ADD COLUMN IF NOT EXISTS reason_for_visit TEXT;

-- Update the message column to allow longer messages
ALTER TABLE leads 
ALTER COLUMN message TYPE TEXT;