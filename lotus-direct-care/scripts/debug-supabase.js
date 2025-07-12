const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

async function debugSupabase() {
  console.log('🔍 Debugging Supabase Connection...\n');
  
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  console.log('Environment Check:');
  console.log('URL:', url ? '✅ Set' : '❌ Missing');
  console.log('Service Key:', serviceKey ? `✅ Set (${serviceKey.length} chars)` : '❌ Missing');
  
  if (!url || !serviceKey) {
    console.error('\n❌ Missing required environment variables');
    return;
  }
  
  // Test 1: Basic connection
  console.log('\n📋 Test 1: Basic Connection');
  try {
    const supabase = createClient(url, serviceKey);
    console.log('✅ Client created successfully');
  } catch (error) {
    console.error('❌ Failed to create client:', error.message);
    return;
  }
  
  // Test 2: Check tables with different client configurations
  console.log('\n📋 Test 2: Table Access Tests');
  
  // Standard service role client
  console.log('\nUsing standard service role client:');
  const supabaseStandard = createClient(url, serviceKey);
  
  const tables = ['research_sources', 'research_queries', 'research_results', 'research_history'];
  
  for (const table of tables) {
    try {
      const { data, error } = await supabaseStandard
        .from(table)
        .select('count')
        .limit(1);
      
      if (error) {
        console.log(`${table}: ❌ ${error.message}`);
      } else {
        console.log(`${table}: ✅ Accessible`);
      }
    } catch (err) {
      console.log(`${table}: ❌ Exception: ${err.message}`);
    }
  }
  
  // Test 3: Check with explicit auth headers
  console.log('\n📋 Test 3: With Explicit Auth Headers');
  const supabaseWithHeaders = createClient(url, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    },
    global: {
      headers: {
        Authorization: `Bearer ${serviceKey}`
      }
    }
  });
  
  try {
    const { data, error } = await supabaseWithHeaders
      .from('research_sources')
      .select('id')
      .limit(1);
    
    if (error) {
      console.log('With headers: ❌', error.message);
      if (error.message.includes('JWT')) {
        console.log('\n⚠️  JWT Error Details:');
        console.log('This suggests the service role key might be malformed or expired.');
        console.log('Please verify you have the correct service_role key from Supabase.');
      }
    } else {
      console.log('With headers: ✅ Success');
    }
  } catch (err) {
    console.log('With headers: ❌ Exception:', err.message);
  }
  
  // Test 4: Direct REST API call
  console.log('\n📋 Test 4: Direct REST API Call');
  try {
    const fetch = require('node-fetch');
    const response = await fetch(`${url}/rest/v1/research_sources?select=id&limit=1`, {
      headers: {
        'apikey': serviceKey,
        'Authorization': `Bearer ${serviceKey}`,
        'Content-Type': 'application/json'
      }
    });
    
    const text = await response.text();
    console.log('Response status:', response.status);
    console.log('Response:', text.substring(0, 200));
    
    if (response.status === 401) {
      console.log('\n❌ Authentication failed. This confirms the service role key is invalid.');
    } else if (response.status === 200) {
      console.log('\n✅ Direct API call succeeded!');
    }
  } catch (err) {
    console.log('Direct API: ❌ Exception:', err.message);
  }
}

debugSupabase();