import pg from 'pg';
import fs from 'fs';
import path from 'path';

const { Client } = pg;

const connectionString = 'postgresql://postgres.uqrhwpgaxtgpeawlioea:SecurePassword2026!@aws-0-eu-west-1.pooler.supabase.com:6543/postgres';

async function run() {
  console.log('Connecting to database to apply migrations...');
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('Connected successfully!');

    // 1. Run init.sql
    console.log('\nApplying init.sql...');
    const initSql = fs.readFileSync(path.join('..', 'lib', 'db', 'init.sql'), 'utf8');
    await client.query(initSql);
    console.log('🎉 init.sql applied successfully!');

    // 2. Run phase3_migration.sql
    console.log('\nCreating user_role enum if not exists...');
    await client.query(`
      DO $$ BEGIN
        CREATE TYPE user_role AS ENUM ('user', 'moderator', 'admin', 'super_admin');
      EXCEPTION WHEN duplicate_object THEN NULL;
      END $$;
    `);

    console.log('\nApplying phase3_migration.sql...');
    const phase3Sql = fs.readFileSync(path.join('..', 'lib', 'db', 'phase3_migration.sql'), 'utf8');
    await client.query(phase3Sql);
    console.log('🎉 phase3_migration.sql applied successfully!');

    console.log('\nAll migrations applied perfectly!');
  } catch (err: any) {
    console.error('💥 Migration error:', err.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

run();
