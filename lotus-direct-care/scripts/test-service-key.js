const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

async function testServiceKey() {
  console.log('🔐 Testing Service Role Key...\n');
  
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!url || !serviceKey) {
    console.error('❌ Missing required environment variables!');
    return;
  }
  
  // Mask the key for display
  const maskedKey = serviceKey.substring(0, 20) + '...' + serviceKey.substring(serviceKey.length - 10);
  console.log(`URL: ${url}`);
  console.log(`Service Key: ${maskedKey}`);
  console.log(`Key Length: ${serviceKey.length} characters`);
  
  // Check if it looks like a valid JWT
  const parts = serviceKey.split('.');
  console.log(`JWT Parts: ${parts.length} (should be 3)`);
  
  if (parts.length !== 3) {
    console.error('\n❌ Invalid service key format - not a valid JWT');
    return;
  }
  
  try {
    // Test with anon key first
    console.log('\n📋 Testing anon key access...');
    const anonClient = createClient(url, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
    const { error: anonError } = await anonClient.from('research_sources').select('count').limit(1);
    
    if (anonError) {
      console.log(`Anon key test: ❌ ${anonError.message}`);
    } else {
      console.log('Anon key test: ✅ Success');
    }
    
    // Test with service key
    console.log('\n📋 Testing service key access...');
    const serviceClient = createClient(url, serviceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });
    
    const { error: serviceError } = await serviceClient.from('research_sources').select('count').limit(1);
    
    if (serviceError) {
      console.log(`Service key test: ❌ ${serviceError.message}`);
      
      if (serviceError.message.includes('Invalid API key')) {
        console.log('\n⚠️  The service role key appears to be invalid.');
        console.log('Please check that you copied the complete key from Supabase.');
        console.log('Go to: Project Settings → API → service_role (secret)');
      }
    } else {
      console.log('Service key test: ✅ Success');
      
      // Test write permission
      console.log('\n📝 Testing write permissions...');
      const { data, error: writeError } = await serviceClient
        .from('research_history')
        .insert({
          query: 'Service key test',
          results: { test: true },
          source: 'test'
        })
        .select()
        .single();
      
      if (writeError) {
        console.log(`Write test: ❌ ${writeError.message}`);
      } else {
        console.log('Write test: ✅ Success');
        // Clean up
        await serviceClient.from('research_history').delete().eq('id', data.id);
      }
    }
    
  } catch (error) {
    console.error('\n❌ Unexpected error:', error.message);
  }
}

testServiceKey();