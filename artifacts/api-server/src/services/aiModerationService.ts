import { db } from "@workspace/db";
import { aiModerationLogsTable, postsTable, commentsTable } from "@workspace/db/schema";
import { eq, desc, and, sql } from "drizzle-orm";

// ──────────────────────────────────────────────────────────────────────────────
// Profanity / Spam word lists (basic built-in — no OpenAI dep required)
// ──────────────────────────────────────────────────────────────────────────────
const SPAM_PATTERNS = [
  /\b(buy now|click here|free money|act now|limited time|order now)\b/gi,
  /\b(casino|poker|slots|viagra|cialis)\b/gi,
  /(https?:\/\/\S+){3,}/gi, // 3+ URLs = likely spam
  /(.)\1{10,}/g, // Repeated characters
  /[A-Z\s]{20,}/g, // Excessive caps
];

const TOXIC_PATTERNS = [
  /\b(idiot|stupid|moron|dumb|loser|trash)\b/gi,
  /\b(stfu|gtfo|kys)\b/gi,
  /\b(kill yourself|die|go die)\b/gi,
];

const HATE_SPEECH_PATTERNS = [
  /\b(nazi|white power|racial slur placeholder)\b/gi,
];

// ──────────────────────────────────────────────────────────────────────────────
// Score content locally (fast, no API cost)
// ──────────────────────────────────────────────────────────────────────────────
function scoreContent(text: string): {
  toxicityScore: number;
  spamScore: number;
  hateSpeechScore: number;
  nsfwScore: number;
  overallScore: number;
  categories: string[];
  reason: string | null;
} {
  const lower = text.toLowerCase();
  const categories: string[] = [];
  let reason: string | null = null;

  // Spam detection
  let spamHits = 0;
  for (const pattern of SPAM_PATTERNS) {
    if (pattern.test(text)) spamHits++;
    pattern.lastIndex = 0; // Reset regex
  }
  const spamScore = Math.min(spamHits / SPAM_PATTERNS.length, 1);
  if (spamScore > 0.3) categories.push("spam");

  // Toxicity detection
  let toxicHits = 0;
  for (const pattern of TOXIC_PATTERNS) {
    const matches = text.match(pattern);
    if (matches) toxicHits += matches.length;
  }
  const toxicityScore = Math.min(toxicHits * 0.25, 1);
  if (toxicityScore > 0.3) categories.push("toxicity");

  // Hate speech detection
  let hateHits = 0;
  for (const pattern of HATE_SPEECH_PATTERNS) {
    const matches = text.match(pattern);
    if (matches) hateHits += matches.length;
  }
  const hateSpeechScore = Math.min(hateHits * 0.5, 1);
  if (hateSpeechScore > 0.3) categories.push("hate_speech");

  // NSFW detection (basic keyword)
  const nsfwKeywords = ["nsfw", "porn", "xxx", "nude", "naked", "explicit"];
  let nsfwHits = nsfwKeywords.filter(k => lower.includes(k)).length;
  const nsfwScore = Math.min(nsfwHits * 0.3, 1);
  if (nsfwScore > 0.3) categories.push("nsfw");

  // Overall
  const overallScore = Math.max(spamScore, toxicityScore, hateSpeechScore, nsfwScore);

  if (categories.length > 0) {
    reason = `Flagged for: ${categories.join(", ")}`;
  }

  return { toxicityScore, spamScore, hateSpeechScore, nsfwScore, overallScore, categories, reason };
}

// ──────────────────────────────────────────────────────────────────────────────
// OpenAI moderation (optional — if API key is set)
// ──────────────────────────────────────────────────────────────────────────────
async function openAIModerate(text: string): Promise<{
  toxicityScore: number;
  spamScore: number;
  hateSpeechScore: number;
  nsfwScore: number;
  overallScore: number;
  categories: string[];
  reason: string | null;
} | null> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  try {
    const response = await fetch("https://api.openai.com/v1/moderations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ input: text }),
    });

    if (!response.ok) return null;

    const data = await response.json() as any;
    const result = data.results?.[0];
    if (!result) return null;

    const categories: string[] = [];
    const scores = result.category_scores || {};
    
    const toxicityScore = Math.max(
      scores["harassment"] || 0,
      scores["harassment/threatening"] || 0,
      scores["violence"] || 0,
      scores["violence/graphic"] || 0
    );
    
    const hateSpeechScore = Math.max(
      scores["hate"] || 0,
      scores["hate/threatening"] || 0
    );
    
    const nsfwScore = Math.max(
      scores["sexual"] || 0,
      scores["sexual/minors"] || 0
    );
    
    const spamScore = 0; // OpenAI doesn't score spam directly
    
    if (toxicityScore > 0.5) categories.push("toxicity");
    if (hateSpeechScore > 0.5) categories.push("hate_speech");
    if (nsfwScore > 0.5) categories.push("nsfw");
    if (result.flagged) categories.push("flagged_by_openai");

    const overallScore = Math.max(toxicityScore, hateSpeechScore, nsfwScore);
    const reason = categories.length > 0 ? `OpenAI flagged: ${categories.join(", ")}` : null;

    return { toxicityScore, spamScore, hateSpeechScore, nsfwScore, overallScore, categories, reason };
  } catch {
    return null;
  }
}

