import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mock data generator
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

function escapeSql(str: string): string {
  if (typeof str !== 'string') return str;
  return str.replace(/'/g, "''");
}

async function main() {
  console.log("🚀 Generating SQL Seed Files from Kaggle Dataset...");

  const datasetPath = path.join(__dirname, "../../Dataset/db.json");
  if (!fs.existsSync(datasetPath)) {
    console.error("❌ Dataset not found at:", datasetPath);
    process.exit(1);
  }

  const rawData = JSON.parse(fs.readFileSync(datasetPath, "utf-8"));
  const posts = Object.values(rawData._default) as any[];
  
  // Limiting to a reasonable number for the seed file
  const limit = 500; 
  const sampledPosts = posts.slice(0, limit);
  console.log(`📦 Processing ${sampledPosts.length} posts.`);

  const authors = Array.from(new Set(sampledPosts.map((p) => p.author))).filter(a => a && a !== "None");
  
  let sql = "-- Kaggle Reddit Memes Dataset Seed\n";
  sql += "-- Generated on: " + new Date().toISOString() + "\n\n";

  // 1. Create Users
  sql += "-- 1. Create Users\n";
  const userMap = new Map<string, number>();
  let userIdCounter = 1000; // Start high to avoid conflicts with existing seeds
  
  authors.forEach(username => {
    userIdCounter++;
    userMap.set(username, userIdCounter);
    sql += `INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) \n`;
    sql += `VALUES (${userIdCounter}, 'kaggle-${userIdCounter}', '${escapeSql(username)}', '${mock.email(username)}', '${escapeSql(mock.bio())}', '${mock.avatar()}', ${Math.floor(Math.random() * 5000)}, NOW(), NOW()) \n`;
    sql += `ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;\n`;
  });
  sql += "\n";

  // 2. Create Communities
  sql += "-- 2. Create Communities\n";
  const memeCommunities = [
    { id: 100, name: "Memes", slug: "memes", description: "The central hub for all things funny, weird, and relatable." },
    { id: 101, name: "Dank Memes", slug: "dankmemes", description: "Only the spiciest memes allowed." },
  ];
  
  memeCommunities.forEach(c => {
    sql += `INSERT INTO communities (id, name, slug, description, creator_id, created_at, updated_at) \n`;
    sql += `VALUES (${c.id}, '${escapeSql(c.name)}', '${escapeSql(c.slug)}', '${escapeSql(c.description)}', ${userMap.values().next().value}, NOW(), NOW()) \n`;
    sql += `ON CONFLICT (slug) DO NOTHING;\n`;
  });
  sql += "\n";

  // 3. Create Posts
  sql += "-- 3. Create Posts\n";
  let postIdCounter = 1000;
  const postIds: number[] = [];
  
  sampledPosts.forEach(p => {
    if (!userMap.has(p.author)) return;
    postIdCounter++;
    postIds.push(postIdCounter);
    
    const isNsfw = p.thumbnail === "nsfw";
    const communityId = memeCommunities[Math.floor(Math.random() * memeCommunities.length)].id;
    const authorId = userMap.get(p.author);
    
    const upvotes = Math.floor(p.ups / 10);
    const downvotes = Math.floor(p.downs / 10);
    const score = upvotes - downvotes;
    
    sql += `INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) \n`;
    sql += `VALUES (${postIdCounter}, '${escapeSql(p.title)}', '${escapeSql(p.media)}', ${authorId}, ${communityId}, 'image', ${upvotes}, ${downvotes}, ${score}, ${isNsfw ? "'nsfw'" : "NULL"}, ${isNsfw ? "'flagged'" : "'approved'"}, '${new Date(p.created_utc * 1000).toISOString()}', NOW());\n`;
  });
  sql += "\n";

  // 4. Moderation Logs
  sql += "-- 4. AI Moderation Logs\n";
  sampledPosts.forEach((p, idx) => {
    if (p.thumbnail === "nsfw") {
      const postId = postIds[idx];
      const authorId = userMap.get(p.author);
      sql += `INSERT INTO ai_moderation_logs (content_type, content_id, author_id, nsfw_score, overall_score, status, reason, is_processed, processed_at) \n`;
      sql += `VALUES ('post', ${postId}, ${authorId}, 0.98, 0.9, 'flagged', 'Kaggle dataset nsfw tag', true, NOW());\n`;
    }
  });
  sql += "\n";

  // 5. Comments
  sql += "-- 5. Comments\n";
  let commentIdCounter = 1000;
  postIds.forEach(postId => {
    const commentCount = Math.floor(Math.random() * 3) + 1;
    const authorIds = Array.from(userMap.values());
    
    for (let i = 0; i < commentCount; i++) {
      commentIdCounter++;
      const authorId = authorIds[Math.floor(Math.random() * authorIds.length)];
      sql += `INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) \n`;
      sql += `VALUES (${commentIdCounter}, ${postId}, ${authorId}, '${escapeSql(mock.comment())}', ${Math.floor(Math.random() * 100)}, 0, NOW(), NOW());\n`;
    }
  });
  sql += "\n";

  // 6. Update counts
  sql += "-- 6. Finalize counts\n";
  sql += `UPDATE communities SET post_count = (SELECT count(*) FROM posts WHERE posts.community_id = communities.id) WHERE id >= 100;\n`;
  sql += `UPDATE posts SET comment_count = (SELECT count(*) FROM comments WHERE comments.post_id = posts.id) WHERE id >= 1000;\n`;

  const outputPath = path.join(__dirname, "../kaggle_seed.sql");
  fs.writeFileSync(outputPath, sql);
  console.log(`✅ SQL Seed file generated at: ${outputPath}`);
}

main().catch(err => {
  console.error("❌ Generation failed:", err);
});
