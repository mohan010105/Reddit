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
    
    // Columns
    const cols = await client.query(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns 
      WHERE table_name = 'reports'
    `);
    console.log('REPORTS COLUMNS:', cols.rows);

    // Constraints
    const cons = await client.query(`
      SELECT constraint_name, constraint_type
      FROM information_schema.table_constraints
      WHERE table_name = 'reports'
    `);
    console.log('REPORTS CONSTRAINTS:', cons.rows);
  } catch (err: any) {
    console.error('Error inspecting:', err.message);
  } finally {
    await client.end();
  }
}

run();
