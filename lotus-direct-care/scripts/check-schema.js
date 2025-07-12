const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

async function checkSchema() {
  console.log('📊 Checking table schemas...\n');
  
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
  
  // Try to get one row from each table to see structure
  const tables = ['research_sources', 'research_queries', 'research_results', 'research_history'];
  
  for (const table of tables) {
    console.log(`\n📋 Table: ${table}`);
    
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .limit(1);
    
    if (error) {
      console.log(`❌ Error: ${error.message}`);
    } else if (data && data.length > 0) {
      console.log('✅ Sample row:');
      console.log(JSON.stringify(data[0], null, 2));
    } else {
      console.log('✅ Table exists but is empty');
      
      // Try to insert a test row to see what columns are expected
      if (table === 'research_history') {
        console.log('\nTrying different column combinations for research_history...');
        
        // Try different field combinations
        const attempts = [
          { query: 'Test', results: {}, source: 'test' },
          { search_query: 'Test', results: {}, source: 'test' },
          { query_text: 'Test', results: {}, source: 'test' },
          { content: 'Test', results: {}, source: 'test' }
        ];
        
        for (const attempt of attempts) {
          const { error: insertError } = await supabase
            .from(table)
            .insert(attempt)
            .select();
          
          if (!insertError) {
            console.log(`✅ Working fields: ${Object.keys(attempt).join(', ')}`);
            break;
          } else if (!insertError.message.includes('column')) {
            console.log(`⚠️  Other error: ${insertError.message}`);
            break;
          }
        }
      }
    }
  }
}

checkSchema();