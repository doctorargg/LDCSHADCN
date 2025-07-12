const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

async function checkDatabase() {
  console.log('Checking database configuration...\n');
  
  // Check environment variables
  console.log('Environment Variables:');
  console.log('NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? '✓ Set' : '✗ Not set');
  console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✓ Set' : '✗ Not set');
  console.log('SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? '✓ Set' : '✗ Not set');
  console.log();

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('Missing required environment variables!');
    process.exit(1);
  }

  // Create admin client
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

  try {
    // Check research tables
    console.log('Checking research tables...');
    
    const tables = ['research_sources', 'research_queries', 'research_results', 'research_logs'];
    
    for (const table of tables) {
      const { data, error } = await supabase
        .from(table)
        .select('count')
        .limit(1);
      
      if (error) {
        console.log(`${table}: ✗ Error - ${error.message}`);
      } else {
        const { count } = await supabase.from(table).select('*', { count: 'exact', head: true });
        console.log(`${table}: ✓ Exists (${count || 0} records)`);
      }
    }
    
    console.log('\nTesting write permissions...');
    const testData = {
      test_field: 'diagnostic_test_' + Date.now()
    };
    
    const { data: writeTest, error: writeError } = await supabase
      .from('research_logs')
      .insert({
        query: 'Diagnostic test',
        results: testData,
        source: 'diagnostic'
      })
      .select()
      .single();
    
    if (writeError) {
      console.log('Write test: ✗ Failed -', writeError.message);
    } else {
      console.log('Write test: ✓ Success');
      // Clean up test data
      await supabase.from('research_logs').delete().eq('id', writeTest.id);
    }
    
  } catch (error) {
    console.error('Error checking database:', error);
  }
}

checkDatabase();