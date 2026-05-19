import pg from 'pg';
const { Client } = pg;

const variations = [
  { host: 'aws-0-ap-south-1.pooler.supabase.com', port: 6543, user: 'postgres.uqrhwpgaxtgpeawlioea', ssl: true },
  { host: 'aws-0-ap-south-1.pooler.supabase.com', port: 5432, user: 'postgres.uqrhwpgaxtgpeawlioea', ssl: true },
  { host: 'aws-0-ap-south-1.pooler.supabase.com', port: 6543, user: 'postgres.uqrhwpgaxtgpeawlioea', ssl: false },
  { host: 'aws-0-ap-south-1.pooler.supabase.com', port: 5432, user: 'postgres.uqrhwpgaxtgpeawlioea', ssl: false },
];

async function testVariation(v: typeof variations[0], password: string) {
  const connectionString = `postgresql://${v.user}:${password}@${v.host}:${v.port}/postgres`;
  console.log(`Testing: ${v.host}:${v.port} (user: ${v.user}, password: ${password}, ssl: ${v.ssl})`);
  
  const client = new Client({
    connectionString,
    ssl: v.ssl ? { rejectUnauthorized: false } : false,
    connectionTimeoutMillis: 5000
  });

  try {
    await client.connect();
    console.log(`🎉 SUCCESS! Connected successfully with password: ${password}!`);
    const res = await client.query('SELECT NOW()');
    console.log('Current time:', res.rows[0].now);
    await client.end();
    return true;
  } catch (err: any) {
    console.log(`❌ Failed: ${err.message}`);
    return false;
  }
}

async function run() {
  const passwords = ['SecurePassword2026!', 'xaDyBTasrc7UG8kl'];
  for (const password of passwords) {
    for (const v of variations) {
      const ok = await testVariation(v, password);
      if (ok) {
        return;
      }
    }
  }
}

run();
