import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { createClient } from "@supabase/supabase-js";

// ─── Configuration ────────────────────────────────────────────────────────────

const SUPABASE_URL = "https://uqrhwpgaxtgpeawlioea.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxcmh3cGdheHRncGVhd2xpb2VhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwNjk0MDAsImV4cCI6MjA5MzY0NTQwMH0.LYignTKoQ5hrTN_wPjdq2mMFlsZudbfQ9n98ttNX5to";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: false },
  global: { fetch: fetch as any },
});

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
      thumbnail: r.thumbnail && typeof r.thumbnail === "object" ? r.thumbnail : null,
      created_utc: Number(r.created_utc ?? 0),
      author: String(r.author ?? "unknown"),
      id: String(r.id),
      ups: Number(r.ups ?? 0),
      downs: Number(r.downs ?? 0),
      media: String(r.media ?? ""),
    });
  }

  console.log(`✅ Parsed ${records.length} records (${skipped} skipped as malformed)`);
  return records;
}

// ─── Main Seed Function ───────────────────────────────────────────────────────

async function seed() {
  try {
    // 1. Load dataset
    const datasetPath = resolveDatasetPath();
    const records = parseDataset(datasetPath);

    if (records.length === 0) {
      console.log("⚠️  No records to seed. Exiting.");
      return;
    }

    // 2. Check for existing seeded data (idempotency)
    const { count: existingCount, error: countErr } = await supabase
      .from("posts")
      .select("id", { count: "exact", head: true })
      .like("tags", "%reddit_dataset%");

    if (countErr) throw countErr;

    if (existingCount && existingCount > 0) {
      console.log(`ℹ️  Found ${existingCount} already-seeded records. Checking for new ones...`);
    }

    // Get all existing reddit IDs to prevent duplicates
    const existingIds = new Set<string>();
    if (existingCount && existingCount > 0) {
      const { data: existingTags, error: tagErr } = await supabase
        .from("posts")
        .select("tags")
        .like("tags", "%reddit_dataset%");
      if (tagErr) throw tagErr;
      for (const row of existingTags) {
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

    const { data: seedUserCheck } = await supabase
      .from("users")
      .select("id")
      .eq("username", "dataset_bot")
      .limit(1);

    if (seedUserCheck && seedUserCheck.length > 0) {
      seedUserId = seedUserCheck[0].id;
      console.log(`👤 Using existing seed user (id: ${seedUserId})`);
    } else {
      const { data: insertUser, error: insertUserErr } = await supabase
        .from("users")
        .insert({
          supabase_id: seedSupabaseId,
          username: "dataset_bot",
          email: "dataset-bot@threadit.app",
          bio: "Bot account for seeded dataset records",
          role: "user",
          karma: 0,
        })
        .select("id")
        .single();
      if (insertUserErr) throw insertUserErr;
      seedUserId = insertUser.id;
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

    if (uniqueAuthors.length > 0) {
      const usernames = uniqueAuthors.map((a) =>
        `r_${a.toLowerCase().replace(/[^a-z0-9_]/g, "_").slice(0, 30)}`
      );
      
      const { data: existingAuthors, error: authErr } = await supabase
        .from("users")
        .select("id, username")
        .in("username", usernames);
      
      if (authErr) throw authErr;

      for (const row of existingAuthors) {
        const origAuthor = uniqueAuthors.find(
          (a) => `r_${a.toLowerCase().replace(/[^a-z0-9_]/g, "_").slice(0, 30)}` === row.username
        );
        if (origAuthor) authorIdMap.set(origAuthor, row.id);
      }
    }

    const authorsToCreate = uniqueAuthors.filter((a) => !authorIdMap.has(a));
    console.log(`  → Creating ${authorsToCreate.length} new author accounts`);

    for (let i = 0; i < authorsToCreate.length; i += BATCH_SIZE) {
      const batch = authorsToCreate.slice(i, i + BATCH_SIZE);
      const rowsToInsert = batch.map((author, idx) => {
        const username = `r_${author.toLowerCase().replace(/[^a-z0-9_]/g, "_").slice(0, 30)}`;
        return {
          supabase_id: `seed-${author}-${Date.now()}-${idx}`,
          username: username,
          email: `${username}@reddit-seed.threadit.app`,
          bio: `Reddit user u/${author}`,
          role: "user",
          karma: 0,
        };
      });

      const { data: result, error: batchErr } = await supabase
        .from("users")
        .upsert(rowsToInsert, { onConflict: "username" })
        .select("id, username");

      if (batchErr) {
        console.error(`Error inserting authors batch:`, batchErr.message);
      } else if (result) {
        for (const row of result) {
          const origAuthor = batch.find(
            (a) => `r_${a.toLowerCase().replace(/[^a-z0-9_]/g, "_").slice(0, 30)}` === row.username
          );
          if (origAuthor) authorIdMap.set(origAuthor, row.id);
        }
      }
    }

    // 5. Ensure "dankmemes" community exists
    let communityId: number;
    const { data: commCheck } = await supabase
      .from("communities")
      .select("id")
      .eq("slug", "dankmemes")
      .limit(1);

    if (commCheck && commCheck.length > 0) {
      communityId = commCheck[0].id;
      console.log(`🏘️  Using existing community 'dankmemes' (id: ${communityId})`);
    } else {
      const { data: commInsert, error: commErr } = await supabase
        .from("communities")
        .insert({
          name: "Dank Memes",
          slug: "dankmemes",
          description: "The home of internet memes. Quality shitposts only.",
          creator_id: seedUserId,
          member_count: 0,
          post_count: 0,
        })
        .select("id")
        .single();
      if (commErr) throw commErr;
      communityId = commInsert.id;
      console.log(`🏘️  Created community 'dankmemes' (id: ${communityId})`);
    }

    // 6. Insert posts in batches
    console.log(`📝 Inserting ${newRecords.length} posts in batches of ${BATCH_SIZE}...`);

    let inserted = 0;
    let errors = 0;

    for (let i = 0; i < newRecords.length; i += BATCH_SIZE) {
      const batch = newRecords.slice(i, i + BATCH_SIZE);
      const postRows = batch.map((record) => {
        const authorId = authorIdMap.get(record.author) ?? seedUserId;
        const isNsfw = record.thumbnail?.thumbnail === "nsfw";
        const tags = `reddit_dataset,reddit_id:${record.id}${isNsfw ? ",nsfw" : ""}`;
        
        return {
          title: record.title,
          content: null,
          image_url: record.media || null,
          tags: tags,
          type: "image",
          upvotes: record.ups,
          downvotes: record.downs,
          score: record.ups - record.downs,
          author_id: authorId,
          community_id: communityId,
        };
      });

      const { error: postBatchErr } = await supabase
        .from("posts")
        .insert(postRows);

      if (postBatchErr) {
        errors += batch.length;
        console.error(`  ❌ Batch ${Math.floor(i / BATCH_SIZE) + 1} failed: ${postBatchErr.message}`);
      } else {
        inserted += batch.length;
      }

      const pct = Math.round(((i + batch.length) / newRecords.length) * 100);
      process.stdout.write(`  → Progress: ${pct}% (${inserted} inserted, ${errors} errors)\r`);
    }

    console.log(`\n✅ Seeding complete: ${inserted} posts inserted, ${errors} errors`);
    console.log("🎉 Dataset integration complete via REST API!");
  } catch (err: any) {
    console.error("💥 Fatal error during seeding:", err);
    process.exit(1);
  }
}

seed();
