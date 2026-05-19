import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { getListNotificationsQueryKey } from "@workspace/api-client-react";

import { useNotificationStore } from "@/store/notificationStore";
import { toast } from "sonner";

export function useRealtimeNotifications(userId: number | undefined) {
  const queryClient = useQueryClient();
  const addNotification = useNotificationStore((state) => state.addNotification);

  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel(`notifications:${userId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${userId}`
        },
        (payload: any) => {
          queryClient.invalidateQueries({ queryKey: getListNotificationsQueryKey() });
          addNotification(payload.new);
          toast.info("New notification: " + payload.new.message);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, queryClient]);
}
