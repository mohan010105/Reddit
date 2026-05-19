import pg from "pg";
const { Pool } = pg;

const DATABASE_URL = "postgresql://postgres.uqrhwpgaxtgpeawlioea:postgres@aws-0-us-east-1.pooler.supabase.com:6543/postgres";

async function test() {
  const pool = new Pool({ connectionString: DATABASE_URL });
  try {
    console.log("Connecting to:", DATABASE_URL.replace(/:[^:]+@/, ":****@"));
    const res = await pool.query("SELECT NOW()");
    console.log("Success!", res.rows[0]);
  } catch (err: any) {
    console.error("Connection failed:", err.message);
  } finally {
    await pool.end();
  }
}

test();
