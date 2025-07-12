const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

async function checkMigrations() {
  console.log('🔍 Checking Database Migrations...\n');
  
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
  
  // Check if migrations table exists
  console.log('📋 Checking schema_migrations table:');
  try {
    const { data: migrations, error } = await supabase
      .from('schema_migrations')
      .select('*')
      .order('version', { ascending: false });
    
    if (error) {
      console.log('❌ No migrations table found. This means migrations have never been run.');
      console.log('Error:', error.message);
    } else {
      console.log('✅ Migrations table exists');
      console.log('Applied migrations:', migrations?.length || 0);
      if (migrations && migrations.length > 0) {
        console.log('Latest migration:', migrations[0].version);
      }
    }
  } catch (err) {
    console.log('❌ Error checking migrations:', err.message);
  }
  
  console.log('\n📋 Checking for research tables:');
  
  // Check each table individually
  const tables = [
    'research_sources',
    'research_queries', 
    'research_results',
    'research_history'
  ];
  
  let missingTables = [];
  
  for (const table of tables) {
    try {
      // Try to get table info using a count query
      const { count, error } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true });
      
      if (error) {
        if (error.message.includes('does not exist')) {
          console.log(`❌ ${table}: Does not exist`);
          missingTables.push(table);
        } else {
          console.log(`⚠️  ${table}: Error - ${error.message}`);
        }
      } else {
        console.log(`✅ ${table}: Exists (${count || 0} records)`);
      }
    } catch (err) {
      console.log(`❌ ${table}: Exception - ${err.message}`);
      missingTables.push(table);
    }
  }
  
  if (missingTables.length > 0) {
    console.log('\n⚠️  Missing tables:', missingTables.join(', '));
    console.log('\n📝 To create the missing tables:');
    console.log('1. Go to your Supabase dashboard');
    console.log('2. Navigate to SQL Editor');
    console.log('3. Run the migration SQL from:');
    console.log('   supabase/migrations/20250112_create_research_tables.sql');
  } else {
    console.log('\n✅ All research tables exist!');
  }
  
  // Check RLS policies
  console.log('\n📋 Checking RLS (Row Level Security):');
  try {
    // This query will fail if RLS is enabled and no policies allow access
    const { data, error } = await supabase
      .from('research_sources')
      .select('id')
      .limit(1);
    
    if (error) {
      console.log('⚠️  RLS might be blocking access:', error.message);
    } else {
      console.log('✅ Can access research_sources table');
    }
  } catch (err) {
    console.log('❌ Error checking RLS:', err.message);
  }
}

checkMigrations();