-- ============================================================================
-- Phase 4: Stripe + Scaling Migration
-- ============================================================================

-- 1. Alter subscriptions table: Razorpay -> Stripe
ALTER TABLE subscriptions 
  ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT,
  ADD COLUMN IF NOT EXISTS stripe_subscription_id TEXT UNIQUE,
  ADD COLUMN IF NOT EXISTS stripe_price_id TEXT,
  ADD COLUMN IF NOT EXISTS trial_end TIMESTAMPTZ;

-- Drop old Razorpay columns if they exist
DO $$ BEGIN
  ALTER TABLE subscriptions DROP COLUMN IF EXISTS razorpay_subscription_id;
  ALTER TABLE subscriptions DROP COLUMN IF EXISTS razorpay_plan_id;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

-- Add 'trialing' to subscription_status enum if not exists
DO $$ BEGIN
  ALTER TYPE subscription_status ADD VALUE IF NOT EXISTS 'trialing';
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- 2. Alter transactions table: Razorpay -> Stripe
ALTER TABLE transactions
  ADD COLUMN IF NOT EXISTS stripe_payment_intent_id TEXT UNIQUE,
  ADD COLUMN IF NOT EXISTS stripe_invoice_id TEXT,
  ADD COLUMN IF NOT EXISTS description TEXT;

-- Drop old Razorpay columns
DO $$ BEGIN
  ALTER TABLE transactions DROP COLUMN IF EXISTS razorpay_order_id;
  ALTER TABLE transactions DROP COLUMN IF EXISTS razorpay_payment_id;
  ALTER TABLE transactions DROP COLUMN IF EXISTS razorpay_signature;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

-- 3. Alter creator_earnings table
ALTER TABLE creator_earnings
  ADD COLUMN IF NOT EXISTS stripe_connect_account_id TEXT,
  ADD COLUMN IF NOT EXISTS stripe_connect_onboarded BOOLEAN DEFAULT FALSE;

-- 4. Alter payout_requests table
ALTER TABLE payout_requests
  ADD COLUMN IF NOT EXISTS stripe_payout_id TEXT,
  ADD COLUMN IF NOT EXISTS currency TEXT DEFAULT 'usd';

-- Drop old column
DO $$ BEGIN
  ALTER TABLE payout_requests DROP COLUMN IF EXISTS method;
  ALTER TABLE payout_requests DROP COLUMN IF EXISTS details;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

-- 5. Push notification tokens
CREATE TABLE IF NOT EXISTS push_tokens (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  endpoint TEXT NOT NULL,
  p256dh TEXT NOT NULL,
  auth TEXT NOT NULL,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  last_used_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_push_tokens_user ON push_tokens(user_id);

-- 6. User engagement tracking
CREATE TABLE IF NOT EXISTS user_engagement (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  event_type TEXT NOT NULL,
  target_type TEXT NOT NULL,
  target_id INTEGER NOT NULL,
  duration INTEGER,
  metadata TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_engagement_user ON user_engagement(user_id);
CREATE INDEX IF NOT EXISTS idx_engagement_target ON user_engagement(target_type, target_id);
CREATE INDEX IF NOT EXISTS idx_engagement_created ON user_engagement(created_at);

-- 7. Subscription analytics
CREATE TABLE IF NOT EXISTS subscription_analytics (
  id SERIAL PRIMARY KEY,
  date TIMESTAMPTZ NOT NULL,
  plan subscription_plan NOT NULL,
  new_subscriptions INTEGER DEFAULT 0,
  cancellations INTEGER DEFAULT 0,
  revenue DECIMAL(12, 2) DEFAULT 0,
  mrr DECIMAL(12, 2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_sub_analytics_date ON subscription_analytics(date);

-- 8. Performance indexes
CREATE INDEX IF NOT EXISTS idx_transactions_user ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_status ON transactions(status);
CREATE INDEX IF NOT EXISTS idx_transactions_created ON transactions(created_at);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe ON subscriptions(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_creator_earnings_user ON creator_earnings(user_id);
CREATE INDEX IF NOT EXISTS idx_recommendations_user ON user_recommendations(user_id);
CREATE INDEX IF NOT EXISTS idx_recommendations_target ON user_recommendations(target_type, target_id);
CREATE INDEX IF NOT EXISTS idx_posts_vote_count ON posts(vote_count DESC);
CREATE INDEX IF NOT EXISTS idx_posts_created ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_community ON posts(community_id);
CREATE INDEX IF NOT EXISTS idx_comments_post ON comments(post_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id, read);
