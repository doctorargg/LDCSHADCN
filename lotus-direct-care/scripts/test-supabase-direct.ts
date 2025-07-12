import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

console.log('Environment Check:');
console.log('==================');
console.log(`Supabase URL: ${supabaseUrl ? 'Set' : 'Not Set'}`);
console.log(`Anon Key: ${supabaseAnonKey ? 'Set' : 'Not Set'}`);
console.log(`Service Key: ${supabaseServiceKey ? 'Set' : 'Not Set'}`);
console.log(`Admin API Key: ${process.env.ADMIN_API_KEY ? 'Set' : 'Not Set'}`);

async function testSupabaseConnection() {
  console.log('\nTesting with Service Role Key (bypasses RLS):');
  console.log('=============================================');
  
  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  // Test each table
  const tables = ['research_sources', 'research_queries', 'research_results', 'research_history'];
  
  for (const table of tables) {
    try {
      const { count, error } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true });
      
      if (error) {
        console.log(`✗ ${table}: Error - ${error.message}`);
      } else {
        console.log(`✓ ${table}: Success - ${count} records`);
      }
    } catch (e) {
      console.log(`✗ ${table}: Exception - ${e}`);
    }
  }

  // Test write permission
  console.log('\nTesting Write Permission:');
  console.log('========================');
  
  try {
    const testSourceName = `Test Source ${Date.now()}`;
    const { data, error: insertError } = await supabase
      .from('research_sources')
      .insert({
        name: testSourceName,
        url: 'https://test.example.com',
        domain: 'test.example.com',
        source_type: 'website',
        categories: ['test'],
        reliability_score: 0.5
      })
      .select()
      .single();
    
    if (insertError) {
      console.log('✗ Insert failed:', insertError.message);
    } else {
      console.log('✓ Insert successful:', data.id);
      
      // Clean up
      const { error: deleteError } = await supabase
        .from('research_sources')
        .delete()
        .eq('id', data.id);
      
      if (deleteError) {
        console.log('✗ Cleanup failed:', deleteError.message);
      } else {
        console.log('✓ Cleanup successful');
      }
    }
  } catch (e) {
    console.log('✗ Write test exception:', e);
  }
}

async function testWithAnonKey() {
  console.log('\n\nTesting with Anon Key (subject to RLS):');
  console.log('=======================================');
  
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  // Test read
  const { data, error } = await supabase
    .from('research_sources')
    .select('*')
    .limit(1);
  
  if (error) {
    console.log('✗ Read failed:', error.message);
  } else {
    console.log(`✓ Read successful: ${data?.length || 0} records`);
  }
}

testSupabaseConnection()
  .then(() => testWithAnonKey())
  .then(() => {
    console.log('\nTests completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Test failed:', error);
    process.exit(1);
  });