import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "../../lib/db/src/schema/index.js";
import { eq, sql, inArray } from "drizzle-orm";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL required");
}

const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
const db = drizzle(pool, { schema });

// Mock data generator since faker might be missing
const mock = {
  email: (username: string) => `${username.toLowerCase()}@example.com`,
  bio: () => {
    const bios = [
      "Meme enthusiast and part-time philosopher.",
      "Just here for the dankest memes.",
      "Professional internet explorer.",
      "I post memes, therefore I am.",
      "Searching for the ultimate reaction image.",
      "Living one meme at a time.",
      "My life is a joke, but my memes are serious.",
      "Certified meme lord.",
    ];
    return bios[Math.floor(Math.random() * bios.length)];
  },
  comment: () => {
    const comments = [
      "Lmao so true!",
      "I've seen this one before, but it's still gold.",
      "Relatable af.",
      "Who made this? 😂",
      "Dead. 💀",
      "This is why I love the internet.",
      "Wait, is this OC?",
      "Sending this to my group chat right now.",
      "I feel personally attacked by this.",
      "Top tier meme.",
      "The quality we deserve.",
      "I'm in this picture and I don't like it.",
      "Modern art.",
      "Imagine explaining this to someone from the 1800s.",
    ];
    return comments[Math.floor(Math.random() * comments.length)];
  },
  avatar: () => `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random().toString(36).substring(7)}`,
};

