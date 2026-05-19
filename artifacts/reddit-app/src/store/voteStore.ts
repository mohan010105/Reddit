import { create } from "zustand";

interface VoteState {
  // Store optimistic votes as postId/commentId -> value (1, 0, -1)
  postVotes: Record<number, number>;
  commentVotes: Record<number, number>;

  // Actions
  setPostVote: (postId: number, value: number) => void;
  setCommentVote: (commentId: number, value: number) => void;
  getPostVote: (postId: number, defaultValue: number) => number;
  getCommentVote: (commentId: number, defaultValue: number) => number;
  clear: () => void;
}

/**
 * Zustand store for managing optimistic vote states across the app.
 * Ensures consistent UI when the same post appears in multiple feeds.
 */
export const useVoteStore = create<VoteState>((set, get) => ({
  postVotes: {},
  commentVotes: {},

  setPostVote: (postId, value) => 
    set((state) => ({ 
      postVotes: { ...state.postVotes, [postId]: value } 
    })),

  setCommentVote: (commentId, value) => 
    set((state) => ({ 
      commentVotes: { ...state.commentVotes, [commentId]: value } 
    })),

  getPostVote: (postId, defaultValue) => {
    const votes = get().postVotes;
    return votes[postId] !== undefined ? votes[postId] : defaultValue;
  },

  getCommentVote: (commentId, defaultValue) => {
    const votes = get().commentVotes;
    return votes[commentId] !== undefined ? votes[commentId] : defaultValue;
  },

  clear: () => set({ postVotes: {}, commentVotes: {} }),
}));
