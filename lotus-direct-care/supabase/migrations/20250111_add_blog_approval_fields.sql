-- Add approval token fields to blog_posts_ai table
ALTER TABLE blog_posts_ai
ADD COLUMN IF NOT EXISTS approval_token TEXT,
ADD COLUMN IF NOT EXISTS approval_token_expires TIMESTAMPTZ;

-- Create index for faster token lookups
CREATE INDEX IF NOT EXISTS idx_blog_posts_approval_token 
ON blog_posts_ai(approval_token) 
WHERE approval_token IS NOT NULL;

-- Add newsletter subscription field to leads table
ALTER TABLE leads
ADD COLUMN IF NOT EXISTS newsletter_subscribed BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS newsletter_subscribed_at TIMESTAMPTZ;

-- Create newsletter_preferences table for more granular control
CREATE TABLE IF NOT EXISTS newsletter_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
  blog_notifications BOOLEAN DEFAULT true,
  service_updates BOOLEAN DEFAULT true,
  health_tips BOOLEAN DEFAULT true,
  frequency TEXT DEFAULT 'immediate' CHECK (frequency IN ('immediate', 'daily', 'weekly', 'monthly')),
  unsubscribe_token TEXT UNIQUE DEFAULT gen_random_uuid()::TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for unsubscribe token lookups
CREATE INDEX IF NOT EXISTS idx_newsletter_unsubscribe_token 
ON newsletter_preferences(unsubscribe_token);

-- Add rejected status to blog_posts_ai status enum if not exists
DO $$ 
BEGIN
  ALTER TYPE blog_post_status ADD VALUE IF NOT EXISTS 'rejected';
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;