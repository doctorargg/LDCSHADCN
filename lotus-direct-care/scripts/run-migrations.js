const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

async function runMigrations() {
  console.log('🔄 Running database migrations...\n');
  
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('❌ Missing required environment variables!');
    console.error('Please ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env.local');
    process.exit(1);
  }

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

  // Read and execute the research tables migration
  const migrationFile = path.join(__dirname, '..', 'supabase', 'migrations', '20250112_create_research_tables.sql');
  
  try {
    const migrationSQL = fs.readFileSync(migrationFile, 'utf8');
    
    console.log('📋 Executing migration: 20250112_create_research_tables.sql');
    
    // Note: Supabase JS client doesn't support raw SQL execution
    // In production, you should use Supabase CLI: supabase migration up
    console.log('\n⚠️  Important: The Supabase JavaScript client cannot execute raw SQL migrations.');
    console.log('Please run the following command to apply migrations:\n');
    console.log('  npx supabase migration up\n');
    console.log('Or manually execute the SQL in your Supabase dashboard:\n');
    console.log('1. Go to your Supabase project dashboard');
    console.log('2. Navigate to SQL Editor');
    console.log('3. Copy and paste the contents of:');
    console.log(`   ${migrationFile}`);
    console.log('4. Click "Run"\n');
    
    // Let's at least check if tables exist
    console.log('📊 Checking current table status...\n');
    
    const tables = ['research_sources', 'research_queries', 'research_results', 'research_history'];
    let missingTables = [];
    
    for (const table of tables) {
      const { error } = await supabase
        .from(table)
        .select('count')
        .limit(1);
      
      if (error && error.message.includes('does not exist')) {
        console.log(`❌ ${table}: Missing`);
        missingTables.push(table);
      } else if (error) {
        console.log(`⚠️  ${table}: Error - ${error.message}`);
      } else {
        console.log(`✅ ${table}: Exists`);
      }
    }
    
    if (missingTables.length > 0) {
      console.log('\n🔧 Action Required:');
      console.log('The following tables need to be created:', missingTables.join(', '));
      console.log('\nPlease run the migration using one of the methods above.');
    } else {
      console.log('\n✨ All research tables exist!');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

runMigrations();