async function main() {
  console.log("🚀 Starting Kaggle Dataset Integration...");

  // 1. Load Dataset
  const datasetPath = path.join(__dirname, "../../Dataset/db.json");
  if (!fs.existsSync(datasetPath)) {
    console.error("❌ Dataset not found at:", datasetPath);
    process.exit(1);
  }

  const rawData = JSON.parse(fs.readFileSync(datasetPath, "utf-8"));
  const posts = Object.values(rawData._default) as any[];
  console.log(`📦 Loaded ${posts.length} posts from dataset.`);

  // 2. Extract unique authors
  const authors = Array.from(new Set(posts.map((p) => p.author))).filter(a => a && a !== "None");
  console.log(`👤 Found ${authors.length} unique authors.`);

  // 3. Create a Memes community if it doesn't exist
  console.log("🏠 Setting up communities...");
  let adminUser = await db.query.usersTable.findFirst({ where: eq(schema.usersTable.role, "admin") });
  if (!adminUser) {
    [adminUser] = await db.insert(schema.usersTable).values({
      supabaseId: "admin-system",
      username: "system_admin",
      email: "admin@threadit.com",
      role: "admin",
      karma: 9999,
    }).returning();
  }

  const memeCommunities = [
    { name: "Memes", slug: "memes", description: "The central hub for all things funny, weird, and relatable." },
    { name: "Dank Memes", slug: "dankmemes", description: "Only the spiciest, most high-effort (or extremely low-effort) memes allowed." },
    { name: "Relatable", slug: "relatable", description: "Memes that hit a little too close to home." },
  ];

  const communityMap = new Map<string, number>();
  for (const c of memeCommunities) {
    let comm = await db.query.communitiesTable.findFirst({ where: eq(schema.communitiesTable.slug, c.slug) });
    if (!comm) {
      [comm] = await db.insert(schema.communitiesTable).values({
        ...c,
        creatorId: adminUser.id,
      }).returning();
    }
    communityMap.set(c.slug, comm.id);
  }

  // 4. Create/Upsert Users
  console.log("👥 Upserting users...");
  const userMap = new Map<string, number>();
  
  // Batch users for speed
  const BATCH_SIZE = 100;
  for (let i = 0; i < authors.length; i += BATCH_SIZE) {
    const batch = authors.slice(i, i + BATCH_SIZE);
    const results = await Promise.all(batch.map(async (username) => {
      let user = await db.query.usersTable.findFirst({ where: eq(schema.usersTable.username, username) });
      if (!user) {
        try {
          [user] = await db.insert(schema.usersTable).values({
            supabaseId: `kaggle-${username}-${Math.random().toString(36).substring(7)}`,
            username,
            email: mock.email(username),
            bio: mock.bio(),
            avatarUrl: mock.avatar(),
            karma: Math.floor(Math.random() * 5000),
          }).returning();
        } catch (e) {
          // Handle potential race conditions or unique constraint errors
          user = await db.query.usersTable.findFirst({ where: eq(schema.usersTable.username, username) });
        }
      }
      return { username, id: user?.id };
    }));

    results.forEach(r => {
      if (r.id) userMap.set(r.username, r.id);
    });
    console.log(`   Processed ${Math.min(i + BATCH_SIZE, authors.length)}/${authors.length} users...`);
  }

  // 5. Transform and Insert Posts
  console.log("📝 Inserting posts...");
  const slugs = Array.from(communityMap.keys());
  
  // Clean data and prepare for insert
  const preparedPosts = posts
    .filter(p => userMap.has(p.author))
    .map(p => {
      const isNsfw = p.thumbnail === "nsfw";
      return {
        title: p.title,
        imageUrl: p.media,
        authorId: userMap.get(p.author)!,
        communityId: communityMap.get(slugs[Math.floor(Math.random() * slugs.length)])!,
        type: "image" as const,
        upvotes: Math.floor(p.ups / 10), // Scale down for realism in our small app
        downvotes: Math.floor(p.downs / 10),
        score: Math.floor((p.ups - p.downs) / 10),
        tags: isNsfw ? "nsfw" : null,
        moderationStatus: isNsfw ? "flagged" : "approved" as any,
        createdAt: new Date(p.created_utc * 1000),
      };
    });

  const insertedPostIds: number[] = [];
  for (let i = 0; i < preparedPosts.length; i += BATCH_SIZE) {
    const batch = preparedPosts.slice(i, i + BATCH_SIZE);
    try {
      const inserted = await db.insert(schema.postsTable).values(batch).returning({ id: schema.postsTable.id });
      insertedPostIds.push(...inserted.map(p => p.id));
    } catch (e) {
      console.error(`   Error inserting batch at ${i}:`, e);
    }
    console.log(`   Inserted ${Math.min(i + BATCH_SIZE, preparedPosts.length)}/${preparedPosts.length} posts...`);
  }

  // 6. Add AI Moderation Logs for NSFW posts
  console.log("🤖 Generating moderation logs for NSFW content...");
  const nsfwPosts = preparedPosts
    .map((p, idx) => ({ ...p, id: insertedPostIds[idx] }))
    .filter(p => p.tags === "nsfw");

  if (nsfwPosts.length > 0) {
    const modLogs = nsfwPosts.map(p => ({
      contentType: "post",
      contentId: p.id,
      authorId: p.authorId,
      nsfwScore: 0.95 + Math.random() * 0.05,
      overallScore: 0.9,
      status: "flagged" as any,
      reason: "Potential NSFW content detected by system.",
      isProcessed: true,
      processedAt: new Date(),
    }));

    for (let i = 0; i < modLogs.length; i += BATCH_SIZE) {
      await db.insert(schema.aiModerationLogsTable).values(modLogs.slice(i, i + BATCH_SIZE));
    }
  }

  // 7. Generate realistic comments and votes
  console.log("💬 Generating engagement (comments & votes)...");
  for (let i = 0; i < insertedPostIds.length; i += 20) { // Only do every 20th post for comments to avoid huge data
    const postId = insertedPostIds[i];
    const commentCount = Math.floor(Math.random() * 5) + 1;
    const postAuthors = Array.from(userMap.values());
    
    for (let j = 0; j < commentCount; j++) {
      const commenterId = postAuthors[Math.floor(Math.random() * postAuthors.length)];
      const [comment] = await db.insert(schema.commentsTable).values({
        postId,
        authorId: commenterId,
        content: mock.comment(),
        score: Math.floor(Math.random() * 100),
        depth: 0,
      }).returning();

      // Add a nested comment occasionally
      if (Math.random() > 0.7) {
        const nestedCommenterId = postAuthors[Math.floor(Math.random() * postAuthors.length)];
        await db.insert(schema.commentsTable).values({
          postId,
          authorId: nestedCommenterId,
          parentId: comment.id,
          content: mock.comment(),
          score: Math.floor(Math.random() * 50),
          depth: 1,
        });
      }
    }
  }

  // 8. Update post comment counts
  console.log("📊 Finalizing engagement metrics...");
  await db.execute(sql`
    UPDATE posts 
    SET comment_count = (
      SELECT count(*) FROM comments WHERE comments.post_id = posts.id
    )
  `);

  console.log("✨ Kaggle Seeding Complete!");
  await pool.end();
}

main().catch((err) => {
  console.error("❌ Fatal error during seeding:", err);
  process.exit(1);
});