// ──────────────────────────────────────────────────────────────────────────────
// Public API
// ──────────────────────────────────────────────────────────────────────────────

export async function moderateContent(
  contentType: "post" | "comment",
  contentId: number,
  text: string,
  authorId?: number
) {
  // Try OpenAI first, fallback to local
  const aiResult = await openAIModerate(text);
  const localResult = scoreContent(text);
  
  // Merge results — use OpenAI if available, otherwise local
  const result = aiResult ? {
    toxicityScore: Math.max(aiResult.toxicityScore, localResult.toxicityScore),
    spamScore: Math.max(aiResult.spamScore, localResult.spamScore),
    hateSpeechScore: Math.max(aiResult.hateSpeechScore, localResult.hateSpeechScore),
    nsfwScore: Math.max(aiResult.nsfwScore, localResult.nsfwScore),
    overallScore: Math.max(aiResult.overallScore, localResult.overallScore),
    categories: [...new Set([...aiResult.categories, ...localResult.categories])],
    reason: [aiResult.reason, localResult.reason].filter(Boolean).join("; ") || null,
  } : localResult;

  // Determine auto-action
  const AUTO_REJECT_THRESHOLD = 0.8;
  const FLAG_THRESHOLD = 0.4;
  
  let status: "auto_approved" | "auto_rejected" | "flagged" | "pending" = "auto_approved";
  let confidence = 1 - result.overallScore;

  if (result.overallScore >= AUTO_REJECT_THRESHOLD) {
    status = "auto_rejected";
    confidence = result.overallScore;
  } else if (result.overallScore >= FLAG_THRESHOLD) {
    status = "flagged";
    confidence = result.overallScore;
  }

  // Log to database
  const [log] = await db.insert(aiModerationLogsTable).values({
    contentType,
    contentId,
    authorId,
    toxicityScore: result.toxicityScore,
    spamScore: result.spamScore,
    hateSpeechScore: result.hateSpeechScore,
    nsfwScore: result.nsfwScore,
    overallScore: result.overallScore,
    status,
    confidence,
    reason: result.reason,
    categories: result.categories,
    isProcessed: true,
    processedAt: new Date(),
  }).returning();

  // Auto-reject: mark content
  if (status === "auto_rejected") {
    if (contentType === "post") {
      await db.update(postsTable).set({ moderationStatus: "rejected", isApproved: false }).where(eq(postsTable.id, contentId));
    } else {
      await db.update(commentsTable).set({ isDeleted: true }).where(eq(commentsTable.id, contentId));
    }
  } else if (status === "flagged") {
    if (contentType === "post") {
      await db.update(postsTable).set({ moderationStatus: "flagged", aiScore: result.overallScore }).where(eq(postsTable.id, contentId));
    }
  }

  return { log, result, status };
}

export async function getAIModerationLogs(options: {
  page?: number;
  limit?: number;
  status?: string;
  contentType?: string;
}) {
  const { page = 1, limit = 20, status, contentType } = options;

  const conditions = [];
  if (status) conditions.push(eq(aiModerationLogsTable.status, status as any));
  if (contentType) conditions.push(eq(aiModerationLogsTable.contentType, contentType));

  const logs = await db.query.aiModerationLogsTable.findMany({
    where: conditions.length > 0 ? and(...conditions) : undefined,
    with: { author: true },
    orderBy: [desc(aiModerationLogsTable.createdAt)],
    limit: limit + 1,
    offset: (page - 1) * limit,
  });

  const hasMore = logs.length > limit;
  const data = logs.slice(0, limit);

  return { data, hasMore, page, limit };
}

export async function getFlaggedContent(options: { page?: number; limit?: number }) {
  const { page = 1, limit = 20 } = options;
  
  const flagged = await db.query.aiModerationLogsTable.findMany({
    where: and(
      eq(aiModerationLogsTable.status, "flagged"),
    ),
    with: { author: true },
    orderBy: [desc(aiModerationLogsTable.overallScore)],
    limit: limit + 1,
    offset: (page - 1) * limit,
  });

  const hasMore = flagged.length > limit;
  return { data: flagged.slice(0, limit), hasMore, page, limit };
}

export async function reviewModerationLog(
  logId: number,
  reviewerId: number,
  approved: boolean
) {
  const [log] = await db.update(aiModerationLogsTable).set({
    status: approved ? "approved" : "rejected",
    reviewedBy: reviewerId,
    reviewedAt: new Date(),
  }).where(eq(aiModerationLogsTable.id, logId)).returning();

  if (!log) return null;

  // Apply decision to content
  if (log.contentType === "post") {
    await db.update(postsTable).set({
      moderationStatus: approved ? "approved" : "rejected",
      isApproved: approved,
    }).where(eq(postsTable.id, log.contentId));
  } else if (log.contentType === "comment" && !approved) {
    await db.update(commentsTable).set({ isDeleted: true }).where(eq(commentsTable.id, log.contentId));
  }

  return log;
}
