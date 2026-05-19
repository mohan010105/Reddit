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
    console.log('Connected to drop tables...');

    // Get all tables in public schema
    const res = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
    `);

    const tables = res.rows.map(r => r.table_name);
    console.log('Tables to drop:', tables);

    if (tables.length > 0) {
      // Drop all tables with cascade to clean up everything
      const dropQuery = tables.map(t => `DROP TABLE IF EXISTS "${t}" CASCADE;`).join('\n');
      await client.query(dropQuery);
      console.log('🎉 All tables dropped successfully!');
    } else {
      console.log('No tables to drop.');
    }

    // Drop custom types/enums if any exist
    console.log('Dropping custom enums...');
    const dropTypes = `
      DROP TYPE IF EXISTS "user_role" CASCADE;
      DROP TYPE IF EXISTS "post_moderation_status" CASCADE;
      DROP TYPE IF EXISTS "report_reason" CASCADE;
      DROP TYPE IF EXISTS "admin_action" CASCADE;
      DROP TYPE IF EXISTS "moderation_status" CASCADE;
      DROP TYPE IF EXISTS "subscription_status" CASCADE;
      DROP TYPE IF EXISTS "subscription_plan" CASCADE;
      DROP TYPE IF EXISTS "post_type" CASCADE;
      DROP TYPE IF EXISTS "report_status" CASCADE;
    `;
    await client.query(dropTypes);
    console.log('🎉 All custom enums dropped successfully!');

  } catch (err: any) {
    console.error('💥 Error dropping tables:', err.message);
  } finally {
    await client.end();
  }
}

run();
