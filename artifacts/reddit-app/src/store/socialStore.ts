import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SocialState {
  savedPosts: Set<number>;
  followingUsers: Set<number>;
  nsfwFilter: boolean;

  // Actions
  toggleSaved: (postId: number) => void;
  setSaved: (postIds: number[]) => void;
  toggleFollowing: (userId: number) => void;
  setFollowing: (userIds: number[]) => void;
  setNsfwFilter: (enabled: boolean) => void;
  isSaved: (postId: number) => boolean;
  isFollowing: (userId: number) => boolean;
}

/**
 * Manages social interactions like saved posts and follows.
 * Uses a Set for O(1) lookups.
 */
export const useSocialStore = create<SocialState>()(
  persist(
    (set, get) => ({
      savedPosts: new Set<number>(),
      followingUsers: new Set<number>(),
      nsfwFilter: true,

      toggleSaved: (postId) => {
        const newSet = new Set(get().savedPosts);
        if (newSet.has(postId)) newSet.delete(postId);
        else newSet.add(postId);
        set({ savedPosts: newSet });
      },

      setSaved: (postIds) => set({ savedPosts: new Set(postIds) }),

      toggleFollowing: (userId) => {
        const newSet = new Set(get().followingUsers);
        if (newSet.has(userId)) newSet.delete(userId);
        else newSet.add(userId);
        set({ followingUsers: newSet });
      },

      setFollowing: (userIds) => set({ followingUsers: new Set(userIds) }),

      setNsfwFilter: (enabled) => set({ nsfwFilter: enabled }),

      isSaved: (postId) => get().savedPosts.has(postId),
      isFollowing: (userId) => get().followingUsers.has(userId),
    }),
    {
      name: "threadit-social",
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          const { state } = JSON.parse(str);
          return {
            state: {
              ...state,
              savedPosts: new Set(state.savedPosts),
              followingUsers: new Set(state.followingUsers),
              nsfwFilter: state.nsfwFilter ?? true,
            },
          };
        },
        setItem: (name, value) => {
          const { state } = value as any;
          localStorage.setItem(
            name,
            JSON.stringify({
              state: {
                ...state,
                savedPosts: Array.from(state.savedPosts),
                followingUsers: Array.from(state.followingUsers),
                nsfwFilter: state.nsfwFilter,
              },
            })
          );
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);
