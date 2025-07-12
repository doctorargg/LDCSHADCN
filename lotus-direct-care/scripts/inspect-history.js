const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

async function inspectHistory() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  );
  
  console.log('📊 Inspecting research_history table...\n');
  
  // First, try to get any existing row
  const { data: existing, error: fetchError } = await supabase
    .from('research_history')
    .select('*')
    .limit(1);
  
  if (fetchError) {
    console.log('❌ Error fetching:', fetchError.message);
    return;
  }
  
  if (existing && existing.length > 0) {
    console.log('✅ Found existing row with columns:');
    console.log(Object.keys(existing[0]));
    console.log('\nSample data:');
    console.log(JSON.stringify(existing[0], null, 2));
  } else {
    console.log('⚠️  Table is empty, trying to determine schema...');
    
    // The table might be using different column names
    // Let's check the seed data to see what columns were used
    console.log('\n📋 Checking seed data for column names...');
    
    const { data: sources } = await supabase
      .from('research_sources')
      .select('*')
      .limit(1);
    
    const { data: queries } = await supabase
      .from('research_queries')
      .select('*')
      .limit(1);
    
    console.log('\nresearch_sources columns:', sources ? Object.keys(sources[0]) : 'empty');
    console.log('research_queries columns:', queries ? Object.keys(queries[0]) : 'empty');
    
    // Based on the migration we created, research_history should have these columns:
    console.log('\n📝 Expected research_history columns (from migration):');
    console.log('- id (UUID)');
    console.log('- created_at (TIMESTAMPTZ)');
    console.log('- query (TEXT)');
    console.log('- results (JSONB)');
    console.log('- source (TEXT)');
    console.log('- user_id (TEXT)');
    console.log('- status (TEXT)');
  }
}

inspectHistory();