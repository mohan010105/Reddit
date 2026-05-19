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
    const res = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    console.log('TABLES IN DB:', res.rows.map(r => r.table_name));
  } catch (err: any) {
    console.error('Error listing tables:', err.message);
  } finally {
    await client.end();
  }
}

run();
