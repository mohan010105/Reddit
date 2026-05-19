import { create } from "zustand";

// ──────────────────────────────────────────────────────────────────────────────
// Admin Store
// ──────────────────────────────────────────────────────────────────────────────
interface AdminState {
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  selectedItems: number[];
  setSelectedItems: (items: number[]) => void;
  clearSelection: () => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  sidebarCollapsed: false,
  toggleSidebar: () => set(s => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  selectedItems: [],
  setSelectedItems: (items) => set({ selectedItems: items }),
  clearSelection: () => set({ selectedItems: [] }),
}));

// ──────────────────────────────────────────────────────────────────────────────
// Analytics Store
// ──────────────────────────────────────────────────────────────────────────────
interface AnalyticsState {
  dateRange: number; // days
  setDateRange: (days: number) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const useAnalyticsStore = create<AnalyticsState>((set) => ({
  dateRange: 30,
  setDateRange: (days) => set({ dateRange: days }),
  activeTab: "overview",
  setActiveTab: (tab) => set({ activeTab: tab }),
}));

// ──────────────────────────────────────────────────────────────────────────────
// Moderation Store
// ──────────────────────────────────────────────────────────────────────────────
interface ModerationState {
  activeQueue: "flagged" | "all";
  setActiveQueue: (queue: "flagged" | "all") => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  processingIds: Set<number>;
  addProcessingId: (id: number) => void;
  removeProcessingId: (id: number) => void;
}

export const useModerationStore = create<ModerationState>((set) => ({
  activeQueue: "flagged",
  setActiveQueue: (queue) => set({ activeQueue: queue }),
  statusFilter: "",
  setStatusFilter: (status) => set({ statusFilter: status }),
  processingIds: new Set(),
  addProcessingId: (id) => set(s => ({ processingIds: new Set([...s.processingIds, id]) })),
  removeProcessingId: (id) => set(s => {
    const next = new Set(s.processingIds);
    next.delete(id);
    return { processingIds: next };
  }),
}));

// ──────────────────────────────────────────────────────────────────────────────
// Report Store
// ──────────────────────────────────────────────────────────────────────────────
interface ReportState {
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  reviewingReport: any | null;
  setReviewingReport: (report: any | null) => void;
}

export const useReportStore = create<ReportState>((set) => ({
  statusFilter: "pending",
  setStatusFilter: (status) => set({ statusFilter: status }),
  reviewingReport: null,
  setReviewingReport: (report) => set({ reviewingReport: report }),
}));

// ──────────────────────────────────────────────────────────────────────────────
// AI Moderation Store
// ──────────────────────────────────────────────────────────────────────────────
interface AIModerationState {
  autoRefresh: boolean;
  toggleAutoRefresh: () => void;
  confidenceThreshold: number;
  setConfidenceThreshold: (threshold: number) => void;
}

export const useAIModerationStore = create<AIModerationState>((set) => ({
  autoRefresh: true,
  toggleAutoRefresh: () => set(s => ({ autoRefresh: !s.autoRefresh })),
  confidenceThreshold: 0.4,
  setConfidenceThreshold: (threshold) => set({ confidenceThreshold: threshold }),
}));
