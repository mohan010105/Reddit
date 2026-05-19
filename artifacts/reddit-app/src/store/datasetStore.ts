/**
 * Dataset Zustand Store — State management for the Dataset Explorer page.
 *
 * Handles pagination, sorting, filtering, search, and stats with
 * optimistic updates and memoized selectors to avoid unnecessary re-renders.
 */

import { create } from "zustand";
import api from "@/lib/api";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DatasetRecord {
  key: string;
  title: string;
  thumbnail: { thumbnail: string; height: number; width: number } | null;
  created_utc: number;
  author: string;
  id: string;
  ups: number;
  downs: number;
  media: string;
  isNsfw: boolean;
  createdAt: string;
}

export interface DatasetMeta {
  fileName: string;
  fileType: string;
  fileSizeBytes: number;
  totalRecords: number;
  columns: string[];
  sampleRecords: DatasetRecord[];
  columnTypes: Record<string, string>;
}

export interface DatasetStats {
  totalRecords: number;
  totalUpvotes: number;
  avgUpvotes: number;
  maxUpvotes: number;
  minUpvotes: number;
  uniqueAuthors: number;
  nsfwCount: number;
  dateRange: { earliest: string; latest: string };
  topAuthors: Array<{ author: string; count: number; totalUps: number }>;
  scoreDistribution: Array<{ bucket: string; count: number }>;
  postsByMonth: Array<{ month: string; count: number }>;
}

export type SortField = "ups" | "created_utc" | "title" | "author";
export type SortOrder = "asc" | "desc";

interface DatasetState {
  // Data
  records: DatasetRecord[];
  meta: DatasetMeta | null;
  stats: DatasetStats | null;
  selectedRecord: DatasetRecord | null;

  // Pagination
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;

  // Sorting
  sort: SortField;
  order: SortOrder;

  // Filters
  authorFilter: string;
  minScore: string;
  maxScore: string;
  nsfwFilter: "all" | "sfw" | "nsfw";

  // Search
  searchQuery: string;
  searchResults: DatasetRecord[];
  searchTotal: number;
  isSearchActive: boolean;

  // Loading states
  isLoading: boolean;
  isStatsLoading: boolean;
  isMetaLoading: boolean;
  isSearching: boolean;
  error: string | null;

  // Actions
  fetchRecords: () => Promise<void>;
  fetchMeta: () => Promise<void>;
  fetchStats: () => Promise<void>;
  fetchRecord: (key: string) => Promise<void>;
  searchRecords: (query: string) => Promise<void>;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setSort: (sort: SortField) => void;
  setOrder: (order: SortOrder) => void;
  setAuthorFilter: (author: string) => void;
  setMinScore: (score: string) => void;
  setMaxScore: (score: string) => void;
  setNsfwFilter: (filter: "all" | "sfw" | "nsfw") => void;
  setSearchQuery: (query: string) => void;
  clearFilters: () => void;
  clearSearch: () => void;
}

// ─── Store ────────────────────────────────────────────────────────────────────

export const useDatasetStore = create<DatasetState>()((set, get) => ({
  // Initial state
  records: [],
  meta: null,
  stats: null,
  selectedRecord: null,

  page: 1,
  limit: 20,
  total: 0,
  hasMore: false,

  sort: "ups",
  order: "desc",

  authorFilter: "",
  minScore: "",
  maxScore: "",
  nsfwFilter: "all",

  searchQuery: "",
  searchResults: [],
  searchTotal: 0,
  isSearchActive: false,

  isLoading: false,
  isStatsLoading: false,
  isMetaLoading: false,
  isSearching: false,
  error: null,

  // ─── Fetch paginated records ──────────────────────────────────────────

  fetchRecords: async () => {
    const state = get();
    set({ isLoading: true, error: null });

    try {
      const params: Record<string, string> = {
        page: String(state.page),
        limit: String(state.limit),
        sort: state.sort,
        order: state.order,
      };

      if (state.authorFilter) params.author = state.authorFilter;
      if (state.minScore) params.minScore = state.minScore;
      if (state.maxScore) params.maxScore = state.maxScore;
      if (state.nsfwFilter === "nsfw") params.isNsfw = "true";
      else if (state.nsfwFilter === "sfw") params.isNsfw = "false";

      const { data } = await api.get("/dataset", { params });

      set({
        records: data.data,
        total: data.total,
        hasMore: data.hasMore,
        isLoading: false,
      });
    } catch (err: any) {
      set({
        error: err.response?.data?.error || err.message || "Failed to fetch dataset",
        isLoading: false,
      });
    }
  },

  // ─── Fetch metadata ───────────────────────────────────────────────────

  fetchMeta: async () => {
    set({ isMetaLoading: true });
    try {
      const { data } = await api.get("/dataset/meta");
      set({ meta: data, isMetaLoading: false });
    } catch (err: any) {
      set({ isMetaLoading: false, error: err.message });
    }
  },

  // ─── Fetch stats ──────────────────────────────────────────────────────

  fetchStats: async () => {
    set({ isStatsLoading: true });
    try {
      const { data } = await api.get("/dataset/stats");
      set({ stats: data, isStatsLoading: false });
    } catch (err: any) {
      set({ isStatsLoading: false, error: err.message });
    }
  },

  // ─── Fetch single record ──────────────────────────────────────────────

  fetchRecord: async (key: string) => {
    try {
      const { data } = await api.get(`/dataset/${key}`);
      set({ selectedRecord: data });
    } catch {
      set({ selectedRecord: null });
    }
  },

  // ─── Search ───────────────────────────────────────────────────────────

  searchRecords: async (query: string) => {
    if (!query.trim()) {
      set({ isSearchActive: false, searchResults: [], searchTotal: 0 });
      return;
    }
    set({ isSearching: true, isSearchActive: true, searchQuery: query });
    try {
      const { data } = await api.post("/dataset/search", {
        query,
        page: 1,
        limit: 50,
      });
      set({
        searchResults: data.data,
        searchTotal: data.total,
        isSearching: false,
      });
    } catch {
      set({ isSearching: false, searchResults: [], searchTotal: 0 });
    }
  },

  // ─── Setters ──────────────────────────────────────────────────────────

  setPage: (page) => {
    set({ page });
    get().fetchRecords();
  },

  setLimit: (limit) => {
    set({ limit, page: 1 });
    get().fetchRecords();
  },

  setSort: (sort) => {
    set({ sort, page: 1 });
    get().fetchRecords();
  },

  setOrder: (order) => {
    set({ order, page: 1 });
    get().fetchRecords();
  },

  setAuthorFilter: (author) => {
    set({ authorFilter: author, page: 1 });
  },

  setMinScore: (score) => {
    set({ minScore: score, page: 1 });
  },

  setMaxScore: (score) => {
    set({ maxScore: score, page: 1 });
  },

  setNsfwFilter: (filter) => {
    set({ nsfwFilter: filter, page: 1 });
    get().fetchRecords();
  },

  setSearchQuery: (query) => set({ searchQuery: query }),

  clearFilters: () => {
    set({
      authorFilter: "",
      minScore: "",
      maxScore: "",
      nsfwFilter: "all",
      page: 1,
    });
    get().fetchRecords();
  },

  clearSearch: () => {
    set({
      searchQuery: "",
      searchResults: [],
      searchTotal: 0,
      isSearchActive: false,
    });
  },
}));
