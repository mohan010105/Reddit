import { useState, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

// ──────────────────────────────────────────────────────────────────────────────
// Fetch helper with auth
// ──────────────────────────────────────────────────────────────────────────────
async function adminFetch(path: string, options?: RequestInit) {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  
  const res = await fetch(`/api/admin${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
  });
  
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Request failed" }));
    throw new Error(err.error || "Request failed");
  }
  return res.json();
}

// ──────────────────────────────────────────────────────────────────────────────
// Dashboard Stats
// ──────────────────────────────────────────────────────────────────────────────
export function useAdminStats() {
  return useQuery({
    queryKey: ["admin", "stats"],
    queryFn: () => adminFetch("/stats"),
    refetchInterval: 30_000,
  });
}

// ──────────────────────────────────────────────────────────────────────────────
// User Management
// ──────────────────────────────────────────────────────────────────────────────
export function useAdminUsers(params: { page?: number; limit?: number; search?: string; role?: string; status?: string } = {}) {
  const qs = new URLSearchParams();
  if (params.page) qs.set("page", String(params.page));
  if (params.limit) qs.set("limit", String(params.limit));
  if (params.search) qs.set("search", params.search);
  if (params.role) qs.set("role", params.role);
  if (params.status) qs.set("status", params.status);
  
  return useQuery({
    queryKey: ["admin", "users", params],
    queryFn: () => adminFetch(`/users?${qs.toString()}`),
  });
}

export function useUpdateUserRole() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ username, role }: { username: string; role: string }) =>
      adminFetch(`/users/${username}/role`, { method: "PATCH", body: JSON.stringify({ role }) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "users"] }),
  });
}

export function useBanUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ username, banned, reason, duration }: { username: string; banned: boolean; reason?: string; duration?: number }) =>
      adminFetch(`/users/${username}/ban`, { method: "POST", body: JSON.stringify({ banned, reason, duration }) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "users"] }),
  });
}

export function useShadowBanUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ username, shadowBanned }: { username: string; shadowBanned: boolean }) =>
      adminFetch(`/users/${username}/shadow-ban`, { method: "POST", body: JSON.stringify({ shadowBanned }) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "users"] }),
  });
}

export function useMuteUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ username, duration }: { username: string; duration: number | null }) =>
      adminFetch(`/users/${username}/mute`, { method: "POST", body: JSON.stringify({ duration }) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "users"] }),
  });
}

// ──────────────────────────────────────────────────────────────────────────────
// Post Management
// ──────────────────────────────────────────────────────────────────────────────
export function useAdminPosts(params: { page?: number; limit?: number; search?: string; status?: string } = {}) {
  const qs = new URLSearchParams();
  if (params.page) qs.set("page", String(params.page));
  if (params.limit) qs.set("limit", String(params.limit));
  if (params.search) qs.set("search", params.search);
  if (params.status) qs.set("status", params.status);
  
  return useQuery({
    queryKey: ["admin", "posts", params],
    queryFn: () => adminFetch(`/posts?${qs.toString()}`),
  });
}

export function useModeratePost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, action, reason }: { id: number; action: string; reason?: string }) =>
      adminFetch(`/posts/${id}/moderate`, { method: "PATCH", body: JSON.stringify({ action, reason }) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "posts"] }),
  });
}

export function useBulkModeratePosts() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ ids, action }: { ids: number[]; action: string }) =>
      adminFetch("/posts/bulk", { method: "POST", body: JSON.stringify({ ids, action }) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "posts"] }),
  });
}

// ──────────────────────────────────────────────────────────────────────────────
// Comment Management
// ──────────────────────────────────────────────────────────────────────────────
export function useAdminComments(params: { page?: number; limit?: number; search?: string } = {}) {
  const qs = new URLSearchParams();
  if (params.page) qs.set("page", String(params.page));
  if (params.limit) qs.set("limit", String(params.limit));
  if (params.search) qs.set("search", params.search);
  
  return useQuery({
    queryKey: ["admin", "comments", params],
    queryFn: () => adminFetch(`/comments?${qs.toString()}`),
  });
}

export function useModerateComment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, action, reason }: { id: number; action: string; reason?: string }) =>
      adminFetch(`/comments/${id}/moderate`, { method: "PATCH", body: JSON.stringify({ action, reason }) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "comments"] }),
  });
}

// ──────────────────────────────────────────────────────────────────────────────
// Community Management
// ──────────────────────────────────────────────────────────────────────────────
export function useAdminCommunities(params: { page?: number; limit?: number; search?: string } = {}) {
  const qs = new URLSearchParams();
  if (params.page) qs.set("page", String(params.page));
  if (params.limit) qs.set("limit", String(params.limit));
  if (params.search) qs.set("search", params.search);
  
  return useQuery({
    queryKey: ["admin", "communities", params],
    queryFn: () => adminFetch(`/communities?${qs.toString()}`),
  });
}

export function useDeleteCommunity() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) =>
      adminFetch(`/communities/${id}`, { method: "DELETE" }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "communities"] }),
  });
}

// ──────────────────────────────────────────────────────────────────────────────
// Reports
// ──────────────────────────────────────────────────────────────────────────────
export function useAdminReports(params: { page?: number; limit?: number; status?: string } = {}) {
  const qs = new URLSearchParams();
  if (params.page) qs.set("page", String(params.page));
  if (params.limit) qs.set("limit", String(params.limit));
  if (params.status) qs.set("status", params.status);
  
  return useQuery({
    queryKey: ["admin", "reports", params],
    queryFn: () => adminFetch(`/reports?${qs.toString()}`),
    refetchInterval: 15_000,
  });
}

export function useResolveReport() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status, note, action }: { id: number; status: string; note?: string; action?: string }) =>
      adminFetch(`/reports/${id}/resolve`, { method: "PATCH", body: JSON.stringify({ status, note, action }) }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "reports"] });
      qc.invalidateQueries({ queryKey: ["admin", "stats"] });
    },
  });
}

// ──────────────────────────────────────────────────────────────────────────────
// Analytics
// ──────────────────────────────────────────────────────────────────────────────
export function useAnalyticsOverview() {
  return useQuery({
    queryKey: ["admin", "analytics", "overview"],
    queryFn: () => adminFetch("/analytics/overview"),
    refetchInterval: 60_000,
  });
}

export function useAnalyticsDaily(days = 30) {
  return useQuery({
    queryKey: ["admin", "analytics", "daily", days],
    queryFn: () => adminFetch(`/analytics/daily?days=${days}`),
  });
}

export function useAnalyticsUsers() {
  return useQuery({
    queryKey: ["admin", "analytics", "users"],
    queryFn: () => adminFetch("/analytics/users"),
  });
}

export function useAnalyticsPosts() {
  return useQuery({
    queryKey: ["admin", "analytics", "posts"],
    queryFn: () => adminFetch("/analytics/posts"),
  });
}

export function useAnalyticsCommunities() {
  return useQuery({
    queryKey: ["admin", "analytics", "communities"],
    queryFn: () => adminFetch("/analytics/communities"),
  });
}

export function useRealtimeMetrics() {
  return useQuery({
    queryKey: ["admin", "analytics", "realtime"],
    queryFn: () => adminFetch("/analytics/realtime"),
    refetchInterval: 10_000,
  });
}

// ──────────────────────────────────────────────────────────────────────────────
// AI Moderation
// ──────────────────────────────────────────────────────────────────────────────
export function useAIModerationLogs(params: { page?: number; limit?: number; status?: string; contentType?: string } = {}) {
  const qs = new URLSearchParams();
  if (params.page) qs.set("page", String(params.page));
  if (params.limit) qs.set("limit", String(params.limit));
  if (params.status) qs.set("status", params.status);
  if (params.contentType) qs.set("contentType", params.contentType);
  
  return useQuery({
    queryKey: ["admin", "ai", "logs", params],
    queryFn: () => adminFetch(`/ai/logs?${qs.toString()}`),
  });
}

export function useFlaggedContent(params: { page?: number; limit?: number } = {}) {
  return useQuery({
    queryKey: ["admin", "ai", "flagged", params],
    queryFn: () => adminFetch(`/ai/flagged?page=${params.page || 1}&limit=${params.limit || 20}`),
    refetchInterval: 15_000,
  });
}

export function useReviewModeration() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, approved }: { id: number; approved: boolean }) =>
      adminFetch(`/ai/review/${id}`, { method: "PATCH", body: JSON.stringify({ approved }) }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "ai"] });
      qc.invalidateQueries({ queryKey: ["admin", "posts"] });
    },
  });
}

// ──────────────────────────────────────────────────────────────────────────────
// Admin Logs
// ──────────────────────────────────────────────────────────────────────────────
export function useAdminLogs(params: { page?: number; limit?: number; action?: string; targetType?: string } = {}) {
  const qs = new URLSearchParams();
  if (params.page) qs.set("page", String(params.page));
  if (params.limit) qs.set("limit", String(params.limit));
  if (params.action) qs.set("action", params.action);
  if (params.targetType) qs.set("targetType", params.targetType);
  
  return useQuery({
    queryKey: ["admin", "logs", params],
    queryFn: () => adminFetch(`/logs?${qs.toString()}`),
  });
}

// ──────────────────────────────────────────────────────────────────────────────
// Platform Settings
// ──────────────────────────────────────────────────────────────────────────────
export function usePlatformSettings() {
  return useQuery({
    queryKey: ["admin", "settings"],
    queryFn: () => adminFetch("/settings"),
  });
}

export function useUpdateSettings() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (settings: Record<string, any>) =>
      adminFetch("/settings", { method: "PUT", body: JSON.stringify(settings) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "settings"] }),
  });
}
