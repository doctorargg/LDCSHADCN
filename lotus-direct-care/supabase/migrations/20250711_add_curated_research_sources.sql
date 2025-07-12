-- Add curated medical research sources for functional medicine and direct primary care

-- Functional Medicine Sources
INSERT INTO research_sources (name, url, domain, source_type, categories, crawl_frequency, reliability_score, notes) VALUES
  ('Functional Medicine University', 'https://functionalmedicineuniversity.com/', 'functionalmedicineuniversity.com', 'website', ARRAY['functional-medicine', 'education', 'medical'], 'weekly', 0.85, 'Educational content and protocols for functional medicine practitioners'),
  ('Chris Kresser', 'https://chriskresser.com/', 'chriskresser.com', 'blog', ARRAY['functional-medicine', 'nutrition', 'wellness'], 'weekly', 0.85, 'Evidence-based functional medicine articles and research summaries'),
  ('Dr. Mark Hyman', 'https://drhyman.com/', 'drhyman.com', 'blog', ARRAY['functional-medicine', 'nutrition', 'wellness'], 'weekly', 0.85, 'Functional medicine thought leader with clinical insights'),
  ('Andrew Weil Center', 'https://integrativemedicine.arizona.edu/', 'integrativemedicine.arizona.edu', 'website', ARRAY['functional-medicine', 'integrative-medicine', 'research'], 'monthly', 0.9, 'University of Arizona integrative medicine research and education'),
  ('Natural Medicine Journal', 'https://www.naturalmedicinejournal.com/', 'naturalmedicinejournal.com', 'journal', ARRAY['functional-medicine', 'research', 'peer-reviewed'], 'weekly', 0.9, 'Peer-reviewed journal for evidence-based natural medicine')
ON CONFLICT DO NOTHING;

-- Direct Primary Care Sources
INSERT INTO research_sources (name, url, domain, source_type, categories, crawl_frequency, reliability_score, notes) VALUES
  ('DPC Alliance', 'https://dpcalliance.org/', 'dpcalliance.org', 'website', ARRAY['direct-primary-care', 'practice-management', 'news'], 'weekly', 0.85, 'Official DPC Alliance resources and news'),
  ('Direct Primary Care Journal', 'https://www.dpcjournal.com/', 'dpcjournal.com', 'journal', ARRAY['direct-primary-care', 'research', 'practice-management'], 'weekly', 0.85, 'DPC-specific research and practice insights'),
  ('Hint Health Blog', 'https://hint.com/blog/', 'hint.com', 'blog', ARRAY['direct-primary-care', 'practice-management', 'technology'], 'monthly', 0.8, 'DPC technology and practice management insights')
ON CONFLICT DO NOTHING;

-- Academic and Research Sources
INSERT INTO research_sources (name, url, domain, source_type, categories, crawl_frequency, reliability_score, notes) VALUES
  ('Google Scholar', 'https://scholar.google.com/', 'scholar.google.com', 'journal', ARRAY['research', 'peer-reviewed', 'medical'], 'manual', 0.95, 'Comprehensive academic research database - manual search recommended'),
  ('Cochrane Library', 'https://www.cochranelibrary.com/', 'cochranelibrary.com', 'journal', ARRAY['research', 'peer-reviewed', 'systematic-reviews'], 'monthly', 0.95, 'Gold standard for systematic reviews and meta-analyses'),
  ('JAMA Network', 'https://jamanetwork.com/', 'jamanetwork.com', 'journal', ARRAY['research', 'peer-reviewed', 'medical'], 'weekly', 0.95, 'Leading medical journals including JAMA and specialty journals'),
  ('Harvard Health Publishing', 'https://www.health.harvard.edu/', 'health.harvard.edu', 'website', ARRAY['medical', 'patient-education', 'research'], 'weekly', 0.9, 'Harvard Medical School consumer health information')
ON CONFLICT DO NOTHING;

-- Nutrition and Lifestyle Sources
INSERT INTO research_sources (name, url, domain, source_type, categories, crawl_frequency, reliability_score, notes) VALUES
  ('Examine.com', 'https://examine.com/', 'examine.com', 'website', ARRAY['nutrition', 'supplements', 'research'], 'monthly', 0.85, 'Evidence-based supplement and nutrition information with citations'),
  ('NutritionFacts.org', 'https://nutritionfacts.org/', 'nutritionfacts.org', 'website', ARRAY['nutrition', 'research', 'wellness'], 'weekly', 0.85, 'Dr. Michael Greger evidence-based nutrition videos and articles'),
  ('Precision Nutrition', 'https://www.precisionnutrition.com/', 'precisionnutrition.com', 'blog', ARRAY['nutrition', 'wellness', 'coaching'], 'monthly', 0.8, 'Evidence-based nutrition coaching and lifestyle change strategies')
ON CONFLICT DO NOTHING;

-- Medical Institution Sources
INSERT INTO research_sources (name, url, domain, source_type, categories, crawl_frequency, reliability_score, notes) VALUES
  ('Johns Hopkins Medicine', 'https://www.hopkinsmedicine.org/health/', 'hopkinsmedicine.org', 'website', ARRAY['medical', 'patient-education', 'research'], 'weekly', 0.9, 'Johns Hopkins patient education and health information'),
  ('Stanford Medicine', 'https://stanfordhealthcare.org/medical-conditions.html', 'stanfordhealthcare.org', 'website', ARRAY['medical', 'patient-education', 'research'], 'weekly', 0.9, 'Stanford Medicine patient education materials'),
  ('Hormone Health Network', 'https://www.hormone.org/', 'hormone.org', 'website', ARRAY['medical', 'endocrinology', 'patient-education'], 'monthly', 0.85, 'Endocrine Society patient education on hormone health')
ON CONFLICT DO NOTHING;

-- Add additional categories that may be useful
INSERT INTO research_sources (name, url, domain, source_type, categories, crawl_frequency, reliability_score, notes) VALUES
  ('American College of Lifestyle Medicine', 'https://www.lifestylemedicine.org/', 'lifestylemedicine.org', 'website', ARRAY['lifestyle-medicine', 'research', 'education'], 'monthly', 0.85, 'Lifestyle medicine research and clinical resources'),
  ('Environmental Working Group', 'https://www.ewg.org/', 'ewg.org', 'website', ARRAY['environmental-health', 'toxins', 'consumer-health'], 'monthly', 0.8, 'Environmental health and toxin exposure information')
ON CONFLICT DO NOTHING;

-- Update the total count comment
COMMENT ON TABLE research_sources IS 'Configured sources for medical and health research. Contains 27 curated sources as of 2025-01-11.';