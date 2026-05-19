import pg from "pg";
const { Client } = pg;

async function test() {
  const connectionString = "postgresql://postgres:postgres@db.uqrhwpgaxtgpeawlioea.supabase.co:5432/postgres";
  console.log("Testing connection to:", connectionString?.replace(/:[^@]+@/, ":****@"));
  
  const client = new Client({ connectionString });
  try {
    await client.connect();
    console.log("✅ Successfully connected!");
    const res = await client.query("SELECT NOW()");
    console.log("🕒 Database time:", res.rows[0].now);
    await client.end();
  } catch (err) {
    console.error("❌ Connection failed!");
    console.error(err);
    process.exit(1);
  }
}

test();
