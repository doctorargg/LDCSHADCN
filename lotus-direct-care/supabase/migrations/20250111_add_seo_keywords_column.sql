-- Add missing seo_keywords column to blog_posts_ai table
ALTER TABLE blog_posts_ai
ADD COLUMN IF NOT EXISTS seo_keywords TEXT[] DEFAULT ARRAY[]::TEXT[];