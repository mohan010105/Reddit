-- Phase 3 Database Migration
-- Run this against your Supabase PostgreSQL database

-- ═══════════════════════════════════════════════════════════════════════════════
-- 1. Extend user_role enum (add super_admin)
-- ═══════════════════════════════════════════════════════════════════════════════
DO $$ BEGIN
  ALTER TYPE user_role ADD VALUE IF NOT EXISTS 'super_admin';
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- ═══════════════════════════════════════════════════════════════════════════════
-- 2. Add new columns to users table
-- ═══════════════════════════════════════════════════════════════════════════════
ALTER TABLE users ADD COLUMN IF NOT EXISTS ban_reason TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS ban_expires_at TIMESTAMPTZ;
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_shadow_banned BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE users ADD COLUMN IF NOT EXISTS muted_until TIMESTAMPTZ;
ALTER TABLE users ADD COLUMN IF NOT EXISTS last_active_at TIMESTAMPTZ;

-- ═══════════════════════════════════════════════════════════════════════════════
-- 3. Add new columns to posts table
-- ═══════════════════════════════════════════════════════════════════════════════
DO $$ BEGIN
  CREATE TYPE post_moderation_status AS ENUM ('pending', 'approved', 'rejected', 'flagged');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

ALTER TABLE posts ADD COLUMN IF NOT EXISTS is_featured BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE posts ADD COLUMN IF NOT EXISTS is_pinned BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE posts ADD COLUMN IF NOT EXISTS is_approved BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE posts ADD COLUMN IF NOT EXISTS moderation_status post_moderation_status DEFAULT 'approved';
ALTER TABLE posts ADD COLUMN IF NOT EXISTS ai_score REAL;
ALTER TABLE posts ADD COLUMN IF NOT EXISTS scheduled_at TIMESTAMPTZ;

