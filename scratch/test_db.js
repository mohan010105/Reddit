
const { Client } = require('pg');

async function testConnection() {
  const connectionString = 'postgresql://postgres.uqrhwpgaxtgpeawlioea:postgres@aws-0-us-east-1.pooler.supabase.com:6543/postgres';
  const client = new Client({
    connectionString,
    connectionTimeoutMillis: 5000,
  });

  try {
    console.log('Connecting to pooler...');
    await client.connect();
    console.log('Connected successfully!');
    const res = await client.query('SELECT NOW()');
    console.log('Current time from DB:', res.rows[0].now);
    await client.end();
  } catch (err) {
    console.error('Connection failed:', err.message);
  }
}

testConnection();
