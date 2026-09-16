require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function runSQL(label, sql) {
  console.log(`\n--- Running: ${label} ---`);
  const { data, error } = await supabase.rpc('exec_sql', { sql_query: sql }).maybeSingle();
  if (error) {
    // Try direct fetch to PostgREST SQL endpoint
    const res = await fetch(`${process.env.SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`
      },
      body: JSON.stringify({ sql_query: sql })
    });
    if (!res.ok) {
      console.log(`  ⚠ RPC not available, using pg-meta API...`);
      return await runSQLViaPgMeta(label, sql);
    }
  }
  console.log(`  ✓ ${label} completed`);
  return true;
}

async function runSQLViaPgMeta(label, sql) {
  const res = await fetch(`${process.env.SUPABASE_URL}/pg/query`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY,
      'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
      'x-connection-encrypted': 'true'
    },
    body: JSON.stringify({ query: sql })
  });
  
  if (!res.ok) {
    const text = await res.text();
    console.log(`  ✗ Failed: ${text}`);
    return false;
  }
  
  const data = await res.json();
  console.log(`  ✓ ${label} completed`);
  return true;
}

async function main() {
  console.log('=== Setting up Supabase Database Tables ===\n');
  console.log('URL:', process.env.SUPABASE_URL);

  // Test connection first
  const { data: testData, error: testError } = await supabase.from('users').select('count').limit(1);
  
  if (testError && testError.message.includes('does not exist')) {
    console.log('Tables do not exist yet. Need to create them via SQL Editor.\n');
  } else if (!testError) {
    console.log('✓ Connection successful! Users table already exists.\n');
  } else {
    console.log('Connection result:', testError?.message || 'OK');
  }

  // Check which tables exist
  const tables = ['teams', 'players', 'matches', 'users', 'tournaments', 'match_records', 
                  'valorant_player_stats', 'crossfire_player_stats', 'match_heatmap', 
                  'audit_logs', 'map_vetoes', 'predictions', 'brackets', 'bracket_states',
                  'data_entry_events', 'match_admins', 'cheat_reports', 'bans', 
                  'regional_health', 'rulebooks', 'evaluation_formulas'];

  console.log('Checking existing tables...');
  for (const table of tables) {
    const { error } = await supabase.from(table).select('count').limit(1);
    if (error) {
      console.log(`  ✗ ${table} - MISSING`);
    } else {
      console.log(`  ✓ ${table} - EXISTS`);
    }
  }

  console.log('\n=== Done checking tables ===');
  console.log('\nIf tables are MISSING, please run the SQL in Supabase SQL Editor:');
  console.log(`  ${process.env.SUPABASE_URL.replace('.supabase.co', '')}/sql/new`);
  console.log('  Or go to: Supabase Dashboard > SQL Editor > New Query');
}

main().catch(console.error);
