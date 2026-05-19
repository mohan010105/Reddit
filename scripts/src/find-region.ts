import pg from 'pg';
const { Client } = pg;

async function run() {
  const host = 'aws-0-eu-west-1.pooler.supabase.com';
  const connectionString = 'postgresql://postgres.uqrhwpgaxtgpeawlioea:SecurePassword2026!@aws-0-eu-west-1.pooler.supabase.com:6543/postgres';
  
  const client = new Client({
    connectionString,
    connectionTimeoutMillis: 5000
  });

  try {
    console.log("Connecting to database with SecurePassword2026!...");
    await client.connect();
    console.log("🎉 SUCCESS! Connected successfully to Supabase DB!");
    const res = await client.query('SELECT NOW()');
    console.log('Current time from DB:', res.rows[0].now);
    await client.end();
  } catch (err: any) {
    console.error("💥 Connection failed:", err.message);
  }
}

run();
