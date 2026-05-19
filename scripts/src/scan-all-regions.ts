import pg from 'pg';
const { Client } = pg;

const regions = [
  'us-east-1', 'us-east-2', 'us-west-1', 'us-west-2',
  'ap-northeast-1', 'ap-northeast-2', 'ap-southeast-1', 'ap-southeast-2',
  'ap-south-1', 'ca-central-1', 'eu-central-1', 'eu-west-1',
  'eu-west-2', 'eu-west-3', 'sa-east-1'
];

const passwords = ['SecurePassword2026!', 'xaDyBTasrc7UG8kl'];

async function testConnection(region: string, password: string) {
  const host = `aws-0-${region}.pooler.supabase.com`;
  const user = 'postgres.uqrhwpgaxtgpeawlioea';
  const connectionString = `postgresql://${user}:${password}@${host}:6543/postgres`;
  
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 5000
  });

  try {
    await client.connect();
    console.log(`\n🎉 SUCCESS! CONNECTED!`);
    console.log(`Region: ${region}`);
    console.log(`Password: ${password}`);
    console.log(`Host: ${host}`);
    await client.end();
    return true;
  } catch (err: any) {
    if (err.message.includes('password authentication failed')) {
      console.log(`🤔 Region: ${region} is CORRECT but Password: ${password} is WRONG (or username format)`);
    } else if (err.message.includes('tenant/user') && err.message.includes('not found')) {
      // Quietly ignore wrong regions
    } else {
      console.log(`❌ Region: ${region}, Password: ${password} failed with: ${err.message}`);
    }
    return false;
  }
}

async function run() {
  console.log('Starting scan of all Supabase regions...');
  for (const password of passwords) {
    console.log(`\nTesting password: ${password}`);
    const promises = regions.map(region => testConnection(region, password));
    const results = await Promise.all(promises);
    if (results.some(r => r === true)) {
      console.log('Scan completed successfully!');
      return;
    }
  }
  console.log('Scan finished. No successful connection found.');
}

run();
