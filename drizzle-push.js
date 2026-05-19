import { execSync } from 'child_process';

process.env.DATABASE_URL = 'postgresql://postgres.uqrhwpgaxtgpeawlioea:SecurePassword2026!@aws-0-eu-west-1.pooler.supabase.com:6543/postgres';

console.log('Running drizzle-kit push --force with explicit DATABASE_URL...');
try {
  execSync('npx drizzle-kit push --force --config ./drizzle.config.ts', {
    stdio: 'inherit',
    cwd: './lib/db',
    env: process.env
  });
  console.log('🎉 Drizzle push completed successfully!');
} catch (err) {
  console.error('❌ Drizzle push failed:', err.message);
  process.exit(1);
}
