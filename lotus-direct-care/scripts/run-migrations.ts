import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing required environment variables');
  process.exit(1);
}

// Create a Supabase client with the service role key
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function runMigrations() {
  console.log('Running database migrations...\n');

  const migrationsDir = path.join(__dirname, '..', 'supabase', 'migrations');
  
  // Get all migration files
  const migrationFiles = fs.readdirSync(migrationsDir)
    .filter(file => file.endsWith('.sql'))
    .sort(); // Sort to ensure they run in order

  console.log(`Found ${migrationFiles.length} migration files:`);
  migrationFiles.forEach(file => console.log(`  - ${file}`));
  console.log('');

  for (const file of migrationFiles) {
    console.log(`Running migration: ${file}`);
    
    try {
      const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
      
      // Split by semicolons but be careful with statements inside functions
      const statements = sql
        .split(/;\s*$/m)
        .filter(stmt => stmt.trim().length > 0)
        .map(stmt => stmt.trim() + ';');

      for (const statement of statements) {
        if (statement.trim().length === 0) continue;
        
        // Skip comments
        if (statement.trim().startsWith('--')) continue;
        
        let error: any = null;
        try {
          const result = await supabase.rpc('exec_sql', {
            sql: statement
          });
          error = result.error;
        } catch (err) {
          error = err;
        }
        
        // If RPC doesn't exist, try direct execution (this won't work with RLS)
        if (error?.message?.includes('exec_sql')) {
          console.log('  Note: Cannot execute SQL directly. Please run migrations through Supabase dashboard.');
          console.log('  Migration SQL has been saved to: migrations_to_run.sql');
          
          // Save all migrations to a single file for manual execution
          const allSql = migrationFiles
            .map(f => fs.readFileSync(path.join(migrationsDir, f), 'utf8'))
            .join('\n\n-- ===================================\n\n');
          
          fs.writeFileSync('migrations_to_run.sql', allSql);
          return;
        }
        
        if (error) {
          console.error(`  Error: ${error.message}`);
          // Continue with other statements
        }
      }
      
      console.log(`  ✓ Completed ${file}`);
    } catch (error) {
      console.error(`  ✗ Failed ${file}:`, error);
    }
  }

  // Verify tables were created
  console.log('\nVerifying tables...');
  const tables = ['research_sources', 'research_queries', 'research_results', 'research_history'];
  
  for (const table of tables) {
    const { count, error } = await supabase
      .from(table)
      .select('*', { count: 'exact', head: true });
    
    if (error) {
      console.log(`  ✗ ${table}: ${error.message}`);
    } else {
      console.log(`  ✓ ${table}: ${count} records`);
    }
  }
}

// Run the migrations
runMigrations()
  .then(() => {
    console.log('\nMigration process completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Migration failed:', error);
    process.exit(1);
  });