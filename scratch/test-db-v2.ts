
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config({ path: './artifacts/api-server/.env' });

const { Client } = pg;
// Try direct connection on 5432 and add sslmode
const connectionString = process.env.DATABASE_URL.replace(':6543/', ':5432/') + '?sslmode=require';

async function testConnection() {
  console.log('Testing connection to:', connectionString.split('@')[1]);
  const client = new Client({
    connectionString,
    connectionTimeoutMillis: 10000,
  });

  try {
    await client.connect();
    console.log('Successfully connected!');
    const res = await client.query('SELECT NOW()');
    console.log('Query successful:', res.rows[0]);
    await client.end();
  } catch (err) {
    console.error('Connection failed:', err.message);
    process.exit(1);
  }
}

testConnection();
