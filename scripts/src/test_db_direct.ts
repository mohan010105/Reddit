import pg from "pg";
const { Pool } = pg;

// Try direct connection instead of pooling
const DATABASE_URL = "postgresql://postgres:postgres@db.uqrhwpgaxtgpeawlioea.supabase.co:5432/postgres";

async function test() {
  const pool = new Pool({ connectionString: DATABASE_URL });
  try {
    console.log("Connecting to DIRECT DB:", DATABASE_URL.replace(/:[^:]+@/, ":****@"));
    const res = await pool.query("SELECT NOW()");
    console.log("Success!", res.rows[0]);
  } catch (err: any) {
    console.error("Connection failed:", err.message);
  } finally {
    await pool.end();
  }
}

test();
