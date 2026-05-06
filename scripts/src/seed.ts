import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "../../lib/db/src/schema/index.js";
import { eq, sql } from "drizzle-orm";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL required");
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool, { schema });

async function seed() {
  console.log("Seeding database...");

  // Create a system user (no real supabase account, just for demo data)
  const seedUsers = [
    { supabaseId: "seed-user-1", username: "alice_dev", email: "alice@example.com", bio: "Full-stack developer who loves open source.", karma: 1240, postCount: 14, commentCount: 87 },
    { supabaseId: "seed-user-2", username: "bob_science", email: "bob@example.com", bio: "Physicist by day, redditor by night.", karma: 3421, postCount: 45, commentCount: 312 },
    { supabaseId: "seed-user-3", username: "carol_writes", email: "carol@example.com", bio: "Writer and occasional thinker.", karma: 892, postCount: 23, commentCount: 156 },
    { supabaseId: "seed-user-4", username: "dan_cooks", email: "dan@example.com", bio: "Amateur chef, professional eater.", karma: 567, postCount: 8, commentCount: 43 },
  ];

  const insertedUsers = [];
  for (const u of seedUsers) {
    const existing = await db.select().from(schema.usersTable).where(eq(schema.usersTable.supabaseId, u.supabaseId));
    if (existing.length > 0) {
      insertedUsers.push(existing[0]);
    } else {
      const [user] = await db.insert(schema.usersTable).values(u).returning();
      insertedUsers.push(user);
    }
  }
  console.log(`Users: ${insertedUsers.length}`);

  // Create communities
  const seedCommunities = [
    { slug: "programming", name: "Programming", description: "A place to discuss programming languages, frameworks, tools, and best practices.", creatorId: insertedUsers[0].id },
    { slug: "science", name: "Science", description: "The latest discoveries, research, and scientific discussions from around the world.", creatorId: insertedUsers[1].id },
    { slug: "cooking", name: "Cooking", description: "Share recipes, techniques, and food photos. All skill levels welcome.", creatorId: insertedUsers[3].id },
    { slug: "books", name: "Books", description: "Book reviews, recommendations, and literary discussion.", creatorId: insertedUsers[2].id },
    { slug: "technology", name: "Technology", description: "News and discussions about technology, gadgets, and the digital world.", creatorId: insertedUsers[0].id },
  ];

  const insertedCommunities = [];
  for (const c of seedCommunities) {
    const existing = await db.select().from(schema.communitiesTable).where(eq(schema.communitiesTable.slug, c.slug));
    if (existing.length > 0) {
      insertedCommunities.push(existing[0]);
    } else {
      const [comm] = await db.insert(schema.communitiesTable).values(c).returning();
      insertedCommunities.push(comm);
    }
  }
  console.log(`Communities: ${insertedCommunities.length}`);

  // Add members
  for (const community of insertedCommunities) {
    for (const user of insertedUsers) {
      await db.insert(schema.communityMembersTable).values({ communityId: community.id, userId: user.id }).onConflictDoNothing();
    }
    await db.update(schema.communitiesTable)
      .set({ memberCount: insertedUsers.length })
      .where(eq(schema.communitiesTable.id, community.id));
  }

  // Create posts
  const seedPosts = [
    {
      title: "I built a full-stack app in a weekend using React + Express — here's what I learned",
      content: "After months of planning, I finally sat down and built something end-to-end. The stack was React on the frontend, Express on the backend, and PostgreSQL for the database. Here are the most important lessons I took away from the experience...\n\nFirst, type safety matters more than I thought. Using TypeScript throughout saved me from a dozen bugs that would have been nightmares to debug.\n\nSecond, the API design phase is worth spending time on. I rushed mine and had to refactor twice.\n\nThird, Drizzle ORM is genuinely excellent and I won't go back to raw SQL for most projects.\n\nHappy to answer questions!",
      communityId: insertedCommunities[0].id,
      authorId: insertedUsers[0].id,
      upvotes: 342, downvotes: 18, score: 324, commentCount: 3,
    },
    {
      title: "Scientists discover new mechanism for how memories are formed during sleep",
      content: "A team of neuroscientists at MIT has published findings suggesting that memory consolidation during sleep involves a previously unknown type of oscillatory activity in the hippocampus. The research, published in Nature Neuroscience, could have implications for treating memory disorders.\n\nThe study used multi-electrode arrays to record from thousands of neurons simultaneously in mice during natural sleep cycles...",
      communityId: insertedCommunities[1].id,
      authorId: insertedUsers[1].id,
      upvotes: 891, downvotes: 23, score: 868, commentCount: 2,
    },
    {
      title: "My 72-hour slow-braised short rib recipe — the patience is worth it",
      content: "I've been perfecting this recipe for three years. The key insight: low and slow is good, but humidity matters as much as temperature. Here's the full process...\n\nDay 1: Season generously with salt and freshly ground pepper. Let it rest uncovered in the fridge overnight — this dries the surface for better browning.\n\nDay 2: Sear in a cast iron over high heat until deeply caramelized on all sides. Build your braising liquid with wine, stock, aromatics. 225°F in the oven for 10 hours.\n\nDay 3: Strain, defat, reduce the braising liquid to a glossy sauce. Reheat the ribs gently in the sauce. Serve with polenta.",
      communityId: insertedCommunities[2].id,
      authorId: insertedUsers[3].id,
      upvotes: 234, downvotes: 7, score: 227, commentCount: 2,
    },
    {
      title: "Why I think 'The Remains of the Day' is the most devastating novel written in English",
      content: "Kazuo Ishiguro achieves something almost impossible in this novel: he makes us understand, more deeply than the narrator himself does, the tragedy of a life spent in devoted service to causes that didn't deserve it.\n\nStevens, the butler, is an unreliable narrator in the most heartbreaking sense — not because he's lying, but because he genuinely cannot see what we can see so clearly: that he sacrificed love, dignity, and authentic selfhood on the altar of 'professional dignity'.\n\nThe ending, where he watches the sunset at the pier, broke me. I'm recommending this to everyone.",
      communityId: insertedCommunities[3].id,
      authorId: insertedUsers[2].id,
      upvotes: 567, downvotes: 34, score: 533, commentCount: 1,
    },
    {
      title: "Open-source AI coding assistant that runs entirely locally — no API keys needed",
      content: "I've been working on a tool that lets you use a small local LLM for code completion and chat, integrated directly into VS Code. It runs on consumer hardware (tested on M1 MacBook Pro and a mid-range gaming laptop).\n\nThe model is quantized to 4-bit precision using GGUF format, which gets it down to about 4GB of VRAM. It's not GPT-4, but for boilerplate generation and explaining existing code, it's genuinely useful.\n\nRepo is linked in comments. Happy to discuss the architecture.",
      communityId: insertedCommunities[4].id,
      authorId: insertedUsers[0].id,
      upvotes: 1203, downvotes: 45, score: 1158, commentCount: 1,
    },
  ];

  const insertedPosts = [];
  for (const p of seedPosts) {
    const existing = await db.select().from(schema.postsTable).where(eq(schema.postsTable.title, p.title));
    if (existing.length > 0) {
      insertedPosts.push(existing[0]);
    } else {
      const [post] = await db.insert(schema.postsTable).values({ ...p, type: "text" }).returning();
      insertedPosts.push(post);
    }
  }
  console.log(`Posts: ${insertedPosts.length}`);

  // Create comments
  const seedComments = [
    { content: "Great write-up! The point about API design is so true — I've refactored my APIs twice already and still not happy with them.", postId: insertedPosts[0].id, authorId: insertedUsers[1].id, score: 87 },
    { content: "What's your take on Drizzle vs Prisma for greenfield projects? I keep going back and forth.", postId: insertedPosts[0].id, authorId: insertedUsers[2].id, score: 43 },
    { content: "Drizzle for anything where you care about performance and SQL proximity. Prisma for teams where developer experience and type safety across the stack matter more.", postId: insertedPosts[0].id, authorId: insertedUsers[0].id, parentId: null, score: 61 },
    { content: "The implications for Alzheimer's research could be significant here. Memory consolidation during sleep is one of the mechanisms that seems to break down early in the disease.", postId: insertedPosts[1].id, authorId: insertedUsers[2].id, score: 234 },
    { content: "I need to try this. I've done 48-hour short ribs but never 72. Does extending the time much beyond 72 hurt it?", postId: insertedPosts[2].id, authorId: insertedUsers[1].id, score: 56 },
    { content: "72 hours seems to be the sweet spot. Beyond that the collagen fully breaks down but the fat rendering can make it greasy. You'd need to adjust temp down to maybe 200°F to compensate.", postId: insertedPosts[2].id, authorId: insertedUsers[3].id, score: 78 },
    { content: "The scene where he finally admits he might have loved Miss Kenton, then immediately retreats back into professional detachment... I've thought about that scene for years.", postId: insertedPosts[3].id, authorId: insertedUsers[0].id, score: 189 },
    { content: "What's the inference speed like on CPU-only machines? I don't have a GPU.", postId: insertedPosts[4].id, authorId: insertedUsers[3].id, score: 67 },
  ];

  for (const c of seedComments) {
    const existing = await db.select().from(schema.commentsTable)
      .where(eq(schema.commentsTable.content, c.content));
    if (existing.length === 0) {
      await db.insert(schema.commentsTable).values({ ...c, postId: c.postId, depth: 0 });
    }
  }

  // Update community post counts
  for (const comm of insertedCommunities) {
    const [{ count }] = await db.select({ count: sql<number>`count(*)::int` })
      .from(schema.postsTable)
      .where(eq(schema.postsTable.communityId, comm.id));
    await db.update(schema.communitiesTable)
      .set({ postCount: count })
      .where(eq(schema.communitiesTable.id, comm.id));
  }

  console.log("Seed complete!");
  await pool.end();
}

seed().catch(err => { console.error(err); process.exit(1); });
