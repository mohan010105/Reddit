import pg from 'pg';

const { Client } = pg;
const connectionString = 'postgresql://postgres.uqrhwpgaxtgpeawlioea:SecurePassword2026!@aws-0-eu-west-1.pooler.supabase.com:6543/postgres';

async function run() {
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    
    for (const tbl of ['users', 'posts', 'comments', 'profiles']) {
      const cols = await client.query(`
        SELECT column_name, data_type, is_nullable, table_schema
        FROM information_schema.columns 
        WHERE table_name = $1 AND table_schema = 'public'
      `, [tbl]);
      console.log(`\n${tbl.toUpperCase()} COLUMNS:`, cols.rows.map(r => `${r.column_name}: ${r.data_type} (${r.table_schema})`));
    }
  } catch (err: any) {
    console.error('Error inspecting:', err.message);
  } finally {
    await client.end();
  }
}

run();
