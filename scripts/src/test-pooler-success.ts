import pg from 'pg';
const { Client } = pg;

async function run() {
  const connectionString = 'postgresql://postgres.uqrhwpgaxtgpeawlioea:SecurePassword2026!@aws-0-eu-west-1.pooler.supabase.com:6543/postgres';
  
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 5000
  });

  try {
    console.log("Connecting with SSL rejectUnauthorized: false...");
    await client.connect();
    console.log("🎉🎉🎉 SUCCESS! Absolutely connected to Supabase Postgres database via transaction pooler! 🎉🎉🎉");
    const res = await client.query('SELECT NOW()');
    console.log('Current database time:', res.rows[0].now);
    await client.end();
  } catch (err: any) {
    console.error("💥 Connection failed:", err.message);
  }
}

run();
