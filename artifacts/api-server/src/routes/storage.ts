import { Router } from "express";
import multer from "multer";
import { createClient } from "@supabase/supabase-js";
import { requireAuth } from "../middlewares/auth";

const router = Router();

const supabaseUrl = process.env.SUPABASE_URL!.startsWith("http")
  ? process.env.SUPABASE_URL!
  : `https://${process.env.SUPABASE_URL!}.supabase.co`;

const supabase = createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY!);

const ALLOWED_BUCKETS = ["avatars", "post-images"] as const;
type AllowedBucket = (typeof ALLOWED_BUCKETS)[number];

const ALLOWED_MIME = ["image/jpeg", "image/png", "image/gif", "image/webp"];

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024 }, // 8 MB max
  fileFilter(_req, file, cb) {
    if (ALLOWED_MIME.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPEG, PNG, GIF, and WebP images are allowed"));
    }
  },
});

/** Ensure a public bucket exists (idempotent). */
async function ensureBucket(bucket: AllowedBucket) {
  const { error } = await supabase.storage.createBucket(bucket, { public: true });
  // Ignore "already exists" errors
  if (error && !error.message.includes("already exists")) {
    throw error;
  }
}

// POST /api/storage/upload
router.post("/upload", requireAuth, upload.single("file"), async (req, res) => {
  const file = req.file;
  if (!file) {
    res.status(400).json({ error: "No file provided" });
    return;
  }

  const bucket = (req.body.bucket as string) || "post-images";
  if (!(ALLOWED_BUCKETS as readonly string[]).includes(bucket)) {
    res.status(400).json({ error: `Invalid bucket. Must be one of: ${ALLOWED_BUCKETS.join(", ")}` });
    return;
  }

  try {
    await ensureBucket(bucket as AllowedBucket);

    const ext = file.originalname.split(".").pop()?.toLowerCase() ?? "jpg";
    const timestamp = Date.now();
    const rand = Math.random().toString(36).slice(2, 8);
    const filePath = `${req.userId}/${timestamp}-${rand}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
        upsert: false,
      });

    if (uploadError) {
      req.log.error({ err: uploadError }, "Supabase storage upload failed");
      res.status(500).json({ error: "Upload failed. Please try again." });
      return;
    }

    const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(filePath);

    res.json({ url: publicUrl });
  } catch (err) {
    req.log.error({ err }, "Storage upload error");
    res.status(500).json({ error: "Upload failed" });
  }
});

export default router;
