-- Create research_logs table for storing medical research query history
CREATE TABLE IF NOT EXISTS research_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    query TEXT NOT NULL,
    results JSONB,
    timestamp TIMESTAMPTZ,
    user_id TEXT,
    source TEXT DEFAULT 'web',
    status TEXT DEFAULT 'completed'
);

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_research_logs_created_at ON research_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_research_logs_query ON research_logs(query);
CREATE INDEX IF NOT EXISTS idx_research_logs_user_id ON research_logs(user_id);

-- Add comments to explain the table structure
COMMENT ON TABLE research_logs IS 'Stores medical research queries and their results';
COMMENT ON COLUMN research_logs.id IS 'Unique identifier for each research log entry';
COMMENT ON COLUMN research_logs.created_at IS 'Timestamp when the query was executed';
COMMENT ON COLUMN research_logs.query IS 'The research query text';
COMMENT ON COLUMN research_logs.results IS 'JSON blob containing the search results';
COMMENT ON COLUMN research_logs.timestamp IS 'Optional custom timestamp for the query';
COMMENT ON COLUMN research_logs.user_id IS 'Optional user identifier who performed the query';
COMMENT ON COLUMN research_logs.source IS 'Source of the query (web, api, etc.)';
COMMENT ON COLUMN research_logs.status IS 'Status of the query (completed, failed, pending)';