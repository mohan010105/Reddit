/**
 * Frontend Analytics Service
 * Tracks user behavior, engagement, and conversions
 */
import { posthog } from "./posthog";

// ─── Event Categories ─────────────────────────────────────
export const AnalyticsEvents = {
  // Auth events
  AUTH_LOGIN: "auth_login",
  AUTH_REGISTER: "auth_register",
  AUTH_LOGOUT: "auth_logout",
  AUTH_FORGOT_PASSWORD: "auth_forgot_password",

  // Content events
  POST_CREATE: "post_create",
  POST_VIEW: "post_view",
  POST_VOTE: "post_vote",
  POST_SAVE: "post_save",
  POST_SHARE: "post_share",
  POST_DELETE: "post_delete",
  POST_REPORT: "post_report",

  // Comment events
  COMMENT_CREATE: "comment_create",
  COMMENT_VOTE: "comment_vote",
  COMMENT_DELETE: "comment_delete",

  // Community events
  COMMUNITY_JOIN: "community_join",
  COMMUNITY_LEAVE: "community_leave",
  COMMUNITY_CREATE: "community_create",
  COMMUNITY_VIEW: "community_view",

  // Social events
  USER_FOLLOW: "user_follow",
  USER_UNFOLLOW: "user_unfollow",
  USER_PROFILE_VIEW: "user_profile_view",
  USER_PROFILE_EDIT: "user_profile_edit",

  // Navigation events
  NAV_SEARCH: "nav_search",
  NAV_NOTIFICATIONS: "nav_notifications",
  NAV_SETTINGS: "nav_settings",

  // Monetization events
  PREMIUM_VIEW: "premium_view",
  PREMIUM_SUBSCRIBE: "premium_subscribe",
  PREMIUM_CANCEL: "premium_cancel",
  CREATOR_TIP: "creator_tip",
  CREATOR_PAYOUT: "creator_payout",

  // Engagement events
  FEED_SCROLL: "feed_scroll",
  FEED_REFRESH: "feed_refresh",
  DARK_MODE_TOGGLE: "dark_mode_toggle",
  PWA_INSTALL: "pwa_install",
  NOTIFICATION_CLICK: "notification_click",

  // Error events
  ERROR_API: "error_api",
  ERROR_PAYMENT: "error_payment",
  ERROR_UPLOAD: "error_upload",
} as const;

// ─── Analytics Tracker ────────────────────────────────────
class AnalyticsTracker {
  private sessionStart = Date.now();
  private pageViews = 0;
  private interactions = 0;

  track(event: string, properties?: Record<string, any>) {
    this.interactions++;
    posthog.capture(event, {
      session_duration: Math.round((Date.now() - this.sessionStart) / 1000),
      session_page_views: this.pageViews,
      session_interactions: this.interactions,
      ...properties,
    });
  }

  trackPageView(pageName: string, properties?: Record<string, any>) {
    this.pageViews++;
    this.track("page_view", { page_name: pageName, ...properties });
  }

  trackEngagement(action: string, metadata?: Record<string, any>) {
    this.track("engagement", { action, ...metadata });
  }

  trackConversion(type: string, value?: number, metadata?: Record<string, any>) {
    this.track("conversion", { conversion_type: type, value, ...metadata });
  }

  trackFeatureUsage(feature: string, metadata?: Record<string, any>) {
    this.track("feature_usage", { feature, ...metadata });
  }

  trackTiming(category: string, variable: string, value: number) {
    this.track("timing", { category, variable, value_ms: value });
  }

  // ─── Funnel Tracking ─────────────────────────────────
  trackFunnelStep(funnel: string, step: number, stepName: string, metadata?: Record<string, any>) {
    this.track("funnel_step", {
      funnel_name: funnel,
      step_number: step,
      step_name: stepName,
      ...metadata,
    });
  }

  // ─── Retention Tracking ──────────────────────────────
  trackRetention(daysSinceSignup: number) {
    this.track("retention_check", {
      days_since_signup: daysSinceSignup,
      retention_bucket: this.getRetentionBucket(daysSinceSignup),
    });
  }

  private getRetentionBucket(days: number): string {
    if (days <= 1) return "day_1";
    if (days <= 7) return "week_1";
    if (days <= 14) return "week_2";
    if (days <= 30) return "month_1";
    if (days <= 90) return "quarter_1";
    return "long_term";
  }

  // ─── Session Summary ─────────────────────────────────
  getSessionSummary() {
    return {
      duration: Math.round((Date.now() - this.sessionStart) / 1000),
      pageViews: this.pageViews,
      interactions: this.interactions,
    };
  }
}

export const analytics = new AnalyticsTracker();
