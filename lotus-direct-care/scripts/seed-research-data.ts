import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing required environment variables');
  process.exit(1);
}

// Create a Supabase client with the service role key (bypasses RLS)
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function seedResearchData() {
  console.log('Starting to seed research data...');

  // First, check if data already exists
  const { count: sourcesCount } = await supabase
    .from('research_sources')
    .select('*', { count: 'exact', head: true });

  console.log(`Current sources count: ${sourcesCount}`);

  if (sourcesCount && sourcesCount > 0) {
    console.log('Research sources already exist. Skipping seed.');
    return;
  }

  // Seed research sources
  const sources = [
    // Primary Medical Sources
    {
      name: 'PubMed Central',
      url: 'https://www.ncbi.nlm.nih.gov/pmc/',
      domain: 'ncbi.nlm.nih.gov',
      source_type: 'journal',
      categories: ['medical', 'research', 'peer-reviewed'],
      reliability_score: 0.95,
      notes: 'Primary source for peer-reviewed medical research'
    },
    {
      name: 'Mayo Clinic',
      url: 'https://www.mayoclinic.org/',
      domain: 'mayoclinic.org',
      source_type: 'website',
      categories: ['medical', 'patient-education'],
      reliability_score: 0.9,
      notes: 'Trusted patient education resources'
    },
    {
      name: 'Cleveland Clinic',
      url: 'https://my.clevelandclinic.org/',
      domain: 'clevelandclinic.org',
      source_type: 'website',
      categories: ['medical', 'patient-education'],
      reliability_score: 0.9,
      notes: 'Comprehensive health information'
    },
    // Functional Medicine Sources
    {
      name: 'Institute for Functional Medicine',
      url: 'https://www.ifm.org/',
      domain: 'ifm.org',
      source_type: 'website',
      categories: ['functional-medicine', 'education'],
      reliability_score: 0.9,
      notes: 'Functional medicine resources'
    },
    {
      name: 'Chris Kresser',
      url: 'https://chriskresser.com/',
      domain: 'chriskresser.com',
      source_type: 'blog',
      categories: ['functional-medicine', 'nutrition', 'wellness'],
      crawl_frequency: 'weekly',
      reliability_score: 0.85,
      notes: 'Evidence-based functional medicine articles and research summaries'
    },
    // Direct Primary Care Sources
    {
      name: 'DPC Alliance',
      url: 'https://dpcalliance.org/',
      domain: 'dpcalliance.org',
      source_type: 'website',
      categories: ['direct-primary-care', 'practice-management', 'news'],
      crawl_frequency: 'weekly',
      reliability_score: 0.85,
      notes: 'Official DPC Alliance resources and news'
    }
  ];

  console.log(`Inserting ${sources.length} research sources...`);
  
  const { data, error } = await supabase
    .from('research_sources')
    .insert(sources)
    .select();

  if (error) {
    console.error('Error inserting sources:', error);
  } else {
    console.log(`Successfully inserted ${data?.length || 0} sources`);
  }

  // Seed sample queries
  const queries = [
    {
      name: 'Functional Medicine Diabetes Management',
      description: 'Research on functional medicine approaches to type 2 diabetes, including lifestyle interventions and root cause analysis',
      query_type: 'topic',
      query_text: 'functional medicine diabetes type 2 lifestyle intervention root cause',
      categories: ['functional-medicine', 'diabetes', 'nutrition'],
      max_results: 20,
      freshness_days: 90,
      min_reliability_score: 0.7
    },
    {
      name: 'Direct Primary Care Models',
      description: 'Analysis of DPC practice models, patient outcomes, and economic benefits',
      query_type: 'topic',
      query_text: 'direct primary care model patient outcomes cost savings practice management',
      categories: ['direct-primary-care', 'practice-management'],
      max_results: 15,
      freshness_days: 180,
      min_reliability_score: 0.7
    },
    {
      name: 'Gut Health and Autoimmune Conditions',
      description: 'Research on the gut-immune connection and microbiome interventions for autoimmune conditions',
      query_type: 'topic',
      query_text: 'gut health microbiome autoimmune leaky gut intestinal permeability functional medicine',
      categories: ['functional-medicine', 'autoimmune', 'gut-health'],
      max_results: 25,
      freshness_days: 60,
      min_reliability_score: 0.75
    }
  ];

  console.log(`\nInserting ${queries.length} sample queries...`);
  
  const { data: queryData, error: queryError } = await supabase
    .from('research_queries')
    .insert(queries)
    .select();

  if (queryError) {
    console.error('Error inserting queries:', queryError);
  } else {
    console.log(`Successfully inserted ${queryData?.length || 0} queries`);
  }

  // Check final counts
  const { count: finalSourcesCount } = await supabase
    .from('research_sources')
    .select('*', { count: 'exact', head: true });

  const { count: finalQueriesCount } = await supabase
    .from('research_queries')
    .select('*', { count: 'exact', head: true });

  console.log('\nFinal counts:');
  console.log(`- Research sources: ${finalSourcesCount}`);
  console.log(`- Research queries: ${finalQueriesCount}`);
}

// Run the seed function
seedResearchData()
  .then(() => {
    console.log('\nSeed completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exit(1);
  });