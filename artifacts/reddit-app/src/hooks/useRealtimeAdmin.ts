import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

/**
 * Subscribes to realtime changes on admin-relevant tables.
 * Automatically invalidates corresponding TanStack Query caches.
 */
export function useRealtimeAdmin(enabled: boolean) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!enabled) return;

    // Subscribe to reports table changes
    const reportsChannel = supabase
      .channel("admin-reports-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "reports" },
        () => {
          queryClient.invalidateQueries({ queryKey: ["admin", "reports"] });
          queryClient.invalidateQueries({ queryKey: ["admin", "stats"] });
        }
      )
      .subscribe();

    // Subscribe to posts table changes (for moderation queue)
    const postsChannel = supabase
      .channel("admin-posts-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "posts" },
        () => {
          queryClient.invalidateQueries({ queryKey: ["admin", "posts"] });
          queryClient.invalidateQueries({ queryKey: ["admin", "stats"] });
          queryClient.invalidateQueries({ queryKey: ["admin", "analytics"] });
        }
      )
      .subscribe();

    // Subscribe to users table changes
    const usersChannel = supabase
      .channel("admin-users-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "users" },
        () => {
          queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
          queryClient.invalidateQueries({ queryKey: ["admin", "stats"] });
        }
      )
      .subscribe();

    // Subscribe to comments table changes
    const commentsChannel = supabase
      .channel("admin-comments-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "comments" },
        () => {
          queryClient.invalidateQueries({ queryKey: ["admin", "comments"] });
          queryClient.invalidateQueries({ queryKey: ["admin", "stats"] });
        }
      )
      .subscribe();

    // Subscribe to AI moderation logs
    const aiLogsChannel = supabase
      .channel("admin-aimod-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "ai_moderation_logs" },
        () => {
          queryClient.invalidateQueries({ queryKey: ["admin", "ai"] });
        }
      )
      .subscribe();

    // Subscribe to admin logs  
    const adminLogsChannel = supabase
      .channel("admin-logs-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "admin_logs" },
        () => {
          queryClient.invalidateQueries({ queryKey: ["admin", "logs"] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(reportsChannel);
      supabase.removeChannel(postsChannel);
      supabase.removeChannel(usersChannel);
      supabase.removeChannel(commentsChannel);
      supabase.removeChannel(aiLogsChannel);
      supabase.removeChannel(adminLogsChannel);
    };
  }, [enabled, queryClient]);
}
