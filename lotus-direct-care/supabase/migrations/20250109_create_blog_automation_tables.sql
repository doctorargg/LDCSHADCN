-- Create table for AI-generated blog posts
CREATE TABLE IF NOT EXISTS blog_posts_ai (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  category VARCHAR(100),
  tags TEXT[],
  status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'review', 'published', 'archived')),
  ai_generated BOOLEAN DEFAULT true,
  ai_model VARCHAR(100),
  generation_prompt TEXT,
  seo_title TEXT,
  seo_description TEXT,
  featured_image_url TEXT,
  reading_time_minutes INTEGER,
  published_at TIMESTAMPTZ,
  scheduled_for TIMESTAMPTZ,
  reviewed_at TIMESTAMPTZ,
  reviewed_by VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create table for content research sources
CREATE TABLE IF NOT EXISTS content_sources (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  url TEXT NOT NULL,
  title TEXT,
  domain VARCHAR(255),
  content_type VARCHAR(50),
  relevance_score FLOAT,
  discovered_at TIMESTAMPTZ DEFAULT NOW(),
  last_crawled_at TIMESTAMPTZ,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create table to track which sources were used for which blog posts
CREATE TABLE IF NOT EXISTS blog_post_sources (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  blog_post_id UUID NOT NULL REFERENCES blog_posts_ai(id) ON DELETE CASCADE,
  source_id UUID NOT NULL REFERENCES content_sources(id) ON DELETE CASCADE,
  usage_type VARCHAR(50), -- 'research', 'citation', 'inspiration'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(blog_post_id, source_id)
);

-- Create table for blog email notifications
CREATE TABLE IF NOT EXISTS blog_email_notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  blog_post_id UUID NOT NULL REFERENCES blog_posts_ai(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  html_content TEXT NOT NULL,
  text_content TEXT NOT NULL,
  recipient_count INTEGER DEFAULT 0,
  sent_at TIMESTAMPTZ,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'sending', 'sent', 'failed')),
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_blog_posts_ai_status ON blog_posts_ai(status);
CREATE INDEX idx_blog_posts_ai_published_at ON blog_posts_ai(published_at);
CREATE INDEX idx_blog_posts_ai_scheduled_for ON blog_posts_ai(scheduled_for);
CREATE INDEX idx_blog_posts_ai_slug ON blog_posts_ai(slug);
CREATE INDEX idx_content_sources_domain ON content_sources(domain);
CREATE INDEX idx_content_sources_last_crawled ON content_sources(last_crawled_at);
CREATE INDEX idx_blog_email_notifications_status ON blog_email_notifications(status);

-- Enable Row Level Security
ALTER TABLE blog_posts_ai ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_post_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_email_notifications ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Public read access for published posts" ON blog_posts_ai
  FOR SELECT USING (status = 'published' AND published_at <= NOW());

CREATE POLICY "Authenticated full access" ON blog_posts_ai
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Service role access" ON content_sources
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role access" ON blog_post_sources
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Authenticated read access" ON blog_email_notifications
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Service role write access" ON blog_email_notifications
  FOR INSERT WITH CHECK (auth.role() = 'service_role');

-- Create trigger for updated_at
CREATE TRIGGER update_blog_posts_ai_updated_at BEFORE UPDATE
  ON blog_posts_ai FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_email_notifications_updated_at BEFORE UPDATE
  ON blog_email_notifications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Add comments for documentation
COMMENT ON TABLE blog_posts_ai IS 'AI-generated blog posts with review workflow';
COMMENT ON TABLE content_sources IS 'Research sources discovered by AI for content creation';
COMMENT ON TABLE blog_post_sources IS 'Junction table linking blog posts to their research sources';
COMMENT ON TABLE blog_email_notifications IS 'Email notifications sent to mailing list about new blog posts';