-- Create research_sources table
CREATE TABLE IF NOT EXISTS research_sources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    name TEXT NOT NULL,
    url TEXT NOT NULL,
    description TEXT,
    source_type TEXT DEFAULT 'website',
    is_active BOOLEAN DEFAULT true,
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Create research_queries table
CREATE TABLE IF NOT EXISTS research_queries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    query TEXT NOT NULL,
    category TEXT,
    tags TEXT[],
    description TEXT,
    is_active BOOLEAN DEFAULT true
);

-- Create research_results table
CREATE TABLE IF NOT EXISTS research_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    query_id UUID REFERENCES research_queries(id) ON DELETE CASCADE,
    source_id UUID REFERENCES research_sources(id) ON DELETE CASCADE,
    title TEXT,
    content TEXT,
    url TEXT,
    relevance_score NUMERIC(3,2),
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Create research_history table (keeping the existing research_logs table as well)
CREATE TABLE IF NOT EXISTS research_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    query TEXT NOT NULL,
    results JSONB,
    source TEXT DEFAULT 'manual',
    user_id TEXT,
    status TEXT DEFAULT 'completed'
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_research_sources_active ON research_sources(is_active);
CREATE INDEX IF NOT EXISTS idx_research_queries_active ON research_queries(is_active);
CREATE INDEX IF NOT EXISTS idx_research_results_query ON research_results(query_id);
CREATE INDEX IF NOT EXISTS idx_research_results_source ON research_results(source_id);
CREATE INDEX IF NOT EXISTS idx_research_history_created ON research_history(created_at DESC);

-- Add updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
CREATE TRIGGER update_research_sources_updated_at BEFORE UPDATE ON research_sources
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_research_queries_updated_at BEFORE UPDATE ON research_queries
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Add RLS policies (disabled by default, can be enabled later)
ALTER TABLE research_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_queries ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_history ENABLE ROW LEVEL SECURITY;

-- Create policies that allow service role full access
CREATE POLICY "Service role has full access to research_sources" ON research_sources
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role has full access to research_queries" ON research_queries
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role has full access to research_results" ON research_results
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role has full access to research_history" ON research_history
    FOR ALL USING (auth.role() = 'service_role');