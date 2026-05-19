import { create } from "zustand";
import { persist } from "zustand/middleware";

// ─── Monetization Store ────────────────────────────────────────────────────
interface SubscriptionState {
  plan: "free" | "premium" | "creator" | "community_pro";
  status: "active" | "canceled" | "none" | "expired" | "past_due" | "trialing";
  currentPeriodEnd?: string;
  cancelAtPeriodEnd?: boolean;
}

interface MonetizationState {
  subscription: SubscriptionState;
  isPremium: boolean;
  setSubscription: (sub: Partial<SubscriptionState>) => void;
  reset: () => void;
}

export const useMonetizationStore = create<MonetizationState>()(
  persist(
    (set) => ({
      subscription: { plan: "free", status: "none" },
      isPremium: false,
      setSubscription: (sub) => set((state) => {
        const merged = { ...state.subscription, ...sub };
        return {
          subscription: merged,
          isPremium: merged.plan !== "free" && (merged.status === "active" || merged.status === "trialing"),
        };
      }),
      reset: () => set({ subscription: { plan: "free", status: "none" }, isPremium: false }),
    }),
    { name: "threadit-monetization" }
  )
);

// ─── PWA Store ─────────────────────────────────────────────────────────────
interface PWAState {
  isInstallable: boolean;
  deferredPrompt: any;
  isOffline: boolean;
  setInstallable: (prompt: any) => void;
  setOffline: (offline: boolean) => void;
  clearPrompt: () => void;
}

export const usePWAStore = create<PWAState>((set) => ({
  isInstallable: false,
  deferredPrompt: null,
  isOffline: typeof navigator !== "undefined" ? !navigator.onLine : false,
  setInstallable: (prompt) => set({ isInstallable: true, deferredPrompt: prompt }),
  setOffline: (offline) => set({ isOffline: offline }),
  clearPrompt: () => set({ isInstallable: false, deferredPrompt: null }),
}));

// ─── Recommendation Store ──────────────────────────────────────────────────
interface RecommendationState {
  recommendedPosts: any[];
  recommendedCommunities: any[];
  recommendedUsers: any[];
  lastFetched: number;
  setRecommendations: (posts: any[], communities: any[], users?: any[]) => void;
}

export const useRecommendationStore = create<RecommendationState>((set) => ({
  recommendedPosts: [],
  recommendedCommunities: [],
  recommendedUsers: [],
  lastFetched: 0,
  setRecommendations: (posts, communities, users = []) => set({
    recommendedPosts: posts,
    recommendedCommunities: communities,
    recommendedUsers: users,
    lastFetched: Date.now(),
  }),
}));

// ─── Push Notification Preferences Store ───────────────────────────────────
interface PushPreferences {
  enabled: boolean;
  comments: boolean;
  mentions: boolean;
  follows: boolean;
  community: boolean;
  premium: boolean;
  setEnabled: (enabled: boolean) => void;
  setPreference: (key: string, value: boolean) => void;
}

export const usePushPreferencesStore = create<PushPreferences>()(
  persist(
    (set) => ({
      enabled: false,
      comments: true,
      mentions: true,
      follows: true,
      community: true,
      premium: true,
      setEnabled: (enabled) => set({ enabled }),
      setPreference: (key, value) => set({ [key]: value }),
    }),
    { name: "threadit-push-prefs" }
  )
);
