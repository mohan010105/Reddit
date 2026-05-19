/**
 * Dataset Seed Script — Imports Reddit memes dataset into the application database.
 *
 * Usage:
 *   npx tsx scripts/src/seedDataset.ts
 *
 * What it does:
 *   1. Loads Dataset/db.json
 *   2. Creates a "dankmemes" community if it doesn't exist
 *   3. Creates placeholder users for each unique author
 *   4. Inserts posts with proper FK references
 *   5. Prevents duplicate records (idempotent via reddit_id tag)
 *   6. Updates community/user counts
 */

import { readFileSync, existsSync } from "fs";
import { join } from "path";
import pg from "pg";

const { Pool } = pg;

// ─── Configuration ────────────────────────────────────────────────────────────

const DATABASE_URL =
  process.env.DATABASE_URL ??
  "postgresql://postgres.uqrhwpgaxtgpeawlioea:postgres@aws-0-us-east-1.pooler.supabase.com:6543/postgres";

const BATCH_SIZE = 50;

// ─── Types ────────────────────────────────────────────────────────────────────

interface RawRecord {
  title: string;
  thumbnail: { thumbnail: string; height: number; width: number } | null;
  created_utc: number;
  author: string;
  id: string;
  ups: number;
  downs: number;
  media: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function resolveDatasetPath(): string {
  const candidates = [
    join(process.cwd(), "Dataset", "db.json"),
    join(process.cwd(), "dataset", "db.json"),
    join(process.cwd(), "..", "Dataset", "db.json"),
    join(process.cwd(), "..", "..", "Dataset", "db.json"),
  ];

  for (const p of candidates) {
    if (existsSync(p)) return p;
  }

  throw new Error(`db.json not found. Searched: ${candidates.join(", ")}`);
}

function parseDataset(path: string): RawRecord[] {
  console.log(`📂 Loading dataset from ${path}`);
  const raw = readFileSync(path, "utf-8");
  const parsed = JSON.parse(raw);
  const container = parsed._default ?? parsed;

  const records: RawRecord[] = [];
  let skipped = 0;

  for (const key of Object.keys(container)) {
    const r = container[key];
    if (!r || !r.title || !r.id) {
      skipped++;
      continue;
    }
    records.push({
      title: String(r.title).slice(0, 500),
      thumbnail:
        r.thumbnail && typeof r.thumbnail === "object" ? r.thumbnail : null,
      created_utc: Number(r.created_utc ?? 0),
      author: String(r.author ?? "unknown"),
      id: String(r.id),
      ups: Number(r.ups ?? 0),
      downs: Number(r.downs ?? 0),
      media: String(r.media ?? ""),
    });
  }

  console.log(
    `✅ Parsed ${records.length} records (${skipped} skipped as malformed)`
  );
  return records;
}

// ─── Main Seed Function ───────────────────────────────────────────────────────

async function seed() {
  const pool = new Pool({ connectionString: DATABASE_URL });

  try {
    // 1. Load dataset
    const datasetPath = resolveDatasetPath();
    const records = parseDataset(datasetPath);

    if (records.length === 0) {
      console.log("⚠️  No records to seed. Exiting.");
      return;
    }

    // 2. Check for existing seeded data (idempotency)
    const existingCheck = await pool.query(
      `SELECT COUNT(*) as cnt FROM posts WHERE tags LIKE '%reddit_dataset%'`
    );
    const existingCount = parseInt(existingCheck.rows[0].cnt);

    if (existingCount > 0) {
      console.log(
        `ℹ️  Found ${existingCount} already-seeded records. Checking for new ones...`
      );
    }

    // Get all existing reddit IDs to prevent duplicates
    const existingIds = new Set<string>();
    if (existingCount > 0) {
      const result = await pool.query(
        `SELECT tags FROM posts WHERE tags LIKE '%reddit_dataset%'`
      );
      for (const row of result.rows) {
        const match = row.tags?.match(/reddit_id:([a-z0-9]+)/);
        if (match) existingIds.add(match[1]);
      }
    }

    const newRecords = records.filter((r) => !existingIds.has(r.id));
    console.log(
      `📊 ${newRecords.length} new records to seed (${records.length - newRecords.length} duplicates skipped)`
    );

    if (newRecords.length === 0) {
      console.log("✅ Database is already up to date. Nothing to do.");
      return;
    }

    // 3. Ensure a seed user exists (for FK references)
    const seedSupabaseId = "seed-dataset-user-" + Date.now();
    let seedUserId: number;

    // Check if seed user already exists
    const seedUserCheck = await pool.query(
      `SELECT id FROM users WHERE username = 'dataset_bot' LIMIT 1`
    );

    if (seedUserCheck.rows.length > 0) {
      seedUserId = seedUserCheck.rows[0].id;
      console.log(`👤 Using existing seed user (id: ${seedUserId})`);
    } else {
      const insertUser = await pool.query(
        `INSERT INTO users (supabase_id, username, email, avatar_url, bio, role, karma)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING id`,
        [
          seedSupabaseId,
          "dataset_bot",
          "dataset-bot@threadit.app",
          null,
          "Bot account for seeded dataset records",
          "user",
          0,
        ]
      );
      seedUserId = insertUser.rows[0].id;
      console.log(`👤 Created seed user (id: ${seedUserId})`);
    }

    // 4. Create unique author users
    const uniqueAuthors = [
      ...new Set(
        newRecords.map((r) => r.author).filter((a) => a !== "None" && a !== "unknown")
      ),
    ];

    console.log(`👥 Processing ${uniqueAuthors.length} unique authors...`);

    const authorIdMap = new Map<string, number>();
    authorIdMap.set("None", seedUserId);
    authorIdMap.set("unknown", seedUserId);

    // Check which authors already exist
    if (uniqueAuthors.length > 0) {
      const existingAuthors = await pool.query(
        `SELECT id, username FROM users WHERE username = ANY($1::text[])`,
        [uniqueAuthors.map((a) => `r_${a.toLowerCase().replace(/[^a-z0-9_]/g, "_").slice(0, 30)}`)]
      );
      for (const row of existingAuthors.rows) {
        // Find the original author name for this username
        const origAuthor = uniqueAuthors.find(
          (a) => `r_${a.toLowerCase().replace(/[^a-z0-9_]/g, "_").slice(0, 30)}` === row.username
        );
        if (origAuthor) authorIdMap.set(origAuthor, row.id);
      }
    }

    // Create missing authors in batches
    const authorsToCreate = uniqueAuthors.filter((a) => !authorIdMap.has(a));
    console.log(`  → Creating ${authorsToCreate.length} new author accounts`);

    for (let i = 0; i < authorsToCreate.length; i += BATCH_SIZE) {
      const batch = authorsToCreate.slice(i, i + BATCH_SIZE);
      const values: any[] = [];
      const placeholders: string[] = [];

      batch.forEach((author, idx) => {
        const base = idx * 7;
        const username = `r_${author.toLowerCase().replace(/[^a-z0-9_]/g, "_").slice(0, 30)}`;
        const supaId = `seed-${author}-${Date.now()}-${idx}`;
        placeholders.push(
          `($${base + 1}, $${base + 2}, $${base + 3}, $${base + 4}, $${base + 5}, $${base + 6}, $${base + 7})`
        );
        values.push(
          supaId,
          username,
          `${username}@reddit-seed.threadit.app`,
          null,
          `Reddit user u/${author}`,
          "user",
          0
        );
      });

      const result = await pool.query(
        `INSERT INTO users (supabase_id, username, email, avatar_url, bio, role, karma)
         VALUES ${placeholders.join(", ")}
         ON CONFLICT (username) DO UPDATE SET bio = users.bio
         RETURNING id, username`,
        values
      );

      for (const row of result.rows) {
        const origAuthor = batch.find(
          (a) => `r_${a.toLowerCase().replace(/[^a-z0-9_]/g, "_").slice(0, 30)}` === row.username
        );
        if (origAuthor) authorIdMap.set(origAuthor, row.id);
      }
    }

    // 5. Ensure "dankmemes" community exists
    let communityId: number;
    const commCheck = await pool.query(
      `SELECT id FROM communities WHERE slug = 'dankmemes' LIMIT 1`
    );

    if (commCheck.rows.length > 0) {
      communityId = commCheck.rows[0].id;
      console.log(`🏘️  Using existing community 'dankmemes' (id: ${communityId})`);
    } else {
      const commInsert = await pool.query(
        `INSERT INTO communities (name, slug, description, creator_id, member_count, post_count)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING id`,
        [
          "Dank Memes",
          "dankmemes",
          "The home of internet memes. Quality shitposts only.",
          seedUserId,
          0,
          0,
        ]
      );
      communityId = commInsert.rows[0].id;
      console.log(`🏘️  Created community 'dankmemes' (id: ${communityId})`);
    }

    // 6. Insert posts in batches
    console.log(`📝 Inserting ${newRecords.length} posts in batches of ${BATCH_SIZE}...`);

    let inserted = 0;
    let errors = 0;

    for (let i = 0; i < newRecords.length; i += BATCH_SIZE) {
      const batch = newRecords.slice(i, i + BATCH_SIZE);
      const values: any[] = [];
      const placeholders: string[] = [];

      batch.forEach((record, idx) => {
        const base = idx * 10;
        const authorId = authorIdMap.get(record.author) ?? seedUserId;
        const isNsfw = record.thumbnail?.thumbnail === "nsfw";
        const tags = `reddit_dataset,reddit_id:${record.id}${isNsfw ? ",nsfw" : ""}`;
        const createdAt = record.created_utc
          ? new Date(record.created_utc * 1000).toISOString()
          : new Date().toISOString();

        placeholders.push(
          `($${base + 1}, $${base + 2}, $${base + 3}, $${base + 4}, $${base + 5}, $${base + 6}, $${base + 7}, $${base + 8}, $${base + 9}, $${base + 10})`
        );
        values.push(
          record.title,
          null, // content
          record.media || null, // image_url
          tags,
          "image", // type
          record.ups,
          record.downs,
          record.ups - record.downs, // score
          authorId,
          communityId
        );
      });

      try {
        await pool.query(
          `INSERT INTO posts (title, content, image_url, tags, type, upvotes, downvotes, score, author_id, community_id)
           VALUES ${placeholders.join(", ")}`,
          values
        );
        inserted += batch.length;
      } catch (err: any) {
        errors += batch.length;
        console.error(
          `  ❌ Batch ${Math.floor(i / BATCH_SIZE) + 1} failed: ${err.message}`
        );
      }

      // Progress
      const pct = Math.round(((i + batch.length) / newRecords.length) * 100);
      process.stdout.write(`  → Progress: ${pct}% (${inserted} inserted, ${errors} errors)\r`);
    }

    console.log(
      `\n✅ Seeding complete: ${inserted} posts inserted, ${errors} errors`
    );

    // 7. Update community post count
    await pool.query(
      `UPDATE communities SET post_count = (SELECT COUNT(*) FROM posts WHERE community_id = $1) WHERE id = $1`,
      [communityId]
    );

    // 8. Update user post counts and karma
    await pool.query(
      `UPDATE users u SET
        post_count = (SELECT COUNT(*) FROM posts WHERE author_id = u.id),
        karma = (SELECT COALESCE(SUM(score), 0) FROM posts WHERE author_id = u.id)
       WHERE u.id IN (SELECT DISTINCT author_id FROM posts WHERE tags LIKE '%reddit_dataset%')`
    );

    console.log("📊 Updated community and user counts.");

    // 9. Create indexes for dataset queries (idempotent)
    console.log("🔍 Ensuring indexes exist...");
    await pool.query(
      `CREATE INDEX IF NOT EXISTS idx_posts_tags ON posts USING gin (to_tsvector('english', COALESCE(tags, '')))`
    ).catch(() => {/* ignore if already exists or unsupported */});
    await pool.query(
      `CREATE INDEX IF NOT EXISTS idx_posts_score_desc ON posts (score DESC)`
    ).catch(() => {});
    await pool.query(
      `CREATE INDEX IF NOT EXISTS idx_posts_created_at_desc ON posts (created_at DESC)`
    ).catch(() => {});

    console.log("🎉 Dataset integration complete!");
  } catch (err: any) {
    console.error("💥 Fatal error during seeding:", err.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

// ─── Run ──────────────────────────────────────────────────────────────────────

seed();
