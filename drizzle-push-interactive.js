import { spawn } from 'child_process';
import path from 'path';

process.env.DATABASE_URL = 'postgresql://postgres.uqrhwpgaxtgpeawlioea:SecurePassword2026!@aws-0-eu-west-1.pooler.supabase.com:6543/postgres';

console.log('Spawning drizzle-kit push with automatic interactive answers...');

const child = spawn('npx', ['drizzle-kit', 'push', '--force', '--config', './drizzle.config.ts'], {
  cwd: './lib/db',
  env: process.env,
  shell: true,
  stdio: ['pipe', 'inherit', 'inherit']
});

// Periodic write of newlines to automatically select the default choice for all prompts
const interval = setInterval(() => {
  if (child.stdin.writable) {
    child.stdin.write('\n');
  }
}, 500);

child.on('close', (code) => {
  clearInterval(interval);
  if (code === 0) {
    console.log('🎉 Drizzle push completed successfully!');
    process.exit(0);
  } else {
    console.error(`❌ Drizzle push exited with code ${code}`);
    process.exit(code || 1);
  }
});