-- ═══════════════════════════════════════════════════════════════════════════════
-- 4. Add new columns to reports table
-- ═══════════════════════════════════════════════════════════════════════════════
DO $$ BEGIN
  CREATE TYPE report_reason AS ENUM (
    'spam', 'harassment', 'hate_speech', 'violence', 'nsfw',
    'misinformation', 'self_harm', 'impersonation', 'copyright', 'other'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

ALTER TABLE reports ADD COLUMN IF NOT EXISTS reason_category report_reason DEFAULT 'other';
ALTER TABLE reports ADD COLUMN IF NOT EXISTS reported_user_id INTEGER REFERENCES users(id);
ALTER TABLE reports ADD COLUMN IF NOT EXISTS resolved_by INTEGER REFERENCES users(id);
ALTER TABLE reports ADD COLUMN IF NOT EXISTS resolution_note TEXT;

-- ═══════════════════════════════════════════════════════════════════════════════
-- 5. Create admin_action enum
-- ═══════════════════════════════════════════════════════════════════════════════
DO $$ BEGIN
  CREATE TYPE admin_action AS ENUM (
    'ban_user', 'unban_user', 'mute_user', 'unmute_user',
    'shadow_ban', 'unshadow_ban',
    'change_role', 'delete_post', 'delete_comment',
    'approve_post', 'reject_post', 'feature_post', 'unfeature_post',
    'pin_post', 'unpin_post', 'archive_post', 'restore_post',
    'approve_community', 'delete_community',
    'resolve_report', 'dismiss_report',
    'update_settings', 'bulk_action'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- ═══════════════════════════════════════════════════════════════════════════════
-- 6. Create admin_logs table
-- ═══════════════════════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS admin_logs (
  id SERIAL PRIMARY KEY,
  action admin_action NOT NULL,
  admin_id INTEGER NOT NULL REFERENCES users(id),
  target_type TEXT,
  target_id INTEGER,
  details JSONB,
  ip_address TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_admin_logs_admin_id ON admin_logs(admin_id);
CREATE INDEX IF NOT EXISTS idx_admin_logs_action ON admin_logs(action);
CREATE INDEX IF NOT EXISTS idx_admin_logs_created_at ON admin_logs(created_at DESC);

-- ═══════════════════════════════════════════════════════════════════════════════
-- 7. Create moderation_status enum
-- ═══════════════════════════════════════════════════════════════════════════════
DO $$ BEGIN
  CREATE TYPE moderation_status AS ENUM (
    'pending', 'approved', 'rejected', 'flagged', 'auto_approved', 'auto_rejected'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- ═══════════════════════════════════════════════════════════════════════════════
-- 8. Create ai_moderation_logs table
-- ═══════════════════════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS ai_moderation_logs (
  id SERIAL PRIMARY KEY,
  content_type TEXT NOT NULL,
  content_id INTEGER NOT NULL,
  author_id INTEGER REFERENCES users(id),
  
  toxicity_score REAL DEFAULT 0,
  spam_score REAL DEFAULT 0,
  hate_speech_score REAL DEFAULT 0,
  nsfw_score REAL DEFAULT 0,
  overall_score REAL DEFAULT 0,
  
  status moderation_status NOT NULL DEFAULT 'pending',
  confidence REAL DEFAULT 0,
  reason TEXT,
  categories JSONB,
  
  is_processed BOOLEAN NOT NULL DEFAULT false,
  processed_at TIMESTAMPTZ,
  reviewed_by INTEGER REFERENCES users(id),
  reviewed_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ai_mod_logs_status ON ai_moderation_logs(status);
CREATE INDEX IF NOT EXISTS idx_ai_mod_logs_content ON ai_moderation_logs(content_type, content_id);
CREATE INDEX IF NOT EXISTS idx_ai_mod_logs_created_at ON ai_moderation_logs(created_at DESC);

-- ═══════════════════════════════════════════════════════════════════════════════
-- 9. Create moderation_actions table
-- ═══════════════════════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS moderation_actions (
  id SERIAL PRIMARY KEY,
  moderator_id INTEGER NOT NULL REFERENCES users(id),
  target_type TEXT NOT NULL,
  target_id INTEGER NOT NULL,
  action TEXT NOT NULL,
  reason TEXT,
  details JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_mod_actions_moderator ON moderation_actions(moderator_id);
CREATE INDEX IF NOT EXISTS idx_mod_actions_target ON moderation_actions(target_type, target_id);

-- ═══════════════════════════════════════════════════════════════════════════════
-- 10. Create platform_settings table
-- ═══════════════════════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS platform_settings (
  id SERIAL PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL,
  updated_by INTEGER REFERENCES users(id),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ═══════════════════════════════════════════════════════════════════════════════
-- 11. Performance indexes
-- ═══════════════════════════════════════════════════════════════════════════════
CREATE INDEX IF NOT EXISTS idx_posts_featured ON posts(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_posts_pinned ON posts(is_pinned) WHERE is_pinned = true;
CREATE INDEX IF NOT EXISTS idx_posts_moderation ON posts(moderation_status);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_banned ON users(is_banned) WHERE is_banned = true;
CREATE INDEX IF NOT EXISTS idx_users_shadow_banned ON users(is_shadow_banned) WHERE is_shadow_banned = true;
CREATE INDEX IF NOT EXISTS idx_users_last_active ON users(last_active_at DESC);
CREATE INDEX IF NOT EXISTS idx_reports_status ON reports(status);
CREATE INDEX IF NOT EXISTS idx_reports_created_at ON reports(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_comments_created_at ON comments(created_at DESC);

-- ═══════════════════════════════════════════════════════════════════════════════
-- 12. Enable Supabase Realtime on admin tables
-- ═══════════════════════════════════════════════════════════════════════════════
ALTER PUBLICATION supabase_realtime ADD TABLE admin_logs;
ALTER PUBLICATION supabase_realtime ADD TABLE ai_moderation_logs;
ALTER PUBLICATION supabase_realtime ADD TABLE moderation_actions;
ALTER PUBLICATION supabase_realtime ADD TABLE platform_settings;
-- Note: posts, comments, reports, users should already be in supabase_realtime

-- Done!
SELECT 'Phase 3 migration complete!' AS status;
