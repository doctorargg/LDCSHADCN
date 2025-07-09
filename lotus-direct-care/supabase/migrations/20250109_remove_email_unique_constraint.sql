-- Remove unique constraint on email column to allow multiple submissions from same email
-- This is useful for testing and for patients who may submit multiple inquiries

-- Drop the unique constraint
ALTER TABLE form_submissions DROP CONSTRAINT IF EXISTS unique_email;

-- Create a regular index on email for performance (non-unique)
CREATE INDEX IF NOT EXISTS idx_form_submissions_email ON form_submissions(email);

-- Add comment explaining the change
COMMENT ON COLUMN form_submissions.email IS 'Patient email address. Multiple submissions allowed for better patient experience.';