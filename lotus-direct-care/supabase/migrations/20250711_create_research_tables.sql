-- Create table for configured research sources
CREATE TABLE IF NOT EXISTS research_sources (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  domain VARCHAR(255),
  source_type VARCHAR(50) CHECK (source_type IN ('website', 'blog', 'journal', 'news', 'social', 'other')),
  categories TEXT[],
  crawl_frequency VARCHAR(50) DEFAULT 'weekly' CHECK (crawl_frequency IN ('daily', 'weekly', 'monthly', 'manual')),
  is_active BOOLEAN DEFAULT true,
  max_depth INTEGER DEFAULT 2,
  include_patterns TEXT[],
  exclude_patterns TEXT[],
  reliability_score FLOAT DEFAULT 0.5 CHECK (reliability_score >= 0 AND reliability_score <= 1),
  notes TEXT,
  last_crawled_at TIMESTAMPTZ,
  next_crawl_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create table for saved research queries
CREATE TABLE IF NOT EXISTS research_queries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  query_type VARCHAR(50) CHECK (query_type IN ('topic', 'competitive', 'trending', 'custom')),
  query_text TEXT NOT NULL,
  categories TEXT[],
  include_sources UUID[], -- References to research_sources
  exclude_sources UUID[],
  max_results INTEGER DEFAULT 10,
  freshness_days INTEGER DEFAULT 30, -- Only include content from last N days
  min_reliability_score FLOAT DEFAULT 0.5,
  schedule_enabled BOOLEAN DEFAULT false,
  schedule_frequency VARCHAR(50) CHECK (schedule_frequency IN ('daily', 'weekly', 'monthly')),
  last_run_at TIMESTAMPTZ,
  next_run_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create table for cached research results
CREATE TABLE IF NOT EXISTS research_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  query_id UUID REFERENCES research_queries(id) ON DELETE CASCADE,
  source_id UUID REFERENCES research_sources(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  content TEXT,
  summary TEXT,
  key_points TEXT[],
  relevance_score FLOAT,
  sentiment VARCHAR(20) CHECK (sentiment IN ('positive', 'negative', 'neutral', 'mixed')),
  entities JSONB, -- Named entities extracted
  topics TEXT[],
  published_date TIMESTAMPTZ,
  author TEXT,
  metadata JSONB,
  is_duplicate BOOLEAN DEFAULT false,
  duplicate_of UUID REFERENCES research_results(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create table for research history and audit trail
CREATE TABLE IF NOT EXISTS research_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  action_type VARCHAR(50) NOT NULL CHECK (action_type IN ('query_run', 'source_crawl', 'result_saved', 'result_used', 'config_change')),
  query_id UUID REFERENCES research_queries(id) ON DELETE CASCADE,
  source_id UUID REFERENCES research_sources(id) ON DELETE CASCADE,
  result_id UUID REFERENCES research_results(id) ON DELETE CASCADE,
  user_email VARCHAR(255),
  details JSONB,
  error_message TEXT,
  duration_ms INTEGER,
  success BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_research_sources_domain ON research_sources(domain);
CREATE INDEX idx_research_sources_active ON research_sources(is_active);
CREATE INDEX idx_research_sources_next_crawl ON research_sources(next_crawl_at);
CREATE INDEX idx_research_queries_type ON research_queries(query_type);
CREATE INDEX idx_research_queries_schedule ON research_queries(schedule_enabled, next_run_at);
CREATE INDEX idx_research_results_query ON research_results(query_id);
CREATE INDEX idx_research_results_source ON research_results(source_id);
CREATE INDEX idx_research_results_published ON research_results(published_date);
CREATE INDEX idx_research_results_duplicate ON research_results(is_duplicate, duplicate_of);
CREATE INDEX idx_research_history_action ON research_history(action_type);
CREATE INDEX idx_research_history_created ON research_history(created_at);

-- Enable Row Level Security
ALTER TABLE research_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_queries ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_history ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for authenticated access
CREATE POLICY "Authenticated full access" ON research_sources
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated full access" ON research_queries
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated full access" ON research_results
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated full access" ON research_history
  FOR ALL USING (auth.role() = 'authenticated');

-- Create trigger functions for updated_at
CREATE OR REPLACE FUNCTION update_research_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers
CREATE TRIGGER update_research_sources_updated_at BEFORE UPDATE
  ON research_sources FOR EACH ROW EXECUTE FUNCTION update_research_updated_at();

CREATE TRIGGER update_research_queries_updated_at BEFORE UPDATE
  ON research_queries FOR EACH ROW EXECUTE FUNCTION update_research_updated_at();

-- Add comments for documentation
COMMENT ON TABLE research_sources IS 'Configured sources for medical and health research';
COMMENT ON TABLE research_queries IS 'Saved research configurations and queries';
COMMENT ON TABLE research_results IS 'Cached research results from various sources';
COMMENT ON TABLE research_history IS 'Audit trail of all research activities';

-- Insert some default medical research sources
INSERT INTO research_sources (name, url, domain, source_type, categories, reliability_score, notes) VALUES
  ('PubMed Central', 'https://www.ncbi.nlm.nih.gov/pmc/', 'ncbi.nlm.nih.gov', 'journal', ARRAY['medical', 'research', 'peer-reviewed'], 0.95, 'Primary source for peer-reviewed medical research'),
  ('Mayo Clinic', 'https://www.mayoclinic.org/', 'mayoclinic.org', 'website', ARRAY['medical', 'patient-education'], 0.9, 'Trusted patient education resources'),
  ('Cleveland Clinic', 'https://my.clevelandclinic.org/', 'clevelandclinic.org', 'website', ARRAY['medical', 'patient-education'], 0.9, 'Comprehensive health information'),
  ('WebMD', 'https://www.webmd.com/', 'webmd.com', 'website', ARRAY['medical', 'consumer-health'], 0.75, 'Popular consumer health resource'),
  ('Healthline', 'https://www.healthline.com/', 'healthline.com', 'website', ARRAY['medical', 'wellness', 'nutrition'], 0.8, 'Health and wellness articles'),
  ('Medical News Today', 'https://www.medicalnewstoday.com/', 'medicalnewstoday.com', 'news', ARRAY['medical', 'news', 'research'], 0.85, 'Latest medical news and research'),
  ('Institute for Functional Medicine', 'https://www.ifm.org/', 'ifm.org', 'website', ARRAY['functional-medicine', 'education'], 0.9, 'Functional medicine resources')
ON CONFLICT DO NOTHING;