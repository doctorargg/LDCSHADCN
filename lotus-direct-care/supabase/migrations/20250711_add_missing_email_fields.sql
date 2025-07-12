-- Add missing fields to ai_email_responses table
ALTER TABLE ai_email_responses
ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed')),
ADD COLUMN IF NOT EXISTS recipient_email TEXT,
ADD COLUMN IF NOT EXISTS ai_model VARCHAR(100) DEFAULT 'claude-3-5-sonnet-20241022';

-- Update recipient_email from form_submissions for existing records
UPDATE ai_email_responses aer
SET recipient_email = fs.email
FROM form_submissions fs
WHERE aer.lead_id = fs.id
AND aer.recipient_email IS NULL;

-- Add index for status column
CREATE INDEX IF NOT EXISTS idx_ai_email_responses_status ON ai_email_responses(status);

-- Add comments for new columns
COMMENT ON COLUMN ai_email_responses.status IS 'Status of the email (pending, sent, failed)';
COMMENT ON COLUMN ai_email_responses.recipient_email IS 'Email address of the recipient';
COMMENT ON COLUMN ai_email_responses.ai_model IS 'AI model used to generate the response';