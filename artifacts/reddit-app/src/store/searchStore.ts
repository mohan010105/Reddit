import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SearchState {
  recentQueries: string[];
  trendingQueries: string[];
  
  // Actions
  addRecentQuery: (query: string) => void;
  clearRecent: () => void;
  setTrending: (queries: string[]) => void;
}

export const useSearchStore = create<SearchState>()(
  persist(
    (set) => ({
      recentQueries: [],
      trendingQueries: [],

      addRecentQuery: (query) => 
        set((state) => {
          const filtered = state.recentQueries.filter(q => q !== query);
          return { recentQueries: [query, ...filtered].slice(0, 10) };
        }),

      clearRecent: () => set({ recentQueries: [] }),
      
      setTrending: (queries) => set({ trendingQueries: queries }),
    }),
    {
      name: "threadit-search",
    }
  )
);
