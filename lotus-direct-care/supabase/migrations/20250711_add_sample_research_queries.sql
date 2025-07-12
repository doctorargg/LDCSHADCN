-- Add sample research queries for functional medicine and direct primary care

INSERT INTO research_queries (
  name, 
  description, 
  query_text, 
  query_type, 
  categories, 
  max_results, 
  freshness_days, 
  min_reliability_score,
  schedule_enabled,
  schedule_frequency
) VALUES
  -- Functional Medicine Queries
  (
    'Gut Health Research',
    'Latest research on gut microbiome, dysbiosis, and functional GI disorders',
    'gut microbiome dysbiosis SIBO IBS functional medicine treatment protocols',
    'topic',
    ARRAY['functional-medicine', 'research', 'gastroenterology'],
    20,
    90,
    0.8,
    true,
    'weekly'
  ),
  (
    'Hormone Optimization',
    'Research on bioidentical hormones, thyroid optimization, and adrenal health',
    'bioidentical hormone replacement thyroid optimization adrenal fatigue HPA axis',
    'topic',
    ARRAY['functional-medicine', 'endocrinology', 'research'],
    15,
    60,
    0.85,
    true,
    'weekly'
  ),
  (
    'Autoimmune Protocols',
    'Functional medicine approaches to autoimmune conditions',
    'autoimmune disease functional medicine AIP diet leaky gut molecular mimicry',
    'topic',
    ARRAY['functional-medicine', 'autoimmune', 'research'],
    20,
    90,
    0.85,
    false,
    'monthly'
  ),
  
  -- Direct Primary Care Queries
  (
    'DPC Practice Models',
    'Research on direct primary care outcomes and practice management',
    'direct primary care patient outcomes cost savings practice models membership medicine',
    'topic',
    ARRAY['direct-primary-care', 'practice-management', 'research'],
    15,
    180,
    0.8,
    true,
    'monthly'
  ),
  (
    'Value-Based Care',
    'Studies on value-based care and DPC integration',
    'value-based care direct primary care quality metrics patient satisfaction healthcare costs',
    'topic',
    ARRAY['direct-primary-care', 'healthcare-policy', 'research'],
    10,
    120,
    0.8,
    false,
    'monthly'
  ),
  
  -- Nutrition and Lifestyle Queries
  (
    'Metabolic Health',
    'Latest on metabolic syndrome, insulin resistance, and lifestyle interventions',
    'metabolic syndrome insulin resistance continuous glucose monitoring ketogenic diet intermittent fasting',
    'topic',
    ARRAY['nutrition', 'metabolic-health', 'research'],
    20,
    60,
    0.8,
    true,
    'weekly'
  ),
  (
    'Inflammation and Diet',
    'Anti-inflammatory nutrition and chronic disease prevention',
    'anti-inflammatory diet chronic inflammation omega-3 polyphenols oxidative stress',
    'topic',
    ARRAY['nutrition', 'functional-medicine', 'research'],
    15,
    90,
    0.85,
    true,
    'weekly'
  ),
  
  -- Patient Education Queries
  (
    'Patient Education Materials',
    'High-quality patient education on common conditions',
    'patient education handouts lifestyle medicine preventive care health literacy',
    'topic',
    ARRAY['patient-education', 'preventive-medicine'],
    10,
    365,
    0.85,
    false,
    'monthly'
  ),
  
  -- Trending Topics Query
  (
    'Emerging Functional Medicine',
    'New developments and emerging topics in functional medicine',
    'emerging functional medicine peptide therapy NAD+ longevity medicine regenerative',
    'trending',
    ARRAY['functional-medicine', 'research', 'innovation'],
    15,
    30,
    0.8,
    true,
    'weekly'
  ),
  
  -- Competitive Intelligence
  (
    'Functional Medicine Competitors',
    'What other functional medicine practices are doing',
    'functional medicine practice website services offered patient testimonials',
    'competitive',
    ARRAY['functional-medicine', 'competitive-analysis'],
    10,
    90,
    0.7,
    false,
    'monthly'
  )
ON CONFLICT DO NOTHING;

-- Add a comment about the queries
COMMENT ON TABLE research_queries IS 'Saved research configurations and queries. Contains 10 sample queries for functional medicine and DPC practices.';